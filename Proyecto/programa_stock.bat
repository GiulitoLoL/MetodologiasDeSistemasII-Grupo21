@echo off
echo Iniciando Servidores de Stock... El navegador se abrirá en breve.

:: Cambia el directorio actual a la ruta del proyecto (ejemplo: ajústalo a tu ruta real)
cd /d "C:\Users\Usuario\Desktop\UTN - Nuevo plan\Metodologías de Sistemas II\Proyecto"

:: 🚨 CAMBIO CLAVE: Se usa /min para minimizar la ventana al abrir.
start "Logs Servidores Stock" /min npm start

:: Esperamos 5 segundos para que los servidores inicien antes de cerrar el .bat
timeout /t 5 /nobreak > nul

:: La ventana del .bat se cierra automáticamente
exit