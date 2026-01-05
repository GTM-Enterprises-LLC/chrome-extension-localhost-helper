// Popup functionality for Localhost App Detector - Fully Integrated
document.addEventListener('DOMContentLoaded', () => {
  // Tab Management
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Detected Apps Tab Elements
  const loading = document.getElementById('loading');
  const appsList = document.getElementById('appsList');
  const emptyState = document.getElementById('emptyState');
  const refreshBtn = document.getElementById('refreshBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const dockerToggle = document.getElementById('dockerToggle');
  const dockerStatus = document.getElementById('dockerStatus');
  const dockerState = document.getElementById('dockerState');
  const containerCount = document.getElementById('containerCount');
  const detectedBadge = document.getElementById('detectedBadge');
  
  // Saved Apps Tab Elements
  const savedSearchInput = document.getElementById('savedSearchInput');
  const savedAppsList = document.getElementById('savedAppsList');
  const savedEmptyState = document.getElementById('savedEmptyState');
  const savedBadge = document.getElementById('savedBadge');
  const importAppsBtn = document.getElementById('importAppsBtn');
  const importFileInput = document.getElementById('importFileInput');
  
  // Scanner Tab Elements
  const scanHost = document.getElementById('scanHost');
  const quickScan = document.getElementById('quickScan');
  const startScanBtn = document.getElementById('startScanBtn');
  const scanProgress = document.getElementById('scanProgress');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const scanResults = document.getElementById('scanResults');
  const scanResultsList = document.getElementById('scanResultsList');
  const resultsCount = document.getElementById('resultsCount');
  const clearResultsBtn = document.getElementById('clearResultsBtn');
  const scanEmpty = document.getElementById('scanEmpty');
  
  // Footer Elements
  const exportLink = document.getElementById('exportLink');
  const helpLink = document.getElementById('helpLink');

  let dockerEnabled = true;
  let dockerAvailable = false;
  let currentTab = 'detected';

  // Initialize
  init();

  function init() {
    loadDetectedApps();
    loadSavedApps();
    setupEventListeners();
  }

  // Event Listeners
  function setupEventListeners() {
    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        switchTab(tabName);
      });
    });

    // Detected Apps Tab
    refreshBtn.addEventListener('click', () => loadDetectedApps());
    dockerToggle.addEventListener('click', toggleDocker);
    
    // Port chips
    document.querySelectorAll('.port-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const port = chip.dataset.port;
        openApp(`http://localhost:${port}`);
      });
    });

    // Saved Apps Tab
    savedSearchInput.addEventListener('input', handleSavedSearch);
    importAppsBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImportApps);

    // Scanner Tab
    startScanBtn.addEventListener('click', startPortScan);
    if (clearResultsBtn) {
      clearResultsBtn.addEventListener('click', clearScanResults);
    }

    // Footer
    exportLink.addEventListener('click', (e) => {
      e.preventDefault();
      exportApps();
    });
    
    helpLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://github.com/your-repo/localhost-detector#readme' });
    });

    // Settings
    settingsBtn.addEventListener('click', () => {
      // Future: Open settings modal
      alert('Settings coming soon! For now, use the Docker toggle and tab features.');
    });
  }

  // Tab Switching
  function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    tabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update tab content
    tabContents.forEach(content => {
      if (content.id === `tab-${tabName}`) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Load data for the tab if needed
    if (tabName === 'saved') {
      loadSavedApps();
    }
  }

  // Detected Apps Functions
  function loadDetectedApps() {
    showLoading();
    
    chrome.runtime.sendMessage({ action: 'getApps' }, (response) => {
      if (response && response.apps) {
        updateDockerStatus(response.apps, response.dockerAvailable, response.dockerEnabled);
        displayDetectedApps(response.apps);
        updateDetectedBadge(response.apps.length);
      } else {
        showEmpty();
      }
    });
  }

  function showLoading() {
    loading.style.display = 'flex';
    appsList.style.display = 'none';
    emptyState.style.display = 'none';
  }

  function showEmpty() {
    loading.style.display = 'none';
    appsList.style.display = 'none';
    emptyState.style.display = 'block';
  }

  function displayDetectedApps(apps) {
    loading.style.display = 'none';
    
    if (apps.length === 0) {
      showEmpty();
      return;
    }

    appsList.style.display = 'flex';
    emptyState.style.display = 'none';
    appsList.innerHTML = '';

    // Sort: Docker first, then by most recently seen
    apps.sort((a, b) => {
      if (a.type === 'docker' && b.type !== 'docker') return -1;
      if (a.type !== 'docker' && b.type === 'docker') return 1;
      return (b.lastSeen || 0) - (a.lastSeen || 0);
    });

    apps.forEach(app => {
      const card = createAppCard(app, true);
      appsList.appendChild(card);
    });
  }

  function createAppCard(app, showSaveButton = false) {
    const card = document.createElement('div');
    card.className = 'app-card';
    
    if (app.type === 'docker') {
      card.classList.add('docker-app');
    }
    
    const timeSince = app.lastSeen ? formatTimeSince(app.lastSeen) : 'Just now';
    const portLabel = app.name || (app.type === 'docker' ? app.name : getPortLabel(app.port));
    const icon = app.icon || (app.type === 'docker' ? '🐳' : app.port);
    
    let actionsHTML = '';
    if (showSaveButton) {
      actionsHTML = `
        <div class="app-actions">
          <button class="action-btn save-btn" data-app='${JSON.stringify(app).replace(/'/g, "&#39;")}' title="Save app">
            📌
          </button>
        </div>
      `;
    } else {
      // Saved app actions
      actionsHTML = `
        <div class="app-actions">
          <button class="action-btn favorite-btn ${app.favorite ? 'active' : ''}" data-id="${app.id}" title="Favorite">
            ${app.favorite ? '⭐' : '☆'}
          </button>
          <button class="action-btn delete-btn" data-id="${app.id}" title="Remove">
            🗑️
          </button>
        </div>
      `;
    }

    let metaHTML = `
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span>${timeSince}</span>
      </div>
      <div class="meta-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        <span>:${app.port}</span>
      </div>
    `;

    if (app.type === 'docker' && app.containerId) {
      metaHTML += `
        <div class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          <span>${app.containerId}</span>
        </div>
      `;
    }

    if (app.framework) {
      metaHTML += `
        <div class="framework-badge" style="${app.color ? `background-color: ${app.color}15; color: ${app.color}` : ''}">
          <span>${app.icon || ''}</span>
          <span>${app.framework}</span>
        </div>
      `;
    }

    if (!showSaveButton && app.accessCount) {
      metaHTML += `
        <div class="meta-item">
          <span>Used ${app.accessCount} times</span>
        </div>
      `;
    }
    
    card.innerHTML = `
      <div class="app-header">
        <div class="app-icon">${icon}</div>
        <div style="flex: 1; margin: 0 12px;">
          <div class="app-status">
            <span class="status-dot"></span>
            <span>Active</span>
          </div>
        </div>
        ${actionsHTML}
      </div>
      <div class="app-info">
        <h3>${portLabel}</h3>
        <div class="app-url">${app.url}</div>
        ${app.image ? `<div class="app-url" style="margin-top: 4px; opacity: 0.7; font-size: 11px;">Image: ${app.image}</div>` : ''}
      </div>
      <div class="app-meta">
        ${metaHTML}
      </div>
    `;

    // Click to open
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.action-btn')) {
        openApp(app.url, app.id);
      }
    });

    // Save button
    const saveBtn = card.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveApp(app);
      });
    }

    // Favorite button
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(app.id);
      });
    }

    // Delete button
    const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeSavedApp(app.id);
      });
    }

    return card;
  }

  function openApp(url, appId = null) {
    if (appId) {
      chrome.runtime.sendMessage({ action: 'openApp', url, appId });
    } else {
      chrome.runtime.sendMessage({ action: 'openApp', url });
    }
  }

  function updateDockerStatus(apps, available, enabled) {
    dockerAvailable = available;
    dockerEnabled = enabled;
    
    if (dockerToggle) {
      if (enabled) {
        dockerToggle.classList.add('active');
        dockerToggle.title = 'Docker detection enabled';
      } else {
        dockerToggle.classList.remove('active');
        dockerToggle.title = 'Docker detection disabled';
      }
    }

    if (available && enabled) {
      dockerStatus.style.display = 'flex';
      dockerState.textContent = 'Connected';
      dockerState.style.color = '#48bb78';
      
      const dockerApps = apps.filter(app => app.type === 'docker');
      if (dockerApps.length > 0) {
        containerCount.textContent = `${dockerApps.length} container${dockerApps.length > 1 ? 's' : ''}`;
      } else {
        containerCount.textContent = 'No containers';
      }
    } else if (enabled && !available) {
      dockerStatus.style.display = 'flex';
      dockerState.textContent = 'Not available';
      dockerState.style.color = '#f56565';
      containerCount.textContent = '';
    } else {
      dockerStatus.style.display = 'none';
    }
  }

  function toggleDocker() {
    chrome.runtime.sendMessage({ action: 'toggleDocker' }, (response) => {
      dockerEnabled = response.dockerEnabled;
      loadDetectedApps();
    });
  }

  function updateDetectedBadge(count) {
    if (count > 0) {
      detectedBadge.textContent = count;
      detectedBadge.style.display = 'inline-block';
    } else {
      detectedBadge.style.display = 'none';
    }
  }

  // Saved Apps Functions
  function loadSavedApps() {
    chrome.runtime.sendMessage({ action: 'getSavedApps' }, (response) => {
      if (response && response.apps) {
        displaySavedApps(response.apps);
        updateSavedBadge(response.apps.length);
      }
    });
  }

  function displaySavedApps(apps) {
    if (apps.length === 0) {
      savedAppsList.innerHTML = '';
      savedAppsList.appendChild(savedEmptyState);
      return;
    }

    savedEmptyState.style.display = 'none';
    savedAppsList.innerHTML = '';

    apps.forEach(app => {
      const card = createAppCard(app, false);
      savedAppsList.appendChild(card);
    });
  }

  function saveApp(app) {
    chrome.runtime.sendMessage({ action: 'saveApp', app }, (response) => {
      if (response && response.success) {
        // Show feedback
        showNotification('App saved!');
        loadSavedApps();
      }
    });
  }

  function removeSavedApp(appId) {
    if (confirm('Remove this app from saved list?')) {
      chrome.runtime.sendMessage({ action: 'removeApp', appId }, (response) => {
        if (response && response.success) {
          loadSavedApps();
        }
      });
    }
  }

  function toggleFavorite(appId) {
    chrome.runtime.sendMessage({ action: 'toggleFavorite', appId }, (response) => {
      if (response && response.success) {
        loadSavedApps();
      }
    });
  }

  function handleSavedSearch(e) {
    const query = e.target.value;
    if (query.trim()) {
      chrome.runtime.sendMessage({ action: 'searchSavedApps', query }, (response) => {
        if (response && response.results) {
          displaySavedApps(response.results);
        }
      });
    } else {
      loadSavedApps();
    }
  }

  function updateSavedBadge(count) {
    if (count > 0) {
      savedBadge.textContent = count;
      savedBadge.style.display = 'inline-block';
    } else {
      savedBadge.style.display = 'none';
    }
  }

  // Import/Export Functions
  function exportApps() {
    chrome.runtime.sendMessage({ action: 'exportApps' }, (response) => {
      if (response && response.jsonData) {
        const blob = new Blob([response.jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `localhost-apps-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }

  function handleImportApps(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = event.target.result;
      chrome.runtime.sendMessage({ action: 'importApps', jsonData }, (response) => {
        if (response && response.success) {
          showNotification('Apps imported successfully!');
          loadSavedApps();
        } else {
          showNotification('Failed to import apps', 'error');
        }
      });
    };
    reader.readAsText(file);
    
    // Reset input
    importFileInput.value = '';
  }

  // Port Scanner Functions
  function startPortScan() {
    const host = scanHost.value || 'localhost';
    const quick = quickScan.checked;
    
    // Show progress
    scanEmpty.style.display = 'none';
    scanResults.style.display = 'none';
    scanProgress.style.display = 'block';
    startScanBtn.disabled = true;
    progressFill.style.width = '0%';
    progressText.textContent = 'Starting scan...';

    chrome.runtime.sendMessage({ 
      action: 'startPortScan',
      host,
      quickScan: quick
    }, (response) => {
      if (response && response.success) {
        // Poll for progress
        const progressInterval = setInterval(() => {
          chrome.runtime.sendMessage({ action: 'getScanStatus' }, (statusResponse) => {
            if (statusResponse && statusResponse.status) {
              const status = statusResponse.status;
              progressFill.style.width = status.progress + '%';
              progressText.textContent = `Scanning... ${status.progress}%`;

              if (!status.isScanning) {
                clearInterval(progressInterval);
                scanProgress.style.display = 'none';
                startScanBtn.disabled = false;
                loadScanResults();
              }
            }
          });
        }, 500);
      } else {
        scanProgress.style.display = 'none';
        startScanBtn.disabled = false;
        showNotification('Scan failed', 'error');
      }
    });
  }

  function loadScanResults() {
    chrome.runtime.sendMessage({ action: 'getScanResults' }, (response) => {
      if (response && response.results) {
        displayScanResults(response.results);
      }
    });
  }

  function displayScanResults(results) {
    if (results.length === 0) {
      scanResults.style.display = 'none';
      scanEmpty.style.display = 'block';
      return;
    }

    scanEmpty.style.display = 'none';
    scanResults.style.display = 'block';
    resultsCount.textContent = results.length;
    scanResultsList.innerHTML = '';

    results.forEach(result => {
      const app = {
        host: result.host,
        port: result.port,
        url: result.url,
        lastSeen: result.lastSeen,
        type: 'scanned',
        // Enhanced service info
        name: result.name || `Port ${result.port}`,
        icon: result.icon || '🔌',
        framework: result.framework,
        category: result.category,
        title: result.title,
        server: result.server,
        verified: result.verified,
        responseTime: result.responseTime
      };
      const card = createScanResultCard(app);
      scanResultsList.appendChild(card);
    });
  }

  // Create enhanced card for scan results
  function createScanResultCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card scan-result';
    
    // Category-based coloring
    const categoryColors = {
      frontend: '#61DAFB',
      backend: '#68A063',
      database: '#336791',
      queue: '#FF6B6B',
      monitoring: '#E6522C',
      web: '#4FC08D',
      api: '#9B59B6',
      dev: '#F1C40F',
      container: '#0DB7ED',
      unknown: '#718096'
    };
    
    const accentColor = categoryColors[app.category] || categoryColors.unknown;
    card.style.borderLeft = `4px solid ${accentColor}`;
    
    // Build info display
    let statusBadge = '';
    if (app.verified) {
      statusBadge = '<span class="verified-badge" title="Application identified">✓</span>';
    }
    
    let frameworkBadge = '';
    if (app.framework) {
      frameworkBadge = `<span class="framework-badge">${app.framework}</span>`;
    }
    
    let serverInfo = '';
    if (app.server) {
      serverInfo = `<span class="server-info" title="Server: ${app.server}">🖥️ ${app.server}</span>`;
    }
    
    let responseInfo = '';
    if (app.responseTime) {
      responseInfo = `<span class="response-time">${app.responseTime}ms</span>`;
    }

    card.innerHTML = `
      <div class="app-icon" style="font-size: 24px;">${app.icon}</div>
      <div class="app-info">
        <div class="app-name">
          ${app.name} ${statusBadge}
        </div>
        <div class="app-url">
          <span class="port-number">:${app.port}</span>
          ${frameworkBadge}
          <span class="category-tag">${app.category || 'unknown'}</span>
        </div>
        <div class="app-details">
          ${serverInfo}
          ${responseInfo}
          ${app.title && app.title !== app.name ? `<span class="page-title" title="${app.title}">📄 ${app.title.substring(0, 30)}${app.title.length > 30 ? '...' : ''}</span>` : ''}
        </div>
      </div>
      <div class="app-actions">
        <button class="action-btn open-btn" title="Open in new tab">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
        <button class="action-btn save-btn" title="Save this app">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
    `;

    // Event listeners
    card.querySelector('.open-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openApp(app.url);
    });

    card.querySelector('.save-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      saveApp(app);
    });

    // Click card to open
    card.addEventListener('click', () => openApp(app.url));

    return card;
  }

  function clearScanResults() {
    scanResults.style.display = 'none';
    scanEmpty.style.display = 'block';
  }

  // Helper Functions
  function formatTimeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  function getPortLabel(port) {
    const portMap = {
      '3000': 'React / Node.js',
      '3001': 'React Alt',
      '4200': 'Angular',
      '5000': 'Flask / Python',
      '5173': 'Vite',
      '8000': 'Django / Python',
      '8080': 'Dev Server',
      '8888': 'Jupyter',
      '9000': 'PHP',
      '4000': 'Jekyll',
      '1313': 'Hugo',
      '6006': 'Storybook',
    };

    return portMap[port] || `Port ${port}`;
  }

  function showNotification(message, type = 'success') {
    // Simple notification - could be enhanced
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#48bb78' : '#f56565'};
      color: white;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
});
