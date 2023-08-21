import axios from 'axios';

URL = 'https://pixabay.com/api/';
const API_KEY = '38119446-41822b71524f1b118d79216dc'
const perPage = 12;

export async function getImages({ query, page }) {
  const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: perPage,
  });
  try {
    const response = await axios.get(`${URL}?${params}`);

    return response.data.hits;
  } catch (error) {
    console.error(error);

    return [];
  }
}