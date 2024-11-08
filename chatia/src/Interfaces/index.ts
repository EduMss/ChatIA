// Ao importar tipos do TypeScript, use a extensão .ts em vez de .tsx se
// Por isso esse arquivo e .ts e não .tsx

export interface ChatInterface {
    id: number;
    user_1_id: string;
    user_2_id?: string;
    start_date: string;
    end_date?: string;
    status: string;
}

export type GetChat = ChatInterface[]; // Tipo para representar uma lista de chats

export interface ListaChatsProps {
    chats: GetChat;
}