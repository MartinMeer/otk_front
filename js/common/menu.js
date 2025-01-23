export function loadMenu() {
  fetch('menu.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('aside.menu').innerHTML = data;
    });
}