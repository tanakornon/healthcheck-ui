import React from 'react';
import { HealthCheckResult } from '../../models/healthCheck';
import humanizeDuration from 'humanize-duration';

interface HealthCheckProps {
  result: HealthCheckResult | undefined;
}

const HealthCheckBox: React.FC<HealthCheckProps> = (
  props
): React.ReactElement => {
  const ResultBox = (result: HealthCheckResult | undefined) => {
    if (!result) {
      return (
        <div className="darker-gray weight-bold">Can't connect to server</div>
      );
    }

    const humanTime = humanizeDuration(result.elapsed, { delimiter: ' and ' });

    return (
      <div style={{ width: '100%' }}>
        <div className="darker-gray weight-bold">{`Total ${
          result.up + result.down
        } Websites`}</div>
        <div className="darker-gray weight-medium font-small">{`(Used ${humanTime})`}</div>
        <div className="health-ctn">
          <div className="up-card">
            <div className="health-card-label">Up</div>
            <div className="health-card-value">{result.up}</div>
          </div>
          <div className="down-card">
            <div className="health-card-label">Down</div>
            <div className="health-card-value">{result.down}</div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="healthcheck-card">{ResultBox(props.result)}</div>;
};

export default HealthCheckBox;
