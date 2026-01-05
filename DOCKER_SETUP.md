# Docker Integration Guide

The Localhost App Detector extension now includes full Docker container management capabilities! This guide will help you set up and use the Docker features.

## Features

### Docker Container Management
- ✅ **View Running Containers**: See all active Docker containers
- ✅ **Port Mappings**: Click any mapped port to open it in your browser
- ✅ **Container Controls**: Start, stop, pause, and unpause containers
- ✅ **View Logs**: Access container logs directly from the extension
- ✅ **Real-time Status**: See container state (running, paused, exited)
- ✅ **Container Details**: View image names, IDs, and status information

## Setup Instructions

### Option 1: Docker Desktop (Recommended for Mac/Windows)

1. **Open Docker Desktop Settings**
   - Click the Docker icon in your system tray
   - Select "Settings" or "Preferences"

2. **Enable Docker API**
   - Navigate to "General" or "Advanced" settings
   - Look for "Expose daemon on tcp://localhost:2375 without TLS"
   - Enable this option
   - Click "Apply & Restart"

3. **Verify Connection**
   - Open the extension
   - Click the "Docker" tab
   - You should see your running containers

### Option 2: Linux Docker Engine

#### Enable Docker API on Port 2375

Edit Docker daemon configuration:

```bash
sudo nano /etc/docker/daemon.json
```

Add or modify to include:

```json
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://127.0.0.1:2375"]
}
```

**IMPORTANT SECURITY NOTE**: Port 2375 is unencrypted. Only use on localhost and behind a firewall!

#### Update systemd Service

Edit the Docker service file:

```bash
sudo systemctl edit docker.service
```

Add the following:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd
```

Reload and restart Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### Verify

```bash
curl http://localhost:2375/version
```

You should see Docker version information.

### Option 3: Docker Desktop with CLI Override (Mac/Linux)

Start Docker daemon with TCP enabled:

```bash
# Mac
sudo dockerd -H tcp://127.0.0.1:2375 -H unix:///var/run/docker.sock

# Linux
sudo dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
```

## Using the Docker Tab

### Viewing Containers

1. Click the extension icon
2. Select the "Docker" tab
3. All running containers will be displayed with:
   - Container name
   - Image name
   - Container ID
   - Current state (running/paused/exited)
   - Mapped ports

### Opening Container Ports

If a container has exposed ports:
- Click on any port mapping (e.g., `3000:80`)
- The corresponding localhost URL will open in a new tab

### Container Controls

Each container card has action buttons:

**For Running Containers:**
- **Pause**: Temporarily pause the container
- **Stop**: Stop the container
- **Logs**: View recent container logs

**For Paused Containers:**
- **Unpause**: Resume the container

**For Stopped Containers:**
- **Start**: Start the container

### Viewing Logs

1. Click the "Logs" button on any container
2. A new window will open showing the last 100 log lines
3. Logs are displayed in a terminal-style format

## Troubleshooting

### "Docker API not available" Message

**Possible causes:**

1. **Docker is not running**
   - Solution: Start Docker Desktop or Docker daemon

2. **API not exposed on port 2375**
   - Solution: Follow setup instructions above

3. **Firewall blocking connection**
   - Solution: Check firewall settings for localhost:2375

4. **Docker Desktop not configured**
   - Solution: Enable "Expose daemon on tcp://localhost:2375" in settings

### Testing Docker API Manually

Run this in your terminal:

```bash
# Check if API is accessible
curl http://localhost:2375/version

# List containers
curl http://localhost:2375/containers/json
```

If these commands work, the extension should work too.

### Containers Not Showing Up

1. **Verify containers are running:**
   ```bash
   docker ps
   ```

2. **Check API connection:**
   ```bash
   curl http://localhost:2375/containers/json
   ```

3. **Refresh the extension:**
   - Click the refresh button in the extension

4. **Check extension console:**
   - Right-click extension icon → Inspect popup
   - Look for errors in the console

## Security Considerations

### ⚠️ Important Security Notes

1. **Localhost Only**: Only expose Docker API on localhost (127.0.0.1)
2. **Firewall Protection**: Ensure port 2375 is not exposed to external networks
3. **No TLS**: Port 2375 uses unencrypted communication
4. **Development Only**: This setup is for local development only

### Recommended Production Alternative

For production environments, use:
- Docker socket access with proper permissions
- TLS-encrypted Docker API (port 2376)
- Docker Context with authentication
- SSH tunnel for remote access

## Advanced Configuration

### Custom Docker API Port

If you use a different port, you'll need to modify the extension:

1. Edit `background.js`
2. Find the `dockerAPIs` array
3. Add your custom port:

```javascript
const dockerAPIs = [
  'http://localhost:YOUR_PORT',
  'http://127.0.0.1:YOUR_PORT',
];
```

### Docker Compose Integration

The extension automatically detects containers started with docker-compose. Container names will reflect the compose project and service names.

Example:
```yaml
# docker-compose.yml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
```

Will appear as: `myproject-web-1`

## Docker API Reference

The extension uses these Docker API endpoints:

- `GET /version` - Check Docker availability
- `GET /containers/json?all=false` - List running containers
- `POST /containers/{id}/start` - Start container
- `POST /containers/{id}/stop` - Stop container
- `POST /containers/{id}/pause` - Pause container
- `POST /containers/{id}/unpause` - Unpause container
- `GET /containers/{id}/logs` - Get container logs

## Common Use Cases

### Local Development Workflow

1. Start your development containers:
   ```bash
   docker-compose up -d
   ```

2. Open extension → Docker tab
3. See all running services with their ports
4. Click any port to access the service
5. Use controls to manage containers without terminal

### Multi-Container Projects

Perfect for projects with multiple services:
- Frontend on port 3000
- Backend API on port 8000
- Database on port 5432
- Redis on port 6379

All visible and manageable from one place!

### Quick Container Management

- Need to restart a container? Click Stop → Start
- Need to free up resources? Pause unused containers
- Need to check logs? One click away

## FAQ

**Q: Why port 2375?**
A: This is the standard Docker API port without TLS. Port 2376 is for TLS-encrypted connections.

**Q: Can I use this with remote Docker hosts?**
A: Not recommended for security reasons, but you could SSH tunnel to remote Docker API.

**Q: Does this work with Podman?**
A: Podman has Docker-compatible API. You may need to start the Podman service:
```bash
podman system service --time=0 tcp:localhost:2375
```

**Q: Will this slow down Docker?**
A: No, the extension only queries the API every 10 seconds when the Docker tab is open.

**Q: Can I customize which container actions are available?**
A: Yes, edit `popup.js` and modify the `createDockerCard` function.

## Next Steps

Now that Docker support is enabled:

1. Start some containers
2. Open the extension
3. Try clicking port mappings
4. Experiment with container controls
5. Check out logs

Happy containerizing! 🐳

## Support

If you encounter issues:
1. Check Docker daemon is running
2. Verify API is accessible (curl test)
3. Check browser console for errors
4. Ensure firewall allows localhost:2375

For additional help, see the main README.md file.
