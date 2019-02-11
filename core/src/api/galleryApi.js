const API_KEY = '10622153-70bcda06da05681805503b359';
const API_PIXABAY_ENDPOINT = `https://pixabay.com/api/?key=${API_KEY}&q=orange+flowers&image_type=photo`;
const API_SPLASHBASE_ENDPOINT = 'http://www.splashbase.co/api/v1/images/latest';

export const fetchPixabayImages = () => fetch(API_PIXABAY_ENDPOINT)
  .then(response => response.json())
  .then(json => json.hits.map(({ userImageURL }) => userImageURL).slice(0, 8));

export const fetchSplashbaseImages = () => fetch(API_SPLASHBASE_ENDPOINT)
  .then(response => response.json())
  .then(json => json.images.map(image => image.url).slice(0, 8));
