// Docker Detection Module
// Detects and monitors Docker containers running web applications

class DockerManager {
  constructor() {
    this.dockerHost = 'http://localhost:2375'; // Default Docker daemon endpoint
    this.containers = new Map();
    this.pollingInterval = null;
    this.isDockerAvailable = false;
  }

  // Check if Docker is accessible
  async checkDockerAvailability() {
    try {
      const response = await fetch(`${this.dockerHost}/version`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      this.isDockerAvailable = response.ok;
      return this.isDockerAvailable;
    } catch (error) {
      console.log('Docker not available via API:', error.message);
      this.isDockerAvailable = false;
      return false;
    }
  }

  // Get all running containers
  async getRunningContainers() {
    if (!this.isDockerAvailable) {
      return [];
    }

    try {
      const response = await fetch(`${this.dockerHost}/containers/json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        return [];
      }

      const containers = await response.json();
      return containers.filter(container => container.State === 'running');
    } catch (error) {
      console.error('Error fetching containers:', error);
      return [];
    }
  }

  // Extract port mappings from container
  extractPorts(container) {
    const ports = [];
    
    if (container.Ports && Array.isArray(container.Ports)) {
      container.Ports.forEach(portMapping => {
        if (portMapping.PublicPort && portMapping.Type === 'tcp') {
          ports.push({
            publicPort: portMapping.PublicPort,
            privatePort: portMapping.PrivatePort,
            ip: portMapping.IP || 'localhost'
          });
        }
      });
    }

    return ports;
  }

  // Get container details
  async getContainerDetails(containerId) {
    try {
      const response = await fetch(`${this.dockerHost}/containers/${containerId}/json`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching container details:', error);
      return null;
    }
  }

  // Parse container name and remove leading slash
  parseContainerName(names) {
    if (!names || names.length === 0) return 'Unknown';
    return names[0].replace(/^\//, '');
  }

  // Detect framework from container image
  detectFrameworkFromImage(image) {
    const imageMap = {
      'node': { framework: 'Node.js', icon: '🟢', color: '#68A063' },
      'nginx': { framework: 'Nginx', icon: '🌐', color: '#009639' },
      'apache': { framework: 'Apache', icon: '🪶', color: '#D22128' },
      'python': { framework: 'Python', icon: '🐍', color: '#3776AB' },
      'php': { framework: 'PHP', icon: '🐘', color: '#777BB4' },
      'react': { framework: 'React', icon: '⚛️', color: '#61DAFB' },
      'angular': { framework: 'Angular', icon: '🅰️', color: '#DD0031' },
      'vue': { framework: 'Vue', icon: '💚', color: '#4FC08D' },
      'mysql': { framework: 'MySQL', icon: '🐬', color: '#4479A1' },
      'postgres': { framework: 'PostgreSQL', icon: '🐘', color: '#336791' },
      'redis': { framework: 'Redis', icon: '📮', color: '#DC382D' },
      'mongo': { framework: 'MongoDB', icon: '🍃', color: '#47A248' },
      'elasticsearch': { framework: 'Elasticsearch', icon: '🔍', color: '#005571' },
      'rabbitmq': { framework: 'RabbitMQ', icon: '🐰', color: '#FF6600' },
      'jenkins': { framework: 'Jenkins', icon: '👨‍🔧', color: '#D24939' },
      'gitlab': { framework: 'GitLab', icon: '🦊', color: '#FC6D26' },
      'nextjs': { framework: 'Next.js', icon: '▲', color: '#000000' },
      'wordpress': { framework: 'WordPress', icon: '📝', color: '#21759B' },
      'django': { framework: 'Django', icon: '🎸', color: '#092E20' },
      'flask': { framework: 'Flask', icon: '🌶️', color: '#000000' },
      'express': { framework: 'Express', icon: '🚂', color: '#000000' },
      'spring': { framework: 'Spring', icon: '🍃', color: '#6DB33F' },
      'tomcat': { framework: 'Tomcat', icon: '🐱', color: '#F8DC75' },
      'dotnet': { framework: '.NET', icon: '🔷', color: '#512BD4' }
    };

    const imageLower = image.toLowerCase();
    for (const [key, value] of Object.entries(imageMap)) {
      if (imageLower.includes(key)) {
        return value;
      }
    }

    return { framework: 'Docker', icon: '🐳', color: '#2496ED' };
  }

  // Check if port is likely a web service
  isWebPort(port) {
    const webPorts = [80, 443, 3000, 4200, 5000, 8000, 8080, 8081, 8888, 9000];
    const isCommonWeb = webPorts.includes(port);
    const isInRange = (port >= 3000 && port <= 9999) || (port >= 8000 && port <= 8999);
    return isCommonWeb || isInRange;
  }

  // Process containers into app format
  async processContainers() {
    const containers = await this.getRunningContainers();
    const apps = [];

    for (const container of containers) {
      const ports = this.extractPorts(container);
      const name = this.parseContainerName(container.Names);
      const image = container.Image;
      const frameworkInfo = this.detectFrameworkFromImage(image);

      // Only include containers with web ports exposed
      const webPorts = ports.filter(p => this.isWebPort(p.publicPort));
      
      for (const portMapping of webPorts) {
        const url = `http://localhost:${portMapping.publicPort}`;
        const key = `docker:${container.Id}:${portMapping.publicPort}`;

        apps.push({
          id: container.Id,
          key: key,
          name: name,
          image: image,
          host: 'localhost',
          port: portMapping.publicPort.toString(),
          privatePort: portMapping.privatePort,
          url: url,
          type: 'docker',
          framework: frameworkInfo.framework,
          icon: frameworkInfo.icon,
          color: frameworkInfo.color,
          status: container.Status,
          state: container.State,
          created: container.Created,
          lastSeen: Date.now(),
          containerId: container.Id.substring(0, 12) // Short container ID
        });
      }
    }

    // Update containers map
    apps.forEach(app => {
      this.containers.set(app.key, app);
    });

    // Clean up old containers
    for (const [key, container] of this.containers.entries()) {
      if (!apps.find(app => app.key === key)) {
        this.containers.delete(key);
      }
    }

    return Array.from(this.containers.values());
  }

  // Start polling for Docker containers
  startPolling(interval = 5000) {
    this.stopPolling();
    
    this.pollingInterval = setInterval(async () => {
      await this.checkDockerAvailability();
      if (this.isDockerAvailable) {
        await this.processContainers();
      }
    }, interval);

    // Initial check
    this.checkDockerAvailability().then(() => {
      if (this.isDockerAvailable) {
        this.processContainers();
      }
    });
  }

  // Stop polling
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Get all Docker apps
  getDockerApps() {
    return Array.from(this.containers.values());
  }

  // Get Docker stats
  getStats() {
    return {
      isDockerAvailable: this.isDockerAvailable,
      containerCount: this.containers.size,
      dockerHost: this.dockerHost
    };
  }

  // Execute command in container (for advanced features)
  async execInContainer(containerId, cmd) {
    try {
      // Create exec instance
      const createResponse = await fetch(
        `${this.dockerHost}/containers/${containerId}/exec`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Cmd: cmd,
            AttachStdout: true,
            AttachStderr: true
          })
        }
      );

