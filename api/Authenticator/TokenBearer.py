from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
import bcrypt
from datetime import datetime, timedelta
from api.Models.ClassesModel import Login

# Configurações
SECRET_KEY = "seu_segredo_seguro"
ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30 # 30 minutos
ACCESS_TOKEN_EXPIRE_MINUTES = 7 * 24 * 60  # 7 dias em minutos (dias * hora * minutos)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Função para verificar o token
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = Login(userID=payload.get("userID"), UserName=payload.get("sub"))

        if payload.get("sub") is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirado")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")


def verify_password(plain_password: str, hashed_password: bytes):
    # Não há necessidade de conversão de bytes para string, bcrypt já trabalha com bytes
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

# Função para gerar o token JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt