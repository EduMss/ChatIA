import React, {useEffect, useState} from "react";
import axios from "axios";

interface ChatInterface {
    id: number;
    user_1_id: string;
    user_2_id?: string;
    start_date: string;
    end_date?: string;
    status: string;
}

type GetChat = ChatInterface[]; // Tipo para representar uma lista de chats

export default function Chat(){
     // Atualiza o estado com os dados da resposta
    let [chats, setChats] = useState<GetChat>([]);

    useEffect(() => {
        const getChats = async ():Promise<void> => {
            try {
                const result = await axios.get("http://127.0.0.1:8000/chats")
                setChats(result.data); // Atualiza o estado com os dados da resposta
            } catch (error) {
                console.error("Error ao buscar chats:", error);
            }
        };
        getChats();// Chama a função ao montar o componente
    }, []); // O array vazio [] garante que o `useEffect` seja executado apenas uma vez


    return(
        <div>
            {chats.map((chat, index) => (
                <div key={index}>
                    <p>Id: {chat.id}</p>
                    <p>Usuário 1: {chat.user_1_id}</p>
                    <p>Usuário 2: {chat.user_2_id || "Não informado"}</p>
                    <p>Data de Início: {new Date(chat.start_date).toLocaleString()}</p>
                    <p>Data de Fim: {chat.end_date ? new Date(chat.end_date).toLocaleString() : "Não finalizado"}</p>
                    <p>Status: {chat.status}</p>
                    <br/>
                </div>
            ))}
        </div>
    );
}