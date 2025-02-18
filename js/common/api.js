
import AppConfig from '../common/config.js';

export async function postData(endpoint, inputData) {
  const url = `${AppConfig.API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Ошибка сервера');
  }

  return response.json();
}

/*
export async function processCalculation(inputData) {
  return postData('/api/process', inputData);
}

export async function fetchParts(inputData) {
  return postData('/parts', inputData);
}
*/
