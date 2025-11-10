// nutrition.js - nutrition guide interactions

document.addEventListener('DOMContentLoaded', () => {
    const proteinInput = document.getElementById('nutProtein');
    const carbsInput = document.getElementById('nutCarbs');
    const fatInput = document.getElementById('nutFat');
    const fiberInput = document.getElementById('nutFiber');

    const resultKcal = document.getElementById('nutResTotal');
    const resultPk = document.getElementById('nutResProtein');
    const resultCk = document.getElementById('nutResCarbs');
    const resultFk = document.getElementById('nutResFat');
    const resultSplit = document.getElementById('nutResSplit');
    const resultLive = document.getElementById('nutResLive');

    const barProtein = document.getElementById('nutBarProtein');
    const barCarb = document.getElementById('nutBarCarb');
    const barFat = document.getElementById('nutBarFat');

    const form = document.getElementById('nutCalcForm');
    const calcButton = document.getElementById('nutCalcBtn');

    const calc = () => {
        const p = Math.max(parseFloat(proteinInput.value) || 0, 0);
        const c = Math.max(parseFloat(carbsInput.value) || 0, 0);
        const f = Math.max(parseFloat(fatInput.value) || 0, 0);
        const fiber = Math.max(parseFloat(fiberInput.value) || 0, 0); // reserved for future adjustments

        const proteinKcal = p * 4;
        const carbKcal = c * 4;
        const fatKcal = f * 9;
        const totalKcal = proteinKcal + carbKcal + fatKcal;

        resultPk.textContent = Math.round(proteinKcal);
        resultCk.textContent = Math.round(carbKcal);
        resultFk.textContent = Math.round(fatKcal);
        resultKcal.textContent = totalKcal ? `${Math.round(totalKcal)} kcal` : '—';

        const percentProtein = totalKcal ? Math.round((proteinKcal / totalKcal) * 100) : 0;
        const percentCarb = totalKcal ? Math.round((carbKcal / totalKcal) * 100) : 0;
        const percentFat = totalKcal ? Math.round((fatKcal / totalKcal) * 100) : 0;

        barProtein.style.width = `${percentProtein}%`;
        barCarb.style.width = `${percentCarb}%`;
        barFat.style.width = `${percentFat}%`;

        barProtein.setAttribute('aria-valuenow', percentProtein);
        barCarb.setAttribute('aria-valuenow', percentCarb);
        barFat.setAttribute('aria-valuenow', percentFat);

        if (totalKcal) {
            resultSplit.textContent = `By calories: Protein ${percentProtein}% • Carbs ${percentCarb}% • Fat ${percentFat}%`;
            resultLive.textContent = `Total ${Math.round(totalKcal)} kcal. Protein ${percentProtein} percent, carbs ${percentCarb} percent, fat ${percentFat} percent.`;
        } else {
            resultSplit.textContent = '—';
            resultLive.textContent = 'No values entered yet.';
        }
    };

    if (calcButton) {
        calcButton.addEventListener('click', (event) => {
            event.preventDefault();
            calc();
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            calc();
        });
    }

    [proteinInput, carbsInput, fatInput, fiberInput].forEach((input) => {
        input?.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                calc();
            }
        });
    });

    document.querySelectorAll('.nut-acc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.nut-acc-item');
            const expanded = item?.getAttribute('aria-expanded') === 'true';
            if (item) {
                item.setAttribute('aria-expanded', String(!expanded));
            }
        });
    });

    calc();
});

