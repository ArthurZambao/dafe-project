import { typeComments } from '@/types/typeComments';
import Image from 'next/image'; // Importe o Image

interface CommentsListProps {
  comments: typeComments[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-50 p-4 rounded-xl flex gap-4 border border-gray-100">
          
          <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
            <Image
              src={comment.autor.imageUrl || '/icons/user-icon.svg'} 
              alt={`Foto de ${comment.autor.usuario}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-azure-primary">{comment.autor.usuario}</p>
                <span className="text-xs text-gray-400">• {new Date(comment.data).toLocaleString()}</span>
            </div>
            <p className="text-base text-slate-gray mt-1">{comment.conteudo}</p>
          </div>
        </div>
      ))}
    </div>
  );
}