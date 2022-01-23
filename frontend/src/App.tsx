import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import './App.css';
import ImageUpload from './ImageUpload';
import { generateNfts } from './services/ApiService';

function App(): JSX.Element {
  const [set1Images, addSet1Images] = useState([] as ImageListType);
  const [set2Images, addSet2Images] = useState([] as ImageListType);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);

  const onSet1Change = (imageList: ImageListType) => {
    addSet1Images(imageList);
  };

  const onSet2Change = (imageList: ImageListType) => {
    addSet2Images(imageList);
  };

  const uploadFile = async () => {
    const response = await generateNfts(set1Images, set2Images);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob], { type: blob.type }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'nfts.zip');

    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  };

  const canContinue = () => {
    if (set1Images.length > 0 && set2Images.length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsContinueDisabled(!canContinue());
  }, [set1Images, set2Images]);

  return (
    <div className="App">
      <p>Please upload two set of images to generate the NFTs:</p>
      <ImageUpload imageList={set1Images} onChange={onSet1Change} buttonText={'Choose the first set of images'} />
      <ImageUpload imageList={set2Images} onChange={onSet2Change} buttonText={'Choose the second set of images'} />
      <div>
        <p>If you press the button below, it will download a zip containing the combined images.</p>
        <button onClick={uploadFile} disabled={isContinueDisabled}>
          Generate NFTs
        </button>
      </div>
    </div>
  );
}

export default App;
