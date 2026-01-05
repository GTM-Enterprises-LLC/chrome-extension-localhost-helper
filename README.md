# Localhost App Detector - Chrome Extension

A developer-focused Chrome extension that automatically detects and lists all running localhost applications AND Docker containers in your browser. Perfect for developers juggling multiple local development servers and containerized applications!

![Extension Preview](preview.png)

---

## 📋 Complete Feature List

### 🔍 Automatic Localhost Detection
| Feature | Description |
|---------|-------------|
| **Real-time Monitoring** | Automatically detects when you visit any localhost or 127.0.0.1 URL |
| **Multi-protocol Support** | Tracks both HTTP and HTTPS localhost connections |
| **Port Tracking** | Records and displays all unique ports you've accessed |
| **Last Seen Timestamps** | Shows when each app was last accessed |
| **Auto-expiration** | Apps automatically expire after 5 minutes of inactivity |
| **One-click Access** | Click any detected app to open it in a new browser tab |
| **Quick Port Chips** | Launch common development ports (3000, 5173, 8080, 4200, 8000) with one click |

### 🔎 Port Scanner
| Feature | Description |
|---------|-------------|
| **Quick Scan Mode** | Scans ~100 common development ports in 3-5 seconds |
| **Deep Scan Mode** | Comprehensive scan of 400+ ports across all categories |
| **Custom Host Scanning** | Scan localhost or any custom hostname |
| **Real-time Progress Bar** | Visual feedback showing scan progress percentage |
| **Categorized Results** | Ports organized by type (web servers, databases, dev servers, etc.) |
| **Response Time Display** | Shows how quickly each port responds |
| **Open from Results** | Click any found port to open it in browser |
| **Clear Results** | One-click clear to start fresh scans |

**Port Categories Scanned:**
- Web Servers: 80, 443, 8000, 8008, 8080, 8081, 8082, 8083, 8443, 8888, 9000, 9080, 9090
- Development Servers: 3000-3009, 4000-4003, 4200-4201, 5000-5003, 5173-5175
- Databases: 3306 (MySQL), 5432 (PostgreSQL), 27017 (MongoDB), 6379 (Redis), 9200 (Elasticsearch)
- Message Queues: 5672, 15672 (RabbitMQ), 9092 (Kafka)
- Monitoring: 9090 (Prometheus), 5601 (Kibana), 3001 (Grafana)
- Container Orchestration: 2375, 2376, 6443, 10250

### 💾 Saved Apps Manager
| Feature | Description |
|---------|-------------|
| **Persistent Storage** | Saved apps persist across browser sessions using Chrome sync storage |
| **Incognito Support** | Access your saved apps even in private browsing mode |
| **Custom Naming** | Give your saved apps memorable names |
| **Tags System** | Add custom tags to categorize and organize apps |
| **Favorites** | Star frequently-used apps for quick access |
| **Notes** | Add notes and descriptions to any saved app |
| **Search & Filter** | Quickly find apps by name, port, tags, or notes |
| **Usage Tracking** | Track access count and last accessed time for each app |
| **Import Configuration** | Import saved apps from JSON file |
| **Export Configuration** | Export all saved apps to share with team members |
| **Duplicate Prevention** | Automatically prevents saving duplicate entries |

### 🌐 Custom Hosts Management
| Feature | Description |
|---------|-------------|
| **Custom Hostname Mappings** | Add custom host entries similar to /etc/hosts |
| **Hosts File Import** | Paste content directly from your system hosts file |
| **Configuration Export** | Generate hosts file format for sharing or backup |
| **Team Collaboration** | Share custom host configurations with your team |

### 🐳 Docker Container Integration
| Feature | Description |
|---------|-------------|
| **Automatic Detection** | Detects all running Docker containers with exposed web ports |
| **Real-time Sync** | Updates container list every 5 seconds |
| **Container Details** | View container name, image, state, and ID |
| **Port Mapping Display** | Shows public → private port mappings |
| **Framework Recognition** | Identifies 20+ frameworks from container images |
| **Container Actions** | Start, stop, pause, and unpause containers |
| **Container Logs** | View real-time container logs |
| **Toggle Control** | Enable/disable Docker detection independently |
| **Connection Status** | Shows Docker daemon connection status |
| **Container Count** | Badge showing number of running containers |

