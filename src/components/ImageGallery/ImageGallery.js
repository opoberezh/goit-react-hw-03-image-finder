import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => { 
  console.log(images)
  return (
    <ImageGalleryList>
        {images.map(item => {
        return <ImageGalleryItem key={item.id} {...item} />;
      })}
    </ImageGalleryList>
  );
 
};

