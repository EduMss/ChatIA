import React, {useEffect, useState} from "react";
import axios from "axios";
import './Chat.css';
import { GetChat, ChatInterface } from  "../../../Interfaces/index.ts";
import ListaChats from "../../SemLogin/ListaChats/index.tsx";
import ChatMensagem from "../../ChatMensagem/index.tsx";
import Cookies from 'js-cookie';
import ListaChatsLogin from "../../ListaChatsLogin/index.tsx";
import Loading from "../../Loading/index.tsx";
import ChatMensagemLogin from "../../ChatMensagemLogin/index.tsx";



export default function Chat(){
    let [user, setUser] = useState<string | null>(null);

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

    const [Bearer_token, setBearer_token] = useState(Cookies.get('BEARER_TOKEN'));
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
  
    //Obtendo informações do cliente
    useEffect(() => {
      const VerificarLogin = async () => {
        let result;
        if (Bearer_token !== ""){
          try {
              result = await axios.get(`http://127.0.0.1:8000/protected`,{
                  headers: {'Authorization': `Bearer ${Bearer_token}`}
              })
              return result.status === 200 ? setIsLogin(true) : setIsLogin(false);
          } catch (error) {
              console.error("Error ao buscar chats:", error);
          }
        }
        setIsLogin(false);
        setIsLoading(false);
      }
      
      VerificarLogin(); // Chama a função assíncrona
    }, []); // Dependências do useEffect
  
    // para parar o loading quando você fazer o login
    useEffect(() => {
      setIsLoading(false);
    }, [Bearer_token])

    //Executar quando selecionar um chat
    // useEffect(() => {
    //     if(selectedChat){
    //         console.log(selectedChat);
    //     }
    // }, [selectedChat]);

    useEffect(() => {
        setUser("E215EDB2-5E0D-4F22-9AB9-12131567890A");
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
    // background-color: rgb(75, 75, 75);
    // flex: 1;
    // height: 100vh;
    // justify-content: center;
    // align-items: center;
    return( // ChatMensagemLogin
        <div className="Chat">
            {isLogin ? 
                    <ListaChatsLogin chats={chats} setSelectedChat={setSelectedChat} user={user} /> 
                        : 
                    <ListaChats chats={chats} setSelectedChat={setSelectedChat} user={user} />
            }
            {/* <ListaChats chats={chats} setSelectedChat={setSelectedChat} user={user}/> */}
            {selectedChat ? 
                isLogin ? 
                    (<ChatMensagemLogin user={user} chat={selectedChat}/> )
                        : 
                    (<ChatMensagem user={user} chat={selectedChat}/>)
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
                    }}>{isLogin ? 
                        "Olá, clique em algum chat para começar a conversar!"
                            :
                        "Olá, você esta em um chat temporario, ao fechar essa pagina você perdera as conversas! Faça login para salvar as conversas"
                    }</h1>
                </div>
            }
            
        </div>
    );
}