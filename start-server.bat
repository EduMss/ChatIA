:: @echo off
:: Iniciando VM do banco de dados
powershell -Command "Start-Process powershell -ArgumentList '-Command \"Start-VM -Name \\\"WindowsServer DBA\\\"\"' -Verb runAs"
:: se eu não quiser o que powershell feche ao finalizar a execução, use o comando abaixo:
:: powershell -NoExit -Command "Start-Process powershell -ArgumentList '-NoExit -Command \"Start-VM -Name \\\"WindowsServer DBA\\\"\"' -Verb runAs"

:: Iniciando com 3 terminais separado
:: Iniciando o servidor do ollama(IA)
:: start cmd /k "ollama serve"

:: Iniciando API
:: start cmd /k "uvicorn api.main:app --reload"

:: Iniciando ChatIA
:: start cmd /k "cd chatia && npm start"


:: Obtém o diretório atual
set "current_dir=%cd%" 
start wt new-tab cmd /k "TITLE Ollama && cd /d %current_dir% && ollama serve"; ^
    new-tab cmd /k "TITLE API && cd /d %current_dir% && uvicorn api.main:app --reload"; ^
    new-tab cmd /k "TITLE ChatIA && cd /d %current_dir% && cd chatia && npm start"