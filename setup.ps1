#!/usr/bin/env pwsh

# Color setup
$GREEN = "`e[32m"
$RED = "`e[31m"
$YELLOW = "`e[33m"
$BLUE = "`e[34m"
$RESET = "`e[0m"

Write-Host "${BLUE}╭─────────────────────────────────────╮${RESET}"
Write-Host "${BLUE}│     TodoList Project Setup          │${RESET}"
Write-Host "${BLUE}╰─────────────────────────────────────╯${RESET}"
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "${YELLOW}⚠️  No .env file found${RESET}"
    Write-Host ""
    Write-Host "Creating .env from .env.example..."
    
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "${GREEN}✓ .env created successfully${RESET}"
        Write-Host ""
        Write-Host "${YELLOW}⚠️  Please update .env with your local configuration:${RESET}"
        Write-Host "   - DB_URI (MongoDB connection)"
        Write-Host "   - APP_PORT (optional)"
        Write-Host "   - Other variables as needed"
        Write-Host ""
    } else {
        Write-Host "${RED}✗ .env.example not found${RESET}"
        exit 1
    }
} else {
    Write-Host "${GREEN}✓ .env file already exists${RESET}"
}

Write-Host ""
Write-Host "Installing dependencies..."

# Install dependencies
pnpm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "${GREEN}✓ Dependencies installed${RESET}"
} else {
    Write-Host "${RED}✗ Failed to install dependencies${RESET}"
    exit 1
}

Write-Host ""
Write-Host "Building project..."

pnpm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "${GREEN}✓ Build successful${RESET}"
} else {
    Write-Host "${RED}✗ Build failed${RESET}"
    exit 1
}

Write-Host ""
Write-Host "${GREEN}╭─────────────────────────────────────╮${RESET}"
Write-Host "${GREEN}│  Setup completed successfully!      │${RESET}"
Write-Host "${GREEN}╰─────────────────────────────────────╯${RESET}"
Write-Host ""
Write-Host "Next steps:"
Write-Host ""
Write-Host "${BLUE}1. Edit .env with your configuration${RESET}"
Write-Host "   notepad .env"
Write-Host ""
Write-Host "${BLUE}2. Start development server${RESET}"
Write-Host "   pnpm run start:dev"
Write-Host ""
Write-Host "${BLUE}3. Or start in production${RESET}"
Write-Host '   $env:NODE_ENV="production"; pnpm run start:prod'
Write-Host ""
Write-Host "Documentation: See ENVIRONMENT_CONFIG_GUIDE.md"
Write-Host ""
