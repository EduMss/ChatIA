import './ChatMensagem.css';
import React, { useEffect, useState } from 'react';
import { Mensagem, GetMensagens } from '../../Interfaces';
import axios from 'axios';

const ChatMenssagem: React.FC<Mensagem> = ({user, chat}) => {
    let [mensagens, setMensagens] = useState<GetMensagens>([]);
    let [novaMensagem, setNovaMensagem] = useState<string>("");

    const getMensagens = async ():Promise<void> => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/chats/${chat.id}/messages`)
            setMensagens(result.data); // Atualiza o estado com os dados da resposta
            console.log(result.data);
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    const postMensagem = async ():Promise<void> => {
        try {
            const result = await axios.post(`http://127.0.0.1:8000/chats/${chat.id}/messages`, {
                sender: "user",
                message: novaMensagem,
                date: "2024-11-07T14:32:00"
        })
            //setMensagens(result.data); // Atualiza o estado com os dados da resposta
            console.log(result.data);
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    useEffect(() => {
        getMensagens();// Chama a função ao montar o componente
    }, [chat]);

    const EnviarMensagem = () => {
        console.log(novaMensagem);
        postMensagem();
        
        getMensagens();
    };

    return (
        <div className='ChatMensagem'>
            <div className='Mensagem'>
                {mensagens && mensagens.map((mensagem, index) => (
                    mensagem.sender === "user" ? 
                    <div className='MensagemUser' key={index} style={{color:'yellow'}}>
                        <label>{mensagem.message}</label>
                    </div>
                    :
                    <div className='MensagemBot' key={index} style={{color:'red'}}>
                        <label>{mensagem.message}</label>
                    </div>
                ))}
            </div>
            <div className='InputMensagem'>
                <input 
                    type="text" 
                    placeholder="Mensagem para a IA"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                />
                <div className='ButtonSend' onClick={EnviarMensagem}>
                    {/* Tem que colocar a tag <link> no public/index.html */}
                    <span className="material-symbols-outlined" style={{fontSize: '36px', color: 'whitesmoke'}}>send</span>
                </div>
            </div>
        </div>
    );
};

export default ChatMenssagem;