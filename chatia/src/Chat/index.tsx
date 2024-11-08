import React, {useEffect, useState} from "react";
import axios from "axios";
import { GetChat } from  "../Interfaces/index.ts";
import ListaChats from "../Componentes/ListaChats/index.tsx";

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
            <ListaChats chats={chats}/>
        </div>
    );
}