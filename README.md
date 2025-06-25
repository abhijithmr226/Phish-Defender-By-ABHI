# 🛡️ Phish Sentinel: AI Email Defender

[![Live](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://phish-sentinel-ai-defender.lovable.app/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%2C%20Vite%2C%20Tailwind-blueviolet?style=for-the-badge&logo=react)]()
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)]()
[![UI](https://img.shields.io/badge/UI-shadcn--ui-orange?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 📌 Overview

**Phish Sentinel** is an AI-powered web application that helps users detect phishing emails by analyzing their contents. It uses intelligent validation of the email's sender address, link structures, suspicious text patterns, and other features to identify potential threats.

Whether you're a security-conscious individual or building something to help others stay safe from phishing attacks — this tool demonstrates how AI can assist in email threat detection effectively.

---

## 🌐 Live Demo

👉 [**Click here to view the live project**](https://phish-sentinel-ai-defender.lovable.app/)  
Hosted securely via **Vercel**.

---

## 🧠 How It Works

The application takes in **email-related inputs** such as:

- **Email ID** of the sender
- **Text content** from the email body
- **Links/URLs** embedded in the email

It then performs a **real-time integrity check** using an AI-based validation logic (you can customize this with NLP/ML tools or back-end APIs), helping the user quickly determine if the email appears to be safe or suspicious.

---

## 📁 Project Structure

```plaintext
📦 phish-sentinel-ai-defender
├── public/                 # Static assets (e.g., favicon, index.html)
├── src/
│   ├── components/         # Reusable UI components (buttons, cards, etc.)
│   ├── pages/              # Page-level components (Home, Results, etc.)
│   ├── styles/             # Tailwind and global CSS styles
│   └── main.tsx            # React app entry point
├── index.html              # HTML template used by Vite
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite development/build configuration
└── tsconfig.json           # TypeScript compiler options

---

## 🛠️ Tech Stack

| Technology     | Purpose                                     |
|----------------|---------------------------------------------|
| ⚛️ React        | Frontend component-based UI library          |
| ⚡ Vite         | Lightning-fast development & build tool     |
| 🧠 TypeScript   | Adds type safety to JavaScript               |
| 🎨 Tailwind CSS | Utility-first CSS for responsive design      |
| 💅 shadcn/ui   | Modern prebuilt UI components                |

---



## 🚀 Getting Started Locally

Make sure **Node.js** and **npm** are installed.

### Step-by-step Instructions

```bash
# 1. Clone the repository
git clone https://github.com/abhijithmr226/phish-sentinel-ai-defender.git

# 2. Navigate into the directory
cd phish-sentinel-ai-defender

# 3. Install the required dependencies
npm install

# 4. Start the development server
npm run dev
Visit http://localhost:5173 to view the application in your browser.

🧪 Features
✅ Real-time phishing checks

✅ Type-safe component-based development

✅ Beautiful and responsive UI using Tailwind & shadcn/ui

✅ Optimized with Vite for fast load times

✅ Easily deployable to platforms like Vercel, Netlify, or GitHub Pages

