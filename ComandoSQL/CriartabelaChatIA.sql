--Execu��o 1
-- Cria��o da tabela 'chats' (para armazenar os metadados do chat)
CREATE TABLE chats (
    id INT IDENTITY PRIMARY KEY,  -- ID �nico para cada chat
    user_1_id UNIQUEIDENTIFIER NOT NULL,  -- ID do primeiro usu�rio
    user_2_id UNIQUEIDENTIFIER,  -- ID do segundo usu�rio (opcional, no caso de chat entre dois usu�rios)
    start_date DATETIME NOT NULL,  -- Data de in�cio do chat
    end_date DATETIME,  -- Data de t�rmino do chat (pode ser nulo se o chat estiver em andamento)
    status VARCHAR(50) NOT NULL  -- Status do chat (por exemplo, "ativo", "finalizado", etc.)
);



--Execu��o 2
-- Cria��o dos filegroups
ALTER DATABASE ChatIA ADD FILEGROUP FG1;
ALTER DATABASE ChatIA ADD FILEGROUP FG2;
ALTER DATABASE ChatIA ADD FILEGROUP FG3;

-- Adicionar arquivos aos filegroups (ajuste o caminho conforme necess�rio)
ALTER DATABASE ChatIA ADD FILE (
    NAME = FG1_data,
    FILENAME = 'C:\SQL\FG1_data.ndf'
) TO FILEGROUP FG1;

ALTER DATABASE ChatIA ADD FILE (
    NAME = FG2_data,
    FILENAME = 'C:\SQL\FG2_data.ndf'
) TO FILEGROUP FG2;

ALTER DATABASE ChatIA ADD FILE (
    NAME = FG3_data,
    FILENAME = 'C:\SQL\FG3_data.ndf'
) TO FILEGROUP FG3;



--Execu��o 3
-- Altera��o da fun��o de particionamento para 3 faixas
CREATE PARTITION FUNCTION pfChatId (INT)
AS RANGE LEFT FOR VALUES (1000, 2000);  -- Agora s�o apenas 3 faixas: 0-999, 1000-1999, 2000+



--Execu��o 4
-- Cria��o do esquema de particionamento (mantendo 3 filegroups)
CREATE PARTITION SCHEME psChatId
AS PARTITION pfChatId
TO (FG1, FG2, FG3);  -- 3 filegroups, um para cada faixa de parti��o


--Execu��o 5
-- Cria��o da tabela 'messages' particionada por 'chat_id'
CREATE TABLE messages (
    id INT IDENTITY,  -- ID �nico para cada mensagem
    chat_id INT NOT NULL,  -- ID do chat (relacionado � tabela 'chats')
    sender VARCHAR(50) NOT NULL,  -- 'user' ou 'bot'
    message TEXT NOT NULL,  -- Texto da mensagem
    date DATETIME NOT NULL,  -- Data e hora em que a mensagem foi enviada
    CONSTRAINT PK_messages PRIMARY KEY (chat_id, id)  -- Incluindo 'chat_id' na chave prim�ria
) ON psChatId (chat_id);  -- Particionando a tabela com base no 'chat_id'



--Execu��o 6
-- Criar um �ndice para melhorar o desempenho das consultas por 'chat_id'
CREATE INDEX idx_chat_id ON messages (chat_id);




--Execu��o 7
-- Criar �ndice para otimizar as consultas por 'chat_id' e 'date' (para ordena��o e filtragem)
CREATE INDEX idx_chat_id_date ON messages (chat_id, date);



--Execu��o 8
-- Passo 5: Verifica��o e Teste
-- Verificar os �ndices na tabela 'messages'
SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('messages');



--Execu��o 9
-- Verificar as parti��es usadas pela tabela
SELECT 
    t.name AS TableName,
    p.partition_number,
    p.rows AS RowCount,  -- Alias para p.rows
    fg.name AS FileGroup
FROM 
    sys.partitions p
JOIN 
    sys.tables t ON p.object_id = t.object_id
JOIN 
    sys.filegroups fg ON p.data_space_id = fg.data_space_id
WHERE 
    t.name = 'messages';



SELECT * 
FROM sys.tables
WHERE name = 'messages';



SELECT * 
FROM sys.partitions
WHERE object_id = OBJECT_ID('messages');
