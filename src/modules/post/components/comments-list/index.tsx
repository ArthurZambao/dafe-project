import { typeComments } from '@/types/typeComments';
import { useRouter } from 'next/navigation';

interface CommentsListProps {
  comments: typeComments[];
}

export function CommentsList({ comments }: CommentsListProps) {
  const router = useRouter();

  return comments.map((comment) => (
    <div key={comment._id}
    onClick={() =>{
      router.push(`users/${comment.autor._id}`)
    }}
     className="mb-4 p-4 rounded flex gap-4">
      <div className="w-2 rounded-full p-8 bg-slate-gray"></div>
      <div>
        <p className="text-sm text-gray-600">{comment.autor.nome}</p>
        <p className="text-base">{comment.conteudo}</p>
        <p className="text-xs text-gray-400">{new Date(comment.data).toLocaleString()}</p>
      </div>
    </div>
  ));
}
