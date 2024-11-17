import './App.css';
import ChatLogin from './Componentes/Logado/ChatLogin/index.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react';
import Login from './Login/index.tsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from './Componentes/Loading/index.tsx';
import Chat from './Componentes/SemLogin/Chat/index.tsx';

function App() {
  // const [Bearer_token, setBearer_token] = useState(Cookies.get('BEARER_TOKEN'));
  const Bearer_token = Cookies.get('BEARER_TOKEN');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  //Obtendo informações do cliente
  useEffect(() => {
    // setIsLogin(true);
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

  return (
  <BrowserRouter>
    <div className="AppLayout">
      <div className="Content">
        <Routes>
          
          <Route path="/" element={isLoading ? <Loading /> : isLogin ? <ChatLogin /> : <Chat /> } />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
    // <div className="App">
    //   <Chat/>
    // </div>
  );
}

export default App;
