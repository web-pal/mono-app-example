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
  onSelectImage: () => Action,
};

const Gallery = ({
  name,
  images,
  selectedImage,
  error,
  onSelectImage,
}: Props) => (
  <ImageGallery>
    <GalleryHeader>{name}</GalleryHeader>
    <MainImageContainer>
      <MainImage src={selectedImage} />
    </MainImageContainer>
    <ImageScroller>
      {images.map(image => (
        <div key={image}>
          <ScrollerImage
            src={image}
            onClick={() => onSelectImage(image)}
          />
        </div>
      ))}
    </ImageScroller>
    {error ? <ErrorPanel>error</ErrorPanel> : ''}
  </ImageGallery>
);

export default Gallery;
