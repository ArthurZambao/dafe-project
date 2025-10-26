import CryptoJS from 'crypto-js';

export const calculateFileHash = (file: File): Promise<string> => {
  console.log('calculateFileHash: [1] Função iniciada.'); // log debug

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log('calculateFileHash: [3] Leitura concluída (onload).');
      if (event.target && event.target.result) {
        console.log('calculateFileHash: [4] Processando hash...')
        const binary = CryptoJS.lib.WordArray.create(event.target.result as any);
        const hash = CryptoJS.MD5(binary).toString();
        console.log('calculateFileHash: [5] Hash calculado com sucesso.')
        resolve(hash);
      } else {
        console.log('calculateFileHash: [ERRO] evento "onload" sem target ou result.')
        reject(new Error('Não foi possível ler o arquivo.'));
      }
    };

    reader.onerror = (error) => {
      console.log('calculateFileHash: [ERRO] Leitura falhou (onerror).', error)
      reject(error);
    };

    console.log('calculateFileHash: [2] Lendo o arquivo como ArrayBuffer...')
    reader.readAsArrayBuffer(file);
  });
};