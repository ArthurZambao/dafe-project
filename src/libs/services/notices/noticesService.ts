import { api } from "@/libs/http/axios"
import { NoticeFromAPI } from "@/types/notices"


export const getNotices = async (): Promise<NoticeFromAPI[]> => {
    try {
        const response = await api.get('/news');
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar notícias:', error);
        throw error;
    }
}

export const createNotice = async (data: FormData): Promise<NoticeFromAPI> => {
    try {
        const response = await api.post('/news', data);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao criar notícia:', error);
        throw error;
    }
}

export const getNoticesByIdOrSlug = async (idOrSlug: string): Promise<NoticeFromAPI> => {
    try {
        const response = await api.get(`/news/${idOrSlug}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar notícia ${idOrSlug}:`, error);
        throw error;
    }
}

export const getNoticesByAuthor = async (authorId: string): Promise<NoticeFromAPI[]> => {
    try {
        const response = await api.get(`/news?autor=${authorId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar notícias do autor:`, error);
        throw error;
    }
};

export const deleteNotice = async (noticeId: string): Promise<void> => {
    try {
        await api.delete(`/news/${noticeId}`);
    } catch (error) {
        console.error(`Erro ao deletar notícia ${noticeId}:`, error);
        throw error;
    }
};

