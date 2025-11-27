import CryptoJS from 'crypto-js';

export const calculateFileHash = (file: File): Promise<string> => {
  console.log('calculateFileHash: [1] Função iniciada.');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log('calculateFileHash: [3] Leitura concluída (onload).');
      const result = event.target?.result;

      if (result instanceof ArrayBuffer) {
        console.log('calculateFileHash: [4] Processando hash...');

        const wordArray = CryptoJS.lib.WordArray.create(
          new Uint8Array(result)
        );

        const hash = CryptoJS.MD5(wordArray).toString();
        console.log('calculateFileHash: [5] Hash calculado com sucesso.');
        resolve(hash);
      } else {
        console.error('calculateFileHash: [ERRO] evento "onload" sem ArrayBuffer.');
        reject(new Error('Não foi possível ler o arquivo.'));
      }
    };

    reader.onerror = (error) => {
      console.error('calculateFileHash: [ERRO] Leitura falhou (onerror).', error);
      reject(error);
    };

    console.log('calculateFileHash: [2] Lendo o arquivo como ArrayBuffer...');
    reader.readAsArrayBuffer(file);
  });
};