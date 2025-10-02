import CryptoJS from 'crypto-js';

export const calculateFileHash = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const binary = CryptoJS.lib.WordArray.create(event.target.result as any);
        const hash = CryptoJS.MD5(binary).toString();
        resolve(hash);
      } else {
        reject(new Error('Não foi possível ler o arquivo.'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};