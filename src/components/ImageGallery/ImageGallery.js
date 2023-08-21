import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from './ImageGallery.styled'; 


export const ImageGallery = ({ images }) => {
    return (
      <ImageGalleryList>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ImageGalleryList>
    );
  };
  export function scaleHits(hits) {
    return hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  }