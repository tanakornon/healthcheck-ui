import axios, { AxiosRequestConfig } from 'axios';
import { HealthCheckResult } from '../models/healthCheck';

const baseUrl = 'http://localhost:3001';

export const healthCheck = async (
  file: File,
  setProgress: Function
): Promise<HealthCheckResult | undefined> => {
  const formData = new FormData();
  formData.append('file', file);

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          );
      if (totalLength !== null) {
        setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
      }
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/healthcheck`,
      formData,
      config
    );

    const result: HealthCheckResult = {
      elapsed: response.data['elapsed'],
      up: 0,
      down: 0,
    };

    response.data['sites_status'].forEach((site: any) => {
      if (site['health'] === 'up') {
        result.up++;
      } else {
        result.down++;
      }
    });

    return result;
  } catch {
    return undefined;
  }
};
