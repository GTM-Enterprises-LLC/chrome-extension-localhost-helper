# New Features Guide

This document covers the latest features added to the Localhost App Detector extension.

## 📊 Port Scanner

### Overview
The Port Scanner feature allows you to scan your localhost for **all** running web services across a comprehensive range of ports.

### Features
- **Quick Scan**: Scans ~100 most common development ports (3-5 seconds)
- **Deep Scan**: Scans 400+ ports including databases, message queues, monitoring tools (30-60 seconds)
- **Real-time Progress**: Visual progress bar during scanning
- **Custom Host**: Scan any hostname, not just localhost
- **Export Results**: Save scan results for documentation

### Port Ranges Covered

#### Quick Scan (Default)
- **Web Servers**: 80, 443, 8000, 8080, 8081, 8888, 9000, 9090
- **Development**: 3000-3009, 4000-4003, 4200-4201, 5000-5003, 5173-5175
- **Databases**: 3306 (MySQL), 5432 (PostgreSQL), 27017 (MongoDB), 6379 (Redis)

#### Deep Scan
Everything in Quick Scan plus:
- **3000-3099**: Node.js, React, Next.js ecosystem
- **4000-4099**: Jekyll, Gatsby, general dev servers
- **5000-5099**: Python (Flask, Django), Ruby
- **8000-8099**: General web servers
- **9000-9099**: PHP, monitoring tools, admin panels

### How to Use

1. Click the **"Scanner"** tab
2. Choose scan type:
   - ✅ **Quick scan** (recommended): Common ports only
   - ⬜ **Deep scan**: All ports (uncheck the box)
3. Optionally change host (default: localhost)
4. Click **"Start Scan"**
5. Wait for results
6. Click any found port to open in browser

### Use Cases

- **Forgot what port?**: Quickly find which ports are in use
- **Port conflicts**: Identify what's using a specific port
- **Team onboarding**: Document what services are running
- **Security audit**: See all exposed localhost services
- **Container inspection**: Find all Docker-exposed ports

### Technical Details

The scanner uses multiple detection methods:
1. Image loading technique (fastest)
2. Fetch API with no-cors mode
3. Batch processing for performance (10 ports at a time)
4. Timeout per port: 2 seconds

---

## 💾 Saved Apps

### Overview
Save your frequently-used localhost applications for **permanent** access, even in incognito mode!

### Key Benefits

✅ **Works in Incognito**: Saved apps sync via Chrome storage
✅ **Persistent**: Apps remain even after closing browser
✅ **Organized**: Tag, favorite, and search your apps
✅ **Portable**: Export/import your app list
✅ **Smart Tracking**: Tracks access count and last used

### Features

#### Save Apps
- Save any detected localhost or Docker app
- Automatic framework detection preserved
- Add custom notes and tags
- Star favorites for quick access

#### Organization
- **Search**: Filter by name, port, URL, notes, or tags
- **Tags**: Categorize apps (e.g., "work", "personal", "client-X")
- **Favorites**: Mark frequently-used apps
- **Statistics**: See most accessed and recently added

#### Import/Export
- Export apps as JSON
- Import apps from JSON (great for team sharing)
- Merge with existing apps (no duplicates)
- Backup your configuration

### How to Use

#### Saving an App
1. Go to **"Detected"** tab
2. Right-click any app card (or look for save button in enhanced UI)
3. App is now in **"Saved"** tab

#### Managing Saved Apps
1. Go to **"Saved"** tab
2. Search using the search bar
3. Click tag filters to show specific categories
4. Click ⭐ to favorite/unfavorite
5. Click app to open in browser

#### Adding Tags
1. Click on a saved app
2. Look for "Add tag" option
3. Type tag name (e.g., "frontend", "api", "staging")
4. Press Enter

#### Export/Import
1. Go to **"Hosts"** tab
2. Click **"Export Apps"** → Downloads JSON file
3. Share with team or backup
4. Click **"Import Apps"** → Select JSON file → Merges apps

