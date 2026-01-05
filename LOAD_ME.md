# 🚀 LOAD ME - Quick Start

## ✅ Extension Validated and Ready!

All files are present and correct. The extension is ready to load.

---

## 📦 Installation (2 minutes)

### Step 1: Extract the ZIP
Unzip `localhost-detector.zip` to a folder on your computer.

### Step 2: Load in Chrome

1. Open Chrome
2. Go to: **`chrome://extensions/`**
3. Toggle **"Developer mode"** ON (top-right corner)
4. Click **"Load unpacked"**
5. Select the **`localhost-detector`** folder
6. Done! ✅

### Step 3: Pin to Toolbar (Optional)

1. Click the puzzle piece icon 🧩 in Chrome toolbar
2. Find "Localhost App Detector"
3. Click the pin icon 📌

---

## 🧪 Test It Works

### Quick Test:

1. **Start a simple server:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Visit:** `http://localhost:8000` in your browser

3. **Click extension icon** - you should see your app listed!

### OR use the test page:

1. Open `test.html` in your browser
2. It will show if the extension is working

---

## ❓ Troubleshooting

### Service Worker Error?
- **Check:** `chrome://extensions/` → Click "Errors" on the extension
- **Fix:** All files should be in the same folder as manifest.json

### Extension won't load?
- **Check:** Developer mode is enabled
- **Check:** You selected the folder containing manifest.json (not a parent folder)
- **Try:** Remove and reload the extension

### Still not working?
1. Open `chrome://extensions/`
2. Find the extension
3. Click "Errors" to see detailed error messages
4. Share the error message for help

---

## 📚 What Next?

### Learn the Features:
- Read **`QUICKSTART.md`** - 5-minute tutorial
- Read **`TESTING_CHECKLIST.md`** - Test all features
- Read **`NEW_FEATURES.md`** - Detailed documentation

### Use It:
1. **Detected Tab** - See apps you visit automatically
2. **Saved Tab** - Bookmark apps for permanent access
3. **Scanner Tab** - Find all running localhost services

---

## ✨ Features

- ✅ Auto-detect localhost apps
- ✅ Docker container detection (optional)
- ✅ Port scanner (scan 100-400+ ports)
- ✅ Save apps permanently
- ✅ Works in incognito mode
- ✅ Search, favorite, organize
- ✅ Import/export configurations

---

## 🎯 Quick Commands

### Start Test Servers:
```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8080

# PHP
php -S localhost:8000
```

### Validate Extension:
```bash
# Run from extension folder
bash validate.sh
```

---

## 📞 Support

- **Documentation:** See all .md files in this folder
- **Issues:** Check console at `chrome://extensions/`
- **Test Page:** Open `test.html` in browser

---

**You're ready! Open Chrome and load the extension! 🚀**
