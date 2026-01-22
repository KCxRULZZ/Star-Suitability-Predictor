# Star Suitability Predictor 🌟

A machine-learning web application that predicts stellar properties using SDSS **ugriz photometric data** and evaluates whether a star is suitable for hosting potentially life-supporting planets.

---

## ✨ Features

- Predicts **Spectral Type**
- Predicts **Effective Temperature (Teff)**
- Predicts **Metallicity Class**
- Predicts **Suitability for hosting life-supporting planets**
- Shows **prediction uncertainty & agreement**
- Interactive **Hertzsprung–Russell (HR) Diagram**
- React frontend + FastAPI backend

---

## 📁 Project Structure

Star-Suitability-Predictor/
├── backend/
│ ├── app.py
│ ├── predict.py
│ ├── database.py
│ ├── model/ # trained models go here (not included in GitHub)
│ └── requirements.txt
└── frontend/
└── React application


---

## 🧠 Trained Models (Not Included in GitHub)

Due to GitHub file size limitations, trained machine learning model files (`.pkl`, `.joblib`) are **not included** in this repository.

---

### 🔗 Download Models

Download all trained models from Google Drive:

👉 https://drive.google.com/drive/folders/1qS12eohEdreleuRfzYGWVXA0WOIB9745?usp=sharing

---

### 📂 Install Models

1. Download all folders from the Google Drive link  
2. Copy them into:

backend/model/


3. Final structure should look like:

backend/model/
├── Exo/
├── metallicity/
├── spectral/
└── teff/



⚠️ Keep all `.pkl`, `scaler.pkl`, and `label_encoder.pkl` files inside their respective folders.

---

## ⚙️ Setup & Run (Windows)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/KCxRULZZ/Star-Suitability-Predictor.git
cd Star-Suitability-Predictor

2️⃣ Backend setup (FastAPI)

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload

Backend will start at:
http://127.0.0.1:8000

3️⃣ Frontend setup (React)

Open a new terminal window:
cd frontend
npm install
npm start

Frontend will open at:
http://localhost:3000


🔧 API Configuration

Frontend API connection is defined in:
frontend/src/services/api.js

Default configuration:
baseURL: "http://127.0.0.1:8000"

🧪 Notes

Models must be installed before starting the backend.

Folder names must exactly match:
Exo, metallicity, spectral, teff

If you see "file not found" errors, verify model filenames and paths.

Requires:

Python 3.10+

Node.js (LTS)

Git

📊 Data Source

Sloan Digital Sky Survey (SDSS) – ugriz photometric catalog.
https://www.kaggle.com/datasets/diraf0/sloan-digital-sky-survey-dr18?resource=download

👤 Author
Kaveesha_Fernando