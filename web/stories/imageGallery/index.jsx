import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  uiActions,
  actionTypes,
} from 'core/actions';
import {
  getUiState,
} from 'core/src/selectors/index';

import Component from 'web-components/Connect';
import ImageGallery from 'web-components/ImageGallery';

/*
  Buttons is just a flex-container,
  I tried to replace it with an antd component,
  but didn't find a container component inside antd.
*/
import {
  Buttons,
} from 'web-components/ImageButtons/styled';

import {
  Row,
  Col,
  Button,
} from 'antd';


storiesOf('generate-random-button', module)
  .add('image-gallery', () => (
    <Component
      mapStateToProps={state => ({
        images: getUiState('images')(state),
        selectedImage: getUiState('selectedImage')(state),
        error: getUiState('error')(state),
      })}
    >
      {({
        images: {
          pixabayImages,
          splashbaseImages,
        },
        selectedImage,
        dispatch,
        error,
      }) => (
        <Row
          type="flex"
          justify="center"
          gutter={24}
        >
          <Col span={12}>
            <ImageGallery
              name="Pixabay API"
              images={pixabayImages}
              selectedImage={selectedImage.pixabay.image}
              onSelectImage={image => (
                dispatch(
                  uiActions.setUiState(
                    'selectedImage',
                    {
                      pixabay: {
                        image,
                      },
                    },
                  ),
                )
              )}
            />
          </Col>
          <Col span={12}>
            <ImageGallery
              name="Splashbase API"
              images={splashbaseImages}
              selectedImage={selectedImage.splashbase.image}
              error={error}
              onSelectImage={image => (
                dispatch(
                  uiActions.setUiState(
                    'selectedImage',
                    {
                      splashbase: {
                        image,
                      },
                    },
                  ),
                )
              )}
            />
          </Col>
          <Col span={24}>
            <Buttons>
              <Button
                type="button"
                onClick={() => dispatch({ type: actionTypes.LOAD_IMAGES_REQUEST })}
              >
                Load Images
              </Button>
              <Button
                type="button"
                onClick={() => dispatch({ type: actionTypes.START_CAROUSEL_REQUEST })}
              >
                Start Carousel
              </Button>
              <Button
                type="button"
                onClick={() => dispatch({ type: actionTypes.STOP_CAROUSEL_REQUEST })}
              >
                Stop Carousel
              </Button>
            </Buttons>
          </Col>
        </Row>
      )}
    </Component>
  ));
