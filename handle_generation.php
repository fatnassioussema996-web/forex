<?php
// handle_generation.php - v8 - FINAL with DB Transaction

if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';
header('Content-Type: application/json');

// --- 1. Security & Basic Validation ---
if (!isset($_SESSION['user_id'])) { exit(json_encode(['status' => 'error', 'message' => 'Auth required.'])); }
$user_id = $_SESSION['user_id'];
$prompt_ingredients = trim($_POST['prompt'] ?? '');
if (empty($prompt_ingredients)) { exit(json_encode(['status' => 'error', 'message' => 'Ingredients required.'])); }

// --- 2. Cost Calculation & Balance Check ---
$generation_cost = 60.00; 
$stmt_balance = $connection->prepare("SELECT balance FROM users WHERE id = ?");
$stmt_balance->bind_param("i", $user_id);
$stmt_balance->execute();
$current_balance = $stmt_balance->get_result()->fetch_assoc()['balance'];
$stmt_balance->close();
if ($current_balance < $generation_cost) { exit(json_encode(['status' => 'error', 'message' => "Not enough Tokens. Need $generation_cost."])); }

// --- 3. Master Prompt Construction (FIXED & COMPLETE) ---
$master_prompt = "You are a world-class chef. Generate a unique, delicious recipe based on the following precise details.\n"
               . "The primary available ingredients are: " . htmlspecialchars($prompt_ingredients) . ".\n";
$fields = [ 'dish_type' => 'Dish Type', 'cuisine' => 'Cuisine Style', 'servings' => 'Number of Servings', 'skill_level' => 'Required Skill Level', 'desired_complexity' => 'Desired Complexity', 'special_occasion' => 'Suitable for Occasion', 'excluded_ingredients' => 'CRITICAL: Exclude these ingredients at all costs', ];
foreach ($fields as $post_key => $prompt_label) { if (isset($_POST[$post_key]) && !empty($_POST[$post_key]) && $_POST[$post_key] !== 'Any' && $_POST[$post_key] !== 'None') { $master_prompt .= $prompt_label . ": " . htmlspecialchars($_POST[$post_key]) . ".\n"; } }
$arrays = [ 'allergies' => 'CRITICAL: The recipe must be free of these allergens', 'goals' => 'The recipe should align with these goals', 'equipment' => 'The recipe should only use the following available equipment', ];
foreach ($arrays as $post_key => $prompt_label) { if (isset($_POST[$post_key]) && is_array($_POST[$post_key])) { $filtered_values = array_filter($_POST[$post_key], function($value) { return strtolower($value) !== 'none'; }); if (!empty($filtered_values)) { $master_prompt .= $prompt_label . ": " . htmlspecialchars(implode(', ', $filtered_values)) . ".\n"; } } }
$master_prompt .= "\nPlease provide a creative, enticing title for the recipe. "
                . "The response MUST be a valid JSON object with the following structure: "
                . "{\"title\": \"...\", \"description\": \"...\", \"skill_level\": \"...\", \"servings\": \"...\", \"cooking_time\": \"...\", \"ingredients\": [{\"item\": \"...\", \"name\": \"...\"}], \"instructions\": [\"...\"]}. "
                . "CRITICAL: You MUST respond ONLY with the JSON object itself, with no introductory text, no explanations, and no markdown formatting. Just the raw JSON object.";

