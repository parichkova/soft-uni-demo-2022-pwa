import { RcFile } from 'antd/lib/upload';
import { mockarooBaseUrl, mockarooKey } from '../constants'

export const getServerUrl = (path: string) => `${mockarooBaseUrl}${path}.json?key=${mockarooKey}`;

// eslint-disable-next-line
export const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
