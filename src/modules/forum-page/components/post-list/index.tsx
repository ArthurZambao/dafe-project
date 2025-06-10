'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { typePostList } from '@/types/typePostList';
import { PostInfoSection } from '@/global/components/postInfoSection';

interface PostListProps {
  posts: typePostList[];
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10 mx-10">
      {posts.map((post, index) => (
        <div
          key={index}
          onClick={() => {
            console.log(post);

            if (!post._id) return alert('ID do tópico ausente!');
            router.push(`/forum-page/${post._id}`);
          }}
          className="cursor-pointer text-white gap-6 py-6 sm:py-10 px-4 sm:px-8 transition-all duration-300 border-b-3 border-dafe-gray-hover"
        >
          <div>
            <div className='flex-col sm:flex'>
              <h3 className="font-bold sm:text-4xl text-3xl text-azure-primary text-center sm:text-left break-words w-full">
                {post.titulo}
              </h3>
              <div className="flex-col sm:flex text-slate-gray text-md text-center sm:text-left py-4">
                <p>
                  Publicação: <span className="font-bold">{formatarData(post.data)}</span>
                </p>
                <p>
                  Feito por: <span className="font-bold">{post.autor.usuario}</span>
                </p>
                <p>
                  Tópico: <span className="font-bold">{post.topico}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#D9D9D9] py-30 sm:py-50">
              <Image
                src="/icons/ig-logo.svg"
                width={100}
                height={100}
                alt={`Imagem de ${post.usuario}`}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-3/4">
            <p className="leading-relaxed pt-6 text-sm sm:text-base lg:text-lg text-slate-gray text-center sm:text-left break-words w-full">
              {post.descricao}
            </p>
          <PostInfoSection interacao={post.interacao} commentsCount={post.commentsCount} />
          </div>
        </div>
      ))}
    </div>
  );
}
