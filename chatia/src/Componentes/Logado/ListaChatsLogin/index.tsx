import './ListaChatsLogin.css';
import React from 'react';
import { ListaChatsProps, ChatInterface } from  "../../../Interfaces/index.ts";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const ListaChatsLogin: React.FC<ListaChatsProps> = ({chats, setSelectedChat, user }) => {
    const navigate = useNavigate();
    const OpenChat = (chats: ChatInterface) => {
        setSelectedChat(chats);
    }

    const Logout = () => {
        // Exibe o alerta de confirmação
        const confirmacao = window.confirm(`Deseja realmente fazer logout?`);
        if (confirmacao) {
            //Remover o cookie do token
            Cookies.remove('BEARER_TOKEN');
            navigate("/");
            window.location.reload();
        }
    }

    return (
        <div className='ListaChats'>
            <div className='Chats'>
                {chats.map((chat, index) => (
                    <div className='Div-Button' key={index} onClick={() => OpenChat(chat)}>
                        <label>Id: {chat.id}</label>
                    </div>
                ))}
            </div>
            <div className='Settings'>
                <div className='Div-Button'>
                    <label>Novo chat</label>
                </div>
                <div className='Div-Button' onClick={Logout}>
                    <label>Logout</label>
                </div>
            </div>

        </div>
    );
};


export default ListaChatsLogin;