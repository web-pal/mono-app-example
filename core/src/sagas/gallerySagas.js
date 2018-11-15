import {
  put, take, fork, all, call, select, takeEvery, cancel,
} from 'redux-saga/effects';

import {
  eventChannel,
} from 'redux-saga';

import {
  uiActions,
  actionTypes,
} from '../actions';

import {
  fetchPixabayImages,
  fetchSplashbaseImages,
} from '../api/galleryApi';

import {
  getUiState,
} from '../selectors/ui';


export function* consoleSaga() {
  yield console.log('ConsoleSaga - Saga that just works');
}

export function* loadImages() {
  try {
    // all([...effects]) Effect combinator via array of effects
    const [pixabayImages, splashbaseImages] = yield all([
      call(fetchPixabayImages),
      call(fetchSplashbaseImages),
    ]);

    // You can also use:
    // all(effects) Effect combinator via dictionary object with labels
    // const images = yield all({
    //   pixabayImages: call(fetchPixabayImages),
    //   splashbaseImages: call(fetchSplashbaseImages),
    // });
    // const { pixabayImages, splashbaseImages } = images;

    const startingIndex = 0;
    yield put(uiActions.setUiState('images', { pixabayImages, splashbaseImages, key2: 1 }, { deepMergeKeys: [] }));
    yield put(uiActions.setUiState('selectedImage', {
      pixabay: {
        image: pixabayImages[startingIndex],
        index: startingIndex,
      },
      splashbase: {
        image: splashbaseImages[startingIndex],
        index: startingIndex,
      },
    }, { deepMergeKeys: [] }));
  } catch (error) {
    yield put(uiActions.setUiState('error', { error: 'Image Not Loaded' }, { deepMergeKeys: [] }));
  }
}

function moveCarouselWithInterval(images, index) {
  let pictureIndex = index;
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      pictureIndex += 1;
      if (pictureIndex < images.length) {
        emitter(pictureIndex);
      } else {
        pictureIndex = 0;
        emitter(pictureIndex);
      }
    }, 500);

    return () => {
      clearInterval(iv);
    };
  });
}

export function* watchForCarouselMove() {
  yield take(actionTypes.START_CAROUSEL_REQUEST);

  // take some parts of data from the store
  const { pixabayImages, splashbaseImages } = yield select(getUiState('images'));
  const selectedImage = yield select(getUiState('selectedImage'));

  const startingPixabayIndex = selectedImage.pixabay.index;
  const startingSplashbaseIndex = selectedImage.splashbase.index;

  const channelPixabay = yield call(moveCarouselWithInterval, pixabayImages, startingPixabayIndex);
  const channelSplashbase = yield call(moveCarouselWithInterval, splashbaseImages, startingSplashbaseIndex);

  try {
    while (true) {
      const pixabayIndex = yield take(channelPixabay);
      const splashbaseIndex = yield take(channelSplashbase);

      yield put(uiActions.setUiState('selectedImage', {
        pixabay: {
          image: pixabayImages[pixabayIndex],
          index: pixabayIndex,
        },
        splashbase: {
          image: splashbaseImages[splashbaseIndex],
          index: splashbaseIndex,
        },
      }, { deepMergeKeys: [] }));
    }
  } finally {
    console.log('Carousel move terminated');
  }
}

export function* watchForImageLoadingSaga() {
  // starting two sagas in the same time
  yield all([call(consoleSaga), takeEvery(actionTypes.LOAD_IMAGES_REQUEST, loadImages)]);

  // return watchForCarouselMove saga response to cancel it when action fires
  yield take(actionTypes.LOAD_IMAGES_REQUEST);
  const carouselMove = yield fork(watchForCarouselMove);
  yield take(actionTypes.STOP_CAROUSEL_REQUEST);
  yield cancel(carouselMove);
}
