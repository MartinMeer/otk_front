import { postData } from '../common/api.js';

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();

  // Обработчик для первого варианта ввода (строка)
  document.getElementById('calculate-btn').addEventListener('click', async () => {
     try {
    const size = document.getElementById('facet').value.trim();
    // 2. Валидация
   //?Добавить проверку на формат дробных чисел через точку, НЕ с запятой
   if (!size) {
      throw new Error('Введите значение');
    }

    // 3. Формируем строку для сервера

    const page = 'facets';
    const inputString = `${size}`;
    const inputData = { pageId, inputString };

    // 4. Отправляем запрос
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('hypotenuse').value = response.deviation_values || '';

    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  });

  // Обработчик для второго варианта ввода (раздельные поля)
  document.getElementById('calculate-btn1').addEventListener('click', async () => {

    try {
    const facetData = {
      leg_a: document.getElementById('facet-leg-a').value,
      leg_b: document.getElementById('facet-leg-b').value,
      angle: document.getElementById('facet-angle').value
    };
    // 2. Валидация
   /*if (!size) {
      throw new Error('Введите значение');
    }*/

    // 3. Формируем строку для сервера

    const page = 'facets';
    const inputString = `${facetData}`;
    const inputData = { pageId, inputString };

    // 4. Отправляем запрос
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('hypotenuse1').value = response.deviation_values || '';

    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }

  });
});
