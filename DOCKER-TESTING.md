# Docker Quick Test Commands

Quick commands to test the Docker integration with the Localhost App Detector extension.

## Test Containers

### 1. Simple Web Server (Nginx)
```bash
docker run -d -p 8080:80 --name test-nginx nginx
```
Visit: http://localhost:8080

### 2. Node.js Application
```bash
docker run -d -p 3000:3000 --name node-app node:18-alpine sh -c "echo 'const http = require(\"http\"); http.createServer((req,res)=>res.end(\"Hello from Docker!\")).listen(3000);' | node"
```
Visit: http://localhost:3000

### 3. Python HTTP Server
```bash
docker run -d -p 8000:8000 --name python-server python:3.9-slim python -m http.server 8000
```
Visit: http://localhost:8000

### 4. Apache Web Server
```bash
docker run -d -p 8081:80 --name test-apache httpd:alpine
```
Visit: http://localhost:8081

### 5. Multiple Ports (Simulating a full-stack app)
```bash
# Frontend on 3001
docker run -d -p 3001:80 --name frontend nginx:alpine

# Backend API on 5000
docker run -d -p 5000:8000 --name backend python:3.9-slim python -m http.server 8000

# Database (not HTTP but shows in Docker list)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password --name database postgres:alpine
```

## Useful Docker Commands

### Check Running Containers
```bash
docker ps
```

### Check All Containers (including stopped)
```bash
docker ps -a
```

### Stop a Container
```bash
docker stop test-nginx
```

### Start a Stopped Container
```bash
docker start test-nginx
```

### Restart a Container
```bash
docker restart test-nginx
```

### Remove a Container
```bash
docker rm -f test-nginx
```

### Remove All Test Containers
```bash
docker rm -f test-nginx node-app python-server test-apache frontend backend database
```

### View Container Logs
```bash
docker logs test-nginx
docker logs -f test-nginx  # Follow logs
```

## Verify Docker API

### Check Docker API is Accessible
```bash
curl http://localhost:2375/version
```

### List Containers via API
```bash
curl http://localhost:2375/containers/json | jq
```

### Get Container Details
```bash
# Replace CONTAINER_ID with actual ID from docker ps
curl http://localhost:2375/containers/CONTAINER_ID/json | jq
```

## Docker Compose Example

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  frontend:
    image: nginx:alpine
    ports:
      - "3001:80"
    container_name: my-frontend

  backend:
    image: python:3.9-slim
    command: python -m http.server 8000
    ports:
      - "5000:8000"
    container_name: my-backend

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    container_name: my-redis
```

Then run:
```bash
docker-compose up -d
```

All three services will appear in the extension!

## Troubleshooting

### Extension shows "Failed to connect"
1. Check Docker is running: `docker ps`
2. Verify API access: `curl http://localhost:2375/version`
3. Review Docker setup in DOCKER.md

### Containers not showing up
- Make sure containers have exposed ports (`-p` flag)
- Refresh the extension
- Check if Docker integration is enabled in settings

### "Connection refused"
- Docker API not exposed on port 2375
- Follow setup instructions in DOCKER.md

## Tips

1. **Quick Test**: Use the Nginx container - it's small and starts fast
2. **Named Containers**: Always use `--name` for better identification
3. **Port Conflicts**: Make sure ports aren't already in use
4. **Cleanup**: Remove test containers when done to free resources
5. **Logs**: Use `docker logs` to debug container issues

## Common Scenarios

### Testing a React App
```bash
# Build and run your React app in Docker
docker build -t my-react-app .
docker run -d -p 3000:3000 --name react-dev my-react-app
```

### Testing Multiple Microservices
```bash
# Service 1
docker run -d -p 3001:3001 --name service-1 node:18-alpine sh -c "..."

# Service 2
docker run -d -p 3002:3002 --name service-2 node:18-alpine sh -c "..."

# Service 3
docker run -d -p 3003:3003 --name service-3 node:18-alpine sh -c "..."
```

All services will show up in the extension with their respective ports!

---

**Pro Tip**: Keep the extension popup open while starting/stopping containers to see real-time updates!
