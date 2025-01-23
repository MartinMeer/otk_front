import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  
  // Обработчики для фасок
  document.getElementById('calculate-btn').addEventListener('click', async () => {
    const facet = document.getElementById('facet').value.trim();
    try {
      const result = await postData('/api/facets/calculate', { facet });
      document.getElementById('hypotenuse').textContent = result.hypotenuse;
    } catch (error) {
      alert(error.message);
    }
  });
});