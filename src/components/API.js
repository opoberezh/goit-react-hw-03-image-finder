import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38119446-41822b71524f1b118d79216dc'

export const getImages = async () => {
    try{
       const response = await axios.get('/', {
    params: {
        key: API_KEY,
        q: 'all',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: 1,
    } 
   
})
    return response.data; 

    }catch(error){
      throw error;  
    }
};