#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╭─────────────────────────────────────╮${NC}"
echo -e "${BLUE}│     TodoList Project Setup          │${NC}"
echo -e "${BLUE}╰─────────────────────────────────────╯${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found${NC}"
    echo ""
    echo "Creating .env from .env.example..."
    
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ .env created successfully${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  Please update .env with your local configuration:${NC}"
        echo "   - DB_URI (MongoDB connection)"
        echo "   - APP_PORT (optional)"
        echo "   - Other variables as needed"
        echo ""
    else
        echo -e "${RED}✗ .env.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo "Installing dependencies..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}✗ pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi

# Install dependencies
pnpm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo "Building project..."

pnpm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}╭─────────────────────────────────────╮${NC}"
echo -e "${GREEN}│  Setup completed successfully!      │${NC}"
echo -e "${GREEN}╰─────────────────────────────────────╯${NC}"
echo ""
echo "Next steps:"
echo ""
echo -e "${BLUE}1. Edit .env with your configuration${NC}"
echo "   nano .env"
echo ""
echo -e "${BLUE}2. Start development server${NC}"
echo "   pnpm run start:dev"
echo ""
echo -e "${BLUE}3. Or start in production${NC}"
echo "   NODE_ENV=production pnpm run start:prod"
echo ""
echo "Documentation: See ENVIRONMENT_CONFIG_GUIDE.md"
echo ""
