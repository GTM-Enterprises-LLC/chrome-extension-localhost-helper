# Localhost App Detector - Chrome Extension

A developer-focused Chrome extension that automatically detects and lists all running localhost applications AND Docker containers in your browser. Perfect for developers juggling multiple local development servers and containerized applications!

![Extension Preview](preview.png)

## 🌟 Key Features

### Localhost Detection
- **Automatic Detection**: Monitors all localhost connections in your browser
- **Common Port Scanning**: Tracks popular development ports (React, Vue, Angular, Flask, Django, etc.)
- **Real-time Updates**: See which apps are currently active
- **One-Click Access**: Click any detected app to open it in a new tab

### 🔍 Port Scanner (NEW!)
- **Quick Scan**: Scan ~100 common development ports in seconds
- **Deep Scan**: Comprehensive scan of 400+ ports including databases, message queues, and monitoring tools
- **All Port Ranges**: 3000-9999 development ports, databases, APIs, and more
- **Real-time Progress**: Visual feedback during scanning
- **Export Results**: Save scan results for documentation

### 💾 Saved Apps & Persistence (NEW!)
- **Save Frequently-Used Apps**: Persistent storage that works across sessions
- **Incognito Mode Support**: Access saved apps even in private browsing
- **Tags & Organization**: Categorize apps with custom tags
- **Favorites**: Star your most-used applications
- **Search & Filter**: Quick search across all saved apps
- **Import/Export**: Share app configurations with your team
- **Usage Tracking**: See most accessed and recently added apps

### 🌐 Custom Hosts Management (NEW!)
- **Custom Hostname Mappings**: Add custom hosts like `/etc/hosts`
- **Import Hosts File**: Paste content from your system hosts file
- **Export Configuration**: Generate hosts file format for sharing
- **Team Collaboration**: Share custom host setups with your team

### 🐳 Docker Integration
- **Container Monitoring**: Automatically detects all running Docker containers with exposed web ports
- **Framework Recognition**: Identifies 20+ frameworks from container images (Node, React, Nginx, MySQL, etc.)
- **Port Mapping Display**: Shows both public and private port configurations
- **Visual Distinction**: Docker containers are highlighted with distinctive styling and icons
- **Real-time Sync**: Updates every 5 seconds to reflect current container state
- **Toggle Control**: Enable/disable Docker detection independently

### General Features
- **Auto-Cleanup**: Apps/containers automatically expire after 5 minutes of inactivity
- **Beautiful UI**: Modern, gradient-styled interface with smooth animations
- **Tabbed Interface**: Organized views for Detected, Saved, Scanner, and Hosts
- **Statistics Dashboard**: Track your development patterns

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
