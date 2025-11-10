// samples.js - Samples gallery interactions

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('samples-filters-form');
    const grid = document.getElementById('samples-grid');
    const resetBtn = document.getElementById('samples-reset');
    const baseUrl = form ? form.dataset.baseUrl : window.location.pathname;
    const modal = document.getElementById('samples-modal');
    const filtersSection = document.getElementById('samples-filters');
    const toggleBtn = document.getElementById('samples-filters-toggle');

    const emit = (name, detail = {}) => {
        try {
            document.dispatchEvent(new CustomEvent(name, { detail }));
        } catch (err) {
            console.debug('[samples:event]', name, detail);
        }
    };

    if (form) {
        const pageInput = document.getElementById('samples-page-input');
        form.addEventListener('submit', () => {
            if (pageInput) {
                pageInput.value = '1';
            }
            if (grid) {
                grid.classList.add('is-loading');
            }
            const payload = new FormData(form);
            const data = {};
            payload.forEach((value, key) => {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            });
            emit('samples_filters_apply', data);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            emit('samples_filters_reset');
            if (grid) grid.classList.add('is-loading');
            window.location.href = baseUrl;
        });
    }

    const resetEmpty = document.getElementById('samples-reset-empty');
    if (resetEmpty) {
        resetEmpty.addEventListener('click', () => {
            emit('samples_filters_reset');
            window.location.href = baseUrl;
        });
    }

    // Toggle filters (collapse/expand)
    if (filtersSection && toggleBtn && form) {
        const toggleFilters = () => {
            const expanded = form.classList.contains('samples-filters__form--expanded');
            if (expanded) {
                form.classList.remove('samples-filters__form--expanded');
                filtersSection.classList.add('is-collapsed');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                form.classList.add('samples-filters__form--expanded');
                filtersSection.classList.remove('is-collapsed');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        };

        toggleBtn.setAttribute('aria-expanded', filtersSection.classList.contains('is-collapsed') ? 'false' : 'true');
        toggleBtn.addEventListener('click', toggleFilters);
    }

    // FAQ accordion
    document.querySelectorAll('[data-accordion="button"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('[data-accordion="item"]');
            const expanded = item.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('[data-accordion="item"]').forEach((other) => {
                if (other !== item) {
                    other.setAttribute('aria-expanded', 'false');
                }
            });
            item.setAttribute('aria-expanded', String(!expanded));
        });
    });

    // Modal handling
    if (modal) {
        const closeBtn = modal.querySelector('[data-modal="close"]');
        const backdrop = modal;
        const titleEl = modal.querySelector('[data-modal="title"]');
        const subtitleEl = modal.querySelector('[data-modal="subtitle"]');
        const detailsEl = modal.querySelector('[data-modal="summary"]');
        const ingredientsEl = modal.querySelector('[data-modal="ingredients"]');
        const stepsEl = modal.querySelector('[data-modal="steps"]');
        const generateLink = modal.querySelector('[data-modal="generate"]');
        const adjustBtn = modal.querySelector('[data-modal="adjust"]');

        const samples = Array.isArray(window.__SAMPLES__) ? window.__SAMPLES__ : [];
        const sampleMap = samples.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});

        let previousFocus = null;
        let keydownHandler = null;

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea',
            'input',
            'select',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        const openModal = (item) => {
            if (!item) return;
            previousFocus = document.activeElement;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');

            if (titleEl) titleEl.textContent = item.title;
            if (subtitleEl) subtitleEl.textContent = item.description;

            if (detailsEl) {
                detailsEl.innerHTML = `
                    <span>⏱️ ${item.time} min</span>
                    <span>🍽️ ${item.servings} servings</span>
                    <span>🧑‍🍳 ${item.skill}</span>
                `;
            }

            if (ingredientsEl) {
                ingredientsEl.innerHTML = '';
                const fragment = document.createDocumentFragment();
                item.ingredients.slice(0, 6).forEach((ing) => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    fragment.appendChild(li);
                });
                ingredientsEl.appendChild(fragment);
            }

            if (stepsEl) {
                stepsEl.innerHTML = '';
                const fragment = document.createDocumentFragment();
                item.instructions.slice(0, 4).forEach((step) => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    fragment.appendChild(li);
                });
                stepsEl.appendChild(fragment);
            }

            if (generateLink && typeof item.generateUrl === 'string') {
                generateLink.setAttribute('href', item.generateUrl);
            }

            emit('samples_card_modal_open', { id: item.id });

            const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
            if (focusables.length) focusables[0].focus();

            keydownHandler = (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeModal();
                } else if (event.key === 'Tab') {
                    const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
                    if (!focusables.length) return;
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            };

            modal.addEventListener('keydown', keydownHandler);
        };

        const closeModal = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            if (previousFocus && typeof previousFocus.focus === 'function') {
                previousFocus.focus();
            }
            if (keydownHandler) {
                modal.removeEventListener('keydown', keydownHandler);
                keydownHandler = null;
            }
        };

        document.querySelectorAll('[data-action="details"]').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const id = btn.dataset.id;
                const item = sampleMap[id];
                if (item) {
                    openModal(item);
                }
            });
        });

        document.querySelectorAll('[data-action="generate"]').forEach((link) => {
            link.addEventListener('click', () => {
                emit('samples_card_generate_click', { id: link.dataset.id });
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (event) => {
                event.preventDefault();
                closeModal();
            });
        }

        if (adjustBtn) {
            adjustBtn.addEventListener('click', (event) => {
                event.preventDefault();
                closeModal();
                const filters = document.getElementById('samples-filters');
                if (filters) {
                    filters.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        if (backdrop) {
            backdrop.addEventListener('click', (event) => {
                if (event.target === backdrop) {
                    closeModal();
                }
            });
        }
    }
});

