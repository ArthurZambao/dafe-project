import { useAuth } from '@/global/context/useAuth';
import { getNoticesByAuthor, getNotices } from '@/libs/services/notices/noticesService';
import { NoticeFromAPI } from '@/types/notices';
import { useEffect, useState } from 'react';
import { UserNoticeList } from '../../user-notices-list';

export function UserNotices() {
  const [notices, setNotices] = useState<NoticeFromAPI[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotices = async () => {
      try {
        let data: NoticeFromAPI[] = [];

        if (user.role === 'admin') {
          data = await getNotices();
        } else {
          data = await getNoticesByAuthor(user.id);
        }

        setNotices(data);
      } catch (error) {
        console.error('Erro ao buscar os avisos:', error);
      }
    };

    fetchNotices();
  }, [user]);

  return <UserNoticeList notices={notices} />;
}
