export interface Responder {
    _id: string;
    nome: string;
    email: string;
    role: string;
    imageUrl: string;
}

export interface DetalheResposta {
    titulo: string;
    enunciado: string;
    tipo: 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA' | 'DISSERTATIVA';
    opcoes?: { label: string; checked: boolean }[];
    respostaSubmetida: string | string[] | number;
}

export interface StudentResult {
    responder: Responder;
    dataResposta: string;
    respostasDetalhadas: DetalheResposta[];
}

export interface FormResultsAPI {
    formId: string;
    formTitulo: string;
    totalRespostas: number;
    results: StudentResult[];
    summary?: string;
    autorFormulario: Autor;
}

export interface Autor {
    _id: string;
    usuario: string;
    nome: string;
    email: string;
}