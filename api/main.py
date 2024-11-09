# Bibliotecas utilizadas:
# pip install fastapi uvicorn pyodbc
# pip install ollama
# start api:
# uvicorn main:app --reload



import pyodbc
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import ollama

# Configuração da API FastAPI
app = FastAPI()

#Corrigir alguns erros de CORS:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # * para liberar todos os IPs, ou informe um IP especifico no lugar de *, ou você pode colocar mais do que só 1 IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Criando um Type para facilitar na hora de receber a resposta na requisição,
class TextRequest(BaseModel):
    text: str

# Função para estabelecer a conexão com o SQL Server
def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=192.168.0.192;'  # Substitua pelo endereço do seu servidor
        'DATABASE=ChatIA;'  # Substitua pelo nome do seu banco de dados
        'UID=ia;'  # Substitua pelo nome de usuário
        'PWD=M@theus.54'  # Substitua pela senha
    )
    return conn

# Modelos de dados com Pydantic
class Chat(BaseModel):
    user_1_id: str
    user_2_id: Optional[str] = None
    start_date: datetime
    end_date: Optional[datetime] = None
    status: str

    class Config:
        orm_mode = True

class GetChat(BaseModel):
    id: int
    user_1_id: str
    user_2_id: Optional[str] = None
    start_date: datetime
    end_date: Optional[datetime] = None
    status: str

class Message(BaseModel):
    id: int
    chat_id: int
    sender: str
    message: str
    date: datetime

class PostMessage(BaseModel):
    sender: str
    message: str
    date: datetime

# Rota para listar todos os chats
@app.get("/chats/", response_model=List[GetChat])
def get_chats():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM chats")
    chats = cursor.fetchall()
    conn.close()
    
    return [GetChat(id=row[0], user_1_id=row[1], user_2_id=row[2], 
                 start_date=row[3], end_date=row[4], status=row[5]) for row in chats]

# Rota para listar todas as mensagens de um chat específico
@app.get("/chats/{chat_id}/messages", response_model=List[Message])
def get_messages(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM messages WHERE chat_id = ?", (chat_id,))
    messages = cursor.fetchall()
    conn.close()
    
    return [Message(id=row[0], chat_id=row[1], sender=row[2], message=row[3], date=row[4]) for row in messages]

# Rota para criar uma nova mensagem
@app.post("/chats/{chat_id}/messages", response_model=PostMessage)
def create_message(chat_id: int, message: PostMessage):
    if not message.message:
        raise HTTPException(status_code=400,detail="Não enviou nenhuma pergunta!")

    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO messages (chat_id, sender, message, date) VALUES (?, ?, ?, ?)",
        (chat_id, message.sender, message.message, message.date)
    )
    conn.commit()
    
    try:
        response = ollama.chat(model="tinyllama", messages=[
            # tem varios tipos de role, ver para que serve cada um
            # Poso enviar uma lista de mensagem, cada uma mensagem vai ser um objeto
            # no lugar de content tem outras opções, estudar para ver oque cada uma faz, tem um "imagem"
            {
                "role":"user",
                "content": message.message
            }
        ])
        llm_res = response.get('message', {}).get('content','')
        cursor.execute(
            "INSERT INTO messages (chat_id, sender, message, date) VALUES (?, ?, ?, ?)",
            (chat_id, 'bot', llm_res, message.date)
        )
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    conn.close()
    return message

# Rota para criar um novo chat
@app.post("/chats/", response_model=GetChat)
def create_chat(chat: Chat):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Inserir o novo chat no banco de dados e capturar o ID gerado automaticamente
    cursor.execute(
        "INSERT INTO chats (user_1_id, user_2_id, start_date, status) "
        "OUTPUT INSERTED.id "
        "VALUES (?, ?, ?, ?)",
        (chat.user_1_id, chat.user_2_id, chat.start_date, chat.status)
    )
    
    # Recupera o id gerado pela inserção
    new_chat_id = cursor.fetchone()[0]
    
    conn.commit()
    conn.close()
    
    # Retornar o objeto Chat com o id gerado
    return {**chat.model_dump(), "id": new_chat_id}
    # return {**chat.dict(), "id": new_chat_id}
