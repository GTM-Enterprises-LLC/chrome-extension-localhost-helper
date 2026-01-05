# Testing Checklist - Localhost App Detector v2.0

## ✅ Pre-Installation Tests

### Files Present
- [ ] manifest.json
- [ ] background.js
- [ ] popup.html
- [ ] popup.css
- [ ] popup.js
- [ ] docker-detector.js
- [ ] port-scanner.js
- [ ] saved-apps-manager.js
- [ ] icons/ directory with icon16.png, icon48.png, icon128.png

---

## 🔧 Installation Test

### Load Extension
1. [ ] Open Chrome
2. [ ] Navigate to `chrome://extensions/`
3. [ ] Enable "Developer mode" (toggle in top right)
4. [ ] Click "Load unpacked"
5. [ ] Select the `localhost-detector` folder
6. [ ] Extension loads without errors
7. [ ] Extension icon appears in toolbar
8. [ ] No errors in extension details page

### Console Check
1. [ ] Click "Inspect views: service worker" on extension page
2. [ ] Check console for errors
3. [ ] Should see "Localhost App Detector with Docker support initialized"
4. [ ] No red error messages

---

## 📱 UI Tests

### Popup Opens
1. [ ] Click extension icon
2. [ ] Popup opens (420px wide, 400-600px tall)
3. [ ] Header displays with gradient background
4. [ ] Three tabs visible: Detected, Saved, Scanner
5. [ ] Footer shows at bottom

### Tab Switching
1. [ ] Click "Detected" tab - shows detected apps view
2. [ ] Click "Saved" tab - shows saved apps view
3. [ ] Click "Scanner" tab - shows port scanner
4. [ ] Active tab highlights in blue
5. [ ] Content changes appropriately
6. [ ] No console errors during switching

---

## 🔍 Detected Apps Tab

### Initial State (No Apps Running)
1. [ ] Shows loading spinner briefly
2. [ ] Then shows empty state
3. [ ] Message: "No localhost apps detected"
4. [ ] Port chips visible: 3000, 5173, 8080, 4200, 8000
5. [ ] Docker status hidden if Docker not available

### Port Chip Test
1. [ ] Click any port chip (e.g., 3000)
2. [ ] New tab opens with `http://localhost:3000`
3. [ ] No errors

### With Running App
**Setup**: Start a local server (e.g., `python3 -m http.server 8000`)

1. [ ] Visit `http://localhost:8000` in browser
2. [ ] Click extension icon
3. [ ] App card appears in detected list
4. [ ] Shows port number (8000)
5. [ ] Shows "Active" status with green dot
6. [ ] Shows time (e.g., "Just now")
7. [ ] Click card - opens in new tab
8. [ ] Bookmark icon (📌) visible on card

### Save App Test
1. [ ] Click bookmark icon on detected app
2. [ ] Shows "App saved!" notification
3. [ ] Switch to "Saved" tab
4. [ ] App appears in saved list
5. [ ] Badge shows "1" on Saved tab

### Refresh Button
1. [ ] Click refresh button in header
2. [ ] Loading spinner shows
3. [ ] Apps reload
4. [ ] No errors

---

## 💾 Saved Apps Tab

### Empty State
1. [ ] Switch to Saved tab (with no saved apps)
2. [ ] Shows empty state with bookmark icon
3. [ ] Message: "No saved apps"
4. [ ] "Import Apps" button visible

### With Saved Apps
**Setup**: Save at least one app from Detected tab

1. [ ] Saved app card displays
2. [ ] Shows star icon (☆) for favorite
3. [ ] Shows trash icon (🗑️) for delete
4. [ ] Click card - opens in new tab
5. [ ] No bookmark icon (already saved)

### Favorite Test
1. [ ] Click star icon on saved app
2. [ ] Star fills (⭐)
3. [ ] Click again - star unfills (☆)
4. [ ] No errors

### Delete Test
1. [ ] Click trash icon on saved app
2. [ ] Confirmation dialog appears
3. [ ] Click "OK"
4. [ ] App removed from list
5. [ ] If last app, empty state shows

### Search Test
1. [ ] Save multiple apps with different ports
2. [ ] Type in search box (e.g., "3000")
3. [ ] Results filter in real-time
4. [ ] Only matching apps show
5. [ ] Clear search - all apps reappear

### Export Test
1. [ ] Click "Export" link in footer
2. [ ] JSON file downloads
3. [ ] File name: `localhost-apps-[timestamp].json`
4. [ ] Open file - contains saved apps array
5. [ ] Valid JSON format

### Import Test
1. [ ] Delete all saved apps
2. [ ] Click "Import Apps" button
3. [ ] File picker opens
4. [ ] Select previously exported JSON file
5. [ ] Shows "Apps imported successfully!"
6. [ ] Apps appear in saved list
7. [ ] No duplicates if importing twice

---

## 🔬 Port Scanner Tab

### Initial State
1. [ ] Switch to Scanner tab
2. [ ] Shows empty state with magnifying glass icon
3. [ ] Host input field shows "localhost"
4. [ ] "Quick scan" checkbox is checked
5. [ ] "Start Scan" button visible

### Quick Scan Test
1. [ ] Ensure quick scan is checked
2. [ ] Click "Start Scan"
3. [ ] Empty state hides
4. [ ] Progress bar appears
5. [ ] Progress increases (0% → 100%)
6. [ ] Text shows "Scanning... X%"
7. [ ] Button disables during scan
8. [ ] Scan completes in 3-10 seconds
9. [ ] Results display if ports found
10. [ ] "Found X open ports" header shows
11. [ ] Each found port shows as app card
12. [ ] Click card - opens in new tab
13. [ ] Bookmark icon available on cards

