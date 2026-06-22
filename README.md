# LOGOS: Enterprise AI Prompt Archive

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)

**LOGOS** (Laci Optimalisasi Gagasan & Output Spesifik) is a highly specialized, mission-control style web application designed to archive, index, and manage AI-generated prompts, outputs, and telemetry data. Inspired by modern sci-fi HUDs (specifically Honkai Impact 3rd's Hyperion Bridge), it provides an immersive, high-performance interface for continuous AI interactions.

---

## 📋 Table of Contents

- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗 Architecture & Tech Stack

This project is built with a modern, scalable, serverless-first architecture optimized for performance and rapid deployment.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Database**: [Neon PostgreSQL](https://neon.tech/) (Serverless Postgres)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with extensive custom CSS variables for dynamic theming
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

- **Immersive HUD Interface**: A zero-compromise sci-fi dashboard aesthetic featuring chamfered edges, dynamic SVG reactor cores, and scanning line animations.
- **Dynamic Theming System**: A globally injected context provider (`HudProvider`) enabling real-time UI recoloring without page reloads.
- **Global Data Intercept (Quick Capture)**: A system-wide hotkey (`Ctrl+K`) to instantly push raw text directly into the database's pending queue.
- **Live Telemetry Engine**: Real-time rendering of database state through scrolling, auto-fading terminal logs.
- **AI Model Registry**: An integrated taxonomy of industry-leading AI models (Autonomous Agents, LLMs, Vision models).

---

## 🚀 Getting Started

### Prerequisites

Ensure your development environment meets the following requirements:
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm`/`yarn` equivalent)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FerrDxD/logos.git
   cd logos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Duplicate `.env.example` to `.env.local` and populate the required database connection strings.
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Database**
   Push the Drizzle schema to your Neon PostgreSQL instance.
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to access the bridge interface.

---

## 🔐 Environment Variables

The following environment variables are required for the application to function:

```env
# Database Configuration (Neon)
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"

# Vercel Blob Storage (If used for attachments)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

---

## 📂 Project Structure

```text
logos/
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API)
│   ├── components/          # Reusable React components
│   │   ├── hud/             # Mission-control specific UI components
│   │   └── ...
│   └── lib/                 # Utility functions and configurations
│       └── db/              # Drizzle ORM configuration and schemas
├── public/                  # Static assets (SVGs, Favicons)
├── drizzle.config.ts        # Drizzle configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript compiler options
```

---

## 🤝 Contributing

We welcome contributions from the community. Please read our [Contributing Guidelines](CONTRIBUTING.md) and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

For vulnerability reports, refer to our [Security Policy](SECURITY.md).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
