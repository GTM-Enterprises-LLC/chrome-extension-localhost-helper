// Saved Apps Manager
// Manages persistent app lists that work across sessions and incognito mode

class SavedAppsManager {
  constructor() {
    this.savedApps = [];
    this.customHosts = [];
    this.loadFromStorage();
  }

  // Load saved data from storage
  async loadFromStorage() {
    try {
      const data = await chrome.storage.sync.get(['savedApps', 'customHosts']);
      this.savedApps = data.savedApps || [];
      this.customHosts = data.customHosts || [];
    } catch (error) {
      console.error('Failed to load saved apps:', error);
    }
  }

  // Save to storage
  async saveToStorage() {
    try {
      await chrome.storage.sync.set({
        savedApps: this.savedApps,
        customHosts: this.customHosts
      });
    } catch (error) {
      console.error('Failed to save apps:', error);
    }
  }

  // Add app to saved list
  async addApp(app) {
    // Check if already exists
    const exists = this.savedApps.some(
      saved => saved.url === app.url || (saved.host === app.host && saved.port === app.port)
    );

    if (!exists) {
      const savedApp = {
        id: Date.now().toString(),
        name: app.name || `${app.host}:${app.port}`,
        host: app.host,
        port: app.port,
        url: app.url,
        type: app.type || 'localhost',
        framework: app.framework,
        icon: app.icon,
        color: app.color,
        notes: '',
        tags: [],
        favorite: false,
        addedAt: Date.now(),
        lastAccessed: null,
        accessCount: 0
      };

      this.savedApps.push(savedApp);
      await this.saveToStorage();
      return savedApp;
    }
    return null;
  }

  // Remove app from saved list
  async removeApp(appId) {
    this.savedApps = this.savedApps.filter(app => app.id !== appId);
    await this.saveToStorage();
  }

  // Update app details
  async updateApp(appId, updates) {
    const app = this.savedApps.find(a => a.id === appId);
    if (app) {
      Object.assign(app, updates);
      await this.saveToStorage();
      return app;
    }
    return null;
  }

  // Toggle favorite
  async toggleFavorite(appId) {
    const app = this.savedApps.find(a => a.id === appId);
    if (app) {
      app.favorite = !app.favorite;
      await this.saveToStorage();
      return app.favorite;
    }
    return false;
  }

  // Record app access
  async recordAccess(appId) {
    const app = this.savedApps.find(a => a.id === appId);
    if (app) {
      app.lastAccessed = Date.now();
      app.accessCount = (app.accessCount || 0) + 1;
      await this.saveToStorage();
    }
  }

  // Get all saved apps
  getSavedApps() {
    return this.savedApps;
  }

  // Get favorites
  getFavorites() {
    return this.savedApps.filter(app => app.favorite);
  }

  // Search saved apps
  searchSavedApps(query) {
    const lowerQuery = query.toLowerCase();
    return this.savedApps.filter(app => {
      return app.name.toLowerCase().includes(lowerQuery) ||
             app.host.toLowerCase().includes(lowerQuery) ||
             app.port.toString().includes(lowerQuery) ||
             app.url.toLowerCase().includes(lowerQuery) ||
             (app.notes && app.notes.toLowerCase().includes(lowerQuery)) ||
             (app.tags && app.tags.some(tag => tag.toLowerCase().includes(lowerQuery)));
    });
  }

  // Import apps from JSON
  async importApps(jsonData) {
    try {
      const apps = JSON.parse(jsonData);
      if (Array.isArray(apps)) {
        // Merge with existing, avoiding duplicates
        apps.forEach(app => {
          const exists = this.savedApps.some(
            saved => saved.url === app.url || (saved.host === app.host && saved.port === app.port)
          );
          if (!exists) {
            this.savedApps.push({
              ...app,
              id: app.id || Date.now().toString() + Math.random(),
              addedAt: app.addedAt || Date.now()
            });
          }
        });
        await this.saveToStorage();
        return true;
      }
    } catch (error) {
      console.error('Failed to import apps:', error);
      return false;
    }
  }

  // Export apps to JSON
  exportApps() {
    return JSON.stringify(this.savedApps, null, 2);
  }

  // Add custom host
  async addCustomHost(hostname, ip) {
    const exists = this.customHosts.some(h => h.hostname === hostname);
    if (!exists) {
      this.customHosts.push({
        hostname,
        ip,
        addedAt: Date.now()
      });
      await this.saveToStorage();
      return true;
    }
    return false;
  }

  // Remove custom host
  async removeCustomHost(hostname) {
    this.customHosts = this.customHosts.filter(h => h.hostname !== hostname);
    await this.saveToStorage();
  }

  // Get custom hosts
  getCustomHosts() {
    return this.customHosts;
  }

  // Parse and import hosts file content
  async importHostsFile(hostsContent) {
    const lines = hostsContent.split('\n');
    const imported = [];

    for (const line of lines) {
      // Skip comments and empty lines
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Parse: IP hostname [aliases...]
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const ip = parts[0];
        const hostname = parts[1];

        // Only add localhost-related entries
        if (ip === '127.0.0.1' || ip === '::1' || ip.includes('localhost')) {
          await this.addCustomHost(hostname, ip);
          imported.push({ hostname, ip });
        }
      }
    }

    return imported;
  }

  // Export custom hosts to hosts file format
  exportHostsFile() {
    let content = '# Exported from Localhost App Detector\n';
    content += `# Exported at: ${new Date().toISOString()}\n\n`;
    
    this.customHosts.forEach(host => {
      content += `${host.ip}\t${host.hostname}\n`;
    });

    return content;
  }

  // Get statistics
  getStats() {
    return {
      totalSaved: this.savedApps.length,
      favorites: this.savedApps.filter(a => a.favorite).length,
      customHosts: this.customHosts.length,
      mostAccessed: this.savedApps
        .sort((a, b) => (b.accessCount || 0) - (a.accessCount || 0))
        .slice(0, 5),
      recentlyAdded: this.savedApps
        .sort((a, b) => b.addedAt - a.addedAt)
        .slice(0, 5)
    };
  }

  // Clear all saved data
  async clearAll() {
    this.savedApps = [];
    this.customHosts = [];
    await this.saveToStorage();
  }

  // Bulk operations
  async bulkAdd(apps) {
    for (const app of apps) {
      await this.addApp(app);
    }
  }

  async bulkRemove(appIds) {
    this.savedApps = this.savedApps.filter(app => !appIds.includes(app.id));
    await this.saveToStorage();
  }

  // Tag management
  async addTag(appId, tag) {
    const app = this.savedApps.find(a => a.id === appId);
    if (app) {
      if (!app.tags) app.tags = [];
      if (!app.tags.includes(tag)) {
        app.tags.push(tag);
        await this.saveToStorage();
      }
    }
  }

  async removeTag(appId, tag) {
    const app = this.savedApps.find(a => a.id === appId);
    if (app && app.tags) {
      app.tags = app.tags.filter(t => t !== tag);
      await this.saveToStorage();
    }
  }

  // Get all unique tags
  getAllTags() {
    const tags = new Set();
    this.savedApps.forEach(app => {
      if (app.tags) {
        app.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }

  // Filter by tag
  getAppsByTag(tag) {
    return this.savedApps.filter(app => app.tags && app.tags.includes(tag));
  }
}

// Class is available globally for importScripts
