import React, { useEffect } from 'react';
import csvIcon from '../../assets/icons/csv.png';

interface DragAndDropProps {
  onUpload: (file: File) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = (props): React.ReactElement => {
  const dropZone = React.useRef<HTMLDivElement | null>(null);
  const uploadBtn = React.useRef<HTMLInputElement | null>(null);

  const onChangeFile = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.target.files;

    if (files && files.length) {
      props.onUpload(files[0]);
    }
  };

  const onButtonClick = () => {
    uploadBtn.current?.click();
  };

  useEffect(() => {
    const currentDropZone = dropZone.current;

    if (!currentDropZone) {
      return;
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer?.files;

      if (files && files.length) {
        props.onUpload(files[0]);
      }
    };

    currentDropZone.addEventListener('dragover', handleDragOver);
    currentDropZone.addEventListener('drop', handleDrop);

    return () => {
      currentDropZone.removeEventListener('dragover', handleDragOver);
      currentDropZone.removeEventListener('drop', handleDrop);
    };
  }, [props]);

  return (
    <div className="drag-and-drop" ref={dropZone}>
      <img className="icon-medium" src={csvIcon} alt=""></img>
      <div className="dark-gray weight-medium">
        Drag your .csv file here to start uploading.
      </div>
      <div className="hr-line">
        <div className="hr-line-text light-gray weight-medium">OR</div>
      </div>
      <button className="browse-file-btn" onClick={onButtonClick}>
        Browse File
      </button>
      <input
        type="file"
        id="file"
        ref={uploadBtn}
        onChange={onChangeFile}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DragAndDrop;
