# Chrome Web Store Submission Guide
**Localhost App Detector — v3.1.0**

Use this document when filling out the Chrome Web Store Developer Dashboard.
Fields marked **`[ FILL IN ]`** require your input before submitting.

---

## Step 1 — Developer Account

| Field | Value |
|-------|-------|
| One-time registration fee | $5 USD (if not already paid) |
| Account type | Individual or Business |
| Publisher display name | **GTM Enterprises LLC** |
| Contact email | **`[ FILL IN: your support/contact email address ]`** |

---

## Step 2 — Upload Package

Upload the file: **`localhost-app-detector.zip`** (included in this directory)

The ZIP contains only the 10 extension runtime files. No source documentation, test files, or development scripts are included.

---

## Step 3 — Store Listing

### Extension Name
```
Localhost App Detector
```

### Short Description
*(132 character maximum — this appears in search results)*
```
Detect localhost apps, scan ports with app identification, and save favorite development URLs. Perfect for web developers!
```
Character count: 119 ✓

### Detailed Description
*(16,000 character maximum — supports plain text only, no HTML/markdown)*

```
🚀 LOCALHOST APP DETECTOR - The Ultimate Developer Tool for Local Development

A must-have Chrome extension for web developers who work with multiple localhost applications and development servers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ KEY FEATURES

🔍 AUTOMATIC LOCALHOST DETECTION
• Automatically detects when you visit any localhost URL
• Tracks all ports you've accessed in real-time
• One-click access to open any detected app
• Auto-cleanup removes inactive apps after 5 minutes

🔎 POWERFUL PORT SCANNER
• Quick Scan: checks ~100 common development ports in seconds
• Deep Scan: comprehensive scan of 400+ ports
• Identifies 100+ frameworks and services automatically
• Shows response times, HTTP status, framework badges
• Auto-scans when you open the popup

💾 SAVED APPS MANAGER
• Save your favorite development URLs permanently
• Add tags to organize your apps
• Mark favorites and track access counts
• Search and filter your saved apps
• Import/Export configurations for team sharing
• Statistics: total saved and favorites at a glance

⚙️ SETTINGS
• Toggle auto-scan on popup open
• Choose quick vs. deep scan as default
• All settings persist across sessions

🎨 BEAUTIFUL INTERFACE
• Modern, clean design with smooth animations
• Three-tab navigation: Detected, Saved, Scanner
• Visual badges showing app counts
• Framework-specific icons and color coding
• Search on both Detected and Saved tabs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔌 DETECTED FRAMEWORKS & SERVICES

The port scanner automatically identifies:
• Frontend: React, Next.js, Vue, Nuxt, Angular, Svelte, Vite
• Backend: Express, Django, Flask, FastAPI, Rails, Laravel, Spring
• Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
• Tools: Storybook, Jupyter, Swagger, Webpack Dev Server, Parcel
• And 100+ more services across 400+ ports

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 PRIVACY FOCUSED

• Only monitors localhost (127.0.0.1) traffic — nothing else
• NO data sent to any external servers, ever
• All data stored locally on your machine only
• Minimal permissions — only what's necessary
• Open source and fully auditable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 PERFECT FOR

• Frontend developers (React, Vue, Angular, Svelte)
• Backend developers (Node.js, Python, PHP, Go, Ruby)
• Full-stack developers juggling multiple services
• Anyone who forgets which port their dev server is on

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Download now and stop guessing which port your app is running on. 🚀
```

### Category
```
Developer Tools
```

### Language
```
English (United States)
```

---

## Step 4 — Developer Information

| Field | Value |
|-------|-------|
| Developer name | **GTM Enterprises LLC** |
| Developer website | **https://github.com/GTM-Enterprises-LLC/chrome-extension-localhost-helper** |
| Support URL | **https://github.com/GTM-Enterprises-LLC/chrome-extension-localhost-helper/issues** |
| Privacy policy URL | **`[ FILL IN: public URL where your privacy policy is hosted ]`** |
| Support email | **`[ FILL IN: your support email address ]`** |

> **Privacy Policy:** You must host a privacy policy at a public URL before submitting.
> A ready-to-use template is at the bottom of this document. Host it on GitHub Pages,
> your company website, or any public URL.

---

## Step 5 — Privacy Practices

The dashboard will ask you to declare what user data the extension handles.
Answer as follows:

### "Does your extension collect or use any user data?"
Select **Yes**, then declare:

| Data type | Collected? | Notes |
|-----------|-----------|-------|
| Personally identifiable information | **No** | |
| Health information | **No** | |
| Financial and payment information | **No** | |
| Authentication information | **No** | |
| Personal communications | **No** | |
| Location | **No** | |
| Web history | **No** | |
| User activity | **No** | |
| Website content | **No** | |
| **Locally stored URLs/ports** | **Yes (local only)** | Stored in Chrome storage, never transmitted |

### Single Purpose Statement
```
This extension helps developers discover, track, and quickly access their localhost development servers.
```

### Data Usage Declaration (free text)
```
This extension stores localhost URLs and port numbers you visit, plus your saved app configurations
and preferences. All data is stored locally using Chrome's Storage API. No data is transmitted
to external servers or collected by the developer.
```

---

## Step 6 — Permissions Justification

The reviewer may ask you to justify each permission. Use these responses:

