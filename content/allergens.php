<?php
// content/allergens.php - allergen data for /allergens.php page

$ALLERGENS = [
    [
        'key' => 'gluten',
        'label' => 'Cereals (gluten)',
        'img' => '/assets/images/allergens/gluten.webp',
        'examples' => 'wheat, barley, rye',
        'desc' => 'Proteins in wheat, barley, rye and related grains. Common in breads, pasta, pastry, sauces.',
        'tips' => [
            'Choose naturally gluten-free grains such as rice, quinoa, buckwheat.',
            'Use corn- or rice-based pasta; thicken sauces with cornstarch.',
            'Avoid shared toasters and boards to reduce cross-contact.',
        ],
    ],
    [
        'key' => 'crustaceans',
        'label' => 'Crustaceans',
        'img' => '/assets/images/allergens/crustaceans.webp',
        'examples' => 'shrimp, crab, lobster',
        'desc' => 'Includes shrimp, crab, lobster and their derivatives (stocks, pastes).',
        'tips' => [
            'Replace with firm tofu or white fish for similar texture.',
            'Watch for fish sauces and mixed seafood stocks.',
            'Clean cookware thoroughly after shellfish use.',
        ],
    ],
    [
        'key' => 'eggs',
        'label' => 'Eggs',
        'img' => '/assets/images/allergens/eggs.webp',
        'examples' => 'egg, mayo, batter',
        'desc' => 'Egg whites, yolks and products such as mayonnaise, batters, brushed glazes.',
        'tips' => [
            'Use flaxseed or chia gel as binders in baking.',
            'Aquafaba can replace egg whites for foams and meringues.',
            'Avoid pastry washed with egg glaze.',
        ],
    ],
    [
        'key' => 'fish',
        'label' => 'Fish',
        'img' => '/assets/images/allergens/fish.webp',
        'examples' => 'cod, salmon, anchovy',
        'desc' => 'All fish species and extracts.',
        'tips' => [
            'Substitute with chicken or tofu depending on the recipe.',
            'Check sauces like Worcestershire for anchovies.',
            'Use separate oil if fryers previously cooked fish.',
        ],
    ],
    [
        'key' => 'peanuts',
        'label' => 'Peanuts',
        'img' => '/assets/images/allergens/peanuts.webp',
        'examples' => 'peanut butter, peanut oil',
        'desc' => 'Groundnuts and peanut products including oils, butter and confectionery.',
        'tips' => [
            'Swap peanut butter for sunflower seed or pumpkin seed spreads.',
            'Avoid generic nut mixes that may contain peanuts.',
            'Read labels for “may contain traces of peanuts”.',
        ],
    ],
    [
        'key' => 'soybeans',
        'label' => 'Soybeans',
        'img' => '/assets/images/allergens/soybeans.webp',
        'examples' => 'soy sauce, tofu',
        'desc' => 'Soy/soya and derivatives such as soy sauce, tofu, tempeh, lecithin.',
        'tips' => [
            'Use coconut aminos or tamari (confirm allergen status) instead of soy sauce.',
            'Replace tofu with chickpeas or seitan (if gluten is tolerated).',
            'Check processed foods for hidden soy lecithin.',
        ],
    ],
    [
        'key' => 'milk',
        'label' => 'Milk',
        'img' => '/assets/images/allergens/milk.webp',
        'examples' => 'milk, cheese, butter',
        'desc' => 'Cow’s milk and dairy products including cheese, yogurt, cream and butter.',
        'tips' => [
            'Choose plant milks (oat, almond, rice) and dairy-free cheese.',
            'Use olive oil or vegan butter instead of butter.',
            'Confirm whether lactose-free products meet your needs.',
        ],
    ],
    [
        'key' => 'nuts',
        'label' => 'Tree nuts',
        'img' => '/assets/images/allergens/nuts.webp',
        'examples' => 'almond, walnut, cashew',
        'desc' => 'Tree nuts such as almond, hazelnut, walnut, cashew, pecan, pistachio, macadamia.',
        'tips' => [
            'Replace crunch with toasted seeds like pumpkin or sunflower.',
            'Avoid pesto, pralines or sauces unless nut-free certified.',
            'Store and prep away from nut products to limit cross-contact.',
        ],
    ],
    [
        'key' => 'celery',
        'label' => 'Celery',
        'img' => '/assets/images/allergens/celery.webp',
        'examples' => 'celery, celeriac',
        'desc' => 'Celery stalks and celeriac. Often used in soups, stocks, and spice blends.',
        'tips' => [
            'Swap for fennel, leek or mild herbs to get aroma.',
            'Check bouillon cubes and seasoning mixes.',
            'Remember celeriac counts as celery in ingredient lists.',
        ],
    ],
    [
        'key' => 'mustard',
        'label' => 'Mustard',
        'img' => '/assets/images/allergens/mustard.webp',
        'examples' => 'mustard seeds, mustard powder',
        'desc' => 'Mustard seeds, paste or powder. Common in dressings, sauces, cured meats.',
        'tips' => [
            'Use yogurt-lemon or herb vinaigrettes without mustard.',
            'Check marinades and deli meats for mustard powder.',
            'Clean squeeze bottles thoroughly to avoid residue.',
        ],
    ],
    [
        'key' => 'sesame',
        'label' => 'Sesame',
        'img' => '/assets/images/allergens/sesame.webp',
        'examples' => 'seeds, tahini',
        'desc' => 'Sesame seeds, oil and tahini; often hidden in breads, toppings, sauces.',
        'tips' => [
            'Swap with roasted pumpkin or sunflower seeds for crunch.',
            'Avoid seed-crusted bakery items and double-check hummus/tahini.',
            'Watch for stray seeds on cutting boards and prep areas.',
        ],
    ],
    [
        'key' => 'sulphites',
        'label' => 'Sulphur dioxide & sulphites',
        'img' => '/assets/images/allergens/sulphites.webp',
        'examples' => 'dried fruits, wine',
        'desc' => 'Preservatives (E220–E228) found in dried fruit, wine, some vinegars and condiments.',
        'tips' => [
            'Choose unsulphured dried fruit when available.',
            'Allow wine to cook off but note sensitivity varies per person.',
            'Read labels on pickles, condiments and prepared potato products.',
        ],
    ],
    [
        'key' => 'lupin',
        'label' => 'Lupin',
        'img' => '/assets/images/allergens/lupin.webp',
        'examples' => 'lupin flour, lupin beans',
        'desc' => 'Lupin beans/flour sometimes used in gluten-free mixes.',
        'tips' => [
            'Replace with chickpea or rice flour blends.',
            'Check gluten-free breads and pastas for lupin flour.',
            'Avoid mixed legume flours if ingredient list is unclear.',
        ],
    ],
    [
        'key' => 'molluscs',
        'label' => 'Molluscs',
        'img' => '/assets/images/allergens/molluscs.webp',
        'examples' => 'oyster, mussel, squid',
        'desc' => 'Includes oysters, mussels, clams, squid and broths containing them.',
        'tips' => [
            'Swap for mushrooms or tofu to get similar umami.',
            'Avoid paella, seafood stocks or sauces unless verified safe.',
            'Use dedicated cookware to prevent cross-contact.',
        ],
    ],
];

