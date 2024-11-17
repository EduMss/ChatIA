import React, {useEffect, useState} from "react";
import axios from "axios";
import './Chat.css';
import { GetChat, ChatInterface } from  "../../../Interfaces/index.ts";

import Cookies from 'js-cookie';
import ChatMensagem from "../ChatMensagem/index.tsx";
import ListaChats from "../../../Componentes/SemLogin/ListaChats/index.tsx";


export default function Chat(){
     // Atualiza o estado com os dados da resposta
    // let [chats, setChats] = useState<GetChat>([]);
    const [selectedChat, setSelectedChat] = useState<ChatInterface | null>(null); // Estado para armazenar o chat selecionado

    // Recuperar e inicializar o estado com localStorage
    const [chats, setChats] = useState<GetChat>(() => {
        const savedChat = localStorage.getItem('chats');
        return savedChat ? JSON.parse(savedChat) : []; // Parseia a string JSON
    });

    // Atualizar o localStorage sempre que o selectedChat mudar
    useEffect(() => {
        if (chats) {
            localStorage.setItem('chats', JSON.stringify(chats));
        } else {
            localStorage.removeItem('chats'); // Remove se for null 
        }
    }, [chats]);  
  
    //Executar quando selecionar um chat
    // useEffect(() => {
    //     if(selectedChat){
    //         console.log(selectedChat);
    //     }
    // }, [selectedChat]);

    // useEffect(() => {
    //     setUser("E215EDB2-5E0D-4F22-9AB9-12131567890A");
    //     const getChats = async ():Promise<void> => {
    //         try {
    //             const result = await axios.get("http://127.0.0.1:8000/chats")
    //             setChats(result.data); // Atualiza o estado com os dados da resposta
    //         } catch (error) {
    //             console.error("Error ao buscar chats:", error);
    //         }
    //     };
    //     getChats();// Chama a função ao montar o componente
    // }, []); // O array vazio [] garante que o `useEffect` seja executado apenas uma vez
    // background-color: rgb(75, 75, 75);
    // flex: 1;
    // height: 100vh;
    // justify-content: center;
    // align-items: center;
    return( // ChatMensagemLogin
        <div className="Chat">
            <ListaChats chats={chats} setSelectedChat={setSelectedChat} />
            {/* <ListaChats chats={chats} setSelectedChat={setSelectedChat} user={user}/> */}

            <ChatMensagem />
            {/* {selectedChat ? 
                    (<ChatMensagem chat={selectedChat}/>)
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
                        Olá, você esta em um chat temporario, ao fechar essa pagina você perdera as conversas! 
                            <br />
                            <br />
                        Faça login para salvar as conversas
                    </h1>
                </div>
            } */}
            
        </div>
    );
}