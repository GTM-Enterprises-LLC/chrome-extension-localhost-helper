# Docker Integration Guide

The Localhost App Detector now includes powerful Docker container detection! This guide will help you set up and use the Docker integration features.

## 🐳 Features

- **Automatic Container Detection**: Monitors all running Docker containers with exposed ports
- **Framework Recognition**: Automatically detects 20+ frameworks (React, Node, Nginx, MySQL, etc.)
- **Real-time Monitoring**: Updates every 5 seconds to reflect container state
- **Port Mapping Display**: Shows both public and private ports
- **Container Information**: Displays container ID, image, and status
- **Visual Distinction**: Docker containers are highlighted with distinctive styling

## 📋 Prerequisites

To use Docker detection, you need:
1. Docker Desktop or Docker Engine installed
2. Docker daemon API enabled (see setup instructions below)

## 🔧 Docker Daemon Setup

The extension needs to communicate with the Docker daemon API. Here's how to enable it:

### Option 1: Docker Desktop (Recommended for Mac/Windows)

#### Mac:
1. Open Docker Desktop
2. Go to **Settings** (gear icon)
3. Navigate to **Advanced** or **Docker Engine**
4. Add or modify the configuration:
   ```json
   {
     "hosts": ["unix:///var/run/docker.sock", "tcp://127.0.0.1:2375"]
   }
   ```
5. Click **Apply & Restart**

#### Windows:
1. Open Docker Desktop
2. Go to **Settings** → **General**
3. Check **"Expose daemon on tcp://localhost:2375 without TLS"**
4. Click **Apply & Restart**

**Note**: Only enable this on trusted networks, as it exposes Docker without authentication.

### Option 2: Docker Engine (Linux)

#### Temporary Method (Development):
```bash
# Stop Docker service
sudo systemctl stop docker

# Start Docker with TCP binding
sudo dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375
```

#### Permanent Method:
1. Edit Docker daemon configuration:
   ```bash
   sudo nano /etc/docker/daemon.json
   ```

2. Add the following:
   ```json
   {
     "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
   }
   ```

3. Create systemd override:
   ```bash
   sudo mkdir -p /etc/systemd/system/docker.service.d
   sudo nano /etc/systemd/system/docker.service.d/override.conf
   ```

4. Add:
   ```ini
   [Service]
   ExecStart=
   ExecStart=/usr/bin/dockerd
   ```

5. Reload and restart:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

### Option 3: Using SSH Tunnel (Secure Remote Access)

If you want to access Docker on a remote machine securely:

```bash
# Create SSH tunnel
ssh -L 2375:localhost:2375 user@remote-host

# Now the extension can access Docker through localhost:2375
```

## 🔐 Security Considerations

**IMPORTANT**: Exposing the Docker API without TLS is a security risk. Only do this in these scenarios:

✅ **Safe**:
- Local development on localhost only
- Trusted private networks
- Behind a firewall
- Using SSH tunnels for remote access

❌ **Unsafe**:
- Public networks
- Production environments
- Untrusted networks
- Internet-exposed servers

For production environments, always use TLS:
```json
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2376"],
  "tls": true,
  "tlscert": "/path/to/cert.pem",
  "tlskey": "/path/to/key.pem",
  "tlsverify": true,
  "tlscacert": "/path/to/ca.pem"
}
```

## 🚀 Using Docker Detection

### Basic Usage

1. **Enable Docker Detection**: Click the Docker icon (🐳) in the extension toolbar
2. **Start Containers**: Run any Docker container with exposed ports
   ```bash
   docker run -d -p 3000:3000 my-react-app
   docker run -d -p 8080:80 nginx
   ```
3. **View Containers**: Open the extension popup to see all running containers
4. **Click to Open**: Click any container card to open it in your browser

### Docker Status Indicator

The extension shows Docker status at the top:
- **🟢 Connected**: Docker daemon is accessible
- **🔴 Not available**: Docker daemon API is not enabled
- **Container count**: Shows number of running containers with web ports

### Container Information

Each Docker container displays:
- **Container Name**: Human-readable container name
- **Framework/Image**: Detected framework with icon
- **Port Mapping**: Public port (→ private port if different)
- **Container ID**: Short 12-character container ID
- **Last Seen**: Time since last detection
- **URL**: Clickable localhost URL

