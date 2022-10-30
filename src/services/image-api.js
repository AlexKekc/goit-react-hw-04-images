import axios from 'axios';

export const getImages = async (query = '', page = 1) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: `${query}`,
      page: `${page}`,
      key: '29907532-7f39500d23d88694527ad4fe5',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
