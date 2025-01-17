document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const threadDesignationInput = document.getElementById('thread-designation');

    calculateBtn.addEventListener('click', function() {
        const designation = threadDesignationInput.value.trim().toUpperCase();

        if (!designation) {
            alert('Введите условное обозначение резьбы!');
            return;
        }

        // Здесь должна быть логика для получения данных с сервера
        // Например, вызов AJAX запроса или использование fetch API
        // После получения данных, обновляйте содержимое полей

        // Пример заполнения полей для демонстрации
        document.getElementById('mean-diameter').textContent = '20 мм';
        document.getElementById('es-mean').textContent = '+0.05 мм';
        document.getElementById('ei-mean').textContent = '-0.03 мм';
        document.getElementById('max-mean-diameter').textContent = '20.08 мм';
        document.getElementById('min-mean-diameter').textContent = '19.97 мм';
        document.getElementById('mean-image').src = '/path/to/image.jpg'; // Укажите путь к изображению

        document.getElementById('nominal-diameter').textContent = '22 мм';
        document.getElementById('es-nominal').textContent = '+0.06 мм';
        document.getElementById('ei-nominal').textContent = '-0.04 мм';
        document.getElementById('max-nominal-diameter').textContent = '22.09 мм';
        document.getElementById('min-nominal-diameter').textContent = '21.96 мм';
        document.getElementById('nominal-image').src = '/path/to/image.jpg'; // Укажите путь к изображению
    });
});
