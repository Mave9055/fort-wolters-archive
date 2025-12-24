# Fort Wolters Archive

**Digital Preservation of U.S. Army Aviation History**

A comprehensive digital archive documenting artifacts from Fort Wolters Primary Helicopter Training School (1956-1973), featuring provenance tracking, high-resolution imagery, and blockchain-ready verification.

---

## 📁 Project Structure

```
fort-wolters-archive/
├── index.html                 # Landing page
├── dashboard.html             # Collection dashboard with filtering
├── README.md                  # This file
├── assets/
│   ├── styles.css            # Shared styling
│   └── images/               # Artifact photographs
│       ├── lighter-1.jpg
│       ├── lighter-2.jpg
│       ├── lighter-3.jpg
│       ├── lighter-4.jpg
│       ├── lighter-5.jpg
│       └── lighter-6.jpg
├── data/
│   └── registry.json         # Artifact metadata registry
├── lighters/
│   └── fw-arc-0001.html      # Individual artifact provenance packet
└── js/
    └── identity.js           # QR code and hash verification logic
```

---

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `fort-wolters-archive`
3. Set visibility to **Public**
4. Do **not** initialize with README (we already have one)

### Step 2: Push Files to GitHub

```bash
# Navigate to the project directory
cd fort-wolters-archive

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial deploy of Fort Wolters Archive"

# Add remote origin (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/fort-wolters-archive.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Site

Your archive will be live at:

```
https://YOUR-USERNAME.github.io/fort-wolters-archive/
```

**Pages:**
- Landing page: `/`
- Dashboard: `/dashboard.html`
- Artifact packet: `/lighters/fw-arc-0001.html`
- Registry data: `/data/registry.json`

---

## 🔗 Quick Links

| Page | Purpose |
|------|---------|
| `index.html` | Landing page with project overview |
| `dashboard.html` | Interactive collection browser with search/filter |
| `lighters/fw-arc-0001.html` | Detailed provenance packet for Class 65-9WA lighter |
| `data/registry.json` | Machine-readable artifact metadata |

---

## 🛠️ Features

### ✅ Implemented

- **Responsive Design** – Mobile-friendly layouts
- **Interactive Dashboard** – Search, filter by category/condition
- **Detailed Provenance Packets** – High-resolution images, metadata, historical context
- **Print-Optimized** – Provenance packets formatted for PDF export
- **Blockchain Ready** – SHA-256 hashing, QR code infrastructure
- **JSON Registry** – Structured data for API integration

### 🔜 Future Enhancements

- QR code generation (requires library integration)
- NFT minting integration
- Advanced search with full-text indexing
- Multi-artifact comparison view
- User authentication for private collections
- Blockchain verification via smart contracts

---

## 📸 Artifact: FW-ARC-0001

**Class 65-9WA Commemorative Lighter**

- **Recipient:** WOC Arthur P. Lancy Jr.
- **Year:** 1965
- **Significance:** First graduating class to use Hughes TH-55A helicopter
- **Location:** Fort Wolters, Texas
- **Condition:** Good (functional)

This lighter commemorates a pivotal moment in U.S. Army aviation history—the introduction of the Hughes TH-55A Osage as the primary training helicopter at Fort Wolters.

---

## 🎖️ Historical Context

**Fort Wolters** (1956-1973) trained over 40,000 helicopter pilots and played a crucial role during the Vietnam War era. The base near Mineral Wells, Texas, was the Army's primary rotary-wing training facility.

The **Hughes TH-55A Osage** replaced earlier trainers in 1965, offering improved safety and training efficiency. Class 65-9WA represents one of the first cohorts to complete training on this aircraft.

---

## 📄 License

This project is dedicated to preserving military aviation history. Images and artifacts are documented for educational and historical purposes.

**Artifact provenance packets are freely accessible** for researchers, collectors, and history enthusiasts.

---

## 🤝 Contributing

To add artifacts to the archive:

1. Add high-resolution images to `assets/images/`
2. Update `data/registry.json` with artifact metadata
3. Create provenance packet HTML in appropriate category folder
4. Update dashboard filters if adding new categories
5. Submit pull request with documentation

---

## 📧 Contact

For questions about artifacts, provenance verification, or contributions, please open an issue on GitHub.

---

**Fort Wolters Archive** – Preserving the legacy of U.S. Army aviation training, one artifact at a time.

*"Above the Best"* – Fort Wolters motto
