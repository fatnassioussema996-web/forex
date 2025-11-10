<?php
// templates/_recipe_generator_form.php - v4 - COMPLETE with ALL user-provided fields
$is_demo = $is_demo ?? false;
?>

<div <?php if ($is_demo) echo 'data-aos="fade-up"'; ?>>
    <form id="generation-form" data-mode="<?php echo $is_demo ? 'demo' : 'real'; ?>" class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        
        <!-- Section 1: Core Ingredients -->
        <div>
            <label for="prompt-input" class="block text-lg font-semibold text-text-main">Your Ingredients</label>
            <p class="mt-1 text-sm text-text-secondary">List everything you have on hand. Separate items with a comma.</p>
            <div class="mt-4">
                <textarea name="prompt" id="prompt-input" rows="3" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-border rounded-md" placeholder="e.g., chicken breast, tomatoes, rice, onion..."></textarea>
            </div>
        </div>
        
        <!-- Section 2: Exclusions -->
        <div class="mt-8">
            <label for="excluded_ingredients" class="block text-sm font-medium text-text-main">Excluded Ingredients</label>
            <p class="mt-1 text-xs text-text-secondary">List any ingredients you want to avoid, separated by a comma.</p>
            <div class="mt-2">
                 <input type="text" name="excluded_ingredients" id="excluded_ingredients" placeholder="e.g., mushrooms, eggplant, peanuts" class="block w-full py-2 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
            </div>
        </div>

        <!-- Section 3: Basic Filters -->
        <div class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-6">
            <div>
                <label for="dish-type" class="block text-sm font-medium text-text-main">Dish Type</label>
                <select id="dish-type" name="dish_type" class="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option>Any</option> <option>Breakfast</option> <option>Lunch</option> <option>Dinner</option> <option>Dessert</option> <option>Snack</option>
                </select>
            </div>
            <div>
                <label for="cuisine" class="block text-sm font-medium text-text-main">Cuisine Style</label>
                <select id="cuisine" name="cuisine" class="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option>Any</option> <option>Italian</option> <option>Mexican</option> <option>Asian</option> <option>Indian</option> <option>Mediterranean</option> <option>French</option> <option>American</option>
                </select>
            </div>
            <div>
                <label for="skill_level" class="block text-sm font-medium text-text-main">Skill Level</label>
                <select id="skill_level" name="skill_level" class="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option>Any</option> <option>Beginner</option> <option>Intermediate</option> <option>Advanced</option>
                </select>
            </div>
            <div>
                <label for="servings" class="block text-sm font-medium text-text-main">Servings</label>
                <input type="number" name="servings" id="servings" min="1" max="10" placeholder="e.g., 2" class="mt-1 block w-full py-2 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
            </div>
        </div>
        
        <!-- Section 4: Advanced Filters -->
        <details class="mt-8">
            <summary class="text-sm font-medium text-text-main cursor-pointer hover:text-primary">Advanced Options & Preferences ▼</summary>
            
            <div class="mt-6 space-y-8">
                 <!-- Goals -->
                <div>
                    <label class="text-sm font-medium text-text-main">Goals</label>
                    <fieldset class="mt-2"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <?php $goals = ['None', 'High Protein', 'Low Carb', 'Low Fat', 'Balanced Diet', 'Keto', 'Paleo', 'Whole30', 'Weight Loss', 'Muscle Gain', 'Heart Healthy', 'Anti-Inflammatory', 'Energy Boost', 'Gut Health', 'Brain Health', 'Kid-Friendly', 'Diabetic Friendly', 'Low Sodium', 'High Fiber', 'Budget-Friendly', 'Comfort Food', 'Meal Prep Friendly']; ?>
                        <?php foreach($goals as $goal): ?><div class="relative flex items-start"><div class="flex items-center h-5"><input id="goal_<?php echo str_replace(' ', '', $goal); ?>" name="goals[]" value="<?php echo $goal; ?>" type="checkbox" class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="goal_<?php echo str_replace(' ', '', $goal); ?>" class="font-medium text-text-secondary"><?php echo $goal; ?></label></div></div><?php endforeach; ?>
                    </div></fieldset>
                </div>
                 <!-- Allergies -->
                <div>
                    <label class="text-sm font-medium text-text-main">Allergies</label>
                    <fieldset class="mt-2"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <?php $allergies = ['None', 'Nuts (tree nuts)', 'Peanuts', 'Dairy', 'Eggs', 'Gluten / Wheat', 'Soy', 'Shellfish', 'Fish', 'Sesame', 'Mustard', 'Celery', 'Lupin', 'Sulfites (preservatives)', 'Corn', 'Chocolate', 'Citrus', 'Legumes']; ?>
                        <?php foreach($allergies as $allergy): ?><div class="relative flex items-start"><div class="flex items-center h-5"><input id="allergy_<?php echo str_replace([' ', '/'], '', $allergy); ?>" name="allergies[]" value="<?php echo $allergy; ?>" type="checkbox" class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="allergy_<?php echo str_replace([' ', '/'], '', $allergy); ?>" class="font-medium text-text-secondary"><?php echo $allergy; ?></label></div></div><?php endforeach; ?>
                    </div></fieldset>
                </div>
                <!-- Available Equipment -->
                <div>
                    <label class="text-sm font-medium text-text-main">Available Equipment</label>
                    <fieldset class="mt-2"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <?php $equipment = ['None', 'Stove', 'Oven', 'Microwave', 'Blender', 'Food processor', 'Air fryer', 'Instant Pot / Pressure cooker', 'Grill', 'Toaster', 'Toaster oven', 'Slow cooker', 'Coffee maker / Espresso machine', 'Electric kettle', 'Waffle maker', 'Bread maker', 'Sous-vide machine', 'Rice cooker', 'Pizza oven', 'Deep fryer', 'Induction hob', 'BBQ smoker']; ?>
                        <?php foreach($equipment as $item): ?><div class="relative flex items-start"><div class="flex items-center h-5"><input id="equip_<?php echo str_replace([' ', '/'], '', $item); ?>" name="equipment[]" value="<?php echo $item; ?>" type="checkbox" class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="equip_<?php echo str_replace([' ', '/'], '', $item); ?>" class="font-medium text-text-secondary"><?php echo $item; ?></label></div></div><?php endforeach; ?>
                    </div></fieldset>
                </div>
                
                 <!-- Last row of selects -->
                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                        <label for="desired_complexity" class="block text-sm font-medium text-text-main">Desired Complexity</label>
                        <select id="desired_complexity" name="desired_complexity" class="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                            <option>Any</option> <option>Simple</option> <option>Standard</option> <option>Gourmet</option>
                        </select>
                    </div>
                     <div>
                        <label for="special_occasion" class="block text-sm font-medium text-text-main">Special Occasion</label>
                        <select id="special_occasion" name="special_occasion" class="mt-1 block w-full py-2 px-3 border border-border bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                            <option>Any</option><option>Quick Weeknight Meal</option><option>Family Dinner</option><option>Date Night</option><option>Birthday</option><option>Holiday</option><option>Christmas</option><option>New Year</option><option>Easter</option><option>Thanksgiving</option><option>Picnic</option><option>Barbecue</option><option>Potluck</option><option>Dinner Party</option><option>Romantic Dinner</option><option>Kids Party</option><option>Festive / Celebration</option><option>Vegetarian Feast</option><option>Fasting (Пост)</option><option>Camping Trip</option><option>Work Lunch</option><option>Movie Night</option><option>Road Trip Snacks</option>
                        </select>
                    </div>
                </div>
            </div>
        </details>

        <!-- Final Button -->
        <div class="mt-10 pt-6 border-t border-border">
            <div class="flex justify-end">
                <?php if ($is_demo): ?>
                    <a href="<?php echo $base_path; ?>register" class="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
                        Sign Up To Generate
                    </a>
                <?php else: ?>
                    <button type="submit" id="generate-button" class="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
                        <span class="btn-text">Generate Recipe</span>
                    </button>
                <?php endif; ?>
            </div>
        </div>
    </form>
</div>