### Use Cases

- **Multiple Projects**: Save apps from different projects with tags
- **Client Work**: Tag apps by client name
- **Development Environments**: Save staging, dev, local URLs
- **Team Sharing**: Export and share common dev server list
- **Incognito Testing**: Access saved apps even in private mode

---

## 🌐 Custom Hosts Management

### Overview
Manage custom hostname mappings similar to `/etc/hosts` file, but stored in the extension.

### Why This Matters

Instead of editing system hosts file, manage local hostnames in the extension:
- `api.local` → `127.0.0.1`
- `frontend.dev` → `127.0.0.1`
- `myapp.test` → `127.0.0.1`

### Features

- **Manual Entry**: Add hostname + IP pairs
- **Import Hosts File**: Paste contents of `/etc/hosts`
- **Export**: Generate hosts file format for sharing
- **Localhost Focus**: Only imports 127.0.0.1/localhost entries
- **Sync Storage**: Works across browser restarts

### How to Use

#### Add Custom Host Manually
1. Go to **"Hosts"** tab
2. Enter hostname (e.g., `myapp.local`)
3. Enter IP (e.g., `127.0.0.1`)
4. Click **"Add"**

#### Import from Hosts File

**Mac/Linux**:
```bash
# View your hosts file
cat /etc/hosts

# Copy the content
# Then in extension:
```

1. Open your hosts file:
   - **Mac/Linux**: `/etc/hosts`
   - **Windows**: `C:\Windows\System32\drivers\etc\hosts`
2. Copy the entire content
3. Go to **"Hosts"** tab in extension
4. Click **"Import Hosts File"**
5. Paste content
6. Only 127.0.0.1 entries are imported

#### Export Hosts
1. Go to **"Hosts"** tab
2. Click **"Export Hosts"**
3. Downloads `.txt` file in hosts file format
4. Share with team or use as backup

### Limitations

⚠️ **Important**: This feature **does not modify** your system's actual hosts file or DNS resolution. It's for:
- Documentation/reference of your local hostname setup
- Quick access to common local hostnames
- Sharing team development setup

For actual DNS resolution, you still need to edit your system's hosts file.

### Example Use Cases

#### Development Team Setup
```
# Development servers
127.0.0.1    api.local
127.0.0.1    frontend.local
127.0.0.1    db.local
127.0.0.1    admin.local
```

#### Microservices
```
127.0.0.1    auth-service.dev
127.0.0.1    user-service.dev
127.0.0.1    payment-service.dev
127.0.0.1    gateway.dev
```

---

## 🔍 Search & Filter

### Overview
Powerful search functionality across all tabs.

### Features

#### Detected Apps Search
- Real-time filtering as you type
- Searches: port numbers, hosts, framework names
- Case-insensitive

#### Saved Apps Search
- Searches: name, port, URL, notes, tags
- Combined with tag filtering
- Results update instantly

#### Smart Matching
- Partial matches work
- Number search for ports (e.g., "3000")
- Text search for names/frameworks (e.g., "react")

### Search Tips

- **By Port**: Type `3000` to find all apps on port 3000
- **By Framework**: Type `react` to find all React apps
- **By Host**: Type `local` to find localhost apps
- **By Tag**: Use tag filters in Saved tab
- **Combined**: Search + tag filters work together

---

## 📈 Statistics & Tracking

### Features

The extension now tracks:
- **Access Count**: How many times you opened each app
- **Last Accessed**: When you last used the app
- **Most Used**: Shows your frequently-accessed apps
- **Recently Added**: Shows newest saved apps

### Viewing Stats
1. Go to **"Saved"** tab
2. Sort by "Most accessed" or "Recently added"
3. See usage patterns

### Use Cases
- Identify rarely-used apps (clean up)
- Find most common dev servers
- Track development patterns
- Optimize your workflow

---

## 🔐 Incognito Mode Support

### How It Works