      if (!createResponse.ok) return null;

      const { Id } = await createResponse.json();

      // Start exec
      const startResponse = await fetch(
        `${this.dockerHost}/exec/${Id}/start`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Detach: false, Tty: false })
        }
      );

      return await startResponse.text();
    } catch (error) {
      console.error('Error executing command in container:', error);
      return null;
    }
  }

  // Compatibility methods for background.js interface
  async loadSettings() {
    // Load enabled state from chrome storage
    const result = await chrome.storage.local.get(['dockerSettings']);
    if (result.dockerSettings) {
      this.enabled = result.dockerSettings.enabled || false;
      this.dockerHost = result.dockerSettings.dockerHost || this.dockerHost;
    } else {
      this.enabled = false;
    }
  }

  async saveSettings(settings) {
    this.enabled = settings.enabled !== undefined ? settings.enabled : this.enabled;
    if (settings.dockerHost) {
      this.dockerHost = settings.dockerHost;
    }
    await chrome.storage.local.set({
      dockerSettings: {
        enabled: this.enabled,
        dockerHost: this.dockerHost
      }
    });
  }

  async testConnection() {
    const isAvailable = await this.checkDockerAvailability();
    if (isAvailable) {
      try {
        const response = await fetch(`${this.dockerHost}/version`);
        const data = await response.json();
        return {
          success: true,
          version: data.Version,
          apiVersion: data.ApiVersion
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }
    return {
      success: false,
      error: 'Docker API not accessible',
      suggestion: 'Enable Docker API at tcp://localhost:2375'
    };
  }

  async fetchContainers() {
    await this.processContainers();
  }

  getAll() {
    return this.getDockerApps();
  }

  clear() {
    this.containers.clear();
  }

  async stopContainer(containerId) {
    try {
      const response = await fetch(`${this.dockerHost}/containers/${containerId}/stop`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to stop container:', error);
      return false;
    }
  }

  async startContainer(containerId) {
    try {
      const response = await fetch(`${this.dockerHost}/containers/${containerId}/start`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to start container:', error);
      return false;
    }
  }

  async restartContainer(containerId) {
    try {
      const response = await fetch(`${this.dockerHost}/containers/${containerId}/restart`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to restart container:', error);
      return false;
    }
  }

  async inspectContainer(containerId) {
    return await this.getContainerDetails(containerId);
  }
}

// Class is available globally for importScripts
