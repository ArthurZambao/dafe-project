import { api } from "@/libs/http/axios"
import { NoticeFromAPI } from "@/types/notices"

interface CreateNoticePayload {
    titulo: string;
    descricao: string;
    conteudo: string;
}

export const getNotices = async (): Promise<NoticeFromAPI[]> => {
    try {
        const response = await api.get('/news');
        return response.data;
    } 
    
    catch (error) {
        console.error('Erro ao buscar notícias:', error);
        // erro lançado:
        throw error;
    }
}

export const createNotice = async (data: CreateNoticePayload): Promise<NoticeFromAPI> => {
    try {
        const response = await api.post('/news', data);
        return response.data;
    }

    catch (error) {
        console.error('Erro ao criar notícia:', error);
        throw error;
    }
}