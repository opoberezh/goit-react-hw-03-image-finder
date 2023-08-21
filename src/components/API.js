import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38119446-41822b71524f1b118d79216dc'
const perPage = 12;

export const getImages = async (query, page) => {
   
  const param = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: perPage,
  });
  try {
    const response = await axios.get(`?${param}`);
console.log(response.data.hits)
    return response.data.hits;
  } catch (error) {
    console.error(error);

    return [];
  }
}