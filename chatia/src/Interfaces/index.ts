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

// export interface ListaChatsProps {
//     chats: GetChat;
// }

// export interface ListaChatsProps {
//     chats: GetChat; // Recebe os dados de chats
//     chatRef: React.RefObject<ChatInterface | null>; // Recebe a referência como prop
// }


export interface ListaChatsProps {
    chats: GetChat;
    setSelectedChat: React.Dispatch<React.SetStateAction<ChatInterface | null>>; // Recebe a função para alterar o chat selecionado
    setChats: React.Dispatch<React.SetStateAction<GetChat>>; // Recebe a função para alterar o chat selecionado
    user: string | null;
}

export interface ListaChatsPropsLogout {
    chats: GetChat;
    setSelectedChat: React.Dispatch<React.SetStateAction<ChatInterface | null>>; // Recebe a função para alterar o chat selecionado
}

export interface Mensagem {
    chat: ChatInterface;
    user: string | null;
}

export interface MensagemLogout {
    chat: ChatInterface;
}

export interface GetMensagem {
    id: number;
    chat_id: number;
    sender: string;
    message: string;
    date: string;
}
export type GetMensagens = GetMensagem[]

export interface GetMensagemTemp {
    sender: string;
    message: string;
}
export type GetMensagensTemp = GetMensagemTemp[]
