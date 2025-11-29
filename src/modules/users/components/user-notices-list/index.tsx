import Image from 'next/image';
import Link from 'next/link';
import { NoticeFromAPI } from '@/types/notices';
import { Trash2 } from 'lucide-react';
import { ConfirmModal } from '@/global/components/confirmModal';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { deleteNotice } from '@/libs/services/notices/noticesService';
import { useLazyLoadList } from '@/hooks/useLazyLoading';

interface UserNoticeListProps {
  notices: NoticeFromAPI[];
}

export function UserNoticeList({ notices }: UserNoticeListProps) {
  const [userNotices, setUserNotices] = useState<NoticeFromAPI[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  const { visibleItems, loadMoreRef } = useLazyLoadList<NoticeFromAPI>(userNotices, 6);

  useEffect(() => {
    setUserNotices(notices);
  }, [notices]);

  const handleDeleteNotice = async (noticeId: string) => {
    try {
      await deleteNotice(noticeId);

      setUserNotices((prev) => prev.filter((n) => n._id !== noticeId));

      toast.success('Notícia deletada com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar a notícia:', err);
      toast.error('Erro ao deletar notícia');
    }
  };

  if (visibleItems.length === 0) {
    return <p className="text-center text-gray-500 py-10">Você ainda não criou nenhuma notícia.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <ConfirmModal
          isOpen={showDeleteModal}
          title="Deletar notícia"
          message="Tem certeza que deseja deletar esta notícia? Esta ação é irreversível."
          confirmText="Deletar"
          cancelText="Cancelar"
          onConfirm={() => {
            if (selectedNoticeId) handleDeleteNotice(selectedNoticeId);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />

        {visibleItems.map((notice) => (
          <div key={notice._id}>
            <div className="border border-azure-primary rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">

              {notice.imageUrl && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src={notice.imageUrl} alt={notice.titulo} fill className="object-cover" loading="lazy" />
                </div>
              )}

              <h2 className="text-xl font-bold text-azure-secondary mb-2">{notice.titulo}</h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.descricao}</p>

              <div className="flex justify-between py-2 items-center">
                <p className="text-xs text-gray-500 mb-2">
                  Criado por <span className="font-semibold">{notice.autor.usuario}</span>
                </p>

                <Trash2
                  size={20}
                  className="text-red-500 hover:text-red-900 duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedNoticeId(notice._id);
                    setShowDeleteModal(true);
                  }}
                />
              </div>

              <Link
                href={`/notices-page/${notice.slugify}`}
                className="btn-dafe btn-dafe-hover block text-center px-4 py-2 text-white rounded-lg"
              >
                Ver Notícia
              </Link>
            </div>
          </div>
        ))}

      </div>

      <div ref={loadMoreRef} className="h-10"></div>
    </>
  );
}
