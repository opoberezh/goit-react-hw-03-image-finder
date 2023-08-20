import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38119446-41822b71524f1b118d79216dc'

export const getImages = async (query, page) => {
    const separated = query.split('/');
  const queryWithoutId = separated[1];
    try{
       const response = await axios.get('', {
    params: {
        key: API_KEY,
        q: queryWithoutId,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
    } 
   
})
console.log( response.data);
    return response.data; 

    }catch(error){
      throw error;  
    }
};