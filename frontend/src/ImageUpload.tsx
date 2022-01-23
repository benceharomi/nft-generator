import { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';

export default function ImageUpload({
  imageList,
  buttonText,
  onChange,
}: {
  imageList: ImageListType;
  buttonText: string;
  onChange: (value: ImageListType, addUpdatedIndex?: number[] | undefined) => void;
}): JSX.Element {
  return (
    <ImageUploading multiple value={imageList} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        <div className="upload__image-wrapper">
          <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
            {buttonText}
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll} hidden={imageList.length < 1}>
            Remove all images
          </button>
          <div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Choose another</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
