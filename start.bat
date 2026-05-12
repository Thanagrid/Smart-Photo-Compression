@echo off
title Smart Photo Compressor
color 0A

echo.
echo  ============================================
echo    Smart Photo Compressor - Starting...
echo  ============================================
echo.

:: Navigate to the project directory
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo  [!] Installing dependencies...
    echo.
    call npm install
    echo.
)

:: Open browser after a short delay (in background)
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

:: Start the dev server (keeps terminal open)
echo  [*] Starting Next.js development server...
echo  [*] Browser will open automatically in a few seconds.
echo  [*] Press Ctrl+C to stop the server.
echo.
echo  ============================================
echo.

call npm run dev
