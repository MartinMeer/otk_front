
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

    // 3. Формируем объект ДЛЯ БЭКЕНДА (поля должны совпадать с StringRequest)
    const requestData = {
      inputData: "ost22",  // Соответствует полю inputData в StringRequest
      inputString: `${type}:${size}` // Соответствует полю inputString
    };

    // 4. Отправляем запрос
    const response = await postData('/api/process', requestData);

    // 5. Обновляем интерфейс

    document.getElementById('upper_deviance').value = response.upper_deviance || '';
    document.getElementById('lower_deviance').value = response.lower_deviance || '';

    document.getElementById('min_mes_value').value = response.min_mes_value  || '';
    document.getElementById('max_mes_value').value = response.max_mes_value  || '';
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
