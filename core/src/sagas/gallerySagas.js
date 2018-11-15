import {
  put,
  take,
  fork,
  all,
  call,
  select,
  takeEvery,
  cancel,
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


function* loadImages() {
  try {
    const [pixabayImages, splashbaseImages] = yield all([
      call(fetchPixabayImages),
      call(fetchSplashbaseImages),
    ]);

    yield put(uiActions.setUiState(
      'images',
      {
        pixabayImages,
        splashbaseImages,
      }, {
        deepMergeKeys: [],
      },
    ));
    yield put(uiActions.setUiState('selectedImage', {
      pixabay: {
        image: pixabayImages[0],
      },
      splashbase: {
        image: splashbaseImages[0],
      },
    }, { deepMergeKeys: [] }));
  } catch (error) {
    yield put(uiActions.setUiState('error', { error: 'Image Not Loaded' }, { deepMergeKeys: [] }));
  }
}

function intervalChannelCreator() {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      emitter(true);
    }, 500);

    return () => {
      clearInterval(iv);
    };
  });
}

function* watchForCarouselMove() {
  const {
    pixabayImages,
    splashbaseImages,
  } = yield select(getUiState('images'));
  const intervalChannel = yield call(intervalChannelCreator);
  try {
    while (true) {
      yield take(intervalChannel);
      const selectedImage = yield select(getUiState('selectedImage'));
      yield put(uiActions.setUiState('selectedImage', {
        pixabay: {
          image: (
            pixabayImages[
              pixabayImages.findIndex(i => i === selectedImage.pixabay.image) + 1
            ]
          ),
        },
        splashbase: {
          image: (
            splashbaseImages[
              splashbaseImages.findIndex(i => i === selectedImage.splashbase.image) + 1
            ]
          ),
        },
      }, { deepMergeKeys: [] }));
    }
  } finally {
    console.log('Carousel move terminated');
  }
}

export function* initializeGallerySagas() {
  yield takeEvery(actionTypes.LOAD_IMAGES_REQUEST, loadImages);

  while (true) {
    yield take(actionTypes.START_CAROUSEL_REQUEST);
    const carouselMove = yield fork(watchForCarouselMove);
    yield take(actionTypes.STOP_CAROUSEL_REQUEST);
    yield cancel(carouselMove);
  }
}
