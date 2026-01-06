# Localhost App Detector - Chrome Extension

A powerful developer-focused Chrome extension that automatically detects and lists all running localhost applications, with intelligent port scanning and server identification. Perfect for developers juggling multiple local development servers!

**Version 3.1.0** | Built with Manifest V3

---

## ✨ Key Features

### 🔍 Automatic Localhost Detection
- **Real-time Monitoring** - Automatically detects when you visit any localhost or 127.0.0.1 URL
- **Multi-protocol Support** - Tracks both HTTP and HTTPS localhost connections
- **Port Tracking** - Records and displays all unique ports you've accessed
- **Last Seen Timestamps** - Shows when each app was last accessed
- **Auto-expiration** - Apps automatically expire after 5 minutes of inactivity
- **One-click Access** - Click any detected app to open it in a new browser tab
- **Quick Port Chips** - Launch common development ports (3000, 5173, 8080, 4200, 8000) with one click

### 🔎 Intelligent Port Scanner
- **Quick Scan Mode** - Scans ~100 common development ports in 3-5 seconds
- **Deep Scan Mode** - Comprehensive scan of 400+ ports across all categories
- **Custom Host Scanning** - Scan localhost or any custom hostname
- **Real-time Progress** - Visual progress bar showing scan percentage

#### 🎯 Advanced Server Detection
The scanner identifies **40+ server types** from HTTP headers:

| Category | Servers Detected |
|----------|------------------|
| **Web Servers** | nginx, Apache, OpenResty, Lighttpd, LiteSpeed, IIS, Caddy, Traefik, HAProxy, Envoy |
| **Node.js** | Express, Hapi, Fastify, Koa |
| **Python** | Uvicorn, Gunicorn, Werkzeug, Hypercorn, Daphne, Tornado, Waitress |
| **Ruby** | Puma, Unicorn, WEBrick, Thin |
| **Java** | Tomcat, Jetty, Undertow, WildFly, Netty |
| **.NET** | Kestrel |
| **Go** | Gin, Fiber, Echo |
| **Rust** | Actix, Rocket, Axum |
| **Other** | PHP, Cloudflare, and more |

#### 📊 Detailed Scan Results
Each scan result provides expandable details including:
- Server header and version
- HTTP status code
- Content-Type
- X-Powered-By header
- Framework detection from HTML/response
- Response time in milliseconds
- Error categorization (CORS, network, timeout)

#### 🏷️ App Identification
- Identifies **100+ frameworks and services** from port numbers
- Correctly identifies macOS Control Center (port 5000)
- Framework-specific icons and colors
- Category-based organization (frontend, backend, database, etc.)

**Port Categories Scanned:**
- **Web Servers**: 80, 443, 8000, 8008, 8080, 8081, 8082, 8083, 8443, 8888, 9000, 9080, 9090
- **Development Servers**: 3000-3009, 4000-4003, 4200-4201, 5000-5003, 5173-5175
- **Databases**: 3306 (MySQL), 5432 (PostgreSQL), 27017 (MongoDB), 6379 (Redis), 9200 (Elasticsearch)
- **Message Queues**: 5672, 15672 (RabbitMQ), 9092 (Kafka)
- **Monitoring**: 9090 (Prometheus), 5601 (Kibana), 3001 (Grafana)

### 💾 Saved Apps Manager
- **Persistent Storage** - Saved apps persist across browser sessions using Chrome sync storage
- **Incognito Support** - Access your saved apps even in private browsing mode
- **Custom Naming** - Give your saved apps memorable names
- **Tags System** - Add custom tags to categorize and organize apps
- **Favorites** - Star frequently-used apps for quick access
- **Notes** - Add notes and descriptions to any saved app
- **Search & Filter** - Quickly find apps by name, port, tags, or notes
- **Usage Tracking** - Track access count and last accessed time
- **Import/Export** - Share configurations with team members
- **Duplicate Prevention** - Automatically prevents saving duplicate entries

### 🌐 Custom Hosts Management
- **Custom Hostname Mappings** - Add custom host entries similar to /etc/hosts
- **Hosts File Import** - Paste content directly from your system hosts file
- **Configuration Export** - Generate hosts file format for sharing or backup
- **Team Collaboration** - Share custom host configurations with your team

