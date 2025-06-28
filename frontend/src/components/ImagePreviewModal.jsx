const ImagePreviewModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-full rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  };
  
  export default ImagePreviewModal;
  