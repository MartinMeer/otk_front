document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/menu.html') // Убедитесь, что путь к menu.html правильный
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки меню: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector('aside.menu').innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
});