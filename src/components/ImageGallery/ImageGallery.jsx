import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ data }) => (
  <ImageGalleryList>
    {data.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        src={webformatURL}
        largeSrc={largeImageURL}
      />
    ))}
  </ImageGalleryList>
);

export default ImageGallery;
