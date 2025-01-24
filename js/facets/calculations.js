import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();

  // Обработчик для первого варианта ввода (строка)
  document.getElementById('calculate-btn').addEventListener('click', async () => {
    const facetInput = document.getElementById('facet').value.trim();
    try {
      const result = await postData('/api/facets/calculate-string', { input: facetInput });
      document.getElementById('hypotenuse').value = result.formattedValue;
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  });

  // Обработчик для второго варианта ввода (раздельные поля)
  document.getElementById('calculate-btn1').addEventListener('click', async () => {
    const facetData = {
      leg: document.getElementById('facet-leg').value,
      angle: document.getElementById('facet-angle').value
    };
    
    try {
      const result = await postData('/api/facets/calculate-params', facetData);
      document.getElementById('hypotenuse1').value = result.formattedValue;
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  });
});