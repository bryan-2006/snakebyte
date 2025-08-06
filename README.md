# What is [SnakeBytes](https://www.snakebytes.ca)?
I have a long history of code tutoring (for fun and work) with peers and younger students. I started [SnakeBytes](https://www.snakebytes.ca) to teach more kids coding, as I find it fun and also a valuable skill worth sharing. 

---

## Table of Contents

- [Tech Stack for the Website](#tech-stack-for-the-website)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Other / DevOps](#other--devops)
  - [For the Future? (TODO)](#for-the-future-todo)
- [SnakeBytes EC2 Deployment Guide (for Future Me)](#snakebytes-ec2-deployment-guide-for-future-me)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Deployment](#step-by-step-deployment)
    - [1. SSH into EC2 and Install Requirements](#1-ssh-into-ec2-and-install-requirements)
    - [2. Push Your Code to EC2 with rsync](#2-push-your-code-to-ec2-with-rsync)
    - [3. Rebuild/Restart App](#3-rebuildrestart-app)
    - [4. Alternative Deployment: Quick Redeploy SHELL Script](#4-alternative-deployment-quick-redeploy-shell-script)

---

## Tech Stack for the Website

### Frontend
- **React** (via Next.js)
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** (via PostCSS)
- **urql** (GraphQL client)
- **NextAuth.js** (authentication)
- **Stripe.js** (payments)
- **Lucide React** (icons)

### Backend
- **Node.js**
- **TypeScript**
- **Apollo Server** (GraphQL server)
- **type-graphql** (GraphQL schema and resolvers)
- **TypeORM** (ORM for database)
- **PostgreSQL** (database)
- **jsonwebtoken** (JWT handling)
- **Express.js** (API server)
- **Stripe** (payments)
- **dotenv** (environment variable management)
- **Caddy** (web server/reverse proxy)

### Other / DevOps
- **Docker** (Dockerfiles for frontend and backend)
- **Cloudflare** (DNS/proxy)
- **AWS EC2** (deployment)
- **TurboRepo** (monorepo management)
- **Yarn/NPM workspaces**

### For the Future? (TODO)
- **Redis** (Caching content & not soley relying on Supabase)


# SnakeBytes EC2 Deployment Guide (for Future Me)

This guide walks you through how to deploy your local SnakeBytes project to your AWS EC2 instance using `rsync`, Docker Compose, and Caddy.

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
  --exclude 'deploy-snakebytes.sh' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.local' \
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

Inside the `~/snakebyte` (`cd ~/snakebyte`) directory in the EC2 instance, run: 

``` bash
sudo docker-compose down
sudo docker-compose up -d --build
```
Then start/restart Caddy for reverse proxy/SSL to access from the web.
If first time running Caddy on instance: ```sudo systemctl start caddy```
If not: ```sudo systemctl restart caddy```

### 4. Alternative Deployment: Quick Redeploy SHELL Script?
Create a script (```deploy-snakebytes.sh```) in snakebyte @ local: 
```bash                                         
#!/bin/bash

if [ ! -f "docker-compose.yml" ]; then
  echo "Please run this script from your snakebyte project root."
  exit 1
fi

rsync -avz \
  --exclude 'deploy-snakebytes.sh' \
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
Make it an executable with ```chmod +x deploy-snakebytes.sh``` and then run it with ```./deploy-snakebytes.sh```. 
