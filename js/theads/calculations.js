import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  
  // Обработчики для резьбы
  document.getElementById('calculate-thread').addEventListener('click', async () => {
    const thread = document.getElementById('thread').value.trim();
    try {
      const result = await postData('/api/threads/calculate', { thread });
      document.getElementById('pitch').textContent = result.pitch;
    } catch (error) {
      alert(error.message);
    }
  });
});