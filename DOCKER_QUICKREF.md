# Docker Quick Reference for Extension Users

Quick commands and examples for using Docker with the Localhost App Detector extension.

## 🚀 Quick Start

### Enable Docker API (One-Time Setup)

**Mac/Windows (Docker Desktop)**:
```bash
# Open Docker Desktop → Settings → Advanced
# Enable: "Expose daemon on tcp://localhost:2375"
# Restart Docker Desktop
```

**Linux**:
```bash
# Add to /etc/docker/daemon.json:
echo '{"hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]}' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker
```

### Test Docker API
```bash
# Verify API is accessible
curl http://localhost:2375/version

# You should see JSON output with Docker version info
```

## 🐳 Common Docker Commands

### Running Web Applications

```bash
# React app
docker run -d -p 3000:3000 --name my-react-app my-react-image

# Node.js API
docker run -d -p 5000:5000 --name api node:18-alpine node server.js

# Nginx static site
docker run -d -p 8080:80 --name website nginx:alpine

# Python Flask app
docker run -d -p 5000:5000 --name flask-app python:3.11 python app.py

# Next.js application
docker run -d -p 3000:3000 --name nextjs-app my-nextjs-image
```

### Multiple Containers (Full Stack)

```bash
# Frontend on port 3000
docker run -d -p 3000:3000 --name frontend my-frontend

# Backend API on port 5000
docker run -d -p 5000:5000 --name backend my-backend

# Database on port 5432
docker run -d -p 5432:5432 --name postgres \
  -e POSTGRES_PASSWORD=dev postgres:15

# All three will appear in the extension!
```

### Docker Compose Example

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  frontend:
    image: my-react-app
    ports:
      - "3000:3000"
    container_name: my-frontend
  
  backend:
    image: my-node-api
    ports:
      - "5000:5000"
    container_name: my-backend
    environment:
      - DATABASE_URL=postgresql://postgres:dev@database:5432/mydb
  
  database:
    image: postgres:15
    ports:
      - "5432:5432"
    container_name: my-database
    environment:
      - POSTGRES_PASSWORD=dev
      - POSTGRES_DB=mydb
```

Start all services:
```bash
docker-compose up -d
```

Stop all services:
```bash
docker-compose down
```

## 📊 Useful Commands

### Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop container-name

# Start a container
docker start container-name

# Restart a container
docker restart container-name

# Remove a container
docker rm container-name

# Remove a container (force)
docker rm -f container-name
```

### View Container Info

```bash
# View container logs
docker logs container-name

# Follow logs in real-time
docker logs -f container-name

# View last 50 lines
docker logs --tail 50 container-name

# Inspect container details
docker inspect container-name

# View container stats (CPU, memory)
docker stats container-name
```

### Port Management

```bash
# Check which ports are in use
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Find container using specific port
docker ps --filter "publish=3000"

# Map multiple ports
docker run -d -p 3000:3000 -p 3001:3001 my-app
```

## 🎯 Tips for Extension Users

### Naming Containers

Give containers descriptive names so they're easy to identify:
```bash
# Good
docker run -d -p 3000:3000 --name my-react-dashboard my-image

# Bad (random name)
docker run -d -p 3000:3000 my-image
```

### Using Framework-Specific Images

Use official or descriptive image names for better framework detection:
```bash
# These will be detected with appropriate icons
docker run -d -p 3000:3000 node:18-alpine
docker run -d -p 8080:80 nginx:alpine
docker run -d -p 5432:5432 postgres:15
docker run -d -p 3000:3000 --name react-app react-image
```

### Port Conflicts

If a port is already in use, use a different port:
```bash
# Port 3000 in use? Try 3001
docker run -d -p 3001:3000 --name app2 my-image

# Check extension to see what's using each port!
```

### Development Workflow

```bash
# 1. Start your dev environment
docker-compose up -d

# 2. Open extension to see all services
# 3. Click any service to open in browser

# 4. View logs if something's wrong
docker logs -f frontend

# 5. Stop when done
docker-compose down
```

## 🔍 Debugging

### Container Won't Start

```bash
# Check container logs
docker logs container-name

# Check exit code
docker inspect container-name --format='{{.State.ExitCode}}'

# Try running interactively
docker run -it --rm my-image /bin/sh
```

### Port Already in Use

```bash
# Find what's using the port (Mac/Linux)
lsof -i :3000

# Find what's using the port (Windows)
netstat -ano | findstr :3000

# Stop the conflicting process or use different port
docker run -d -p 3001:3000 my-image
```

### Extension Not Detecting Containers

```bash
# Verify Docker API is accessible
curl http://localhost:2375/version

# Check Docker is running
docker ps

# Restart Docker Desktop
# Then refresh the extension
```

## 🎨 Framework-Specific Examples

### React

```bash
# Development
docker run -d -p 3000:3000 -v $(pwd):/app --name react-dev node:18 npm start

# Production build
docker run -d -p 3000:3000 --name react-prod my-react-prod-image
```

### Django

```bash
docker run -d -p 8000:8000 --name django-app \
  -v $(pwd):/app \
  python:3.11 \
  sh -c "pip install django && python manage.py runserver 0.0.0.0:8000"
```

### Flask

```bash
docker run -d -p 5000:5000 --name flask-api \
  -v $(pwd):/app \
  -e FLASK_APP=app.py \
  -e FLASK_ENV=development \
  python:3.11 flask run --host=0.0.0.0
```

### Nginx Static Site

```bash
docker run -d -p 8080:80 --name website \
  -v $(pwd)/dist:/usr/share/nginx/html:ro \
  nginx:alpine
```

### Database + Application

```bash
# Create network
docker network create myapp-network

# Start database
docker run -d --name postgres \
  --network myapp-network \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=dev \
  postgres:15

# Start application
docker run -d --name myapp \
  --network myapp-network \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://postgres:dev@postgres:5432/mydb \
  my-app-image
```

## 🔐 Security Reminder

**NEVER expose Docker API (port 2375) on public networks or production!**

Safe usage:
- ✅ Local development only
- ✅ Behind firewall
- ✅ Trusted private networks
- ✅ Using SSH tunnels for remote access

For remote/production, use TLS or SSH tunnels. See DOCKER_GUIDE.md for details.

## 📚 Learn More

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/) - Find images
- [Docker Compose](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Pro Tip**: Keep the extension open while developing to quickly switch between your services!
