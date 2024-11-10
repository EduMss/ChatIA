import pyodbc

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

# Função para estabelecer a conexão com o SQL Server
def get_db_connection_Login():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=192.168.0.192;'  # Substitua pelo endereço do seu servidor
        'DATABASE=Login;'  # Substitua pelo nome do seu banco de dados
        'UID=ia;'  # Substitua pelo nome de usuário
        'PWD=M@theus.54'  # Substitua pela senha
    )
    return conn