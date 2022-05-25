import React from 'react';
import csvIcon from '../../assets/icons/csv.png';

interface ProgressBarProps {
  fileName: string;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props): React.ReactElement => {
  return (
    <div className="progress-card">
      <img className="icon-small" src={csvIcon} alt=""></img>
      <div className="progress-status">
        <div className="progress-text-ctn light-gray">
          <div>{props.fileName}</div>
          <div className="weight-medium">{props.progress}%</div>
        </div>
        <div className="progress-bar">
          <div className="filler" style={{ width: `${props.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