**Recognized Docker Images:**
| Image | Display |
|-------|---------|
| node | 🟢 Node.js |
| nginx | 🌐 Nginx |
| apache | 🪶 Apache |
| python | 🐍 Python |
| php | 🐘 PHP |
| react | ⚛️ React |
| angular | 🅰️ Angular |
| vue | 💚 Vue |
| mysql | 🐬 MySQL |
| postgres | 🐘 PostgreSQL |
| mongodb | 🍃 MongoDB |
| redis | 🔴 Redis |
| elasticsearch | 🔍 Elasticsearch |
| rabbitmq | 🐰 RabbitMQ |
| jenkins | 🤵 Jenkins |
| grafana | 📊 Grafana |
| prometheus | 🔥 Prometheus |
| traefik | 🚦 Traefik |
| caddy | 🎾 Caddy |
| golang | 🐹 Go |

### 🎨 User Interface
| Feature | Description |
|---------|-------------|
| **Modern Design** | Clean, gradient-styled interface with smooth animations |
| **Tabbed Navigation** | Organized tabs for Detected, Saved, and Scanner views |
| **Responsive Layout** | Adapts to different popup sizes |
| **Visual Badges** | Tab badges show counts for detected and saved apps |
| **Loading States** | Spinner and progress indicators for async operations |
| **Empty States** | Helpful guidance when no apps are detected |
| **Icon Buttons** | Intuitive icons for Docker toggle, refresh, and settings |
| **Color Coding** | Visual distinction between localhost apps and Docker containers |
| **Framework Icons** | Display framework-specific icons and colors |

### ⚙️ Settings & Configuration
| Feature | Description |
|---------|-------------|
| **Docker Toggle** | Enable/disable Docker detection without reloading |
| **Settings Persistence** | All preferences saved across sessions |
| **Refresh Button** | Manually trigger app/container refresh |
| **Export Link** | Quick access to export functionality in footer |
| **Help Link** | Direct link to documentation and support |

### 🔐 Privacy & Security
| Feature | Description |
|---------|-------------|
| **Local Only** | Only monitors localhost and 127.0.0.1 traffic |
| **No External Tracking** | Zero data sent to external servers |
| **Minimal Permissions** | Only requests necessary Chrome permissions |
| **Auto Data Cleanup** | Old entries automatically expire |
| **Local Storage** | All data stored locally in Chrome |

### 🧩 Chrome Extension Features
| Feature | Description |
|---------|-------------|
| **Manifest V3** | Built with the latest Chrome extension architecture |
| **Service Worker** | Background service worker for request monitoring |
| **Chrome Storage API** | Uses both sync and local storage appropriately |
| **WebRequest API** | Efficient network request monitoring |
| **Popup Interface** | Quick access from browser toolbar |
| **Multiple Icon Sizes** | Icons for 16px, 48px, and 128px displays |

---

## Supported Development Ports

The extension automatically tracks these common development ports:

- **3000-3003**: React, Next.js, Create React App
- **4200-4201**: Angular
- **5000-5001**: Flask, general Python dev
- **5173-5174**: Vite
- **8000-8001**: Django, Python HTTP servers
- **8080-8083**: General development servers
- **4000-4001**: Jekyll, Gatsby
- **1313**: Hugo
- **6006**: Storybook
- **9000-9001**: PHP, general servers
- **24678**: Webpack Dev Server

## Installation

### From Source (Developer Mode)

1. **Download or Clone** this repository
   ```bash
   git clone https://github.com/yourusername/localhost-detector.git
   cd localhost-detector
   ```

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `localhost-detector` folder
   - The extension icon should appear in your toolbar

5. **Pin the Extension** (Optional but Recommended)
   - Click the puzzle piece icon in your toolbar
   - Find "Localhost App Detector"
   - Click the pin icon to keep it visible

## 🐳 Docker Setup (Optional)

To enable Docker container detection, you need to expose the Docker daemon API:

### Quick Setup

**Docker Desktop (Mac/Windows)**:
1. Open Docker Desktop Settings
2. Enable "Expose daemon on tcp://localhost:2375 without TLS"
3. Restart Docker

**Linux**:
```bash
# Edit daemon.json
sudo nano /etc/docker/daemon.json

# Add:
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}

# Restart Docker
sudo systemctl restart docker
```

**⚠️ Security Note**: Only enable on trusted networks. See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for secure setup options.

**Detailed instructions**: See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for complete Docker setup, security considerations, and troubleshooting.

### Docker Setup (Optional)

To enable Docker container management:

1. **Enable Docker API** on port 2375
   - **Docker Desktop**: Settings → Enable "Expose daemon on tcp://localhost:2375"
   - **Linux**: Edit `/etc/docker/daemon.json` to include TCP host

2. **Verify Connection**
   ```bash
   curl http://localhost:2375/version
   ```

3. **Open Extension** → Click "Docker" tab

**For detailed Docker setup instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md)**

⚠️ **Security Note**: Only expose Docker API on localhost for development purposes.

## Usage

### Localhost Apps Tab

