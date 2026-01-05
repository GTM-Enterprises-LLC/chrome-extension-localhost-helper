# Docker Features - Quick Reference

## What You Can Do

### 📋 View Containers
See all running Docker containers with:
- Container name
- Image being used  
- Container ID
- Current status (running/paused/exited)
- All exposed port mappings

### 🌐 Quick Port Access
Click any port mapping to instantly open that service in your browser.

Example: Container exposes `8080:80` → Click "8080:80" → Opens `http://localhost:8080`

### ⚙️ Container Controls

| Container State | Available Actions |
|----------------|-------------------|
| **Running** | Pause, Stop, View Logs |
| **Paused** | Unpause, View Logs |
| **Exited** | Start, View Logs |

### 📊 View Logs
One-click access to container logs:
- Last 100 lines displayed
- Opens in separate window
- Terminal-style formatting
- Real-time viewing

## Common Workflows

### Workflow 1: Multi-Service Development
```bash
# Start your docker-compose project
docker-compose up -d

# Open extension → Docker tab
# See all services with ports
# Click ports to access services
```

**Example Project:**
- `frontend` on 3000:3000 → Click to view app
- `api` on 8000:8000 → Click to test API
- `postgres` on 5432:5432 → Info only
- `redis` on 6379:6379 → Info only

### Workflow 2: Quick Container Management
```
Need to restart a service?
1. Click "Stop" button
2. Wait a moment
3. Click "Start" button

No terminal needed!
```

### Workflow 3: Debugging Issues
```
Service not responding?
1. Click "Logs" button
2. Check for errors
3. Take action (restart, etc.)

All from the extension!
```

## Docker Compose Example

```yaml
# docker-compose.yml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  
  api:
    build: ./api
    ports:
      - "3000:3000"
  
  db:
    image: postgres:13
    ports:
      - "5432:5432"
```

**Extension will show:**
- `myproject-web-1` (nginx:alpine) - Port 8080:80 ← Clickable
- `myproject-api-1` (myproject_api) - Port 3000:3000 ← Clickable
- `myproject-db-1` (postgres:13) - Port 5432:5432 ← Clickable

## Keyboard Shortcuts

None yet, but you can:
1. Pin the extension to toolbar
2. Click extension icon
3. Use Tab key to navigate
4. Press Enter to activate buttons

## Tips & Tricks

### Tip 1: Real-time Monitoring
Leave the Docker tab open while developing. It refreshes every 10 seconds automatically.

### Tip 2: Port Organization
Containers are listed in the order Docker returns them. Use consistent naming in docker-compose for organization.

### Tip 3: Multiple Instances
If you run multiple instances of the same image, they'll all show up with unique container IDs.

### Tip 4: Container Labels
The extension displays the first name from Docker's Names array. Use `container_name` in docker-compose for custom names.

### Tip 5: Resource Management
Use Pause instead of Stop when you temporarily don't need a service. Pause preserves state and is faster to resume.

## API Endpoints Used

The extension makes these Docker API calls:

```
GET  /version                        → Check availability
GET  /containers/json?all=false      → List running containers
POST /containers/{id}/start          → Start container
POST /containers/{id}/stop           → Stop container  
POST /containers/{id}/pause          → Pause container
POST /containers/{id}/unpause        → Unpause container
GET  /containers/{id}/logs?tail=100  → Get logs
```

## Limitations

### Current Limitations
- Only shows running containers (not stopped ones by default)
- Cannot create or remove containers
- Cannot manage images, volumes, or networks
- Cannot attach to container shell
- No container stats (CPU, memory)

### Why These Limitations?
Chrome extensions have restricted capabilities for security. Complex operations should use Docker CLI or Docker Desktop.

## Security Reminder

⚠️ **The Docker API on port 2375 is unencrypted**

**Safe:**
- ✅ Localhost only (127.0.0.1)
- ✅ Development environment
- ✅ Behind firewall
- ✅ Local network only

**Unsafe:**
- ❌ Exposing to internet
- ❌ Production servers
- ❌ Untrusted networks
- ❌ Public IPs

## Getting Help

**Extension issues:**
- Check browser console for errors
- Verify extension has permissions
- Try refreshing extension

**Docker issues:**
- Test API: `curl http://localhost:2375/version`
- Check Docker is running: `docker ps`
- Verify port 2375 is exposed

**Still stuck?**
See full [DOCKER_SETUP.md](DOCKER_SETUP.md) guide

## Next Steps

1. ✅ Enable Docker API (see DOCKER_SETUP.md)
2. ✅ Start some containers
3. ✅ Open extension → Docker tab
4. ✅ Click around and explore!
5. ⭐ Star the project if you find it useful!
