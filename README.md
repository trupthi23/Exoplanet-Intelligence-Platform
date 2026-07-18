# 🚀 Exoplanet Intelligence Platform

### NASA Exoplanet Discovery & Habitability Analytics

A full-stack data intelligence platform built using NASA's Exoplanet Archive that transforms thousands of confirmed exoplanets into interactive dashboards, AI-powered insights, habitability analytics, and advanced visualization tools.

---

## 🌐 Live Demo

**Frontend (Vercel)**

https://exoplanet-intelligence-platform.vercel.app

**Backend API (Render)**

(https://exoplanet-intelligence-platform.onrender.com)

---

## 📖 Project Overview

The Exoplanet Intelligence Platform is a production-ready full-stack analytics application developed using React, FastAPI, PostgreSQL, and Material UI.

The platform enables users to explore NASA's confirmed exoplanet archive through interactive dashboards, advanced search capabilities, discovery trend analysis, AI-generated observations, and habitability intelligence.

Instead of presenting raw astronomical data, the application transforms complex datasets into meaningful visual analytics, making planetary exploration more intuitive and insightful.

---

## ✨ Key Features

- Interactive Analytics Dashboard
- Discovery Timeline Visualization
- Discovery Method Distribution
- Host Star Analytics
- AI Observatory Insights
- Planet Explorer
- Advanced Planet Search
- Planet Detail Pages
- Habitability Analytics
- Mission Control Dashboard
- CSV Export
- Responsive User Interface
- RESTful API
- PostgreSQL Database
- Cloud Deployment

---

## 🛠 Technology Stack

### Frontend

- React
- Material UI
- Recharts
- Axios
- React Router

### Backend

- FastAPI
- SQLAlchemy
- Pydantic

### Database

- PostgreSQL

### Deployment

- Vercel
- Render

---

## 📊 Dataset

**Source**

NASA Exoplanet Archive

The platform currently analyzes over **34,000 confirmed exoplanets** and their stellar properties.

---

## 📁 Project Structure

```text
Exoplanet-Intelligence-Platform/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── data/
│
└── README.md
```

---

## 📸 Screenshots

> Screenshots will be added here.

- Dashboard
- Explorer
- Planet Details
- Habitability
- AI Observatory
- Mission Control

---

## 🔌 API Endpoints

| Endpoint | Description |
|-----------|-------------|
| `/summary` | Dashboard summary |
| `/planets` | Planet explorer |
| `/planets/search` | Planet search |
| `/planet/{id}` | Planet details |
| `/analytics/discovery-methods` | Discovery methods |
| `/analytics/discovery-timeline` | Discovery timeline |
| `/analytics/top-host-stars` | Host star analytics |

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/trupthi23/Exoplanet-Intelligence-Platform
```

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Backend

```env
DATABASE_URL= postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME
```

Frontend

```env
VITE_API_URL= https://your-backend-name.onrender.com
```

---

## 🚀 Future Improvements

- Planet Comparison Engine
- AI Recommendation System
- Machine Learning Habitability Prediction
- NASA Live API Integration
- Interactive Galaxy Visualization
- User Authentication

---

## 👩‍💻 Author

**Trupthi K B**

AI & Data Science Student

GitHub:
LinkedIn:

---

## 📄 License

This project is licensed under the MIT License.

# 🏗️ System Architecture

The Exoplanet Intelligence Platform follows a modern full-stack architecture consisting of a React frontend, FastAPI backend, PostgreSQL database, and Machine Learning modules for habitability analysis.

<p align="center">
  <img src="docs/architecture.png" width="1000"/>
</p>