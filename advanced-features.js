// ADVANCED FEATURES EXAMPLE
// This file shows how to extend the extension with additional capabilities

// ============================================
// FEATURE 1: Custom Port Configuration Storage
// ============================================

// Add this to background.js to allow users to configure custom ports
class PortManager {
  constructor() {
    this.customPorts = [];
    this.loadCustomPorts();
  }

  async loadCustomPorts() {
    const result = await chrome.storage.sync.get(['customPorts']);
    this.customPorts = result.customPorts || [];
  }

  async addPort(port, label) {
    this.customPorts.push({ port, label });
    await chrome.storage.sync.set({ customPorts: this.customPorts });
  }

  async removePort(port) {
    this.customPorts = this.customPorts.filter(p => p.port !== port);
    await chrome.storage.sync.set({ customPorts: this.customPorts });
  }

  getAllPorts() {
    return [...commonPorts, ...this.customPorts.map(p => p.port)];
  }
}

// ============================================
// FEATURE 2: Framework Detection
// ============================================

async function detectFramework(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // React detection
    if (html.includes('react') || html.includes('__REACT')) {
      return { framework: 'React', icon: '⚛️' };
    }
    
    // Vue detection
    if (html.includes('vue') || html.includes('__VUE__')) {
      return { framework: 'Vue', icon: '💚' };
    }
    
    // Angular detection
    if (html.includes('ng-version') || html.includes('angular')) {
      return { framework: 'Angular', icon: '🅰️' };
    }
    
    // Next.js detection
    if (html.includes('__NEXT_DATA__')) {
      return { framework: 'Next.js', icon: '▲' };
    }
    
    return { framework: 'Unknown', icon: '🌐' };
  } catch (error) {
    return { framework: 'Unknown', icon: '🌐' };
  }
}

// ============================================
// FEATURE 3: App Health Monitoring
// ============================================

async function checkAppHealth(url) {
  try {
    const startTime = Date.now();
    const response = await fetch(url, { method: 'HEAD' });
    const responseTime = Date.now() - startTime;
    
    return {
      status: response.ok ? 'healthy' : 'error',
      responseTime,
      statusCode: response.status
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: null,
      statusCode: null,
      error: error.message
    };
  }
}

// ============================================
// FEATURE 4: App Notes/Tags
// ============================================

class AppNotesManager {
  constructor() {
    this.notes = new Map();
    this.loadNotes();
  }

  async loadNotes() {
    const result = await chrome.storage.local.get(['appNotes']);
    this.notes = new Map(Object.entries(result.appNotes || {}));
  }

  async saveNote(url, note) {
    this.notes.set(url, note);
    const notesObj = Object.fromEntries(this.notes);
    await chrome.storage.local.set({ appNotes: notesObj });
  }

  getNote(url) {
    return this.notes.get(url) || '';
  }
}

// ============================================
// FEATURE 5: Export/Import Configuration
// ============================================

function exportConfiguration() {
  return {
    apps: Array.from(localhostApps.values()),
    customPorts: portManager.customPorts,
    notes: Object.fromEntries(notesManager.notes),
    exportDate: new Date().toISOString()
  };
}

function importConfiguration(config) {
  // Restore apps
  config.apps.forEach(app => {
    localhostApps.set(`${app.host}:${app.port}`, app);
  });
  
  // Restore custom ports
  if (config.customPorts) {
    portManager.customPorts = config.customPorts;
    chrome.storage.sync.set({ customPorts: config.customPorts });
  }
  
  // Restore notes
  if (config.notes) {
    notesManager.notes = new Map(Object.entries(config.notes));
    chrome.storage.local.set({ appNotes: config.notes });
  }
}

// ============================================
// FEATURE 6: Search/Filter
// ============================================

function filterApps(apps, searchTerm) {
  const term = searchTerm.toLowerCase();
  return apps.filter(app => {
    return app.host.toLowerCase().includes(term) ||
           app.port.toString().includes(term) ||
           app.url.toLowerCase().includes(term) ||
           getPortLabel(app.port).toLowerCase().includes(term);
  });
}

// ============================================
// FEATURE 7: Favorites System
// ============================================

class FavoritesManager {
  constructor() {
    this.favorites = new Set();
    this.loadFavorites();
  }

  async loadFavorites() {
    const result = await chrome.storage.sync.get(['favorites']);
    this.favorites = new Set(result.favorites || []);
  }

