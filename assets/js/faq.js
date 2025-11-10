document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('faqSearch');
    const categorySelect = document.getElementById('faqCategory');
    const cards = Array.from(document.querySelectorAll('.faq-card'));
    const resultsCount = document.getElementById('faqResultsCount');
    const emptyState = document.getElementById('faqEmpty');

    const emit = (eventName, payload = {}) => {
        if (typeof window.console !== 'undefined') {
            console.log('[FAQ EVENT]', eventName, payload);
        }
    };

    const closeItem = (item) => {
        const btn = item.querySelector('.faq-acc-btn');
        const panelId = btn ? btn.getAttribute('aria-controls') : null;
        const panel = panelId ? document.getElementById(panelId) : null;
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
        }
        if (panel) {
            panel.hidden = true;
        }
    };

    const updateResultsLabel = (totalVisible) => {
        if (!resultsCount) {
            return;
        }
        resultsCount.textContent = totalVisible
            ? `Showing ${totalVisible} question${totalVisible === 1 ? '' : 's'}`
            : 'No questions match your filters.';
    };

    const filter = () => {
        const term = (searchInput?.value || '').toLowerCase().trim();
        const selectedCat = categorySelect ? categorySelect.value : 'all';
        let totalVisible = 0;

        cards.forEach((card) => {
            const cardCategory = card.getAttribute('data-cat');
            const inCategory = selectedCat === 'all' || cardCategory === selectedCat;
            const items = Array.from(card.querySelectorAll('.faq-acc-item'));
            let visibleInCard = 0;

            items.forEach((item) => {
                const text = item.textContent.toLowerCase();
                const matches = inCategory && (!term || text.includes(term));

                if (matches) {
                    item.hidden = false;
                    item.classList.remove('faq-acc-item--hidden');
                    visibleInCard += 1;
                    totalVisible += 1;
                } else {
                    item.hidden = true;
                    item.classList.add('faq-acc-item--hidden');
                    closeItem(item);
                }
            });

            const cardVisible = visibleInCard > 0;
            card.hidden = !cardVisible;
            card.classList.toggle('faq-card--hidden', !cardVisible);
        });

        updateResultsLabel(totalVisible);

        if (emptyState) {
            emptyState.hidden = totalVisible !== 0;
        }

        emit('faq_filter_applied', {
            term,
            category: selectedCat,
            visible: totalVisible,
        });
    };

    const toggleAccordion = (btn) => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const panelId = btn.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;

        btn.setAttribute('aria-expanded', (!isExpanded).toString());
        if (panel) {
            panel.hidden = isExpanded;
        }

        emit('faq_accordion_toggle', {
            question: btn.textContent.trim(),
            open: !isExpanded,
        });
    };

    document.querySelectorAll('.faq-acc-btn').forEach((btn) => {
        btn.addEventListener('click', () => toggleAccordion(btn));
        btn.addEventListener('keydown', (event) => {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                toggleAccordion(btn);
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filter();
            emit('faq_search_input', { term: searchInput.value });
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            filter();
            emit('faq_category_change', { category: categorySelect.value });
        });
    }

    filter();
});

