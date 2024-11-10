from pydantic import BaseModel
from typing import Optional
from datetime import datetime

#Criando um Type para facilitar na hora de receber a resposta na requisição,
class TextRequest(BaseModel):
    text: str

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

class Singup(BaseModel):
    userName: str
    password: str

class Login(BaseModel):
    userID: str
    UserName: str
