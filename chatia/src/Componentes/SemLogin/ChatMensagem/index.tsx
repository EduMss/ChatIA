import './ChatMensagem.css';
import React, { useEffect, useState, useRef } from 'react';
import { MensagemLogout, GetMensagensTemp, GetMensagemTemp } from '../../../Interfaces';
import axios from 'axios';

const ChatMensagem: React.FC = () => {
    // let [mensagens, setMensagens] = useState<GetMensagens>([]);
    let [novaMensagem, setNovaMensagem] = useState<string>("");
    const mensagemRef = useRef<HTMLDivElement | null>(null); // Array de refs

    const [mensagens, setMensagens] = useState<GetMensagensTemp>(() => {
        const savedChat = localStorage.getItem('chat');
        return savedChat ? JSON.parse(savedChat) : []; // Parseia a string JSON
    });

    const isWebKit = () => {
        return /AppleWebKit/i.test(navigator.userAgent);
    };

    // Atualizar o localStorage sempre que o selectedChat mudar
    useEffect(() => {
        if (mensagens) {
            localStorage.setItem('mensagens', JSON.stringify(mensagens));
        } else {
            localStorage.removeItem('mensagens'); // Remove se for null
        }
    }, [mensagens]);

    const getMensagens = async ():Promise<void> => {
        const nova: GetMensagemTemp = {sender: "user", message: novaMensagem}
        setMensagens((mensagens)=> [...mensagens, nova]); // Atualiza o estado com os dados da resposta

        try {
            const result = await axios.post(`http://127.0.0.1:8000/chats/messages`, {
                message: novaMensagem
            })

            console.log(result);
            const nova: GetMensagemTemp = {sender: "bot", message: result.data}
            

            setMensagens((mensagens)=> [...mensagens, nova]); // Atualiza o estado com os dados da resposta
            //console.log(result.data);
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    // const postMensagem = async ():Promise<void> => {
    //     try {
    //         const result = await axios.post(`http://127.0.0.1:8000/chats/${chat.id}/messages`, {
    //             sender: "user",
    //             message: novaMensagem,
    //             date: "2024-11-07T14:32:00"
    //     })
    //         //setMensagens(result.data); // Atualiza o estado com os dados da resposta
    //         //console.log(result.data);
    //     } catch (error) {
    //         console.error("Error ao buscar chats:", error);
    //     }
    // };

    const scrollToBottom = () => {
        // Verifica se a referência da última mensagem foi definida
        if (mensagemRef.current) {
            // Rola até a última mensagem
            mensagemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // useEffect(() => {
    //     getMensagens();// Chama a função ao montar o componente
    // }, [chat]);

    useEffect(()=>{
        scrollToBottom();
    }, [mensagens])

    const EnviarMensagem = async () => {
        await getMensagens();
        setNovaMensagem("");
    };

    return (
        <div className='ChatMensagem'>
            <div className={`Mensagem {isWebKit() ? '' : 'scrollable-div'}`}>
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
                <div ref={mensagemRef}></div>
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

export default ChatMensagem;