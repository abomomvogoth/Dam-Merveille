#!/bin/bash
# TasteCam Heritage - Infrastructure Provisioning Script
# =======================================================
# Part A: Infrastructure Setup (15 marks)
#
# This script provisions a VPS with all necessary dependencies
# for running TasteCam Heritage in production.
#
# Usage: chmod +x provision.sh && sudo ./provision.sh

set -euo pipefail

echo "=== TasteCam Heritage Infrastructure Provisioning ==="
echo "Date: $(date)"
echo "Hostname: $(hostname)"
echo ""

# ---------- System Update ----------
echo "[1/8] Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq

# ---------- Docker Installation ----------
echo "[2/8] Installing Docker..."
if ! command -v docker &> /dev/null; then
  apt-get install -y -qq ca-certificates curl gnupg lsb-release
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
  systemctl enable docker
  systemctl start docker
  echo "Docker installed: $(docker --version)"
else
  echo "Docker already installed: $(docker --version)"
fi

# ---------- Kubernetes (Minikube) for Dev/Test ----------
echo "[3/8] Installing kubectl..."
if ! command -v kubectl &> /dev/null; then
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
  rm kubectl
  echo "kubectl installed: $(kubectl version --client --short)"
else
  echo "kubectl already installed"
fi

echo "[4/8] Installing Minikube..."
if ! command -v minikube &> /dev/null; then
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  install minikube-linux-amd64 /usr/local/bin/minikube
  rm minikube-linux-amd64
  echo "Minikube installed: $(minikube version)"
else
  echo "Minikube already installed"
fi

# ---------- Node.js ----------
echo "[5/8] Installing Node.js 20..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
  echo "Node.js installed: $(node --version)"
else
  echo "Node.js already installed: $(node --version)"
fi

# ---------- Prometheus ----------
echo "[6/8] Setting up Prometheus..."
if [ ! -d /etc/prometheus ]; then
  useradd --no-create-home --shell /bin/false prometheus 2>/dev/null || true
  mkdir -p /etc/prometheus /var/lib/prometheus
  curl -LO https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-amd64.tar.gz
  tar xzf prometheus-2.52.0.linux-amd64.tar.gz
  cp prometheus-2.52.0.linux-amd64/prometheus /usr/local/bin/
  cp prometheus-2.52.0.linux-amd64/promtool /usr/local/bin/
  cp -r prometheus-2.52.0.linux-amd64/consoles /etc/prometheus
  cp -r prometheus-2.52.0.linux-amd64/console_libraries /etc/prometheus
  rm -rf prometheus-2.52.0.linux-amd64*
  chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus
  echo "Prometheus installed: $(prometheus --version 2>&1 | head -1)"
fi

# ---------- Grafana ----------
echo "[7/8] Setting up Grafana..."
if ! command -v grafana-server &> /dev/null; then
  apt-get install -y -qq software-properties-common
  wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
  echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com stable main" | tee /etc/apt/sources.list.d/grafana.list
  apt-get update -qq
  apt-get install -y -qq grafana
  systemctl enable grafana-server
  echo "Grafana installed"
fi

# ---------- PM2 for Process Management ----------
echo "[8/8] Installing PM2..."
npm install -g pm2
echo "PM2 installed: $(pm2 --version)"

echo ""
echo "=== Infrastructure Provisioning Complete ==="
echo ""
echo "=== Summary ==="
echo "Docker    : $(docker --version)"
echo "kubectl   : $(kubectl version --client --short 2>/dev/null || echo 'N/A')"
echo "Node.js   : $(node --version)"
echo "npm       : $(npm --version)"
echo "PM2       : $(pm2 --version 2>/dev/null || echo 'N/A')"
echo "Prometheus: $(prometheus --version 2>&1 | head -1 || echo 'N/A')"
echo ""
echo "Next steps:"
echo "  1. docker compose -f docker/docker-compose.yml up -d --build"
echo "  2. kubectl apply -f k8s/"
echo "  3. Access app at http://<SERVER_IP>:3000"
echo "  4. Access Grafana at http://<SERVER_IP>:3001 (admin/tastecam)"
