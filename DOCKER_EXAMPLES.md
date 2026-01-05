# Docker Container Detection Examples

This document shows how different Docker containers will appear in the Localhost App Detector extension.

## Example 1: Simple React Development

### Docker Command:
```bash
docker run -d -p 3000:3000 --name my-react-app my-react:latest
```

### How It Appears in Extension:
```
┌─────────────────────────────────────────────┐
│ 🐳                                     ●    │
│ 3000                              Active    │
│                                             │
│ my-react-app                                │
│ http://localhost:3000                       │
│ Image: my-react:latest                      │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 abc123456789  │
│ ⚛️ React                                    │
└─────────────────────────────────────────────┘
```

**Features Shown**:
- Container name as title
- Port 3000
- Image name
- Container ID (short)
- React framework detected (if "react" in image name)
- Docker icon indicator
- Blue left border (Docker distinction)

---

## Example 2: Full Stack Application

### Docker Compose:
```yaml
version: '3.8'
services:
  frontend:
    image: node:18-alpine
    ports: ["3000:3000"]
    container_name: frontend
  
  backend:
    image: node:18-alpine
    ports: ["5000:5000"]
    container_name: api-server
  
  database:
    image: postgres:15
    ports: ["5432:5432"]
    container_name: postgres-db
```

### How It Appears in Extension:
```
┌─────────────────────────────────────────────┐
│ 🟢                                     ●    │
│ 3000                              Active    │
│                                             │
│ frontend                                    │
│ http://localhost:3000                       │
│ Image: node:18-alpine                       │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 abc123456789  │
│ 🟢 Node.js                                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🟢                                     ●    │
│ 5000                              Active    │
│                                             │
│ api-server                                  │
│ http://localhost:5000                       │
│ Image: node:18-alpine                       │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 def987654321  │
│ 🟢 Node.js                                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🐘                                     ●    │
│ 5432                              Active    │
│                                             │
│ postgres-db                                 │
│ http://localhost:5432                       │
│ Image: postgres:15                          │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 ghi456789012  │
│ 🐘 PostgreSQL                               │
└─────────────────────────────────────────────┘
```

**What You See**:
- All three containers listed
- Each with its own framework icon
- Distinct port numbers
- Container names displayed clearly

---

## Example 3: Port Mapping (Different Internal/External Ports)

### Docker Command:
```bash
docker run -d -p 8080:80 --name nginx-server nginx:alpine
```

### How It Appears:
```
┌─────────────────────────────────────────────┐
│ 🌐                                     ●    │
│ 8080                              Active    │
│                                             │
│ nginx-server                                │
│ http://localhost:8080                       │
│ Image: nginx:alpine                         │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 jkl345678901  │
│ 🌐 Nginx  → :80                             │
└─────────────────────────────────────────────┘
```

**Special Features**:
- Shows public port (8080) in main display
- Shows internal port (→ :80) in metadata
- Clicking opens http://localhost:8080 (public port)

---

## Example 4: Multiple Services with Same Image

### Docker Commands:
```bash
docker run -d -p 3001:3000 --name app-staging my-app:latest
docker run -d -p 3002:3000 --name app-testing my-app:latest
docker run -d -p 3003:3000 --name app-dev my-app:latest
```

### How It Appears:
```
┌─────────────────────────────────────────────┐
│ 🐳                                     ●    │
│ 3001                              Active    │
│                                             │
│ app-staging                                 │
│ http://localhost:3001                       │
│ Image: my-app:latest                        │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 abc111111111  │
│ → :3000                                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🐳                                     ●    │
│ 3002                              Active    │
│                                             │
│ app-testing                                 │
│ http://localhost:3002                       │
│ Image: my-app:latest                        │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 def222222222  │
│ → :3000                                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🐳                                     ●    │
│ 3003                              Active    │
│                                             │
│ app-dev                                     │
│ http://localhost:3003                       │
│ Image: my-app:latest                        │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 ghi333333333  │
│ → :3000                                     │
└─────────────────────────────────────────────┘
```

**Key Points**:
- Each container shown separately
- Different external ports (3001, 3002, 3003)
- Same internal port (3000) shown in metadata
- Container names help distinguish

---

## Example 5: Mixed Localhost & Docker Apps

