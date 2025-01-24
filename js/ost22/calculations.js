import { postData } from '../common/api.js';
import { loadMenu } from '../common/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();

  document.getElementById('calculate-btn').addEventListener('click', async () => {
            try {
                const response = await postData('/api/ost22/parts', {
                    type: document.getElementById('partType').value,
                    size: document.getElementById('inputPart1').value
                });
                
                document.getElementById('minOutput1').value = response.min;
                document.getElementById('maxOutput1').value = response.max;
                
            } catch (error) {
                alert(`Ошибка: ${error.message}`);
            }
        });

        // Обработчик для второго раздела
  document.getElementById('calculate-btn1').addEventListener('click', async () => {
            try {
                const response = await postData('/api/ost22/general', {
                    size: document.getElementById('inputPart2').value
                });
                
                document.getElementById('minOutput2').value = response.min;
                document.getElementById('maxOutput2').value = response.max;
                
            } catch (error) {
                alert(`Ошибка: ${error.message}`);
            }
  });
});