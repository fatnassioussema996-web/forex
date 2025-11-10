document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL (например, ?service=Copywriting&price=100)
    const params = new URLSearchParams(window.location.search);
    const serviceName = params.get('service');
    const servicePrice = params.get('price');

    // Находим элементы на странице и вставляем в них данные
    const serviceNameDisplay = document.getElementById('service-name-display');
    const servicePriceDisplay = document.getElementById('service-price-display');

    if (serviceName && servicePrice) {
        serviceNameDisplay.textContent = serviceName;
        // Отображаем цену в нужном формате
        if (serviceName.toLowerCase().includes('smm')) {
            servicePriceDisplay.textContent = `from €${servicePrice} / month`;
        } else {
            servicePriceDisplay.textContent = `from €${servicePrice}`;
        }
    } else {
        serviceNameDisplay.textContent = "No service selected";
        servicePriceDisplay.textContent = "N/A";
    }

    // Обработка отправки формы
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');
    const orderSummary = document.querySelector('.order-summary');


    orderForm.addEventListener('submit', function(e) {
        // Предотвращаем стандартную отправку формы (которая перезагружает страницу)
        e.preventDefault();

        // Прячем форму и заголовок "Your Selected Service"
        orderForm.style.display = 'none';
        orderSummary.style.display = 'none';

        // Показываем сообщение об успехе
        successMessage.style.display = 'block';

        // --- ВАЖНО ---
        // Этот код только имитирует отправку.
        // Для реальной отправки данных на email или в базу данных
        // потребуется бэкенд-код (например, на PHP или Node.js).
    });
});