### Framework Detection

The extension automatically detects these frameworks:

| Framework | Icon | Detection |
|-----------|------|-----------|
| Node.js | 🟢 | node image |
| React | ⚛️ | react image |
| Angular | 🅰️ | angular image |
| Vue | 💚 | vue image |
| Next.js | ▲ | nextjs image |
| Django | 🎸 | django image |
| Flask | 🌶️ | flask image |
| Nginx | 🌐 | nginx image |
| Apache | 🪶 | apache image |
| MySQL | 🐬 | mysql image |
| PostgreSQL | 🐘 | postgres image |
| MongoDB | 🍃 | mongo image |
| Redis | 📮 | redis image |
| PHP | 🐘 | php image |
| Python | 🐍 | python image |
| WordPress | 📝 | wordpress image |
| Jenkins | 👨‍🔧 | jenkins image |
| GitLab | 🦊 | gitlab image |
| RabbitMQ | 🐰 | rabbitmq image |
| Elasticsearch | 🔍 | elasticsearch image |

## 🔄 Refresh & Update

- **Auto-refresh**: Containers update every 5 seconds automatically
- **Manual refresh**: Click the refresh button (↻) for immediate update
- **Docker toggle**: Toggle Docker detection on/off without affecting localhost apps

## 🐛 Troubleshooting

### "Docker: Not available" Message

**Problem**: Extension can't connect to Docker daemon

**Solutions**:
1. Verify Docker is running: `docker ps`
2. Check API is enabled (see setup instructions above)
3. Test API access: `curl http://localhost:2375/version`
4. Restart Docker Desktop
5. Check firewall isn't blocking port 2375

### Containers Not Appearing

**Problem**: Running containers aren't showing in the extension

**Solutions**:
1. Make sure containers have ports exposed: `docker ps`
2. Verify ports are in the web range (80, 443, 3000-9999)
3. Click refresh button manually
4. Check Docker toggle is enabled (blue highlight)

### Wrong Framework Detected

**Problem**: Container shows wrong framework/icon

**Explanation**: Detection is based on image name. For custom images:
- The extension looks for keywords in the image name
- Generic images show the Docker icon (🐳)
- This is by design for flexibility

**Solution**: Name your images descriptively:
```bash
# Good: Will detect as React
docker tag myapp:latest myapp-react:latest

# Better: Use official images when possible
docker pull node:18-alpine
```

### Port Already in Use

**Problem**: Container fails to start due to port conflict

**Solution**: The extension helps identify what's using the port!
1. Check the extension to see which app is using that port
2. Stop the conflicting application
3. Or use a different port for your container

## 💡 Example Docker Commands

### Run a React App
```bash
docker run -d -p 3000:3000 --name my-react-app my-react-image
```

### Run Nginx Server
```bash
docker run -d -p 8080:80 --name web-server nginx:alpine
```

### Run Multiple Containers
```bash
# Frontend
docker run -d -p 3000:3000 --name frontend react-app

# Backend API
docker run -d -p 5000:5000 --name backend node-api

# Database
docker run -d -p 5432:5432 --name db postgres

# All will show up in the extension!
```

### Docker Compose Example
```yaml
version: '3.8'
services:
  frontend:
    image: my-react-app
    ports:
      - "3000:3000"
  
  backend:
    image: my-node-api
    ports:
      - "5000:5000"
  
  database:
    image: postgres:15
    ports:
      - "5432:5432"
```

Run with: `docker-compose up -d`

## 🎯 Advanced Features

### Custom Port Ranges

The extension detects ports in these ranges:
- 80, 443 (HTTP/HTTPS)
- 3000-9999 (Common dev ports)
- Any explicitly web-related ports

### Container Filtering

Currently shows:
- ✅ Running containers only
- ✅ Containers with TCP port mappings
- ✅ Ports likely to be web services

### Performance

- Polling interval: 5 seconds (configurable in code)
- Minimal performance impact
- Only queries Docker when enabled

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker API Reference](https://docs.docker.com/engine/api/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

## 🤝 Feedback

Found a bug or have a suggestion? Let us know!
- Docker detection issues are typically configuration-related
- Check this guide thoroughly before reporting issues
- Include Docker version and OS in bug reports

---

**Happy Dockerizing! 🐳**
