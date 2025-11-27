@echo off
echo Iniciando Servidores de Stock... El navegador se abrirá en breve.

cd /d "C:\Users\Usuario\Desktop\UTN - Nuevo plan\Metodologías de Sistemas II\Proyecto"

start "Logs Servidores Stock" /min npm start

timeout /t 5 /nobreak > nul

exit