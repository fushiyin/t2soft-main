# Start Firebase Development Environment
# This script starts both Firebase emulators and the Vite dev server

Write-Host "Starting Firebase Development Environment..." -ForegroundColor Green

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
if (-not (Test-Command "firebase")) {
    Write-Host "Error: Firebase CLI not found. Please install it with: npm install -g firebase-tools" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Host "Error: Node.js not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

# Set working directory to script location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath

Write-Host "Checking dependencies..." -ForegroundColor Yellow

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing main dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if functions/node_modules exists
if (-not (Test-Path "functions/node_modules")) {
    Write-Host "Installing functions dependencies..." -ForegroundColor Yellow
    Set-Location "functions"
    npm install
    Set-Location ".."
}

Write-Host "Starting Firebase Emulators..." -ForegroundColor Green
Write-Host "Firebase UI will be available at: http://localhost:4000" -ForegroundColor Cyan
Write-Host "Functions will be available at: http://localhost:5001/trading-76356/us-central1/api" -ForegroundColor Cyan
Write-Host "Firestore will be available at: http://localhost:8080" -ForegroundColor Cyan

# Start Firebase emulators in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "firebase emulators:start"

# Wait a bit for emulators to start
Start-Sleep -Seconds 5

Write-Host "Starting Vite development server..." -ForegroundColor Green
Write-Host "Development server will be available at: http://localhost:5173" -ForegroundColor Cyan

# Start Vite dev server
npm run dev
