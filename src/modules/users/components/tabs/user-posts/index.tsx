import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { typePostList } from '@/types/typePostList';
import { useAuth } from '@/global/context/useAuth';
import { getValidToken } from '@/global/utils/auth';
import { useRouter } from 'next/navigation';

export function UserPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<typePostList[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const token = getValidToken();
        const response = await axios.get(`http://localhost:3030/posts?autor=${user!.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    if (user) fetchUserPosts();
  }, [user]);

  async function handleDelete(postId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      const token = getValidToken();
      await axios.delete(`http://localhost:3030/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove o post deletado da lista
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post.');
    }
  }

  if (!user) return null;

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-6">Você não tem nenhum Post.</div>
    );
  }

  return posts.map((post) => (
    <div
      key={post._id}
      onClick={() => {
        console.log(post);

        if (!post._id) return alert('ID do tópico ausente!');
        router.push(`/forum-page/${post._id}`);
      }}
      className="cursor-pointer mb-4 p-4 border border-azure-primary rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <p className="text-xl sm:text-3xl text-azure-primary break-words whitespace-pre-wrap w-full">
        {post.titulo}
      </p>
      <p className="text-xs sm:text-base break-words whitespace-pre-wrap w-full">
        {post.descricao}
      </p>
      <p className="text-slate-gray text-xs sm:text-sm mt-2">
        Tópico: <span className="font-bold">{post.topico}</span>
      </p>
      <div className="flex justify-between items-center">
        <p className="text-slate-gray text-xs sm:text-sm">
          Feito em: <span className="font-bold">{new Date(post.data).toLocaleDateString()}</span>
        </p>
        <Trash2
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(post._id);
          }}
          className="cursor-pointer hover:text-red-600 transition-colors duration-200 "
        />
      </div>
    </div>
  ));
}
