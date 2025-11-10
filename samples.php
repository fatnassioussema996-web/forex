<?php
// samples.php - Samples gallery page

require_once __DIR__ . '/config.php';
$page_title = 'Sample Recipes & PDF Gallery';
if (!isset($base_path)) {
    $base_path = '/';
}

$additional_css = ['assets/css/samples.css'];

require_once __DIR__ . '/content/samples.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$page_path = $base_path . 'samples.php';

function samples_list_param($key)
{
    if (!isset($_GET[$key])) {
        return [];
    }
    $value = $_GET[$key];
    if (is_array($value)) {
        return array_values(array_filter(array_map('trim', $value), static function ($item) {
            return $item !== '';
        }));
    }
    $parts = array_map('trim', explode(',', $value));
    return array_values(array_filter($parts, static function ($item) {
        return $item !== '';
    }));
}

function samples_int_param($key, $default = null)
{
    if (isset($_GET[$key]) && is_numeric($_GET[$key])) {
        return (int) $_GET[$key];
    }
    return $default;
}

$qs = [
    'goals' => samples_list_param('goals'),
    'diet' => samples_list_param('diet'),
    'time' => samples_int_param('time', null),
    'skill' => isset($_GET['skill']) ? trim($_GET['skill']) : '',
    'cuisine' => isset($_GET['cuisine']) ? trim($_GET['cuisine']) : '',
    'include' => samples_list_param('include'),
    'exclude' => samples_list_param('exclude'),
    'sort' => isset($_GET['sort']) ? trim($_GET['sort']) : 'Popular',
    'page' => max(1, samples_int_param('page', 1)),
];

$results = array_filter($samplesData, static function ($item) use ($qs) {
    if ($qs['goals']) {
        $match = false;
        foreach ($qs['goals'] as $goal) {
            if (in_array($goal, $item['tags'], true)) {
                $match = true;
                break;
            }
        }
        if (!$match) {
            return false;
        }
    }

    if ($qs['diet']) {
        foreach ($qs['diet'] as $diet) {
            if (!in_array($diet, $item['diet'], true)) {
                return false;
            }
        }
    }

    if ($qs['time'] && (int) $item['time'] > $qs['time']) {
        return false;
    }

    if ($qs['skill'] && strcasecmp($qs['skill'], $item['skill']) !== 0) {
        return false;
    }

    if ($qs['cuisine'] && strcasecmp($qs['cuisine'], $item['cuisine']) !== 0) {
        return false;
    }

    if ($qs['include']) {
        foreach ($qs['include'] as $include) {
            $needle = mb_strtolower($include);
            $found = false;
            foreach ($item['include'] as $candidate) {
                if (strpos(mb_strtolower($candidate), $needle) !== false) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                return false;
            }
        }
    }

    if ($qs['exclude']) {
        foreach ($qs['exclude'] as $exclude) {
            $needle = mb_strtolower($exclude);
            foreach ($item['exclude'] as $blocked) {
                if (strpos(mb_strtolower($blocked), $needle) !== false) {
                    return false;
                }
            }
        }
    }

    return true;
});

$sort = strtolower($qs['sort']);
usort($results, static function ($a, $b) use ($sort) {
    if ($sort === 'newest') {
        return strcmp($b['createdAt'], $a['createdAt']);
    }
    if ($sort === 'time') {
        return $a['time'] <=> $b['time'];
    }
    return $b['popularityScore'] <=> $a['popularityScore'];
});

$pageSize = 12;
$totalResults = count($results);
$totalPages = max(1, (int) ceil($totalResults / $pageSize));
$currentPage = min($qs['page'], $totalPages);
$offset = ($currentPage - 1) * $pageSize;
$resultsPage = array_slice($results, $offset, $pageSize);

function samples_join($items)
{
    return implode(', ', $items);
}

$generateBase = $base_path . 'register.php';

