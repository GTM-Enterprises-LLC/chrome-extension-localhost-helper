# Quick Installation Guide

## Step-by-Step Installation

### 1. Prepare the Extension

Make sure all files are in the `localhost-detector` folder:
- manifest.json
- background.js
- popup.html
- popup.css
- popup.js
- icons/icon16.png
- icons/icon48.png
- icons/icon128.png

### 2. Load into Chrome

1. Open Chrome and go to: `chrome://extensions/`
   
2. Enable "Developer mode" (toggle in top-right corner)

3. Click "Load unpacked" button

4. Navigate to and select the `localhost-detector` folder

5. The extension should now appear in your extensions list!

### 3. Pin the Extension (Recommended)

1. Click the puzzle piece icon (🧩) in your Chrome toolbar
2. Find "Localhost App Detector" in the list
3. Click the pin icon (📌) next to it
4. The extension icon will now be visible in your toolbar

### 4. Test It Out

1. Start a local development server (e.g., `npm start` on port 3000)
2. Open `http://localhost:3000` in your browser
3. Click the extension icon
4. You should see your app listed!

## Troubleshooting Installation

**Issue**: Extension doesn't load
- **Solution**: Make sure all files are present, especially manifest.json

**Issue**: Icons not showing
- **Solution**: Run the icon creation script or manually add placeholder images

**Issue**: Can't find extension after loading
- **Solution**: Look for the puzzle piece icon and pin the extension

**Issue**: "Manifest version not supported"
- **Solution**: Make sure you're using Chrome 88+ (Manifest V3 required)

## Updating the Extension

After making changes to the code:

1. Go to `chrome://extensions/`
2. Find "Localhost App Detector"
3. Click the refresh/reload icon (🔄)
4. Your changes will be applied immediately

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "Localhost App Detector"
3. Click "Remove"
4. Confirm removal

That's it! You're ready to track all your localhost applications.
