import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { typePostList } from '@/types/typePostList';
import { PostInfoSection } from '@/global/components/postInfoSection';
import { FadeInUp } from '@/global/animations/fadeInUp';
import { formatarData } from '@/global/components/FormatedDate';
import { useLazyLoadList } from '@/hooks/useLazyLoading';

interface PostListProps {
  posts: typePostList[];
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();

  const { visibleItems, loadMoreRef } = useLazyLoadList<typePostList>(posts, 8);

  console.log('Rendendo no:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10 mx-10">
      {visibleItems.map((post, index) => (
        <FadeInUp key={index} delay={index * 0.05}>
          <div
            onClick={() => {
              console.log(post);

              if (!post._id) return alert('ID do tópico ausente!');
              router.push(`/forum-page/${post._id}`);
            }}
            className="cursor-pointer text-white gap-6 py-6 sm:py-10 px-4 sm:px-8 transition-all rounded-t-xl duration-300 border-b-3 hover:shadow-xl border-dafe-gray-hover"
          >
            <div>
              <div className="flex-col sm:flex">
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
              {post.imageUrl && (
                <div className="relative w-full h-64 sm:h-96 mt-4 rounded-md overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={`Imagem do post: ${post.titulo}`}
                    layout="fill"
                    objectFit="cover"
                    priority={index < 3}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-3/4">
              <p className="leading-relaxed pt-6 text-sm sm:text-base lg:text-lg text-slate-gray text-center sm:text-left break-words w-full">
                {post.descricao}
              </p>
              <PostInfoSection
                interacao={post.interacao}
                commentsCount={post.commentsCount}
                isInteracted={false}
              />
            </div>
          </div>
        </FadeInUp>
      ))}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
}
