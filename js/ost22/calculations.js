// calculation.js (страница расчёта допусков)

/*
import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';


//Обработчик для раздела 1
document.getElementById('calculate-btn').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы
    const type = document.getElementById('partType').value;
    const size = document.getElementById('input1').value;

    // 2. Валидация (пример)
    if (!type || !size) {
      throw new Error('Заполните все поля');
    }
    
    // 3. Формируем строку для сервера (логика этой страницы)
    const page = `ost`;
    const inputString = `${type}:${size}`;
    const inputData = {inputData: page, inputString};

    // 4. Отправляем готовую строку
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('dev_values').value = response.val1;
    document.getElementById('min_mes_value').value = response.min;
    document.getElementById('max_mes_value').value = response.max;

  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
//Обработчик для раздела 2
document.getElementById('calculate-btn1').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы
    const type = document.getElementById('input2').value;

    // 2. Валидация (пример)
    if (!type) {
      throw new Error('Заполните все поля');
    }
    
    // 3. Формируем строку для сервера (логика этой страницы)
    const page = `ost`;
    const inputString = `${type}`;
    const inputData = {inputData: page, inputString};

    // 4. Отправляем готовую строку
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('dev_values1').value = response.val1;
    document.getElementById('min_mes_value1').value = response.min;
    document.getElementById('max_mes_value1').value = response.max;

  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
*/
import { postData } from '../common/api.js';

// Обработчик для раздела 1
document.getElementById('calculate-btn').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы
    const type = document.getElementById('detail_type').value.trim(); // Значение из выпадающего списка
    const size = document.getElementById('nominal_dimension').value.trim();

    // 2. Валидация
    if (!type) {
      throw new Error('Выберите тип детали');
    }
    if (!size || isNaN(size)) {
      throw new Error('Размер должен быть числом. Используйте точку для дробных чисел: 0.01');
    }

    // 3. Формируем строку для сервера
<<<<<<< HEAD
    const page = 'ost22';
=======
    const pageId = 'ost';
>>>>>>> origin/master
    const inputString = `${type}:${size}`;
    const inputData = { pageId, inputString };

    // 4. Отправляем запрос
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('deviance_values').value = response.deviation_values || '';
    document.getElementById('min_mes_value').value = response.min_mes_value  || '';
    document.getElementById('max_mes_value').value = response.max_mes_value  || '';
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
