// import * as basicLightbox from 'basiclightbox';

export const Modal = ({ onClose, largeImageURL }) => (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );

