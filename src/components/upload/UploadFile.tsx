import React, { useState } from 'react';
import { HealthCheckResult } from '../../models/healthCheck';
import { healthCheck } from '../../services/healthCheckService';
import DragAndDrop from './DragAndDrop';
import HealthCheckBox from './HealthCheck';
import ProgressBar from './ProgressBar';

enum UploadState {
  Idle,
  Uploading,
  Complete,
}

const UploadFile: React.FC<{}> = (): React.ReactElement => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<HealthCheckResult>();
  const [state, setState] = useState(UploadState.Idle);

  const onUpload = async (file: File): Promise<void> => {
    setState(UploadState.Uploading);
    setFileName(file.name);

    const result = await healthCheck(file, setProgress);
    setState(UploadState.Complete);
    setResult(result);
  };

  const getResultElement = () => {
    switch (state) {
      case UploadState.Idle:
        return <div />;

      case UploadState.Uploading:
        return <ProgressBar fileName={fileName} progress={progress} />;

      case UploadState.Complete:
        return <HealthCheckBox result={result} />;
    }
  };

  return (
    <div className="center-screen">
      <div className="text-start dark-gray weight-medium">Websites Checker</div>
      <div style={{ height: '10px' }} />
      <DragAndDrop onUpload={onUpload} />
      <div style={{ height: '30px' }} />
      {getResultElement()}
    </div>
  );
};

export default UploadFile;
