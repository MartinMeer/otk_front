document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('thread-form');
  const resultsDiv = document.getElementById('results');
  const pitchTable = document.getElementById('pitch-table').querySelectorAll('tbody tr');
  const diameterTable = document.getElementById('diameter-table').querySelectorAll('tbody tr');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значение из формы
    const designation = document.getElementById('thread-designation').value.trim().toUpperCase();

    if (!designation) {
      alert('Введите условное обозначение резьбы!');
      return;
    }

    let threadSize = '';
    let pitch = '';
    let diameter = '';

    // Определяем размер резьбы и шаг
    for (let i = 0; i < pitchTable.length; i++) {
      const row = pitchTable[i];
      if (row.cells[0].innerText === designation.split('x')[0]) {
        threadSize = row.cells[0].innerText;
        pitch = row.cells[1].innerText;
        break;
      }
    }

    if (!pitch) {
      alert(`Не найден шаг резьбы для ${designation}`);
      return;
    }

    // Определяем средний диаметр резьбы
    for (let j = 0; j < diameterTable.length; j++) {
      const row = diameterTable[j];
      if (row.cells[0].innerText === threadSize) {
        diameter = row.cells[1].innerText;
        break;
      }
    }

    if (!diameter) {
      alert(`Не найден средний диаметр резьбы для ${threadSize}`);
      return;
    }

    // Формируем результат
    resultsDiv.innerHTML = `
      <p><strong>Размер резьбы:</strong> ${threadSize}</p>
      <p><strong>Шаг резьбы:</strong> ${pitch} мм</p>
      <p><strong>Средний диаметр резьбы:</strong> ${diameter} мм</p>
    `;
  });
});