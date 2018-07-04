import axios from 'axios';

const apiUrl = 'http://api.giphy.com/v1/gifs/random';
const apiKey = 'your_key';

export function fetchGif(tag: string) {
  return axios.get(apiUrl, {
    params: {
      api_key: apiKey,
      tag
    }
  })
    .then(resp => resp.data.data.image_url);
}
