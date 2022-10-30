import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, description }) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={smallImage}
        alt={description}
        data-src={largeImage}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string,
};
