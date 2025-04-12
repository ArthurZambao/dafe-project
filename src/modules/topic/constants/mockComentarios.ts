type ComentarioType = {
  id: number;
  imagem: string;
  autor: string;
  mensagem: string;
  data: string;
};

export const comentariosPorTopico: Record<string, ComentarioType[]> = {
  1: [
    {
      id: 1,
      imagem: '/ig-logo.svg',
      autor: 'User2011',
      mensagem: 'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
      data: '12/12/2010',
    },
    {
      id: 2,
      imagem: '/ig-logo.svg',
      autor: 'User2012',
      mensagem: 'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
      data: '22/11/2010',
    },
  ],
  2: [
    {
      id: 2,
      imagem: '/ig-logo.svg',
      autor: 'User3',
      mensagem: 'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
      data: '13/08/2007',
    },
  ],
};