### Deep Scan Test
1. [ ] Uncheck "Quick scan"
2. [ ] Click "Start Scan"
3. [ ] Progress bar appears
4. [ ] Takes longer (30-60 seconds)
5. [ ] More ports may be found
6. [ ] Results display correctly

### No Results Test
**Setup**: Stop all localhost services

1. [ ] Run quick scan
2. [ ] Scan completes
3. [ ] Shows "Found 0 open ports" or empty state
4. [ ] No errors

### Save from Scanner Test
1. [ ] Run scan with running apps
2. [ ] Click bookmark icon on scanned result
3. [ ] App saves successfully
4. [ ] Appears in Saved tab

### Clear Results Test
1. [ ] After scan with results
2. [ ] Click "Clear" button
3. [ ] Results hide
4. [ ] Empty state shows

---

## 🐳 Docker Integration

### Without Docker
1. [ ] Docker not running or API not enabled
2. [ ] Docker status bar hidden or shows "Not available"
3. [ ] Docker toggle button not highlighted
4. [ ] Rest of extension works normally

### With Docker Setup
**Setup**: Enable Docker API on port 2375

1. [ ] Start Docker
2. [ ] Run a container: `docker run -d -p 8080:80 nginx`
3. [ ] Click extension icon
4. [ ] Docker status shows "Connected"
5. [ ] Shows "1 container"
6. [ ] Container appears in detected list
7. [ ] Has blue left border
8. [ ] Shows 🐳 icon
9. [ ] Shows container ID
10. [ ] Shows "nginx" or framework info
11. [ ] Click card - opens `http://localhost:8080`

### Docker Toggle Test
1. [ ] Click Docker toggle button
2. [ ] Button unhighlights
3. [ ] Docker containers disappear from list
4. [ ] Status bar hides
5. [ ] Click toggle again
6. [ ] Button highlights
7. [ ] Containers reappear

---

## ⚙️ Settings & Features

### Incognito Mode
1. [ ] Go to `chrome://extensions/`
2. [ ] Find extension, click "Details"
3. [ ] Enable "Allow in incognito"
4. [ ] Open incognito window
5. [ ] Extension icon visible
6. [ ] Open extension popup
7. [ ] Saved apps accessible
8. [ ] All features work

### Sync Storage Test
1. [ ] Save apps in Chrome
2. [ ] Sign into Chrome (if not already)
3. [ ] Wait a few minutes
4. [ ] Open Chrome on another device (or reinstall extension)
5. [ ] Saved apps sync across

### Footer Links
1. [ ] Click "Help" link
2. [ ] Opens GitHub README (or shows alert if not set up)
3. [ ] Click "Export" link
4. [ ] Exports saved apps as JSON

---

## 🐛 Error Handling

### Network Errors
1. [ ] Disconnect internet
2. [ ] Try various actions
3. [ ] No crashes
4. [ ] Graceful degradation

### Invalid Data
1. [ ] Try importing invalid JSON file
2. [ ] Shows error message
3. [ ] Extension still works

### Module Loading
1. [ ] Check service worker console
2. [ ] All modules load without errors
3. [ ] No "importScripts failed" messages

---

## 📊 Performance Tests

### Popup Opens Quickly
1. [ ] Click extension icon
2. [ ] Popup opens in < 1 second
3. [ ] No lag or freezing

### Search Performance
1. [ ] Save 20+ apps
2. [ ] Type in search quickly
3. [ ] Results filter smoothly
4. [ ] No lag

### Port Scanner Performance
1. [ ] Run deep scan
2. [ ] Extension remains responsive
3. [ ] Can switch tabs during scan
4. [ ] Browser doesn't freeze

---

## ✅ Browser Compatibility

### Chrome
- [ ] Version 88+ works
- [ ] All features functional

### Edge
- [ ] Extension loads
- [ ] All features work

### Brave
- [ ] Extension loads
- [ ] All features work

---

## 📝 Final Checks

### Before Publishing
- [ ] All features work end-to-end
- [ ] No console errors
- [ ] All tabs functional
- [ ] Save/load works
- [ ] Import/export works
- [ ] Port scanner works
- [ ] Docker optional but working
- [ ] UI looks professional
- [ ] Responsive to different screen sizes
- [ ] No crashes or freezes
- [ ] Privacy policy created
- [ ] Screenshots taken
- [ ] Store description written

---

## 🎯 Known Limitations

### Expected Behavior (Not Bugs):
- [ ] Apps expire after 5 minutes of no visits
- [ ] Docker requires manual API setup
- [ ] Port scanner only works on localhost
- [ ] Can't automatically read system hosts file
- [ ] Incognito detection limited by browser isolation

---

## 📞 If Something Fails

### Common Issues:

**Extension won't load**:
- Check all required files present
- Check manifest.json syntax
- Look for console errors

**Popup is blank**:
- Check popup.html loads
- Check popup.js for errors
- Check CSS file loads

**Features don't work**:
- Check background.js console
- Verify message handlers exist
- Check chrome.runtime.sendMessage calls

**Docker doesn't work**:
- This is expected if Docker API not enabled
- Extension should still work for localhost

---

## ✨ Success Criteria

Extension is ready if:
- [✓] Loads without errors
- [✓] All three tabs work
- [✓] Can detect localhost apps
- [✓] Can save and load apps
- [✓] Port scanner finds ports
- [✓] Import/export works
- [✓] No crashes during normal use

---

**Current Version**: 2.0.0
**Test Date**: ____________
**Tester**: ____________
**Result**: ☐ PASS ☐ FAIL ☐ NEEDS WORK