**Chrome Sync Storage** is used for saved apps, which means:
- ✅ Apps persist across browser restarts
- ✅ Apps sync across your Chrome browsers
- ✅ Apps are accessible in incognito mode
- ✅ No data lost when clearing cache

### What Works in Incognito
- Saved apps list
- Custom hosts
- Port scanner
- Favorites and tags
- Import/export

### What's Limited in Incognito
- Real-time detected apps (incognito tabs are isolated)
- Docker detection may not work depending on setup
- Auto-detection of visited URLs

### Setup for Incognito
1. Go to `chrome://extensions/`
2. Find "Localhost App Detector"
3. Click **"Details"**
4. Enable **"Allow in incognito"**
5. Saved apps now work in incognito windows!

---

## 🚀 Advanced Workflows

### Workflow 1: Full Stack Developer

```
1. Start all services (frontend, backend, database)
2. Open extension
3. Go to Scanner tab
4. Run Quick Scan
5. Save each service with tags:
   - Frontend (3000) → Tag: "frontend", "react"
   - Backend (5000) → Tag: "backend", "api"
   - Database (5432) → Tag: "database", "postgres"
6. Use Saved tab for quick access later
```

### Workflow 2: Multiple Projects

```
1. Project A servers:
   - Save with tag "project-a"
2. Project B servers:
   - Save with tag "project-b"
3. Switch between projects using tag filters
4. Export each project's apps for team sharing
```

### Workflow 3: Client Work

```
1. Client X setup:
   - Tag apps: "client-x"
   - Add notes: "Staging server", "Production proxy"
2. Export apps as JSON
3. Share with team
4. Team imports and has instant access
```

### Workflow 4: Docker Development

```
1. Start docker-compose up
2. Docker toggle enabled
3. All containers appear automatically
4. Save containers you frequently restart
5. Use tags: "frontend-container", "backend-container"
6. Quick access even when containers restart
```

---

## 💡 Tips & Tricks

### Performance
- Use Quick Scan for daily use
- Use Deep Scan when troubleshooting
- Saved apps load instantly (no scanning)

### Organization
- Tag by project, client, or tech stack
- Use favorites for daily-use apps
- Add notes for complex setups

### Team Collaboration
- Export apps as JSON
- Share in team repository
- Everyone imports the same setup
- Include in onboarding docs

### Backup
- Export apps regularly
- Store in cloud (Dropbox, Drive)
- Version control friendly (JSON)

### Cleanup
- Sort by "Last accessed"
- Remove unused saved apps
- Keep saved apps list current

---

## ❓ FAQ

**Q: Can the extension scan ports on remote servers?**
A: The scanner is designed for localhost only for security. For remote scanning, use dedicated tools.

**Q: Why doesn't port scanner find my app?**
A: Ensure the app is actually listening on the port. Check with `netstat` or `lsof` commands.

**Q: How many apps can I save?**
A: Chrome Sync storage has a limit (~100KB), which allows hundreds of apps.

**Q: Do saved apps work on other computers?**
A: Yes! If you're signed into Chrome, saved apps sync across devices.

**Q: Can I password-protect saved apps?**
A: No, but they're tied to your Chrome profile which requires your computer login.

**Q: Does this slow down my browser?**
A: No, the extension is very lightweight and only active when you open the popup.

---

## 🐛 Troubleshooting

### Port Scanner Not Finding Anything
1. Ensure apps are actually running: `netstat -an | grep LISTEN`
2. Try Deep Scan instead of Quick Scan
3. Check firewall isn't blocking localhost connections
4. Try scanning specific port ranges manually

### Saved Apps Not Syncing
1. Ensure you're signed into Chrome
2. Check Chrome Sync is enabled in settings
3. Try exporting and importing manually
4. Check storage quota: `chrome://sync-internals/`

### Import Hosts File Fails
1. Ensure file is plain text
2. Check format matches hosts file standard
3. Only 127.0.0.1 entries are imported
4. Try manual entry for complex cases

---

**Need more help?** Check the main README or open an issue on GitHub.
