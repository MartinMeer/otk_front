import { postData } from '../common/api.js';

document.getElementById('calculate-btn').addEventListener('click', async () => {
  try {
    // 1. Получаем данные из формы

    const size = document.getElementById('mthread_input').value.trim();

    // 2. Валидация
    /*if (!type) {
      throw new Error('Выберите тип детали');
    }*/
    /*if (!size || isNaN(size)) {
      throw new Error('Размер должен быть числом. Используйте точку для дробных чисел: 0.01');
    }*/

    // 3. Формируем строку для сервера
    const pageId = 'thread_m';
    const inputString = `${type}:${size}`;
    const inputData = { pageId, inputString };

    // 4. Отправляем запрос
    const response = await postData('/api/process', inputData);

    // 5. Обновляем интерфейс
    document.getElementById('pitch_diameter').value = response.pitch_diameter || '';
    document.getElementById('es_d2').value = response.es_d2 || '';
    document.getElementById('ei_d2').value = response.ei_d2 || '';
    document.getElementById('max_mes_value_d2').value = response.max_mes_value_d2 || '';
    document.getElementById('min_mes_value_d2').value = response.min_mes_value_d2 || '';


    document.getElementById('nom_diameter').value = response.nom_diameter || '';
    document.getElementById('es_d').value = response.es_d || '';
    document.getElementById('ei_d').value = response.ei_d || '';
    document.getElementById('max_mes_value_d').value = response.max_mes_value_d || '';
    document.getElementById('min_mes_value_d').value = response.min_mes_value_d || '';

  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
