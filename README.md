# SnakeByte EC2 Deployment Guide for Future Bryan

This guide walks you through how to deploy your local SnakeByte project to your AWS EC2 instance using `rsync`, Docker Compose, and Caddy.

---

## Prerequisites

Make sure you have the following installed and configured:

- AWS EC2 instance (Ubuntu-based)
- Docker & Docker Compose installed on EC2
- Caddy installed and set up as a reverse proxy (optional HTTPS)
- SSH key added to `~/.ssh` on your local machine
- Your EC2 instance’s public IP or hostname
- CHECK THIS PLEASE: Local project is fully working (Are all files there? Certs?)

---

## Step-by-Step Deployment

### 1. SSH into EC2 and install what is needed (Node, Docker, Caddy, etc.)

```bash
ssh -i ~/.ssh/calgary-bryan-arch.pem ubuntu@ec2-35-183-184-18.ca-central-1.compute.amazonaws.com
```

From your **local project root (`snakebyte/`)**, run:

### 2. Push Your Code to EC2 with `rsync`

From your **local project root (`snakebyte/`)**, run:

```bash
rsync -avz \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'build' \
  --exclude 'dist' \
  --exclude '.turbo' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude '.vercel' \
  --exclude 'coverage' \
  --exclude '*.tsbuildinfo' \
  --exclude 'packages/shared' \
  -e "ssh -i ~/.ssh/calgary-bryan-arch.pem" \
  . ubuntu@ec2-35-183-184-18.ca-central-1.compute.amazonaws.com:~/snakebyte
```

### 3. Rebuild/Restart App

Inside the `~/snakebyte` (`cd ~/snakebyte`) directory, run: 

``` bash
sudo docker compose down
sudo docker compose up -d --build
```
Then start/restart Caddy for reverse proxy/SSL to access from the web.
If first time running Caddy on instance: ```sudo systemctl start caddy```
If not: ```sudo systemctl restart caddy```

### 4. Alternative Deployment: Quick Redeploy SHELL Script?
Create a script (```deploy.sh```): 
```bash
#!/bin/bash

rsync -avz \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'build' \
  --exclude 'dist' \
  --exclude '.turbo' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude '.vercel' \
  --exclude 'coverage' \
  --exclude '*.tsbuildinfo' \
  --exclude 'packages/shared' \
  -e "ssh -i ~/.ssh/calgary-bryan-arch.pem" \
  . ubuntu@ec2-35-183-184-18.ca-central-1.compute.amazonaws.com:~/snakebyte

ssh -i ~/.ssh/calgary-bryan-arch.pem ubuntu@ec2-35-183-184-18.ca-central-1.compute.amazonaws.com << 'EOF'
  cd ~/snakebyte
  sudo docker compose down
  sudo docker compose up -d --build
  sudo systemctl restart caddy
EOF
```
Make it an executable with ```chmod +x deploy.sh``` and then run it with ```./deploy.sh```. 
