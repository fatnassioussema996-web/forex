document.addEventListener('DOMContentLoaded', () => {
    /* ===== MINI ESTIMATOR ===== */
    const portionsInput = document.getElementById('home-estimator-portions');
    const gramsInput = document.getElementById('home-estimator-grams');
    const priceInput = document.getElementById('home-estimator-price');
    const outKg = document.getElementById('home-estimator-out-kg');
    const outMoney = document.getElementById('home-estimator-out-money');
    const outCo2 = document.getElementById('home-estimator-out-co2');
    const liveRegion = document.getElementById('home-estimator-live');

    const formatNumber = (value, decimals = 1) => (
        Number.isFinite(value) ? value.toFixed(decimals) : '0'
    );

    const readValue = (input) => {
        if (!input) {
            return 0;
        }
        const raw = String(input.value || '').trim().replace(',', '.');
        const value = parseFloat(raw);
        return Number.isFinite(value) ? value : 0;
    };

    const updateEstimator = () => {
        const portions = Math.max(readValue(portionsInput), 0);
        const grams = Math.max(readValue(gramsInput), 0);
        const price = Math.max(readValue(priceInput), 0);

        const weeklyKg = (portions * grams) / 1000;
        const yearlyKg = weeklyKg * 52;
        const yearlyMoney = yearlyKg * price;
        const lowCo2 = yearlyKg;
        const highCo2 = yearlyKg * 4;

        outKg.textContent = yearlyKg ? `${formatNumber(yearlyKg, 1)} kg / year` : '—';
        outMoney.textContent = yearlyMoney ? `€${formatNumber(yearlyMoney, 0)}` : '—';
        outCo2.textContent = yearlyKg ? `${formatNumber(lowCo2, 0)}–${formatNumber(highCo2, 0)} kg CO₂e / year` : '—';

        if (liveRegion) {
            liveRegion.textContent = yearlyKg
                ? `Estimated yearly waste ${formatNumber(yearlyKg, 1)} kilograms, savings €${formatNumber(yearlyMoney, 0)}, CO₂ range ${formatNumber(lowCo2, 0)} to ${formatNumber(highCo2, 0)} kilograms.`
                : 'No values entered yet.';
        }
    };

    [portionsInput, gramsInput, priceInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', updateEstimator);
        input.addEventListener('change', updateEstimator);
    });

    updateEstimator();

    /* ===== FAQ ACCORDION ===== */
    document.querySelectorAll('.home-faq__btn').forEach((button) => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            const panelId = button.getAttribute('aria-controls');
            const panel = panelId ? document.getElementById(panelId) : null;
            button.setAttribute('aria-expanded', String(!expanded));
            if (panel) {
                panel.hidden = expanded;
            }
        });
    });
});

