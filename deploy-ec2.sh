#!/bin/bash
# ==============================================================================
# CampusOS — Automated AWS EC2 One-Command Deployment Script
# Supports: Ubuntu 22.04 LTS / Ubuntu 24.04 LTS
# ==============================================================================

set -e

echo "🚀 [1/5] Updating system packages and installing prerequisites..."
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release git

# Setup Swap memory (Essential for small EC2 instances like t2.micro / t3.small during builds)
if [ ! -f /swapfile ]; then
    echo "💾 [2/5] Allocating 2GB swap space for smooth Docker builds..."
    sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Install Official Docker Engine
echo "🐳 [3/5] Installing Docker and Docker Compose plugin..."
if ! command -v docker &> /dev/null; then
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
fi

echo "📦 [4/5] Building and launching CampusOS containers..."
# Run docker compose in detached mode
sudo docker compose down --remove-orphans || true
sudo docker compose up -d --build

echo "⏳ [5/5] Waiting for services to initialize and seed database..."
sleep 10

# Show status
sudo docker compose ps

# Detect Public IP
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || curl -s ifconfig.me || echo "YOUR-EC2-PUBLIC-IP")

echo ""
echo "=========================================================================="
echo "✨ CampusOS is LIVE on AWS EC2!"
echo "🌐 Access your application at: http://${PUBLIC_IP}"
echo "📊 Alternate port:           http://${PUBLIC_IP}:3000"
echo "📡 Backend Health check:      http://${PUBLIC_IP}:5000/api/health"
echo "=========================================================================="
