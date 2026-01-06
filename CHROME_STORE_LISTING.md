# Chrome Web Store Listing Information

Use this document when publishing your extension to the Chrome Web Store.

---

## 📦 Basic Information

### Extension Name
```
Localhost App Detector
```

### Short Description (132 characters max)
```
Detect localhost apps, scan ports with app identification, and save favorite development URLs. Perfect for web developers!
```

### Detailed Description (16,000 characters max)
```
🚀 LOCALHOST APP DETECTOR - The Ultimate Developer Tool for Local Development

A must-have Chrome extension for web developers who work with multiple localhost applications and development servers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ KEY FEATURES

🔍 AUTOMATIC LOCALHOST DETECTION
• Automatically detects when you visit any localhost URL
• Tracks all ports you've accessed in real-time
• One-click access to open any detected app
• Auto-cleanup removes inactive apps after 5 minutes

🔎 POWERFUL PORT SCANNER
• Quick Scan: Scan ~100 common dev ports in seconds
• Deep Scan: Comprehensive scan of 400+ ports
• Identifies 100+ frameworks and services automatically
• Correctly identifies macOS Control Center and system services
• Visual progress bar with real-time feedback

💾 SAVED APPS MANAGER
• Save your favorite development URLs
• Works across browser sessions
• Add tags, notes, and mark favorites
• Search and filter your saved apps
• Import/Export configurations for team sharing
• Works in Incognito mode

🎨 BEAUTIFUL INTERFACE
• Modern, clean design with smooth animations
• Tabbed navigation for organized workflow
• Visual badges showing app counts
• Framework-specific icons and colors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔌 SUPPORTED PORTS

The extension tracks popular development ports including:
• React/Next.js: 3000-3003
• Angular: 4200-4201
• Vite: 5173-5174
• Flask/Django: 5000, 8000
• General Dev: 8080-8083
• And 400+ more in Deep Scan mode!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 PRIVACY FOCUSED

• Only monitors localhost and 127.0.0.1 traffic
• NO data sent to external servers
• All data stored locally on your machine
• Minimal permissions required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 PERFECT FOR

• Frontend developers (React, Vue, Angular, Svelte)
• Backend developers (Node.js, Python, PHP, Go)
• Full-stack developers
• Anyone running multiple local dev servers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️ BUILT WITH MODERN STANDARDS

• Manifest V3 compliant
• Service Worker architecture
• Chrome Storage API
• Efficient WebRequest monitoring

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Download now and supercharge your local development workflow! 🚀
```

---

## 🏷️ Category & Tags

### Primary Category
```
Developer Tools
```

### Language
```
English
```

---

## 🖼️ Visual Assets Required

### Extension Icon
| Size | File | Purpose |
|------|------|---------|
| 128x128 | `icons/icon128.png` | Store listing, installation page |
| 48x48 | `icons/icon48.png` | Extensions management page |
| 16x16 | `icons/icon16.png` | Toolbar, favicon |

### Screenshots (Required: 1-5, Recommended: 3+)

**Dimensions:** 1280x800 or 640x400 pixels

| Screenshot | Description |
|------------|-------------|
| Screenshot 1 | Main popup showing detected localhost apps with colorful cards |
| Screenshot 2 | Port Scanner tab with scan results showing open ports and identified services |
| Screenshot 3 | Saved Apps tab with favorites, tags, and search functionality |
| Screenshot 4 | Empty state with quick port chips for launching common ports |

### Promotional Images (Optional but Recommended)

| Type | Dimensions | Description |
|------|------------|-------------|
| Small Promo Tile | 440x280 | Featured in store search results |
| Large Promo Tile | 920x680 | Featured on homepage (if promoted) |
| Marquee Promo Tile | 1400x560 | Top banner (if featured) |

---

## 👤 Developer Information

### Developer Name
```
GTM Enterprises LLC
```

### Developer Email
```
[Your support email address]
```

### Developer Website (Optional)
```
[Your website URL]
```

### Privacy Policy URL (Required)
```
[Your privacy policy URL]
```

**Note:** Chrome Web Store requires a privacy policy. Create one that includes:
- What data the extension collects (localhost URLs, port numbers)
- How data is stored (locally, not transmitted)
- That no personal information is collected
- That no data is shared with third parties

---

## 🔐 Privacy & Permissions Justification

### Permissions Used

| Permission | Justification (for Chrome review) |
|------------|-----------------------------------|
| `tabs` | Required to open detected localhost applications in new browser tabs when users click on them |
| `webRequest` | Essential for monitoring network requests to localhost/127.0.0.1 to detect running development servers |
| `storage` | Needed to save user preferences, saved apps, and persist data across browser sessions |

