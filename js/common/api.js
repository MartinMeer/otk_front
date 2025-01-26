// postData.js (общий модуль)
import AppConfig from './config.js';
export async function postData(endpoint, bodyString) {
  const url = `${AppConfig.API_BASE_URL}${endpoint}`; // Полный URL
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: bodyString
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Ошибка сервера');
  }
  return response.json();
}