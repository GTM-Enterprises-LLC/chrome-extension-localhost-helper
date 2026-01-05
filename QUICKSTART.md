# Quick Start Guide - Get Running in 5 Minutes

## 🚀 Installation (2 minutes)

### Step 1: Prepare the Extension
1. Download or clone the `localhost-detector` folder
2. Make sure you have these files:
   - manifest.json
   - background.js
   - popup.html/css/js
   - docker-detector.js
   - port-scanner.js
   - saved-apps-manager.js
   - icons folder

### Step 2: Load into Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right)
4. Click "Load unpacked"
5. Select the `localhost-detector` folder
6. ✅ Extension loaded!

### Step 3: Pin to Toolbar
1. Click puzzle icon (🧩) in Chrome toolbar
2. Find "Localhost App Detector"
3. Click pin icon (📌)
4. Icon now visible in toolbar

---

## 🎯 First Use (3 minutes)

### Test #1: Detect a Localhost App

**Start a simple server**:
```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# Or any dev server you already have running
```

**See it in the extension**:
1. Visit `http://localhost:8000` in your browser
2. Click the extension icon
3. See your app listed!
4. Click the card to open it

### Test #2: Save an App
1. Click the bookmark icon (📌) on the detected app
2. Switch to "Saved" tab
3. Your app is now permanently saved
4. Works even in incognito mode!

### Test #3: Scan for All Ports
1. Go to "Scanner" tab
2. Click "Start Scan"
3. Wait ~5 seconds
4. See all running services on your machine
5. Click any to open

---

## 🎨 What Each Tab Does

### Detected Tab
- Shows apps you've visited recently
- Auto-detected from browser traffic
- Apps expire after 5 minutes if not visited
- Quick launch common ports

### Saved Tab
- Apps you've bookmarked
- Permanent (survives browser restart)
- Search, favorite, organize
- Import/export configurations

### Scanner Tab
- Find ALL running localhost services
- Quick scan: ~100 common ports
- Deep scan: 400+ ports
- Save discoveries

---

## 💡 Pro Tips

### Tip 1: Quick Port Launch
Click any port chip (3000, 8080, etc.) in the empty state to instantly open that port.

### Tip 2: Save Your Stack
1. Start all your dev services
2. Scan or detect them
3. Save each one
4. Tag them (e.g., "frontend", "api", "database")
5. Export as JSON
6. Share with your team!

### Tip 3: Use in Incognito
1. Go to `chrome://extensions/`
2. Click "Details" on the extension
3. Enable "Allow in incognito"
4. Saved apps work everywhere!

---

## 🐳 Docker (Optional)

Want to see Docker containers too?

### Quick Docker Setup

**Mac/Windows** (Docker Desktop):
1. Open Docker Desktop Settings
2. Enable "Expose daemon on tcp://localhost:2375"
3. Restart Docker
4. Refresh extension
5. Docker containers now appear!

**Linux**:
```bash
sudo nano /etc/docker/daemon.json
# Add: {"hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]}
sudo systemctl restart docker
```

⚠️ **Security**: Only enable on localhost/development machines!

---

## ❓ Troubleshooting

### "No apps detected"
- **Fix**: Visit a localhost URL first, then open extension
- **Or**: Use the Scanner tab to find running services

### "Docker: Not available"
- **Fix**: This is normal if Docker API not enabled
- **Or**: See Docker setup above
- **Or**: Just ignore - Docker is optional!

### "Port scanner finds nothing"
- **Fix**: Make sure services are actually running
- **Check**: `netstat -an | grep LISTEN` (Mac/Linux)
- **Or**: Try deep scan instead of quick scan

### Extension won't load
- **Fix**: Make sure all files are in the folder
- **Check**: `chrome://extensions/` for error messages
- **Check**: "Inspect views: service worker" for console errors

---

## 🎉 You're Done!

You now have:
- ✅ Automatic localhost app detection
- ✅ Port scanner for finding services
- ✅ Saved apps that work everywhere
- ✅ (Optional) Docker container visibility

---

## 📚 Learn More

### Documentation
- **NEW_FEATURES.md** - Detailed feature guide
- **TESTING_CHECKLIST.md** - Complete testing guide
- **DOCKER_GUIDE.md** - Docker setup details
- **README.md** - Full documentation

### Get Help
- Check console: Right-click extension → Inspect views
- Read error messages
- Check the testing checklist

---

## 🚀 Next Steps

### Customize Your Workflow
1. Save all your frequently-used apps
2. Tag them by project
3. Use search to switch contexts quickly
4. Export and backup your configuration

### Share with Team
1. Export your saved apps
2. Share JSON file
3. Team imports
4. Everyone has same setup!

### Advanced Features
- Add notes to saved apps
- Create project groups (via tags)
- Track usage statistics
- Batch save from scanner

---

**Time to productive use**: ~5 minutes ✨

**Happy developing!** 🎯
