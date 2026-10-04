# ResumeForge PRO

A modern, high-performance ATS-friendly interactive resume builder with multi-template rendering, live ATS optimization scorecards, dynamic drag-and-drop section reordering, color customizers, and print-ready PDF export.

## 🚀 Key Features

- **5 Premium Templates**: Modern Pro, Two-Column Sidebar, Classic Executive, Tech Minimal, and Corporate Elegant.
- **Live ATS Optimization Analyzer**: Instant score calculation (0–100%) with actionable recommendations (metrics, keywords, action verbs).
- **Theme & Typography Customizer**: 6 accent color presets + custom hex picker, and multi-font support (Inter, Plus Jakarta, Merriweather, Roboto).
- **Sample Profile Loader**: 1-click loading for Full-Stack Developer, Data Scientist / AI, Product Marketing, and Entry-Level Fresher profiles.
- **Interactive Live Preview**: Floating toolbar with Zoom In (+), Zoom Out (-), Reset 100%, and Auto Fit to Screen.
- **Section & Item Management**: Drag-and-drop reordering, Up/Down arrow buttons, and Visibility (Eye) toggles.
- **Data Persistence**: Auto-save to LocalStorage, JSON Export & Import backup support.
- **A4 Print / PDF Ready**: Flawless print styling without header/editor interference.

## 🛠️ Getting Started

### 1. Local Node.js Development
```bash
# Install dependencies
npm install

# Run the local server
npm start
```
Open `http://localhost:3000` in your browser.

---

### 2. Running with Docker 🐳

#### Option A: Docker Compose (Recommended)
```bash
docker compose up -d
```

#### Option B: Docker CLI
```bash
# Build the Docker image
docker build -t resume-forge-pro:latest .

# Run the container
docker run -d -p 8080:80 --name resume-forge-pro resume-forge-pro:latest
```

Open `http://localhost:8080` in your browser.

#### Stopping the Container
```bash
docker compose down
# or
docker stop resume-forge-pro && docker rm resume-forge-pro
```
