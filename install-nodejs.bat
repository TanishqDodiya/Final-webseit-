@echo off
echo ========================================
echo    ELYF EVSPARE - Node.js Setup
echo ========================================
echo.

echo Checking if Node.js is already installed...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js is already installed!
    node --version
    npm --version
    echo.
    echo You can now run: npm install
    echo Then run: npm run dev
    pause
    exit /b 0
)

echo ❌ Node.js is not installed.
echo.
echo Please choose an installation method:
echo.
echo 1. Download from official website (Recommended)
echo 2. Use Winget (Windows 10/11)
echo 3. Manual installation guide
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Opening Node.js download page...
    start https://nodejs.org/
    echo.
    echo 📋 Instructions:
    echo 1. Download the LTS version
    echo 2. Run the installer
    echo 3. Follow the setup wizard
    echo 4. Restart this terminal
    echo 5. Run this script again to verify
    echo.
) else if "%choice%"=="2" (
    echo.
    echo Attempting to install Node.js using Winget...
    winget install OpenJS.NodeJS
    if %errorlevel% == 0 (
        echo ✅ Node.js installed successfully!
        echo Please restart this terminal and run this script again.
    ) else (
        echo ❌ Winget installation failed.
        echo Please try option 1 instead.
    )
    echo.
) else if "%choice%"=="3" (
    echo.
    echo 📋 Manual Installation Steps:
    echo.
    echo 1. Go to https://nodejs.org/
    echo 2. Click "Download Node.js (LTS)"
    echo 3. Run the downloaded installer
    echo 4. Make sure "Add to PATH" is checked
    echo 5. Complete the installation
    echo 6. Restart your terminal/command prompt
    echo 7. Run: node --version
    echo 8. Run: npm --version
    echo 9. If both show version numbers, you're ready!
    echo.
) else (
    echo Invalid choice. Please run the script again.
)

echo.
echo After Node.js is installed, run these commands:
echo   npm install
echo   npm run dev
echo.
pause