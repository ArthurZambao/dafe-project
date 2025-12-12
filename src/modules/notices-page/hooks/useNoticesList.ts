import { getNotices } from "@/libs/services/notices/noticesService";
import { NoticeFromAPI } from "@/types/notices";
import { useState, useEffect } from "react";

export function useNoticesList() {
  const [notices, setNotices] = useState<NoticeFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (_error) {
        setError('Não foi possível carregar as notícias. Tente novamente mais tarde.');
        console.error('Erro ao buscar notícias:', _error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return { notices, isLoading, error };
}