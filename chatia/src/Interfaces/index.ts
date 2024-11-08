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
  }