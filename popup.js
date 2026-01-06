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

    // Sort by most recently seen
    apps.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));

    apps.forEach(app => {
      const card = createAppCard(app, true);
      appsList.appendChild(card);
    });
  }

  function createAppCard(app, showSaveButton = false) {
    const card = document.createElement('div');
    card.className = 'app-card';
    
    const timeSince = app.lastSeen ? formatTimeSince(app.lastSeen) : 'Just now';
    const portLabel = app.name || getPortLabel(app.port);
    const icon = app.icon || app.port;
    
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

  // Create condensed card for scan results with expandable details
  function createScanResultCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card scan-result compact';
    
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
      system: '#A8A8A8',
      cache: '#9B59B6',
      mail: '#3498DB',
      unknown: '#718096'
    };
    
    const accentColor = categoryColors[app.category] || categoryColors.unknown;
    card.style.borderLeft = `3px solid ${accentColor}`;
    
    // Build compact display - show framework if available, otherwise category
    const label = app.framework || app.name;
    const displayName = app.title && app.title !== app.name && app.title.length < 25 
      ? app.title 
      : label;

    // Build details array for expanded view
    const details = [];
    if (app.serverHeader) details.push(`Server: ${app.serverHeader}`);
    if (app.serverVersion) details.push(`Version: ${app.serverVersion}`);
    if (app.poweredBy) details.push(`Powered by: ${app.poweredBy}`);
    if (app.httpStatus) details.push(`HTTP ${app.httpStatus} ${app.httpStatusText || ''}`);
    if (app.contentType) details.push(`Content-Type: ${app.contentType.split(';')[0]}`);
    if (app.framework) details.push(`Framework: ${app.framework}`);
    if (app.serverType) details.push(`Server Type: ${app.serverType}`);
    if (app.appVersion) details.push(`App Version: ${app.appVersion}`);
    if (app.runtime) details.push(`Runtime: ${app.runtime}`);
    if (app.note) details.push(`Note: ${app.note}`);
    if (app.identificationError) details.push(`⚠️ ${app.errorMessage}`);

    // Tooltip content
    const tooltipContent = details.length > 0 ? details.join('\n') : 'No additional details';
    
    // For verified system services, show the note as tooltip
    const verifiedTitle = app.verified && app.note ? ` title="${app.note}"` : '';
    
    // Status indicator
    let statusIndicator = '';
    if (app.identificationError === 'cors') {
      statusIndicator = '<span class="scan-cors" title="CORS blocked - limited info">🔒</span>';
    } else if (app.httpStatus && app.httpStatus >= 200 && app.httpStatus < 300) {
      statusIndicator = '<span class="scan-ok" title="HTTP OK">●</span>';
    } else if (app.httpStatus && app.httpStatus >= 400) {
      statusIndicator = `<span class="scan-error" title="HTTP ${app.httpStatus}">●</span>`;
    }

    card.innerHTML = `
      <span class="scan-icon">${app.icon}</span>
      <span class="scan-port">:${app.port}</span>
      <span class="scan-name"${verifiedTitle}>${displayName}</span>
      ${statusIndicator}
      ${app.verified ? '<span class="scan-verified" title="Verified">✓</span>' : ''}
      ${app.responseTime ? `<span class="scan-time">${app.responseTime}ms</span>` : ''}
      <button class="scan-details" title="Show details">ℹ️</button>
      <button class="scan-open" title="Open">→</button>
    `;
    
    // Add expandable details section
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'scan-details-panel';
    detailsDiv.style.display = 'none';
    detailsDiv.innerHTML = `
      <div class="details-content">
        ${details.length > 0 ? details.map(d => `<div class="detail-row">${escapeHtml(d)}</div>`).join('') : '<div class="detail-row">No additional details available</div>'}
        <div class="detail-row"><strong>URL:</strong> <a href="${app.url}" target="_blank">${app.url}</a></div>
        <div class="detail-row"><strong>Category:</strong> ${app.category}</div>
      </div>
    `;
    card.appendChild(detailsDiv);

    // Click to open
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('scan-details') && !e.target.classList.contains('scan-open')) {
        openApp(app.url);
      }
    });
    
    // Details button toggles panel
    card.querySelector('.scan-details').addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = card.querySelector('.scan-details-panel');
      const isHidden = panel.style.display === 'none';
      panel.style.display = isHidden ? 'block' : 'none';
      card.classList.toggle('expanded', isHidden);
    });

    card.querySelector('.scan-open').addEventListener('click', (e) => {
      e.stopPropagation();
      openApp(app.url);
    });

    return card;
  }
  
  // Helper to escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
