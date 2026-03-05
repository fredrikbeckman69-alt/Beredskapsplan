@echo off
title Beredskapsplan - Lokal Dev Server
color 0A

echo ========================================================
echo Startar Beredskapsplanens lokala server...
echo ========================================================
echo.

:: Byt katalog till app-mappen (där package.json ligger)
cd /d "%~dp0app"

echo [1/2] Rensa eventuella kraschade las-filer (lock files) fran .next...
if exist ".next\dev\lock" (
    del /q /f ".next\dev\lock" >nul 2>&1
    echo   - Lock-fil borttagen.
) else (
    echo   - Ingen lock-fil hittades, vilket ar bra.
)

echo.
echo [2/2] Drar igang Next.js...
echo Servern koms nat pa http://localhost:3000
echo.
echo Tryck Ctrl+C nar du vill stanga av servern.
echo.

npm run dev

echo.
pause