### 🎨 User Interface
- **Modern Design** - Clean, gradient-styled interface with smooth animations
- **Tabbed Navigation** - Organized tabs for Detected, Saved, and Scanner views
- **Expandable Details** - Click the info button on scan results for detailed information
- **Visual Badges** - Tab badges show counts for detected and saved apps
- **Loading States** - Spinner and progress indicators for async operations
- **Empty States** - Helpful guidance when no apps are detected
- **Framework Icons** - Display framework-specific icons and colors

### 🔐 Privacy & Security
- **Local Only** - Only monitors localhost and 127.0.0.1 traffic
- **No External Tracking** - Zero data sent to external servers
- **Minimal Permissions** - Only requests necessary Chrome permissions
- **Auto Data Cleanup** - Old entries automatically expire
- **Local Storage** - All data stored locally in Chrome

---

## 📥 Installation

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

---

## 📖 Usage

### Localhost Apps Tab
1. **Start your local development servers** as usual
2. **Visit any localhost URL** in your browser (e.g., `http://localhost:3000`)
3. **Click the extension icon** to see all detected applications
4. **Click any app card** to open it in a new tab

### Port Scanner Tab
1. **Click the "Scanner" tab** in the extension
2. **Choose scan mode**:
   - Quick scan (~100 ports, 3-5 seconds)
   - Deep scan (400+ ports, uncheck "Quick scan")
3. **Click "Start Scan"** to find all running services
4. **View identified services** with framework icons and response times
5. **Click the ℹ️ button** to expand detailed information:
   - Server type and version
   - HTTP status
   - Framework detection
   - Content type
   - Response headers
6. **Click any result** to open in browser

### Saved Apps Tab
1. **Click the pin icon** on any detected app to save it
2. **Access saved apps** in the "Saved" tab
3. **Add tags and notes** for organization
4. **Star favorites** for quick access
5. **Import/Export** configurations for team sharing

---

## 🗂️ File Structure

```
localhost-detector/
├── manifest.json           # Extension configuration (v3.1.0)
├── background.js          # Service worker for monitoring requests
├── popup.html            # Extension popup interface
├── popup.css             # Styling for the popup
├── popup.js              # Popup functionality and UI logic
├── port-scanner.js       # Port scanning and server identification
├── saved-apps-manager.js # Saved apps persistence
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

---

## 🔧 Development

### Customizing Ports
To add or modify tracked ports, edit the `commonPorts` array in `background.js`:

```javascript
const commonPorts = [
  3000, 3001, // Your custom ports
  // ... rest of the ports
];
```

### Adding Server Detection
To add new server types, edit the `detectFromServerHeader()` function in `port-scanner.js`:

```javascript
if (serverLower.includes('your-server')) {
  return { serverType: 'Your Server', framework: 'Your Framework' };
}
```

### Styling
All styles are in `popup.css`. The extension uses CSS variables and modern CSS features for easy customization.

### Testing
1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Localhost App Detector card
4. Test your changes by visiting localhost URLs

---

## 🔐 Privacy

This extension:
- ✅ Only monitors localhost (127.0.0.1) and localhost URLs
- ✅ Does NOT send any data to external servers
- ✅ Does NOT track or monitor non-localhost traffic
- ✅ Stores data locally in the extension only
- ✅ Auto-expires old data

## 🔑 Permissions Explained

- **`tabs`**: Needed to open detected apps in new tabs
- **`webRequest`**: Required to detect localhost connections
- **`host_permissions`**: Limited to localhost and 127.0.0.1 only

---

## ❓ Troubleshooting

### Apps not showing up?
1. Make sure you've actually visited the localhost URL in your browser
2. Check that your dev server is running
3. Try refreshing the extension popup
4. Check if the port is in the common ports list

### Scanner showing CORS errors?
This is normal! CORS errors indicate a server is running but blocking cross-origin requests. The scanner still detects the service and shows a 🔒 indicator.

### Extension not working?
1. Go to `chrome://extensions/`
2. Make sure the extension is enabled
3. Try clicking the refresh icon on the extension card
4. Check the console for errors (click "Errors" if any are shown)

---

## 📄 License

MIT License - feel free to use this extension however you'd like!

## 👤 Author

Created for developers who need a quick way to track and access their localhost applications.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💬 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy Developing! 🚀**
