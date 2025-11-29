'use client';

import { useState } from 'react';
import { useAuth } from '@/global/context/useAuth';
import { deleteComment } from '@/libs/services/comments/commentsServices';
import { typeComments } from '@/types/typeComments';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { ConfirmModal } from '@/global/components/confirmModal';

interface CommentsListProps {
  comments: typeComments[];
  onDelete: (commentId: string) => void;
  autorValidator: boolean;
}

export function CommentsList({ comments, onDelete, autorValidator }: CommentsListProps) {
  const { user } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  if (!user) return null;

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      toast.success('Comentário deletado com sucesso!');
      onDelete(commentId);
    } catch (error) {
      console.error('Erro ao deletar o comentário:', error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedCommentId) return;
    await handleDeleteComment(selectedCommentId);
    setShowDeleteModal(false);
    setSelectedCommentId(null);
  };

  return (
    <>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Deletar comentário"
        message="Tem certeza que deseja deletar este comentário? Esta ação é irreversível."
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedCommentId(null);
        }}
      />

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-50 p-4 rounded-xl flex gap-4 border border-gray-100"
          >
            <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
              <Image
                src={comment.autor.imageUrl || '/icons/user-icon.svg'}
                alt={`Foto de ${comment.autor.usuario}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-azure-primary">
                    {comment.autor.usuario}
                  </p>
                  <span className="text-xs text-gray-400">
                    • {new Date(comment.data).toLocaleString()}
                  </span>
                </div>

                {(autorValidator || user.role === 'admin') && (
                  <Trash2
                    size={20}
                    className="text-black hover:text-red-500 duration-200 cursor-pointer"
                    onClick={() => {
                      setSelectedCommentId(comment._id!);
                      setShowDeleteModal(true);
                    }}
                  />
                )}
              </div>

              <p className="text-base text-slate-gray mt-1">{comment.conteudo}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
