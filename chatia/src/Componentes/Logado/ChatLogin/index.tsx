import React, {useEffect, useState} from "react";
import axios from "axios";
import './ChatLogin.css';
import { GetChat, ChatInterface } from  "../../../Interfaces/index.ts";
import ListaChatsLogin from "../ListaChatsLogin/index.tsx";
import ChatMensagemLogin from "../ChatMensagemLogin/index.tsx";
import Cookies from 'js-cookie';


export default function ChatLogin(){
    let [user, setUser] = useState<string | null>(null);

     // Atualiza o estado com os dados da resposta
    let [chats, setChats] = useState<GetChat>([]);
    const [selectedChat, setSelectedChat] = useState<ChatInterface | null>(null); // Estado para armazenar o chat selecionado  

    //Executar quando selecionar um chat
    // useEffect(() => {
    //     if(selectedChat){
    //         console.log(selectedChat);
    //     }
    // }, [selectedChat]);

    useEffect(() => {
        setUser("E215EDB2-5E0D-4F22-9AB9-12131567890A");
        const getChats = async ():Promise<void> => {
            const Bearer_token = Cookies.get('BEARER_TOKEN');
            try {
                const result = await axios.get("http://127.0.0.1:8000/chats", {
                    headers: {'Authorization': `Bearer ${Bearer_token}`}
                })
                setChats(result.data); // Atualiza o estado com os dados da resposta
            } catch (error) {
                console.error("Error ao buscar chats:", error);
            }
        };
        getChats();// Chama a função ao montar o componente
    }, []); // O array vazio [] garante que o `useEffect` seja executado apenas uma vez

    return( // ChatMensagemLogin
        <div className="Chat">
            <ListaChatsLogin chats={chats} setSelectedChat={setSelectedChat} setChats={setChats} user={user} /> 
            {selectedChat ? 
                <ChatMensagemLogin user={user} chat={selectedChat}/> 
                    :
                <div style={{
                    flex: 1, 
                    height: '100vh', 
                    backgroundColor: 'rgb(75, 75, 75)', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        color: 'whitesmoke',
                    }}>
                        Olá, clique em algum chat para começar a conversar!
                    </h1>
                </div>
            }
            
        </div>
    );
}