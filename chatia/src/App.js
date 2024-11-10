import './App.css';
import Chat from './Chat/index.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './Login/index.tsx';

function App() {
  return (
  <BrowserRouter>
    <div className="AppLayout">
      <div className="Content">
        <Routes>
          <Route path="/" element={<Chat />} />
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
