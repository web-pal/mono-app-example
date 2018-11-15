// @flow
import React from 'react';
import type {
  Action,
} from 'core/types';

import {
  ImageGallery,
  GalleryHeader,
  MainImageContainer,
  MainImage,
  ImageScroller,
  ScrollerImage,
  ErrorPanel,
} from './styled';

type Props = {
  name: string,
  images: Array<string>,
  selectedImage: string,
  error: string,
  selectImage: () => Action,
};

const Gallery = ({
  name,
  images,
  selectedImage,
  error,
  selectImage,
}: Props) => (
  <ImageGallery>
    <GalleryHeader>{name}</GalleryHeader>
    <MainImageContainer>
      <MainImage src={selectedImage} />
    </MainImageContainer>
    <ImageScroller>
      {images.map((image, index) => (
        <div key={index}>
          <ScrollerImage
            src={image}
            onClick={() => selectImage(image, index)}
          />
        </div>
      ))}
    </ImageScroller>
    {error ? <ErrorPanel>error</ErrorPanel> : ''}
  </ImageGallery>
);

export default Gallery;
