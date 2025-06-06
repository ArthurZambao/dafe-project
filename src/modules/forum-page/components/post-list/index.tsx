'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { typePostList } from '@/types/typePostList';

interface PostListProps {
  posts: typePostList[];
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10">
      {posts.map((post, index) => (
        <div
          key={index}
          onClick={() => {
            console.log(post);

            if (!post._id) return alert('ID do tópico ausente!');
            router.push(`/forum-page/${post._id}`);
          }}
          className="cursor-pointer text-white flex flex-col sm:flex-row gap-6 py-6 sm:py-10 px-4 sm:px-8 hover:bg-light-dafe-gray rounded-3xl transition-all duration-300 border sm:border-0 border-black"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="bg-azure-primary p-3 sm:p-4 rounded-xl">
              <Image
                src="/icons/ig-logo.svg"
                width={100}
                height={100}
                alt={`Imagem de ${post.usuario}`}
                className="object-contain"
              />
            </div>
            <p className="text-slate-gray text-sm text-center sm:text-left">
              Publicação: <span className="font-bold">{formatarData(post.data)}</span>
              <br />
              Feito por: <span className="font-bold">{post.autor.usuario}</span>
              <br />
              Tópico: <span className="font-bold">{post.topico}</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-3/4">
            <h3 className="font-bold sm:text-4xl text-3xl text-azure-primary text-center sm:text-left break-words w-full">
              {post.titulo}
            </h3>
            <p className="leading-relaxed text-sm sm:text-base lg:text-lg text-slate-gray text-center sm:text-left break-words w-full">
              {post.descricao}
            </p>
            <button className="self-center sm:self-start bg-azure-primary text-base sm:text-lg text-white px-4 sm:px-6 sm:py-2 rounded-tl-xl rounded-br-xl">
              <span className="font-bold">{post.interacao}</span> 
              {post.interacao === 1 ? ' Interação' : ' Interações'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
