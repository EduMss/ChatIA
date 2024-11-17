import './ListaChatsLogin.css';
import React from 'react';
import { ListaChatsProps, ChatInterface } from  "../../../Interfaces/index.ts";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ListaChatsLogin: React.FC<ListaChatsProps> = ({chats, setSelectedChat,setChats, user }) => {
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

    const CriarChat = async () => {
        const Bearer_token = Cookies.get('BEARER_TOKEN');
        try {
            const result = await axios.post(`http://127.0.0.1:8000/chats`,{
                user_1_id: "e215edb2-5e0d-4f22-9ab9-12131567890ab",
                user_2_id: "9b59c515-df94-46e7-838b-9876543210cd",
                start_date: "2024-11-07T14:30:00",
                status: "active"
            }, {
                headers: {'Authorization': `Bearer ${Bearer_token}`}
            })
            //setMensagens(result.data); // Atualiza o estado com os dados da resposta
            // console.log(result.data);
            
            // definindo no chats para ele conseguir atualizar a lista
            setChats((chats) => [...chats, result.data])
        } catch (error) {
            console.error("Error ao buscar chats:", error);
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
                <div className='Div-Button' onClick={CriarChat}>
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