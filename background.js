// Background service worker for tracking localhost applications with Docker support
importScripts('docker-manager.js');
importScripts('port-scanner.js');
importScripts('saved-apps-manager.js');

let localhostApps = new Map();
let dockerDetector = null;
let portScanner = null;
let savedAppsManager = null;
let dockerEnabled = true;

// Initialize Docker detector
async function initDockerDetector() {
  dockerDetector = new DockerManager();
  portScanner = new PortScanner();
  savedAppsManager = new SavedAppsManager();
  
  // Load user settings
  const settings = await chrome.storage.local.get(['dockerEnabled']);
  dockerEnabled = settings.dockerEnabled !== false; // Default to true
  
  if (dockerEnabled) {
    const isAvailable = await dockerDetector.checkDockerAvailability();
    
    if (isAvailable) {
      console.log('Docker daemon detected, starting monitoring...');
      dockerDetector.startPolling(5000);
    } else {
      console.log('Docker daemon not available via API');
    }
  }
}

// Initialize on extension load
initDockerDetector();

// Common development ports to check
const commonPorts = [
  3000, 3001, 3002, 3003, // React, Next.js
  4200, 4201, // Angular
  5000, 5001, 5173, 5174, // Flask, Vite
  8000, 8001, 8080, 8081, 8888, // Django, general dev servers
  9000, 9001, // PHP, general
  4000, 4001, // Jekyll, Gatsby
  1313, // Hugo
  8081, 8082, 8083, // General dev
  6006, // Storybook
  24678, // Webpack dev server
];

// Listen for web requests to detect active localhost apps
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    const port = url.port || (url.protocol === 'https:' ? '443' : '80');
    const key = `localhost:${url.hostname}:${port}`;
    
    localhostApps.set(key, {
      host: url.hostname,
      port: port,
      lastSeen: Date.now(),
      url: `${url.protocol}//${url.hostname}:${port}`,
      type: 'localhost'
    });
  },
  {
    urls: [
      "http://localhost/*",
      "http://127.0.0.1/*",
      "https://localhost/*",
      "https://127.0.0.1/*",
      "http://host.docker.internal/*"
    ]
  }
);

// Merge localhost and Docker apps
function getAllApps() {
  const now = Date.now();
  const apps = [];
  
  // Add localhost apps (clean up old ones)
  for (const [key, app] of localhostApps.entries()) {
    if (now - app.lastSeen <= 300000) { // 5 minutes
      apps.push(app);
    } else {
      localhostApps.delete(key);
    }
  }
  
  // Add Docker apps if enabled
  if (dockerEnabled && dockerDetector && dockerDetector.isDockerAvailable) {
    const dockerApps = dockerDetector.getDockerApps();
    apps.push(...dockerApps);
  }
  
  return apps;
}

