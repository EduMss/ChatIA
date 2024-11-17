import './ChatMensagem.css';
import React, { useEffect, useState, useRef } from 'react';
import { GetMensagensTemp, GetMensagemTemp } from '../../../Interfaces';
import axios from 'axios';

const ChatMensagem: React.FC = () => {
    let [novaMensagem, setNovaMensagem] = useState<string>("");
    const mensagemRef = useRef<HTMLDivElement | null>(null); // Array de refs

    const [mensagens, setMensagens] = useState<GetMensagensTemp>(() => {
        const savedChat = localStorage.getItem('chat');
        return savedChat ? JSON.parse(savedChat) : []; // Parseia a string JSON
    });

    // const isWebKit = () => {
    //     return /AppleWebKit/i.test(navigator.userAgent);
    // };

    // Atualizar o localStorage sempre que o selectedChat mudar
    useEffect(() => {
        if (mensagens) {
            localStorage.setItem('mensagens', JSON.stringify(mensagens));
        } else {
            localStorage.removeItem('mensagens'); // Remove se for null
        }
    }, [mensagens]);

    const EnviarAPIMensagem = async ():Promise<void> => {
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

    const scrollToBottom = () => {
        // Verifica se a referência da última mensagem foi definida
        if (mensagemRef.current) {
            // Rola até a última mensagem
            mensagemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(()=>{
        scrollToBottom();
    }, [mensagens])

    const EnviarMensagem = async () => {
        await EnviarAPIMensagem();
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
                {mensagens.length <= 0 ? <div style={{
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
                        Olá, você esta em um chat temporario, ao fechar ou recarregar essa pagina você perdera as conversas! 
                            <br />
                            <br />
                        Faça login para salvar as conversas
                    </h1>
                </div> 
                    :
                <></>
                }
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