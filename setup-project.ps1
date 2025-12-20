# ELYF EVSPARE - Project Setup Script
# Run this script to set up the development environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    ELYF EVSPARE - Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    $npmVersion = npm --version 2>$null
    
    if ($nodeVersion -and $npmVersion) {
        Write-Host "✅ Node.js is installed!" -ForegroundColor Green
        Write-Host "   Node.js version: $nodeVersion" -ForegroundColor Gray
        Write-Host "   npm version: $npmVersion" -ForegroundColor Gray
        Write-Host ""
        
        # Check if dependencies are installed
        if (Test-Path "node_modules") {
            Write-Host "✅ Dependencies are already installed!" -ForegroundColor Green
        } else {
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            npm install
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
            } else {
                Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
                exit 1
            }
        }
        
        Write-Host ""
        Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
        Write-Host "   The application will open at: http://localhost:5173" -ForegroundColor Gray
        Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host ""
        
        # Start the development server
        npm run dev
        
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor Gray
    Write-Host "2. Download the LTS version" -ForegroundColor Gray
    Write-Host "3. Run the installer" -ForegroundColor Gray
    Write-Host "4. Restart PowerShell" -ForegroundColor Gray
    Write-Host "5. Run this script again" -ForegroundColor Gray
    Write-Host ""
    
    $choice = Read-Host "Open Node.js download page? (y/n)"
    if ($choice -eq "y" -or $choice -eq "Y") {
        Start-Process "https://nodejs.org/"
    }
    
    Write-Host ""
    Write-Host "Alternative installation methods:" -ForegroundColor Yellow
    Write-Host "• Using Winget: winget install OpenJS.NodeJS" -ForegroundColor Gray
    Write-Host "• Using Chocolatey: choco install nodejs" -ForegroundColor Gray
    Write-Host ""
    
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup complete! Your development environment is ready." -ForegroundColor Green