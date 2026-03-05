@echo off
cd /d "%~dp0app"
:loop
if exist ".next\dev\lock" del /q /f ".next\dev\lock" >nul 2>&1
call npm run dev
timeout /t 3 /nobreak >nul
goto loop
