import bcrypt

def GerarHASH(senha: str):
    if senha:
        # Gerar um salt
        salt = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), salt)
        return senha_hash

    return None

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()  # Gera o salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)  # Hash da senha
    return hashed_password  # Retorna como bytes

def VerificarSenhaHASH(senha, hash):
    return bcrypt.checkpw(senha.encode('utf-8'), hash)