// Scan for active localhost applications
async function scanForApps() {
  const results = [];
  
  for (const port of commonPorts) {
    try {
      for (const host of ['localhost', '127.0.0.1']) {
        const key = `localhost:${host}:${port}`;
        
        if (localhostApps.has(key)) {
          const app = localhostApps.get(key);
          if (Date.now() - app.lastSeen > 300000) {
            localhostApps.delete(key);
          }
        }
      }
    } catch (error) {
      // Port not accessible
    }
  }
  
  return getAllApps();
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getApps') {
    scanForApps().then(apps => {
      sendResponse({ 
        apps,
        dockerAvailable: dockerDetector?.isDockerAvailable || false,
        dockerEnabled: dockerEnabled,
        savedApps: savedAppsManager?.getSavedApps() || []
      });
    });
    return true;
  }
  
  if (request.action === 'openApp') {
    // Record access if it's a saved app
    if (request.appId && savedAppsManager) {
      savedAppsManager.recordAccess(request.appId);
    }
    chrome.tabs.create({ url: request.url });
    sendResponse({ success: true });
  }
  
  if (request.action === 'clearCache') {
    localhostApps.clear();
    sendResponse({ success: true });
  }
  
  if (request.action === 'toggleDocker') {
    dockerEnabled = !dockerEnabled;
    chrome.storage.local.set({ dockerEnabled });
    
    if (dockerEnabled && dockerDetector) {
      dockerDetector.startPolling(5000);
    } else if (dockerDetector) {
      dockerDetector.stopPolling();
    }
    
    sendResponse({ dockerEnabled });
  }
  
  if (request.action === 'getDockerStats') {
    const stats = dockerDetector ? dockerDetector.getStats() : null;
    sendResponse({ stats });
  }
  
  if (request.action === 'refreshDocker') {
    if (dockerDetector && dockerEnabled) {
      dockerDetector.processContainers().then(apps => {
        sendResponse({ apps });
      });
      return true;
    }
    sendResponse({ apps: [] });
  }
  
  if (request.action === 'getContainerDetails') {
    if (dockerDetector && dockerEnabled) {
      dockerDetector.getContainerDetails(request.containerId).then(details => {
        sendResponse({ details });
      });
      return true;
    }
    sendResponse({ details: null });
  }
  
  // Port Scanner actions
  if (request.action === 'startPortScan') {
    if (portScanner) {
      portScanner.scanPorts(
        request.host || 'localhost',
        request.quickScan !== false,
        request.concurrency || 10
      ).then(results => {
        sendResponse({ results, success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'getScanStatus') {
    const status = portScanner ? portScanner.getStatus() : null;
    sendResponse({ status });
  }
  
  if (request.action === 'getScanResults') {
    const results = portScanner ? portScanner.getResults() : [];
    sendResponse({ results });
  }
  
  // Saved Apps actions
  if (request.action === 'saveApp') {
    if (savedAppsManager) {
      savedAppsManager.addApp(request.app).then(savedApp => {
        sendResponse({ savedApp, success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'removeApp') {
    if (savedAppsManager) {
      savedAppsManager.removeApp(request.appId).then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'updateApp') {
    if (savedAppsManager) {
      savedAppsManager.updateApp(request.appId, request.updates).then(app => {
        sendResponse({ app, success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'toggleFavorite') {
    if (savedAppsManager) {
      savedAppsManager.toggleFavorite(request.appId).then(isFavorite => {
        sendResponse({ isFavorite, success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'getSavedApps') {
    const apps = savedAppsManager ? savedAppsManager.getSavedApps() : [];
    sendResponse({ apps });
  }
  
  if (request.action === 'getFavorites') {
    const favorites = savedAppsManager ? savedAppsManager.getFavorites() : [];
    sendResponse({ favorites });
  }
  
  if (request.action === 'searchSavedApps') {
    const results = savedAppsManager ? savedAppsManager.searchSavedApps(request.query) : [];
    sendResponse({ results });
  }
  
  if (request.action === 'importApps') {
    if (savedAppsManager) {
      savedAppsManager.importApps(request.jsonData).then(success => {
        sendResponse({ success });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'exportApps') {
    const jsonData = savedAppsManager ? savedAppsManager.exportApps() : '[]';
    sendResponse({ jsonData });
  }
  
  if (request.action === 'addCustomHost') {
    if (savedAppsManager) {
      savedAppsManager.addCustomHost(request.hostname, request.ip).then(success => {
        sendResponse({ success });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'importHostsFile') {
    if (savedAppsManager) {
      savedAppsManager.importHostsFile(request.content).then(imported => {
        sendResponse({ imported, success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'getCustomHosts') {
    const hosts = savedAppsManager ? savedAppsManager.getCustomHosts() : [];
    sendResponse({ hosts });
  }
  
  if (request.action === 'getStats') {
    const stats = savedAppsManager ? savedAppsManager.getStats() : null;
    sendResponse({ stats });
  }
  
  if (request.action === 'addTag') {
    if (savedAppsManager) {
      savedAppsManager.addTag(request.appId, request.tag).then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
    sendResponse({ success: false });
  }
  
  if (request.action === 'getAllTags') {
    const tags = savedAppsManager ? savedAppsManager.getAllTags() : [];
    sendResponse({ tags });
  }
});

// Periodically clean up old entries
setInterval(() => {
  const now = Date.now();
  for (const [key, app] of localhostApps.entries()) {
    if (now - app.lastSeen > 300000) {
      localhostApps.delete(key);
    }
  }
}, 60000);

// Handle extension installation
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Set default settings
    await chrome.storage.local.set({ 
      dockerEnabled: true 
    });
  }
});

console.log('Localhost App Detector with Docker support initialized');