// --- 4. Get Recipe Text from GPT-4o ---
try {
    $client = \OpenAI::client(OPENAI_API_KEY);
    $response_text = $client->chat()->create([
        'model' => 'gpt-4o',
        'messages' => [
            ['role' => 'system', 'content' => 'You are a helpful chef assistant designed to output JSON.'],
            ['role' => 'user', 'content' => $master_prompt], 
        ],
    ]);
    $recipe_json_string = $response_text->choices[0]->message->content;
    $decoded_recipe = json_decode($recipe_json_string);
    if (json_last_error() !== JSON_ERROR_NONE) { throw new Exception('AI returned invalid recipe text format.'); }
} catch (Exception $e) {
    error_log('GPT API Error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'The AI failed to generate recipe text. Details: ' . $e->getMessage()]);
    exit();
}

// --- 5. Generate Image with DALL-E 3 ---
try {
    $image_prompt = "Create a photorealistic, beautifully lit, gourmet food photograph of the following dish: " . $decoded_recipe->title . ". " . $decoded_recipe->description . " The style should be bright, clean, and appetizing, suitable for a high-end cooking blog. No text, people, or hands in the image.";
    $response_image = $client->images()->create([
        'model' => 'dall-e-3',
        'prompt' => $image_prompt,
        'n' => 1,
        'size' => '1024x1024',
        'response_format' => 'url'
    ]);
    $temp_image_url = $response_image->data[0]->url;
    $image_data = @file_get_contents($temp_image_url);
    if ($image_data === false) { throw new Exception("Failed to download image from OpenAI."); }
    
    $image_filename = 'recipe_img_' . $user_id . '_' . uniqid() . '.png';
    $image_path_for_browser = 'images/generated/' . $image_filename;
    $image_path_on_server = __DIR__ . '/' . $image_path_for_browser;
    file_put_contents($image_path_on_server, $image_data);
} catch (Exception $e) {
    error_log('DALL-E API Error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to create an image. Details: ' . $e->getMessage()]);
    exit();
}

// --- 6. Assemble and Save the PDF using mPDF ---
try {
    ob_start();
    $recipe_data = $decoded_recipe;
    include __DIR__ . '/templates/recipe_pdf_template.php';
    $html_content = ob_get_clean();

    $tempDir = __DIR__ . '/tmp';
    $recipeDir = __DIR__ . '/recipes/generated/';
    if (!is_dir($tempDir)) { mkdir($tempDir, 0775, true); }
    if (!is_dir($recipeDir)) { mkdir($recipeDir, 0775, true); }
    
    $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4', 'tempDir' => $tempDir]);
    $mpdf->WriteHTML($html_content);
    
    $pdf_filename = 'recipe_' . $user_id . '_' . uniqid() . '.pdf';
    $pdf_path_for_browser = 'recipes/generated/' . $pdf_filename;
    $pdf_path_on_server = __DIR__ . '/' . $pdf_path_for_browser;
    $mpdf->Output($pdf_path_on_server, \Mpdf\Output\Destination::FILE);
} catch (\Mpdf\MpdfException $e) {
    error_log('mPDF Error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to create the PDF file. Details: ' . $e->getMessage()]);
    exit();
}

// --- 7. NEW: Database Transaction (Save recipe & deduct balance) ---
$connection->begin_transaction();
try {
    // a) Deduct the cost from the user's balance
    $stmt_debit = $connection->prepare("UPDATE users SET balance = balance - ? WHERE id = ?");
    $stmt_debit->bind_param("di", $generation_cost, $user_id);
    $stmt_debit->execute();

    // b) Save the generated recipe details into the new 'user_recipes' table
    $stmt_insert = $connection->prepare(
        "INSERT INTO user_recipes (user_id, recipe_title, recipe_prompt, pdf_file_path, image_file_path, cost) VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt_insert->bind_param(
        "issssd",
        $user_id,
        $recipe_data->title,
        $master_prompt, // Save the full prompt for history/retries
        $pdf_path_for_browser,
        $image_path_for_browser,
        $generation_cost
    );
    $stmt_insert->execute();

    // c) If everything is successful, commit the transaction
    $connection->commit();

} catch (mysqli_sql_exception $exception) {
    $connection->rollback(); // Revert changes if anything fails
    error_log('DB Transaction Failed: ' . $exception->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'A database error occurred while saving your recipe. Your balance has not been charged.']);
    exit();
}

// --- 8. FINAL Success Response ---
$new_balance = $current_balance - $generation_cost;
echo json_encode([
    'status' => 'success',
    'message' => 'Recipe PDF created successfully!',
    'recipe_title' => $recipe_data->title,
    'pdf_url' => $pdf_path_for_browser,
    'new_balance' => number_format($new_balance) // Send updated balance to the frontend
]);
exit();
?>