| Permission | Justification |
|------------|---------------|
| `tabs` | Required to open detected localhost applications in new browser tabs when users click on them |
| `webRequest` | Passively monitors network requests to localhost and 127.0.0.1 to detect active development servers. Read-only — no request blocking or modification |
| `storage` | Saves user preferences, saved apps, scan results, and settings across browser sessions using Chrome's local storage API |
| `http://localhost/*` | Core feature: detecting and scanning localhost development servers |
| `http://127.0.0.1/*` | Core feature: detecting the alternative localhost IP address |

---

## Step 7 — Visual Assets

### Extension Icons *(already included in ZIP)*

| Size | File | Used for |
|------|------|---------|
| 128×128 | `icons/icon128.png` | Store listing, install page |
| 48×48 | `icons/icon48.png` | Extensions management page |
| 16×16 | `icons/icon16.png` | Browser toolbar |

### Screenshots *(you will create these)*

**Specifications:** PNG or JPEG, exactly **1280×800** or **640×400** pixels
**Required:** At least 1 screenshot. Recommended: 3–5.

| # | Suggested content |
|---|-------------------|
| 1 | Main popup — Detected tab showing app cards with framework badges |
| 2 | Scanner tab — scan results with port numbers, icons, response times |
| 3 | Saved tab — saved apps list with tags, favorites, and stats bar |
| 4 | Settings modal — toggle switches for auto-scan and scan mode |
| 5 | Empty state — port chips and scanner empty state side by side |

### Promotional Images *(optional but increases visibility)*

| Type | Size | Used for |
|------|------|---------|
| Small tile | 440×280 px PNG | Store search results |
| Large tile | 920×680 px PNG | Category pages |
| Marquee | 1400×560 px PNG | Store homepage (if featured) |

---

## Step 8 — Distribution & Pricing

| Field | Value |
|-------|-------|
| Pricing | **Free** |
| Distribution | **All regions (worldwide)** |
| Visibility | **Public** |
| Publishing | Automatic upon review approval (or choose Deferred to publish manually) |

---

## Step 9 — What's New (Version Notes)

Use this for the "What's New" field when submitting v3.1.0:

```
v3.1.0
• Auto-scans ports when popup opens (configurable in Settings)
• New Settings panel: toggle auto-scan and choose scan depth default
• Tags on saved apps: add, view, and remove tags from any saved app
• Save button on scanner results: pin any discovered port directly to Saved
• Stats bar on Saved tab: shows total saved and favorites count
• Search bar on Detected tab: filter apps by URL, port, or framework
• Bug fixes: interval leak, empty state display, XSS hardening
```

---

## Submission Checklist

- [ ] Developer account created and $5 fee paid
- [ ] `localhost-app-detector.zip` uploaded
- [ ] Store name, short description, and detailed description filled in
- [ ] Category set to "Developer Tools"
- [ ] At least 1 screenshot uploaded (1280×800 or 640×400)
- [ ] Developer name set to "GTM Enterprises LLC"
- [ ] Developer website URL filled in
- [ ] Privacy policy URL filled in (hosted public URL)
- [ ] Support email filled in
- [ ] Privacy practices declaration completed
- [ ] Permissions justifications ready (copy from Step 6 above)
- [ ] Pricing set to Free, distribution set to All regions
- [ ] Review timeline: typically 1–3 business days

---

## Common Rejection Reasons (avoid these)

1. **Missing privacy policy** — Must be a live, publicly accessible URL
2. **Permissions not justified** — Be ready to explain each one (see Step 6)
3. **Misleading description** — Don't claim features that don't work
4. **Screenshots don't match extension** — Show real screenshots, not mockups
5. **Broken functionality** — Test thoroughly before submitting
6. **Duplicate submission** — Don't re-submit a rejected version without changes

---

## Privacy Policy Template

Host this at a public URL (e.g., GitHub Pages, your company site) and put that URL in Step 4.

```markdown
# Privacy Policy — Localhost App Detector

**Last updated:** [ DATE ]
**Developer:** GTM Enterprises LLC
**Contact:** [ YOUR EMAIL ]

## What This Extension Does

Localhost App Detector is a Chrome browser extension that helps software developers
detect, scan, and manage their local development servers (localhost).

## Data We Collect

This extension collects and stores **only the following**, locally on your device:

- Localhost URLs and port numbers you visit while the extension is active
- App configurations you choose to save (name, URL, tags, notes)
- Your extension settings (scan preferences)

## How Data Is Stored

All data is stored **locally on your device** using Chrome's built-in Storage API
(`chrome.storage.local` and `chrome.storage.sync`). Data stored in sync storage
may be synced to your other Chrome devices if you are signed into Chrome.

## Data We Do NOT Collect

- Personal information (name, email, address, phone number)
- Browsing history outside of localhost/127.0.0.1
- User identifiers or analytics
- Location data
- Payment or financial information

## Data Transmission

**No data is ever transmitted to external servers.** This extension does not make
any network requests outside of scanning your local machine (localhost/127.0.0.1).
The developer has no access to any data stored by this extension.

## Data Sharing

We do not share, sell, rent, or transmit any user data to any third party.

## Data Retention

Data is retained in your browser's local storage until you clear it via the
extension's export/import functionality or uninstall the extension.

## Changes to This Policy

If this policy changes, the updated version will be posted at this URL with a new
"Last updated" date.

## Contact

For questions about this privacy policy, contact: [ YOUR EMAIL ]
```

---

*Review timeline: typically 1–3 business days after submission.*
*After approval, the extension goes live within minutes.*
