// sustainability.js - estimator and FAQ interactions

document.addEventListener('DOMContentLoaded', () => {
    const portionsInput = document.getElementById('susPortions');
    const gramsInput = document.getElementById('susGrams');
    const priceInput = document.getElementById('susPrice');
    const calcButton = document.getElementById('susCalcBtn');

    const outKg = document.getElementById('susOutKg');
    const outMoney = document.getElementById('susOutMoney');
    const outCo2 = document.getElementById('susOutCo2');
    const liveRegion = document.getElementById('susCalcLive');

    const formatNumber = (value, decimals = 1) => {
        return Number.isFinite(value) ? value.toFixed(decimals) : '0';
    };

    const calculate = () => {
        const portions = Math.max(parseFloat(portionsInput.value) || 0, 0);
        const grams = Math.max(parseFloat(gramsInput.value) || 0, 0);
        const price = Math.max(parseFloat(priceInput.value) || 0, 0);

        const weeklyKg = (portions * grams) / 1000;
        const yearlyKg = weeklyKg * 52;
        const yearlyMoney = yearlyKg * price;
        const lowCo2 = yearlyKg * 1;
        const highCo2 = yearlyKg * 4;

        outKg.textContent = yearlyKg ? `${formatNumber(yearlyKg, 1)} kg / year` : '—';
        outMoney.textContent = yearlyMoney ? `€${formatNumber(yearlyMoney, 0)}` : '—';
        outCo2.textContent = yearlyKg ? `${formatNumber(lowCo2, 0)}–${formatNumber(highCo2, 0)} kg CO₂e / year` : '—';

        if (yearlyKg) {
            liveRegion.textContent = `Estimated waste ${formatNumber(yearlyKg, 1)} kilograms per year. Savings €${formatNumber(yearlyMoney, 0)}. CO₂e range ${formatNumber(lowCo2, 0)} to ${formatNumber(highCo2, 0)} kilograms.`;
        } else {
            liveRegion.textContent = 'No values entered yet.';
        }
    };

    calcButton?.addEventListener('click', (event) => {
        event.preventDefault();
        calculate();
    });

    [portionsInput, gramsInput, priceInput].forEach((input) => {
        input?.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                calculate();
            }
        });
    });

    calculate();

    document.querySelectorAll('.sus-acc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.sus-acc-item');
            const expanded = item?.getAttribute('aria-expanded') === 'true';
            if (item) {
                item.setAttribute('aria-expanded', String(!expanded));
            }
        });
    });
});

