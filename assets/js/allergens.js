// allergens.js - interactions for allergens page

document.addEventListener('DOMContentLoaded', () => {
    const dataArray = Array.isArray(window.__ALLERGENS__) ? window.__ALLERGENS__ : [];
    const dataMap = dataArray.reduce((acc, item) => {
        acc[item.key] = item;
        return acc;
    }, {});

    const grid = document.getElementById('algGrid');
    const summaryList = document.getElementById('summaryList');
    const summaryEmpty = document.getElementById('summaryEmpty');
    const infoPanel = document.getElementById('infoPanel');
    const clearBtn = document.getElementById('clearBtn');
    const toGenBtn = document.getElementById('toGenBtn');

    const toggleBtn = document.getElementById('algToggleFilters');
    const filtersSection = document.getElementById('samples-filters'); // not present here but kept for safety

    if (!grid) {
        return;
    }

    const emit = (name, detail = {}) => {
        try {
            document.dispatchEvent(new CustomEvent(name, { detail }));
        } catch (err) {
            console.debug('[allergens:event]', name, detail);
        }
    };

    const renderSummary = (lastKey = null, isOn = false) => {
        const keys = Array.from(grid.querySelectorAll('input[type="checkbox"][data-key]:checked'))
            .map((input) => input.dataset.key);

        if (!keys.length) {
            summaryEmpty.hidden = false;
            summaryList.hidden = true;
            summaryList.innerHTML = '';
            infoPanel.hidden = true;
            infoPanel.innerHTML = '';
            return;
        }

        summaryEmpty.hidden = true;
        summaryList.hidden = false;
        summaryList.innerHTML = keys.map((key) => {
            const item = dataMap[key];
            const label = item ? item.label : key;
            return `<span class="alg-badge" data-key="${key}" tabindex="0">${label}</span>`;
        }).join('');

        const key = (lastKey && isOn) ? lastKey : keys[keys.length - 1];
        renderInfo(key);
    };

    const renderInfo = (key) => {
        const item = dataMap[key];
        if (!item) {
            infoPanel.hidden = true;
            infoPanel.innerHTML = '';
            return;
        }

        infoPanel.hidden = false;
        infoPanel.innerHTML = `
            <div class="alg-summary__note">
                <div style="display:flex; gap:12px; align-items:flex-start;">
                    <div class="alg-item__img" style="width:64px;height:48px;">
                        <img src="${item.img}" alt="" width="128" height="96" loading="lazy">
                    </div>
                    <div>
                        <div style="font-weight:700; margin-bottom:6px;">${item.label}</div>
                        <div style="color:#6d7680; margin-bottom:8px;">${item.desc}</div>
                        <ul style="margin:0; padding-left:18px; color:#495057;">
                            ${item.tips.map((tip) => `<li>${tip}</li>`).join('')}
                        </ul>
                        <div style="margin-top:12px; font-size:12px; color:#b94c4c;">
                            This information is educational only. Consult your doctor for personalised medical advice.
                        </div>
                    </div>
                </div>
            </div>`;

        emit('allergens_info_view', { key });
    };

    const onGridChange = (event) => {
        const input = event.target.closest('input[type="checkbox"][data-key]');
        if (!input) return;
        renderSummary(input.dataset.key, input.checked);
        emit('allergens_toggle', { key: input.dataset.key, on: input.checked });
    };

    grid.addEventListener('change', onGridChange);

    grid.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const input = event.target.closest('input[type="checkbox"][data-key]');
            if (input) {
                event.preventDefault();
                input.checked = !input.checked;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    });

    summaryList.addEventListener('click', (event) => {
        const badge = event.target.closest('.alg-badge[data-key]');
        if (!badge) return;
        renderInfo(badge.dataset.key);
    });

    summaryList.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const badge = event.target.closest('.alg-badge[data-key]');
            if (!badge) return;
            event.preventDefault();
            renderInfo(badge.dataset.key);
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            grid.querySelectorAll('input[type="checkbox"][data-key]').forEach((input) => {
                input.checked = false;
            });
            renderSummary();
            emit('allergens_clear');
        });
    }

    if (toGenBtn) {
        toGenBtn.addEventListener('click', () => {
            emit('allergens_back_to_generator_click');
        });
    }

    document.querySelectorAll('.alg-acc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.alg-acc-item');
            const expanded = item?.getAttribute('aria-expanded') === 'true';
            if (item) {
                item.setAttribute('aria-expanded', String(!expanded));
            }
        });
    });

    renderSummary();
});

