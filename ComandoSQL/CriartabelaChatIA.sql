--Execução 1
-- Criação da tabela 'chats' (para armazenar os metadados do chat)
CREATE TABLE chats (
    id INT IDENTITY PRIMARY KEY,  -- ID único para cada chat
    user_1_id UNIQUEIDENTIFIER NOT NULL,  -- ID do primeiro usuário
    user_2_id UNIQUEIDENTIFIER,  -- ID do segundo usuário (opcional, no caso de chat entre dois usuários)
    start_date DATETIME NOT NULL,  -- Data de início do chat
    end_date DATETIME,  -- Data de término do chat (pode ser nulo se o chat estiver em andamento)
    status VARCHAR(50) NOT NULL  -- Status do chat (por exemplo, "ativo", "finalizado", etc.)
);



--Execução 2
-- Criação dos filegroups
ALTER DATABASE ChatIA ADD FILEGROUP FG1;
ALTER DATABASE ChatIA ADD FILEGROUP FG2;
ALTER DATABASE ChatIA ADD FILEGROUP FG3;

-- Adicionar arquivos aos filegroups (ajuste o caminho conforme necessário)
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



--Execução 3
-- Alteração da função de particionamento para 3 faixas
CREATE PARTITION FUNCTION pfChatId (INT)
AS RANGE LEFT FOR VALUES (1000, 2000);  -- Agora são apenas 3 faixas: 0-999, 1000-1999, 2000+



--Execução 4
-- Criação do esquema de particionamento (mantendo 3 filegroups)
CREATE PARTITION SCHEME psChatId
AS PARTITION pfChatId
TO (FG1, FG2, FG3);  -- 3 filegroups, um para cada faixa de partição


--Execução 5
-- Criação da tabela 'messages' particionada por 'chat_id'
CREATE TABLE messages (
    id INT IDENTITY,  -- ID único para cada mensagem
    chat_id INT NOT NULL,  -- ID do chat (relacionado à tabela 'chats')
    sender VARCHAR(50) NOT NULL,  -- 'user' ou 'bot'
    message TEXT NOT NULL,  -- Texto da mensagem
    date DATETIME NOT NULL,  -- Data e hora em que a mensagem foi enviada
    CONSTRAINT PK_messages PRIMARY KEY (chat_id, id)  -- Incluindo 'chat_id' na chave primária
) ON psChatId (chat_id);  -- Particionando a tabela com base no 'chat_id'



--Execução 6
-- Criar um índice para melhorar o desempenho das consultas por 'chat_id'
CREATE INDEX idx_chat_id ON messages (chat_id);




--Execução 7
-- Criar índice para otimizar as consultas por 'chat_id' e 'date' (para ordenação e filtragem)
CREATE INDEX idx_chat_id_date ON messages (chat_id, date);



--Execução 8
-- Passo 5: Verificação e Teste
-- Verificar os índices na tabela 'messages'
SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('messages');



--Execução 9
-- Verificar as partições usadas pela tabela
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
