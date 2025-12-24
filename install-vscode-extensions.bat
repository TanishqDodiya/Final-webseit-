@echo off
echo Installing VS Code extensions for Tailwind CSS support...

code --install-extension bradlc.vscode-tailwindcss
code --install-extension csstools.postcss

echo.
echo Extensions installed successfully!
echo Please restart VS Code to see the changes.
echo.
pause