  async toggleFavorite(url) {
    if (this.favorites.has(url)) {
      this.favorites.delete(url);
    } else {
      this.favorites.add(url);
    }
    await chrome.storage.sync.set({ favorites: Array.from(this.favorites) });
  }

  isFavorite(url) {
    return this.favorites.has(url);
  }

  getFavorites() {
    return Array.from(this.favorites);
  }
}

// ============================================
// FEATURE 8: Notification System
// ============================================

async function notifyNewApp(app) {
  await chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'New Localhost App Detected',
    message: `${getPortLabel(app.port)} running on ${app.url}`,
    priority: 1
  });
}

// ============================================
// FEATURE 9: Statistics & Analytics
// ============================================

class StatsManager {
  constructor() {
    this.stats = {
      totalAppsDetected: 0,
      mostUsedPort: null,
      appsHistory: [],
      sessionStart: Date.now()
    };
    this.loadStats();
  }

  async loadStats() {
    const result = await chrome.storage.local.get(['stats']);
    if (result.stats) {
      this.stats = { ...this.stats, ...result.stats };
    }
  }

  async recordAppDetection(app) {
    this.stats.totalAppsDetected++;
    this.stats.appsHistory.push({
      ...app,
      detectedAt: Date.now()
    });
    
    // Keep only last 100 entries
    if (this.stats.appsHistory.length > 100) {
      this.stats.appsHistory = this.stats.appsHistory.slice(-100);
    }
    
    // Calculate most used port
    const portCounts = {};
    this.stats.appsHistory.forEach(a => {
      portCounts[a.port] = (portCounts[a.port] || 0) + 1;
    });
    this.stats.mostUsedPort = Object.keys(portCounts).reduce((a, b) => 
      portCounts[a] > portCounts[b] ? a : b
    );
    
    await chrome.storage.local.set({ stats: this.stats });
  }

  getStats() {
    return {
      ...this.stats,
      sessionDuration: Date.now() - this.stats.sessionStart
    };
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// In background.js, add these managers:
const portManager = new PortManager();
const notesManager = new AppNotesManager();
const favoritesManager = new FavoritesManager();
const statsManager = new StatsManager();

// Handle additional messages:
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addCustomPort') {
    portManager.addPort(request.port, request.label).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'toggleFavorite') {
    favoritesManager.toggleFavorite(request.url).then(() => {
      sendResponse({ isFavorite: favoritesManager.isFavorite(request.url) });
    });
    return true;
  }
  
  if (request.action === 'getStats') {
    sendResponse({ stats: statsManager.getStats() });
  }
  
  if (request.action === 'exportConfig') {
    sendResponse({ config: exportConfiguration() });
  }
  
  if (request.action === 'importConfig') {
    importConfiguration(request.config);
    sendResponse({ success: true });
  }
});

// When a new app is detected:
async function onNewAppDetected(app) {
  await statsManager.recordAppDetection(app);
  await notifyNewApp(app);
  const framework = await detectFramework(app.url);
  const health = await checkAppHealth(app.url);
  
  // Store enhanced app data
  localhostApps.set(`${app.host}:${app.port}`, {
    ...app,
    framework,
    health
  });
}
*/

// ============================================
// HTML ADDITIONS FOR ADVANCED FEATURES
// ============================================

/*
Add to popup.html:

<!-- Search Bar -->
<div class="search-container">
  <input type="text" id="searchInput" placeholder="Search apps...">
</div>

<!-- Filter Buttons -->
<div class="filter-buttons">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="favorites">Favorites</button>
  <button class="filter-btn" data-filter="active">Active</button>
</div>

<!-- Stats Panel -->
<div class="stats-panel">
  <div class="stat-item">
    <span class="stat-label">Total Apps</span>
    <span class="stat-value" id="totalApps">0</span>
  </div>
  <div class="stat-item">
    <span class="stat-label">Most Used Port</span>
    <span class="stat-value" id="mostUsedPort">-</span>
  </div>
</div>

<!-- Enhanced App Card with additional buttons -->
<div class="app-card">
  <!-- existing content -->
  <div class="app-actions">
    <button class="action-btn favorite-btn" title="Favorite">⭐</button>
    <button class="action-btn note-btn" title="Add note">📝</button>
    <button class="action-btn health-btn" title="Check health">💚</button>
  </div>
</div>
*/

console.log('Advanced features loaded. See comments for implementation details.');
