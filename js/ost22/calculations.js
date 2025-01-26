import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';

// calculation.js (страница расчёта допусков)
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
    const bodyString = `${type}:${size}`;

    // 4. Отправляем готовую строку
    const response = await postData('/ost22', bodyString);

    // 5. Обновляем интерфейс
    document.getElementById('devValues').value = response.val1;
    document.getElementById('minMesValue').value = response.min;
    document.getElementById('maxMesValue').value = response.max;

  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
//Обработчик для раздела 2
document.getElementById('calculate-btn').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы
    const type = document.getElementById('input2').value;

    // 2. Валидация (пример)
    if (!type || !size) {
      throw new Error('Заполните все поля');
    }
    
    // 3. Формируем строку для сервера (логика этой страницы)
    const bodyString = `$undef:{type}`;

    // 4. Отправляем готовую строку
    const response = await postData('/parts', bodyString);

    // 5. Обновляем интерфейс
    document.getElementById('devValues1').value = response.val1;
    document.getElementById('minMesValue1').value = response.min;
    document.getElementById('maxMesValue1').value = response.max;

  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});