<?php
// templates/recipe_pdf_template.php
// This file is an HTML/CSS template for our PDF recipe.
// It expects two variables to be available:
// $recipe_data - an object with all the recipe text (title, ingredients, etc.)
// $image_path_on_server - the full, absolute path to the DALL-E generated image on the server.
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* --- General Styles --- */
        body {
            font-family: DejaVu Sans, sans-serif; /* DejaVu Sans supports UTF-8 characters well */
            font-size: 11pt;
            color: #333;
        }
        h1 {
            font-size: 24pt;
            color: #62D487; /* Our primary color */
            text-align: center;
            margin-bottom: 5px;
        }
        .description {
            font-style: italic;
            color: #6D7680;
            text-align: center;
            margin-bottom: 20px;
        }
        
        /* --- Recipe Header Image --- */
        .recipe-image {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
        }
        
        /* --- Details Section (Servings, Time, etc.) --- */
        .details-container {
            width: 100%;
            background-color: #F8FAF9;
            padding: 15px;
            margin-bottom: 20px;
            border-left: 5px solid #62D487;
        }
        .details-container table {
            width: 100%;
            border-collapse: collapse;
        }
        .details-container td {
            width: 25%;
            text-align: center;
            font-size: 9pt;
            padding: 5px;
        }
        .details-container .detail-label {
            font-weight: bold;
            color: #232323;
            font-size: 10pt;
        }

        /* --- Main Content Columns --- */
        .content-columns {
            columns: 2;
            column-gap: 20px;
        }
        
        /* --- Ingredients List --- */
        h2 {
            font-size: 16pt;
            color: #232323;
            border-bottom: 2px solid #E2EFE7;
            padding-bottom: 5px;
            margin-top: 0;
        }
        ul.ingredients {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        ul.ingredients li {
            margin-bottom: 8px;
        }
        
        /* --- Instructions List --- */
        ol.instructions {
            padding-left: 20px; /* Indent the numbers */
            margin-top: 0;
        }
        ol.instructions li {
            margin-bottom: 12px;
            line-height: 1.5;
        }
        
        /* --- Footer --- */
        .pdf-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 8pt;
            color: #aaa;
        }
        
    </style>
</head>
<body>

    <!-- Main Title & Description -->
    <h1><?php echo htmlspecialchars($recipe_data->title); ?></h1>
    <p class="description"><?php echo htmlspecialchars($recipe_data->description); ?></p>
    
    <!-- Header Image -->
    <img class="recipe-image" src="<?php echo $image_path_on_server; ?>">
    
    <!-- Details Bar -->
    <div class="details-container">
        <table>
            <tr>
                <td><span class="detail-label">Skill Level</span><br><?php echo htmlspecialchars($recipe_data->skill_level); ?></td>
                <td><span class="detail-label">Servings</span><br><?php echo htmlspecialchars($recipe_data->servings); ?></td>
                <td><span class="detail-label">Cooking Time</span><br><?php echo htmlspecialchars($recipe_data->cooking_time); ?></td>
            </tr>
        </table>
    </div>
    
    <!-- Two Column Layout -->
    <div class="content-columns">
        
        <!-- Ingredients Column -->
        <div class="ingredients-section">
            <h2>Ingredients</h2>
            <ul class="ingredients">
                <?php foreach ($recipe_data->ingredients as $ingredient): ?>
                    <li><strong><?php echo htmlspecialchars($ingredient->item); ?></strong> <?php echo htmlspecialchars($ingredient->name); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        
        <!-- Instructions Column -->
        <div class="instructions-section">
            <h2>Instructions</h2>
            <ol class="instructions">
                 <?php foreach ($recipe_data->instructions as $step): ?>
                    <li><?php echo htmlspecialchars($step); ?></li>
                <?php endforeach; ?>
            </ol>
        </div>

    </div>

</body>
</html>