$exposedSamples = array_map(static function ($item) use ($generateBase, $base_path) {
    $payload = [
        'next' => 'generator',
        'pref' => json_encode($item['generatorPayload'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ];
    $generateUrl = $generateBase . '?' . http_build_query($payload);
    $item['image']['src'] = $base_path . ltrim($item['image']['src'], '/');
    $item['generateUrl'] = $generateUrl;
    return $item;
}, $resultsPage);

include __DIR__ . '/templates/header.php';
?>

<main class="samples-page">
    <section class="samples-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 samples-hero">
            <div class="samples-hero__body" data-aos="fade-up">
                <span class="samples-hero__pill">📚 Recipes gallery</span>
                <h1 class="samples-hero__title">Sample Recipes &amp; PDF Gallery</h1>
                <p class="samples-hero__subtitle">
                    Explore real-world examples, then generate your own in minutes. No subscription — tokens only.
                </p>
                <div class="samples-hero__actions">
                    <a class="samples-btn samples-btn--primary" href="<?php echo $base_path; ?>register.php?next=generator">
                        Generate a recipe
                    </a>
                    <a class="samples-btn samples-btn--secondary" href="<?php echo $base_path; ?>#pricing">
                        See pricing &amp; tokens
                    </a>
                </div>
            </div>
            <figure class="samples-hero__media" data-aos="fade-up" data-aos-delay="120">
                <img src="<?php echo $base_path; ?>assets/images/samples/samples-hero.webp"
                     alt="Recipe PDF previews arranged on a kitchen table"
                     width="1200"
                     height="675"
                     loading="eager"
                     decoding="async">
            </figure>
        </div>
    </section>

    <section id="samples-filters" class="samples-filters is-collapsed" data-aos="fade-down">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="samples-filters__header">
                <h2 class="samples-filters__title">Filter gallery</h2>
                <button type="button" id="samples-filters-toggle" class="samples-btn samples-btn--primary samples-filters__toggle" aria-expanded="false" aria-controls="samples-filters-form">
                    <span class="samples-filters__toggle-label--show">Hide filters</span>
                    <span class="samples-filters__toggle-label--hide">Show filters</span>
                </button>
            </div>
            <form id="samples-filters-form" class="samples-filters__form" method="get" data-base-url="<?php echo htmlspecialchars($page_path); ?>">
                <input type="hidden" name="page" value="<?php echo (int) $currentPage; ?>" id="samples-page-input">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <fieldset class="samples-fieldset lg:col-span-4">
                        <span class="samples-legend">Goals</span>
                        <div class="samples-chip-group">
                            <?php foreach ($samplesFilters['goals'] as $goal): ?>
                                <?php $checked = in_array($goal, $qs['goals'], true); ?>
                                <label class="samples-chip">
                                    <input type="checkbox" name="goals[]" value="<?php echo htmlspecialchars($goal); ?>" <?php echo $checked ? 'checked' : ''; ?>>
                                    <span><?php echo htmlspecialchars($goal); ?></span>
                                </label>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>

                    <fieldset class="samples-fieldset lg:col-span-4">
                        <span class="samples-legend">Diet</span>
                        <div class="samples-chip-group">
                            <?php foreach ($samplesFilters['diet'] as $diet): ?>
                                <?php $checked = in_array($diet, $qs['diet'], true); ?>
                                <label class="samples-chip">
                                    <input type="checkbox" name="diet[]" value="<?php echo htmlspecialchars($diet); ?>" <?php echo $checked ? 'checked' : ''; ?>>
                                    <span><?php echo htmlspecialchars($diet); ?></span>
                                </label>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>

                    <div class="lg:col-span-2">
                        <label class="samples-legend" for="filter-time">Time</label>
                        <select id="filter-time" name="time" class="samples-select">
                            <option value="">Any</option>
                            <?php foreach ($samplesFilters['timeOptions'] as $timeOption): ?>
                                <?php if ($timeOption === 'Any') continue; ?>
                                <option value="<?php echo $timeOption; ?>" <?php echo (string) $qs['time'] === (string) $timeOption ? 'selected' : ''; ?>>
                                    ≤ <?php echo $timeOption; ?> min
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="lg:col-span-2">
                        <label class="samples-legend" for="filter-skill">Skill</label>
                        <select id="filter-skill" name="skill" class="samples-select">
                            <option value="">Any</option>
                            <?php foreach ($samplesFilters['skillOptions'] as $skill): ?>
                                <option value="<?php echo htmlspecialchars($skill); ?>" <?php echo strcasecmp($qs['skill'], $skill) === 0 ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($skill); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="lg:col-span-2">
                        <label class="samples-legend" for="filter-cuisine">Cuisine</label>
                        <select id="filter-cuisine" name="cuisine" class="samples-select">
                            <option value="">Any</option>
                            <?php foreach ($samplesFilters['cuisines'] as $cuisine): ?>
                                <option value="<?php echo htmlspecialchars($cuisine); ?>" <?php echo strcasecmp($qs['cuisine'], $cuisine) === 0 ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($cuisine); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="lg:col-span-3">
                        <label class="samples-legend" for="filter-include">Include ingredients</label>
                        <input id="filter-include" name="include" class="samples-input" type="text"
                               placeholder="chicken, broccoli..."
                               value="<?php echo htmlspecialchars(samples_join($qs['include'])); ?>">
                    </div>

                    <div class="lg:col-span-3">
                        <label class="samples-legend" for="filter-exclude">Exclude</label>
                        <input id="filter-exclude" name="exclude" class="samples-input" type="text"
                               placeholder="peanuts, shellfish..."
                               value="<?php echo htmlspecialchars(samples_join($qs['exclude'])); ?>">
                    </div>

                    <div class="lg:col-span-3">
                        <label class="samples-legend" for="filter-sort">Sort By</label>
                        <select id="filter-sort" name="sort" class="samples-select">
                            <?php foreach ($samplesFilters['sort'] as $sortOption): ?>
                                <option value="<?php echo htmlspecialchars($sortOption); ?>" <?php echo strcasecmp($qs['sort'], $sortOption) === 0 ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($sortOption); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="lg:col-span-12 samples-filters__actions">
                        <button type="button" class="samples-btn samples-btn--secondary" id="samples-reset">Reset</button>
                        <button type="submit" class="samples-btn samples-btn--primary">Apply filters</button>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <section class="samples-section" data-aos="fade-up">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="samples-collections">
                <article class="samples-collection-card">
                    <h4>⏱️ 5 dinners ≤20 min</h4>
                    <p>Fast weeknight lifesavers the whole family will eat.</p>
                </article>
                <article class="samples-collection-card">
                    <h4>🌱 Vegan week</h4>
                    <p>Balanced plant-forward recipes without fuss or stress.</p>
                </article>
                <article class="samples-collection-card">
                    <h4>👨‍👩‍👧 Family classics</h4>
                    <p>Kid-friendly bowls, meatballs and casseroles.</p>
                </article>
                <article class="samples-collection-card">
                    <h4>💪 High-protein lunches</h4>
                    <p>Bowls and trays designed for energy and meal prep.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="samples-section" data-aos="fade-up">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <?php if ($resultsPage): ?>
                <div class="samples-gallery" id="samples-grid">
                    <?php foreach ($resultsPage as $item): ?>
                        <?php
                            $payload = [
                                'next' => 'generator',
                                'pref' => json_encode($item['generatorPayload'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                            ];
                            $generateUrl = $generateBase . '?' . http_build_query($payload);
                        ?>
                        <article class="samples-card" data-id="<?php echo htmlspecialchars($item['id']); ?>">
                            <div class="samples-card__cover">
                                <span class="samples-card__badge">🧑‍🍳 <?php echo htmlspecialchars($item['skill']); ?></span>
                                <img src="<?php echo $base_path . ltrim($item['image']['src'], '/'); ?>"
                                     alt="<?php echo htmlspecialchars($item['image']['alt']); ?>"
                                     loading="lazy"
                                     decoding="async"
                                     width="640"
                                     height="360">
                            </div>
                            <div class="samples-card__meta">
                                <h3><?php echo htmlspecialchars($item['title']); ?></h3>
                                <p><?php echo htmlspecialchars($item['description']); ?></p>
                            </div>
                            <div class="samples-card__tags">
                                <?php foreach ($item['tags'] as $tag): ?>
                                    <span class="samples-card__tag"><?php echo htmlspecialchars($tag); ?></span>
                                <?php endforeach; ?>
                                <?php foreach ($item['diet'] as $diet): ?>
                                    <span class="samples-card__tag"><?php echo htmlspecialchars($diet); ?></span>
                                <?php endforeach; ?>
                            </div>
                            <div class="samples-card__details">
                                <span>⏱️ <?php echo (int) $item['time']; ?> min</span>
                                <span>🍽️ <?php echo (int) $item['servings']; ?> servings</span>
                                <span>🧑‍🍳 <?php echo htmlspecialchars($item['skill']); ?></span>
                            </div>
                            <div class="samples-card__cta">
                                <button class="samples-btn samples-btn--secondary" data-action="details" data-id="<?php echo htmlspecialchars($item['id']); ?>">
                                    View details
                                </button>
                                <a class="samples-btn samples-btn--primary" data-action="generate" data-id="<?php echo htmlspecialchars($item['id']); ?>" href="<?php echo htmlspecialchars($generateUrl); ?>">
                                    Generate similar
                                </a>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div class="samples-empty">
                    <h3>No samples found for this combination.</h3>
                    <p>Try adjusting filters or clearing exclusions to see more recipe PDFs.</p>
                    <button type="button" class="samples-btn samples-btn--secondary" id="samples-reset-empty">Reset filters</button>
                </div>
            <?php endif; ?>

            <?php if ($totalPages > 1): ?>
                <nav class="samples-pagination" aria-label="Samples pagination">
                    <?php for ($page = 1; $page <= $totalPages; $page++): ?>
                        <?php
                            $query = $_GET;
                            $query['page'] = $page;
                            $url = $page_path . '?' . http_build_query($query);
                        ?>
                        <a class="samples-pagination__link<?php echo $page === $currentPage ? ' is-active' : ''; ?>"
                           href="<?php echo htmlspecialchars($url); ?>">
                            <?php echo $page; ?>
                        </a>
                    <?php endfor; ?>
                </nav>
            <?php endif; ?>
        </div>
    </section>

    <section class="samples-section" data-aos="fade-up">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="samples-faq__accordion">
                <h2 class="samples-faq__title">Frequently asked questions</h2>
                <div class="samples-acc-item" data-accordion="item" aria-expanded="false">
                    <button class="samples-acc-button" type="button" data-accordion="button">
                        Can I download these PDFs?
                        <span>+</span>
                    </button>
                    <div class="samples-acc-panel">
                        Samples show the exact structure and style. To export a PDF you’ll generate your own version using tokens.
                    </div>
                </div>
                <div class="samples-acc-item" data-accordion="item" aria-expanded="false">
                    <button class="samples-acc-button" type="button" data-accordion="button">
                        Are the cooking times precise?
                        <span>+</span>
                    </button>
                    <div class="samples-acc-panel">
                        Times are estimates based on standard home equipment. Adjust slightly to match your stove, oven or prep speed.
                    </div>
                </div>
                <div class="samples-acc-item" data-accordion="item" aria-expanded="false">
                    <button class="samples-acc-button" type="button" data-accordion="button">
                        Do I need a subscription?
                        <span>+</span>
                    </button>
                    <div class="samples-acc-panel">
                        No monthly plan required. You top up tokens and use them only when you generate new recipes.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="samples-section" data-aos="fade-up">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="samples-cta">
                <div>
                    <h3>Ready to cook smarter?</h3>
                    <p>Tell us what you’ve got — get a clean, printable recipe PDF in minutes.</p>
                </div>
                <a class="samples-btn samples-btn--primary" href="<?php echo $base_path; ?>register.php?next=generator">
                    Generate a recipe
                </a>
            </div>
        </div>
    </section>

    <div id="samples-modal" class="samples-modal" aria-hidden="true">
        <div class="samples-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="samples-modal-title">
            <header class="samples-modal__header">
                <div>
                    <h3 class="samples-modal__title" id="samples-modal-title" data-modal="title">Sample title</h3>
                    <p class="samples-modal__subtitle" data-modal="subtitle">Sample description</p>
                </div>
                <button type="button" class="samples-modal__close" data-modal="close" aria-label="Close modal">&times;</button>
            </header>
            <div class="samples-modal__body">
                <div class="samples-structure">
                    <h4>What’s inside the PDF 📄</h4>
                    <ul class="samples-list">
                        <li><strong>Title</strong> — recipe name</li>
                        <li><strong>Description</strong> — short intro and positioning</li>
                        <li><strong>Cover image</strong> — realistic dish photo</li>
                        <li><strong>Details</strong> — Skill • Servings • Cooking Time</li>
                        <li><strong>Ingredients</strong> — exact measures</li>
                        <li><strong>Instructions</strong> — step-by-step, scannable</li>
                    </ul>
                </div>
                <div class="samples-snippet">
                    <h4>Snippet preview</h4>
                    <div class="samples-snippet__section">
                        <strong>Ingredients (excerpt)</strong>
                        <ul class="samples-list" data-modal="ingredients"></ul>
                    </div>
                    <div class="samples-snippet__section">
                        <strong>Steps (excerpt)</strong>
                        <ol class="samples-list" data-modal="steps"></ol>
                    </div>
                    <div class="samples-snippet__section samples-summary" data-modal="summary"></div>
                </div>
            </div>
            <footer class="samples-modal__footer">
                <button type="button" class="samples-btn samples-btn--secondary" data-modal="adjust">Adjust filters</button>
                <a href="#" class="samples-btn samples-btn--primary" data-modal="generate">Generate similar</a>
            </footer>
        </div>
    </div>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>

<script>
    window.__SAMPLES__ = <?php echo json_encode($exposedSamples, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
</script>
<script src="<?php echo $base_path; ?>assets/js/samples.js?v=<?php echo time(); ?>" defer></script>