### Host Permissions

| Host | Justification |
|------|---------------|
| `http://localhost/*` | Core functionality - detecting localhost development servers |
| `http://127.0.0.1/*` | Alternative localhost address detection |

---

## 📋 Additional Chrome Store Fields

### Single Purpose Description
```
This extension helps developers discover, track, and quickly access their localhost development servers.
```

### Why These Permissions?
```
tabs: Opens localhost URLs in new tabs when clicked
webRequest: Detects localhost connections for automatic app discovery
storage: Saves user preferences and bookmarked apps
host_permissions: Limited to localhost and 127.0.0.1 only
```

### Data Usage
```
This extension:
- Collects: localhost URLs and ports you visit (stored locally only)
- Does NOT collect: personal information, browsing history outside localhost, or user identifiers
- Does NOT transmit: any data to external servers
- All data remains on user's local machine
```

---

## 🏪 Store Listing Checklist

### Before Submitting

- [ ] **Icons** - All three sizes (16x16, 48x48, 128x128) in PNG format
- [ ] **Screenshots** - At least 1 screenshot (1280x800 or 640x400)
- [ ] **Privacy Policy** - Published and accessible URL
- [ ] **Description** - Complete and accurate
- [ ] **Permissions Justified** - Explanations ready for review
- [ ] **Code Clean** - No commented-out code or debug statements
- [ ] **Manifest Valid** - JSON syntax correct, version updated
- [ ] **Tested** - Extension works correctly in Chrome

### Submission Requirements

- [ ] Developer account created ($5 one-time fee)
- [ ] Email verified
- [ ] Payment method added (for paid extensions, if applicable)
- [ ] ZIP file of extension prepared (exclude unnecessary files)

### Files to Exclude from ZIP

```
.git/
.gitignore
.DS_Store
*.md (except if needed for user help)
node_modules/
test files
development scripts
```

---

## 📝 Version History (for "What's New" section)

### Version 2.0.0
```
🎉 Major Update!

NEW FEATURES:
• Port Scanner - Quick scan ~100 ports or deep scan 400+ ports
• Saved Apps Manager - Save, tag, and organize your favorite apps
• Custom Hosts - Add custom hostname mappings
• Import/Export - Share configurations with your team
• Improved Docker Integration - Real-time container monitoring

IMPROVEMENTS:
• Modern tabbed interface
• Better visual design with smooth animations
• Faster detection and response times
• Enhanced framework recognition for Docker
```

---

## 🔗 Support Links

### Support URL
```
https://github.com/[your-repo]/localhost-detector/issues
```

### FAQ/Help URL (Optional)
```
https://github.com/[your-repo]/localhost-detector#troubleshooting
```

---

## 💰 Pricing

### Distribution Option
```
Free
```

### Regions
```
All regions (worldwide)
```

---

## ⚠️ Common Rejection Reasons to Avoid

1. **Missing Privacy Policy** - Must have a published, accessible privacy policy URL
2. **Excessive Permissions** - All permissions must be justified and necessary
3. **Misleading Description** - Description must accurately reflect functionality
4. **Poor Quality Screenshots** - Screenshots must be clear and show actual functionality
5. **Broken Functionality** - Extension must work as described
6. **Security Issues** - No obvious security vulnerabilities
7. **Trademark Violations** - Don't use trademarked names/logos without permission

---

## 📞 Post-Submission

- Review typically takes 1-3 business days
- You'll receive email notification of approval or rejection
- If rejected, you'll receive specific feedback to address
- After approval, extension goes live within minutes

---

## 📄 Sample Privacy Policy Template

```markdown
# Privacy Policy for Localhost App Detector

Last updated: [Date]

## Overview
Localhost App Detector is a Chrome browser extension that helps developers 
detect and manage their local development servers.

## Data Collection
This extension collects:
- Localhost URLs and port numbers you visit (stored locally only)
- Your saved app configurations and preferences

This extension does NOT collect:
- Personal information
- Browsing history outside of localhost
- User identifiers or analytics
- Location data

## Data Storage
All data is stored locally on your device using Chrome's storage APIs.
No data is transmitted to external servers.

## Data Sharing
We do not share, sell, or transmit any data to third parties.

## Changes to This Policy
We may update this policy occasionally. Changes will be posted here.

## Contact
For questions about this policy, contact: [your email]
```

---

*This document was generated to assist with Chrome Web Store publishing. Update all placeholder values before submission.*