1. **Start your local development servers** as usual
2. **Visit any localhost URL** in your browser (e.g., `http://localhost:3000`)
3. **Click the extension icon** to see all detected applications
4. **Click any app card** to open it in a new tab

### Docker Tab 🐳

1. **Ensure Docker API is enabled** (see Docker Setup above)
2. **Click the "Docker" tab** in the extension
3. **View all running containers** with their details
4. **Click port mappings** to open container services in browser
5. **Use action buttons** to:
   - Start/Stop containers
   - Pause/Unpause containers
   - View container logs

### Quick Port Access

In the empty state, you can click common port chips to quickly navigate to that localhost URL.

### Refresh & Clear

- **Refresh button** (↻): Manually refresh the current tab (Apps or Docker)
- **Clear button** (🗑️): Clear the cache and remove all stored data

## How It Works

### Localhost Detection

The extension uses Chrome's `webRequest` API to monitor network requests to localhost and 127.0.0.1. When you visit a localhost URL:

1. The background service worker intercepts the request
2. Extracts the hostname and port
3. Stores it with a timestamp
4. Displays it in the popup interface

Apps are automatically removed from the list after 5 minutes of inactivity.

### Docker Integration

The extension communicates with the Docker API (when enabled) to:

1. Query running containers via HTTP requests to `localhost:2375`
2. Parse container information (name, image, state, ports)
3. Display containers with interactive controls
4. Execute container actions (start, stop, pause, unpause)
5. Retrieve and display container logs

Docker data refreshes every 10 seconds when the Docker tab is active.

## File Structure

```
localhost-detector/
├── manifest.json           # Extension configuration
├── background.js          # Service worker for monitoring requests & Docker API
├── popup.html            # Extension popup interface (with tabs)
├── popup.css             # Styling for the popup (including Docker styles)
├── popup.js              # Popup functionality (Apps + Docker management)
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md             # This file
├── INSTALL.md            # Installation guide
├── DOCKER_SETUP.md       # Docker integration setup guide
└── advanced-features.js  # Examples for extending the extension
```

## Development

### Customizing Ports

To add or modify tracked ports, edit the `commonPorts` array in `background.js`:

```javascript
const commonPorts = [
  3000, 3001, // Your custom ports
  // ... rest of the ports
];
```

### Styling

All styles are in `popup.css`. The extension uses CSS variables and modern CSS features for easy customization.

### Testing

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Localhost App Detector card
4. Test your changes by visiting localhost URLs

## Privacy

This extension:
- ✅ Only monitors localhost (127.0.0.1) and localhost URLs
- ✅ Does NOT send any data to external servers
- ✅ Does NOT track or monitor non-localhost traffic
- ✅ Stores data locally in the extension only
- ✅ Auto-expires old data

## Permissions Explained

- **`tabs`**: Needed to open detected apps in new tabs
- **`webRequest`**: Required to detect localhost connections
- **`host_permissions`**: Limited to localhost and 127.0.0.1 only

## Troubleshooting

### Apps not showing up?

1. Make sure you've actually visited the localhost URL in your browser
2. Check that your dev server is running
3. Try refreshing the extension popup
4. Check if the port is in the common ports list

### Docker containers not showing?

1. Verify Docker is running: `docker ps`
2. Check Docker API is accessible: `curl http://localhost:2375/version`
3. Ensure Docker API is exposed on port 2375
4. Click refresh button in the Docker tab
5. See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed setup

### Extension not working?

1. Go to `chrome://extensions/`
2. Make sure the extension is enabled
3. Try clicking the refresh icon on the extension card
4. Check the console for errors (click "Errors" if any are shown)

### Docker actions failing?

1. Verify you have permission to control Docker
2. Check container is in correct state for the action
3. Ensure Docker daemon is responsive
4. Try the action from command line: `docker stop <container_id>`

## Future Enhancements

Potential features for future versions:

### Apps Tab
- [ ] Custom port configuration
- [ ] App name detection (from page title)
- [ ] Favorite/pin apps
- [ ] Search/filter functionality
- [ ] Export app list
- [ ] Dark mode
- [ ] Framework detection (React, Vue, etc.)
- [ ] Performance metrics
- [ ] Notification when new apps detected

### Docker Tab
- [x] View running containers
- [x] Start/stop/pause containers
- [x] View container logs
- [x] Port mapping display
- [ ] Container stats (CPU, memory, network)
- [ ] Docker Compose project grouping
- [ ] Container shell access
- [ ] Image management
- [ ] Volume inspection
- [ ] Network visualization
- [ ] Container health checks
- [ ] Custom Docker socket paths
- [ ] Multi-host Docker support (via SSH)

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this extension however you'd like!

## Author

Created for developers who need a quick way to track and access their localhost applications.

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy Developing! 🚀**
