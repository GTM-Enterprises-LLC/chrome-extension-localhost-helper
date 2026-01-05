// Port Scanner Module
// Comprehensive port scanning for all potential web services

class PortScanner {
  constructor() {
    this.scanResults = new Map();
    this.isScanning = false;
    this.scanProgress = 0;
    
    // Comprehensive port list
    this.portCategories = {
      // Web servers
      webServers: [80, 443, 8000, 8008, 8080, 8081, 8082, 8083, 8443, 8888, 9000, 9080, 9090],
      
      // Development servers
      devServers: [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009,
                   4000, 4001, 4002, 4003, 4200, 4201, 4300,
                   5000, 5001, 5002, 5003, 5173, 5174, 5175,
                   8000, 8001, 8002, 8003],
      
      // Databases
      databases: [3306, 5432, 27017, 6379, 9200, 9300, 5984, 7474, 8529],
      
      // Message queues
      messageQueues: [5672, 15672, 9092, 61616],
      
      // Monitoring/Admin
      monitoring: [9090, 9091, 3000, 8080, 9000, 9200, 5601, 3001, 8888],
      
      // API Gateways
      apiGateways: [8080, 8000, 3000, 4000],
      
      // Static site generators
      staticSites: [1313, 4000, 8000, 3000],
      
      // Container orchestration
      containers: [2375, 2376, 8001, 10250, 6443],
      
      // Common application ports
      applications: [
        // Range 3000-3999 (Node/React ecosystem)
        ...Array.from({length: 100}, (_, i) => 3000 + i),
        // Range 4000-4999 (General dev)
        ...Array.from({length: 100}, (_, i) => 4000 + i),
        // Range 5000-5999 (Python/Ruby)
        ...Array.from({length: 100}, (_, i) => 5000 + i),
        // Range 8000-8999 (General web)
        ...Array.from({length: 100}, (_, i) => 8000 + i),
        // Range 9000-9999 (Various)
        ...Array.from({length: 100}, (_, i) => 9000 + i),
      ]
    };
  }

  // Get all unique ports to scan
  getAllPorts(quickScan = true) {
    if (quickScan) {
      // Quick scan: only common ports
      return [
        ...this.portCategories.webServers,
        ...this.portCategories.devServers,
        ...this.portCategories.databases
      ].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
    } else {
      // Deep scan: all ports
      return [
        ...this.portCategories.webServers,
        ...this.portCategories.devServers,
        ...this.portCategories.databases,
        ...this.portCategories.messageQueues,
        ...this.portCategories.monitoring,
        ...this.portCategories.apiGateways,
        ...this.portCategories.staticSites,
        ...this.portCategories.containers,
        ...this.portCategories.applications
      ].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
    }
  }

  // Check if a port is accessible
  async checkPort(host, port, timeout = 2000) {
    return new Promise((resolve) => {
      const img = new Image();
      const startTime = Date.now();
      let resolved = false;

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          img.src = '';
        }
      };

      // Try to load an image from the port
      img.onload = () => {
        cleanup();
        resolve({
          port,
          accessible: true,
          responseTime: Date.now() - startTime
        });
      };

      img.onerror = () => {
        cleanup();
        // Error means something responded (even if not an image)
        resolve({
          port,
          accessible: true,
          responseTime: Date.now() - startTime
        });
      };

      setTimeout(() => {
        cleanup();
        resolve({
          port,
          accessible: false,
          responseTime: null
        });
      }, timeout);

      img.src = `http://${host}:${port}/favicon.ico?_=${Date.now()}`;
    });
  }

  // Alternative method: Try to fetch
  async checkPortFetch(host, port, timeout = 2000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`http://${host}:${port}`, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      return {
        port,
        accessible: true,
        responseTime: null,
        status: response.status
      };
    } catch (error) {
      // Network error or timeout
      return {
        port,
        accessible: false,
        responseTime: null,
        error: error.message
      };
    }
  }

  // Scan multiple ports with concurrency control
  async scanPorts(host = 'localhost', quickScan = true, concurrency = 10) {
    this.isScanning = true;
    this.scanProgress = 0;
    const results = [];

    const ports = this.getAllPorts(quickScan);
    const total = ports.length;

    // Scan in batches for performance
    for (let i = 0; i < ports.length; i += concurrency) {
      const batch = ports.slice(i, i + concurrency);
      const batchResults = await Promise.all(
        batch.map(port => this.checkPort(host, port))
      );
      
      results.push(...batchResults.filter(r => r.accessible));
      this.scanProgress = Math.round(((i + batch.length) / total) * 100);
    }

    this.isScanning = false;
    this.scanProgress = 100;

    // Store results
    results.forEach(result => {
      this.scanResults.set(result.port, {
        ...result,
        host,
        lastSeen: Date.now(),
        url: `http://${host}:${result.port}`
      });
    });

    return results;
  }

  // Get all scan results
  getResults() {
    return Array.from(this.scanResults.values());
  }

  // Clear old results
  clearResults() {
    this.scanResults.clear();
  }

  // Get scan status
  getStatus() {
    return {
      isScanning: this.isScanning,
      progress: this.scanProgress,
      resultCount: this.scanResults.size
    };
  }
}

// Class is available globally for importScripts
