
import { postData } from '../common/api.js';

// Обработчик для раздела 1
document.getElementById('calculate-btn').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы
    //const type = document.getElementById('detail_type').value.trim(); // Значение из выпадающего списка
    const size = document.getElementById('nominal_dimension').value.trim();

    // 2. Валидация
   //?Добавить проверку на формат дробных чисел через точку, НЕ с запятой
   if (!size) {
      throw new Error('Введите значение');
    }

    // 3. Формируем строку для сервера

    const page = 'classed-size';
    const inputString = `${size}`;
    const inputData = { pageId, inputString };

    // 4. Отправляем запрос
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('upper_deviance').value = response.deviation_values || '';
    document.getElementById('lower_deviance').value = response.deviation_values || '';
    document.getElementById('min_mes_value').value = response.min_mes_value  || '';
    document.getElementById('max_mes_value').value = response.max_mes_value  || '';
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
