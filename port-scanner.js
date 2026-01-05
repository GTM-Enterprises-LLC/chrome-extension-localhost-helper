// Port Scanner Module
// Comprehensive port scanning for all potential web services

class PortScanner {
  constructor() {
    this.scanResults = new Map();
    this.isScanning = false;
    this.scanProgress = 0;
    
    // Known port database - maps ports to their typical services
    this.knownPorts = {
      // Web servers
      80: { name: 'HTTP', category: 'web', icon: '🌐' },
      443: { name: 'HTTPS', category: 'web', icon: '🔒' },
      8080: { name: 'HTTP Alt / Tomcat', category: 'web', icon: '🌐' },
      8443: { name: 'HTTPS Alt', category: 'web', icon: '🔒' },
      
      // Frontend frameworks
      3000: { name: 'React / Next.js / Node', category: 'frontend', icon: '⚛️' },
      3001: { name: 'React (alt) / Grafana', category: 'frontend', icon: '⚛️' },
      3002: { name: 'React (alt)', category: 'frontend', icon: '⚛️' },
      3003: { name: 'React (alt)', category: 'frontend', icon: '⚛️' },
      4200: { name: 'Angular', category: 'frontend', icon: '🅰️' },
      4201: { name: 'Angular (alt)', category: 'frontend', icon: '🅰️' },
      5173: { name: 'Vite', category: 'frontend', icon: '⚡' },
      5174: { name: 'Vite (alt)', category: 'frontend', icon: '⚡' },
      5175: { name: 'Vite (alt)', category: 'frontend', icon: '⚡' },
      8000: { name: 'Django / Python HTTP', category: 'backend', icon: '🐍' },
      8001: { name: 'Django (alt)', category: 'backend', icon: '🐍' },
      5000: { name: 'Flask / Python', category: 'backend', icon: '🐍' },
      5001: { name: 'Flask (alt)', category: 'backend', icon: '🐍' },
      4000: { name: 'Jekyll / Phoenix', category: 'static', icon: '📄' },
      1313: { name: 'Hugo', category: 'static', icon: '📄' },
      6006: { name: 'Storybook', category: 'frontend', icon: '📚' },
      8888: { name: 'Jupyter Notebook', category: 'dev', icon: '📓' },
      24678: { name: 'Webpack Dev Server', category: 'frontend', icon: '📦' },
      9000: { name: 'PHP / SonarQube', category: 'backend', icon: '🐘' },
      
      // Backend/API
      3030: { name: 'Express / Node API', category: 'backend', icon: '🟢' },
      4001: { name: 'Node / API Server', category: 'backend', icon: '🟢' },
      5002: { name: 'Python API', category: 'backend', icon: '🐍' },
      8081: { name: 'Node / API Alt', category: 'backend', icon: '🟢' },
      8082: { name: 'API Server', category: 'backend', icon: '🔌' },
      8083: { name: 'API Server', category: 'backend', icon: '🔌' },
      9001: { name: 'API / Supervisor', category: 'backend', icon: '🔌' },
      9090: { name: 'Prometheus / API', category: 'monitoring', icon: '🔥' },
      
      // Databases
      3306: { name: 'MySQL', category: 'database', icon: '🐬' },
      5432: { name: 'PostgreSQL', category: 'database', icon: '🐘' },
      27017: { name: 'MongoDB', category: 'database', icon: '🍃' },
      6379: { name: 'Redis', category: 'database', icon: '🔴' },
      9200: { name: 'Elasticsearch', category: 'database', icon: '🔍' },
      9300: { name: 'Elasticsearch (nodes)', category: 'database', icon: '🔍' },
      5984: { name: 'CouchDB', category: 'database', icon: '🛋️' },
      7474: { name: 'Neo4j', category: 'database', icon: '🔗' },
      8529: { name: 'ArangoDB', category: 'database', icon: '🥑' },
      
      // Message queues
      5672: { name: 'RabbitMQ (AMQP)', category: 'queue', icon: '🐰' },
      15672: { name: 'RabbitMQ (Web UI)', category: 'queue', icon: '🐰' },
      9092: { name: 'Kafka', category: 'queue', icon: '📨' },
      61616: { name: 'ActiveMQ', category: 'queue', icon: '📬' },
      
      // Monitoring / Admin
      5601: { name: 'Kibana', category: 'monitoring', icon: '📊' },
      9091: { name: 'Prometheus Pushgateway', category: 'monitoring', icon: '🔥' },
      16686: { name: 'Jaeger', category: 'monitoring', icon: '🔎' },
      
      // Container / Orchestration
      2375: { name: 'Docker API', category: 'container', icon: '🐳' },
      2376: { name: 'Docker API (TLS)', category: 'container', icon: '🐳' },
      6443: { name: 'Kubernetes API', category: 'container', icon: '☸️' },
      10250: { name: 'Kubelet', category: 'container', icon: '☸️' },
      
      // Other common
      22: { name: 'SSH', category: 'system', icon: '🔐' },
      21: { name: 'FTP', category: 'system', icon: '📁' },
      25: { name: 'SMTP', category: 'mail', icon: '📧' },
      587: { name: 'SMTP (submission)', category: 'mail', icon: '📧' },
      1025: { name: 'Mailhog / MailCatcher', category: 'mail', icon: '📧' },
      8025: { name: 'Mailhog Web UI', category: 'mail', icon: '📧' },
      11211: { name: 'Memcached', category: 'cache', icon: '💾' },
    };
    
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

  // Check if a port is accessible using fetch (works in service workers)
  async checkPort(host, port, timeout = 2000) {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Use no-cors mode to check if something is listening
      // This will succeed if a server responds, even if CORS blocks it
      await fetch(`http://${host}:${port}/`, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      return {
        port,
        accessible: true,
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      // Check if it's an abort (timeout) vs connection refused
      if (error.name === 'AbortError') {
        // Timeout - port might be open but slow
        return {
          port,
          accessible: false,
          responseTime: null,
          error: 'timeout'
        };
      }
      
      // Network error - could be connection refused or no server
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

    // Identify services and store results
    const identifiedResults = await this.identifyServices(host, results);
    
    identifiedResults.forEach(result => {
      this.scanResults.set(result.port, {
        ...result,
        host,
        lastSeen: Date.now(),
        url: `http://${host}:${result.port}`
      });
    });

    return identifiedResults;
  }

  // Get service info from known ports database
  getKnownService(port) {
    return this.knownPorts[port] || null;
  }

  // Try to identify the application running on a port
  async identifyService(host, port, timeout = 3000) {
    const knownService = this.getKnownService(port);
    
    // Start with known port info as default
    let serviceInfo = {
      name: knownService?.name || `Port ${port}`,
      category: knownService?.category || 'unknown',
      icon: knownService?.icon || '🔌',
      framework: null,
      title: null,
      server: null,
      verified: false
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Try to fetch the page to get more details
      const response = await fetch(`http://${host}:${port}/`, {
        method: 'GET',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Check server header
      const serverHeader = response.headers.get('server');
      if (serverHeader) {
        serviceInfo.server = serverHeader;
        serviceInfo = this.detectFromServerHeader(serverHeader, serviceInfo);
      }

      // Check other identifying headers
      const poweredBy = response.headers.get('x-powered-by');
      if (poweredBy) {
        serviceInfo = this.detectFromPoweredBy(poweredBy, serviceInfo);
      }

      // Try to get the HTML and analyze it
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const html = await response.text();
        serviceInfo = this.detectFromHtml(html, serviceInfo);
      } else if (contentType.includes('application/json')) {
        serviceInfo.category = 'api';
        serviceInfo.icon = '🔌';
        if (!serviceInfo.framework) {
          serviceInfo.name = 'JSON API';
        }
      }

      serviceInfo.verified = true;

    } catch (error) {
      // Could not fetch details, use known port info only
      serviceInfo.verified = false;
    }

    return serviceInfo;
  }

  // Detect framework from Server header
  detectFromServerHeader(server, info) {
    const serverLower = server.toLowerCase();
    
    if (serverLower.includes('nginx')) {
      info.name = 'Nginx';
      info.icon = '🌐';
      info.category = 'web';
    } else if (serverLower.includes('apache')) {
      info.name = 'Apache';
      info.icon = '🪶';
      info.category = 'web';
    } else if (serverLower.includes('express')) {
      info.name = 'Express.js';
      info.icon = '🟢';
      info.framework = 'Express';
      info.category = 'backend';
    } else if (serverLower.includes('uvicorn') || serverLower.includes('gunicorn')) {
      info.name = 'Python ASGI/WSGI';
      info.icon = '🐍';
      info.category = 'backend';
    } else if (serverLower.includes('werkzeug')) {
      info.name = 'Flask';
      info.icon = '🐍';
      info.framework = 'Flask';
      info.category = 'backend';
    } else if (serverLower.includes('kestrel')) {
      info.name = '.NET Kestrel';
      info.icon = '🟣';
      info.category = 'backend';
    } else if (serverLower.includes('caddy')) {
      info.name = 'Caddy';
      info.icon = '🎾';
      info.category = 'web';
    }
    
    return info;
  }

  // Detect framework from X-Powered-By header
  detectFromPoweredBy(poweredBy, info) {
    const powerLower = poweredBy.toLowerCase();
    
    if (powerLower.includes('express')) {
      info.framework = 'Express';
      info.icon = '🟢';
    } else if (powerLower.includes('php')) {
      info.name = 'PHP';
      info.icon = '🐘';
      info.category = 'backend';
    } else if (powerLower.includes('asp.net')) {
      info.name = 'ASP.NET';
      info.icon = '🟣';
      info.category = 'backend';
    } else if (powerLower.includes('next.js')) {
      info.name = 'Next.js';
      info.framework = 'Next.js';
      info.icon = '▲';
      info.category = 'frontend';
    }
    
    return info;
  }

  // Detect framework from HTML content
  detectFromHtml(html, info) {
    const htmlLower = html.toLowerCase();
    
    // Try to extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      info.title = titleMatch[1].trim();
    }

    // Detect React
    if (html.includes('__REACT') || html.includes('react-root') || 
        html.includes('data-reactroot') || html.includes('_app.js') ||
        htmlLower.includes('react')) {
      info.framework = 'React';
      info.icon = '⚛️';
      info.category = 'frontend';
      if (!info.title || info.title === 'React App') {
        info.name = 'React App';
      }
    }
    
    // Detect Next.js
    if (html.includes('__NEXT_DATA__') || html.includes('_next/')) {
      info.framework = 'Next.js';
      info.icon = '▲';
      info.category = 'frontend';
      info.name = info.title || 'Next.js App';
    }
    
    // Detect Vue
    if (html.includes('__VUE__') || html.includes('data-v-') || 
        htmlLower.includes('vue.js') || htmlLower.includes('vue.min.js')) {
      info.framework = 'Vue';
      info.icon = '💚';
      info.category = 'frontend';
      info.name = info.title || 'Vue App';
    }
    
    // Detect Nuxt
    if (html.includes('__NUXT__') || html.includes('_nuxt/')) {
      info.framework = 'Nuxt';
      info.icon = '💚';
      info.category = 'frontend';
      info.name = info.title || 'Nuxt App';
    }
    
    // Detect Angular
    if (html.includes('ng-version') || html.includes('ng-app') || 
        htmlLower.includes('angular')) {
      info.framework = 'Angular';
      info.icon = '🅰️';
      info.category = 'frontend';
      info.name = info.title || 'Angular App';
    }
    
    // Detect Svelte
    if (html.includes('__svelte') || htmlLower.includes('svelte')) {
      info.framework = 'Svelte';
      info.icon = '🧡';
      info.category = 'frontend';
      info.name = info.title || 'Svelte App';
    }
    
    // Detect SvelteKit
    if (html.includes('__sveltekit')) {
      info.framework = 'SvelteKit';
      info.icon = '🧡';
      info.category = 'frontend';
      info.name = info.title || 'SvelteKit App';
    }
    
    // Detect Vite
    if (html.includes('@vite') || html.includes('vite/')) {
      if (!info.framework) {
        info.framework = 'Vite';
        info.icon = '⚡';
      }
    }
    
    // Detect Django
    if (html.includes('csrfmiddlewaretoken') || htmlLower.includes('django')) {
      info.framework = 'Django';
      info.icon = '🐍';
      info.category = 'backend';
      info.name = info.title || 'Django App';
    }
    
    // Detect Laravel
    if (html.includes('Laravel') || html.includes('laravel')) {
      info.framework = 'Laravel';
      info.icon = '🐘';
      info.category = 'backend';
      info.name = info.title || 'Laravel App';
    }
    
    // Detect Storybook
    if (html.includes('storybook') || html.includes('sb-show-main')) {
      info.framework = 'Storybook';
      info.icon = '📚';
      info.category = 'dev';
      info.name = 'Storybook';
    }

    // Detect Jupyter
    if (html.includes('jupyter') || html.includes('nbconvert')) {
      info.framework = 'Jupyter';
      info.icon = '📓';
      info.category = 'dev';
      info.name = 'Jupyter Notebook';
    }

    // Detect Swagger/OpenAPI
    if (html.includes('swagger') || html.includes('openapi')) {
      info.name = 'API Documentation';
      info.icon = '📖';
      info.category = 'api';
    }

    // Use title as name if we have one and no specific framework detected
    if (info.title && !info.framework && info.name.startsWith('Port ')) {
      info.name = info.title;
    }
    
    return info;
  }

  // Identify services for all open ports
  async identifyServices(host, results) {
    const identified = [];
    
    for (const result of results) {
      const serviceInfo = await this.identifyService(host, result.port);
      identified.push({
        ...result,
        ...serviceInfo
      });
    }
    
    return identified;
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