### Running:
- Local React dev server: `npm start` on port 3000
- Docker Nginx: `docker run -d -p 8080:80 nginx`
- Local Flask API: `flask run` on port 5000

### How It Appears:
```
┌─────────────────────────────────────────────┐
│ 🐳                                     ●    │
│ 8080                              Active    │
│                                             │
│ nginx-server                                │
│ http://localhost:8080                       │
│ Image: nginx:alpine                         │
│                                             │
│ ⏱ Just now  📍 localhost  🔷 abc123456789  │
│ 🌐 Nginx  → :80                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 3000                                   ●    │
│                                   Active    │
│                                             │
│ React / Create React App                    │
│ http://localhost:3000                       │
│                                             │
│ ⏱ Just now  📍 localhost                   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 5000                                   ●    │
│                                   Active    │
│                                             │
│ Flask / General Dev                         │
│ http://localhost:5000                       │
│                                             │
│ ⏱ Just now  📍 localhost                   │
└─────────────────────────────────────────────┘
```

**Distinction**:
- Docker containers: Blue left border, 🐳 icon, image info
- Localhost apps: Standard border, no image info
- Docker listed first by default
- Both types fully functional

---

## Docker Status Indicator

At the top of the extension popup:

### When Docker Available:
```
┌─────────────────────────────────────────────┐
│ 🐳 Docker: Connected      3 containers      │
└─────────────────────────────────────────────┘
```

### When Docker Not Available:
```
┌─────────────────────────────────────────────┐
│ 🐳 Docker: Not available   Enable API       │
└─────────────────────────────────────────────┘
```

### When Docker Disabled:
Status bar hidden, Docker toggle button not highlighted.

---

## Interactive Features

### Clicking a Container Card:
- Opens `http://localhost:{public_port}` in new tab
- Works for both Docker and localhost apps

### Docker Toggle Button:
- Blue when enabled
- Gray when disabled
- Click to toggle Docker detection on/off

### Refresh Button:
- Manually updates all apps
- Queries Docker immediately
- Useful when starting new containers

---

## Real-World Scenario: Microservices Development

### Setup:
```bash
# Gateway
docker run -d -p 8080:80 --name gateway nginx:alpine

# Auth Service
docker run -d -p 3001:3000 --name auth-service auth-api:latest

# User Service
docker run -d -p 3002:3000 --name user-service user-api:latest

# Product Service
docker run -d -p 3003:3000 --name product-service product-api:latest

# Frontend (local dev server)
npm start  # Runs on 3000
```

### Extension Display:
Shows 5 apps total:
- 4 Docker containers (gateway, auth, user, product)
- 1 localhost app (frontend)
- Docker status: "4 containers"
- All clickable for instant browser access
- Clear visual distinction between Docker and localhost

---

## Tips for Best Display

### 1. Use Descriptive Container Names:
```bash
# Good
docker run --name frontend-react ...
docker run --name backend-api ...
docker run --name db-postgres ...

# Bad (generic)
docker run ...  # Gets random name like "gallant_tesla"
```

### 2. Use Framework Keywords in Images:
```bash
# Will show React icon
docker build -t myapp-react:latest .

# Will show Node.js icon
docker build -t myapp-node:latest .

# Will show generic Docker icon
docker build -t myapp:latest .
```

### 3. Consistent Port Mapping:
```bash
# Good - easy to remember
Frontend: 3000 → 3000
Backend: 5000 → 5000
Database: 5432 → 5432

# Confusing
Frontend: 8765 → 3000
Backend: 4321 → 5000
Database: 9999 → 5432
```

---

## Framework Detection Icons

When these keywords appear in image names:

| Image Contains | Icon | Framework |
|----------------|------|-----------|
| `react` | ⚛️ | React |
| `node` | 🟢 | Node.js |
| `nginx` | 🌐 | Nginx |
| `postgres` | 🐘 | PostgreSQL |
| `mysql` | 🐬 | MySQL |
| `mongo` | 🍃 | MongoDB |
| `redis` | 📮 | Redis |
| `python` | 🐍 | Python |
| `django` | 🎸 | Django |
| `flask` | 🌶️ | Flask |
| `angular` | 🅰️ | Angular |
| `vue` | 💚 | Vue |
| Other | 🐳 | Docker |

---

**Remember**: The extension automatically refreshes every 5 seconds, so starting/stopping containers reflects almost immediately!
