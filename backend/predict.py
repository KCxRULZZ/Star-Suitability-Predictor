from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
from pathlib import Path

router = APIRouter(prefix="/predict")

# ======================================================
# PATH SETUP
# ======================================================
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

# ======================================================
# LOAD MODELS + SCALERS + LABEL ENCODERS
# ======================================================

# ---------- Teff (Regression) ----------
teff_scaler = joblib.load(MODEL_DIR / "teff" / "scaler.pkl")
teff_model = joblib.load(MODEL_DIR / "teff" / "Teff_model.pkl")

# ---------- Metallicity Class ----------
metal_scaler = joblib.load(MODEL_DIR / "metallicity" / "scaler.pkl")
metal_model = joblib.load(MODEL_DIR / "metallicity" / "Metallicity_model.pkl")
metal_le = joblib.load(MODEL_DIR / "metallicity" / "label_encoder.pkl")

# ---------- Spectral Type ----------
spectral_scaler = joblib.load(MODEL_DIR / "spectral" / "spectral_scaler.pkl")
spectral_model = joblib.load(MODEL_DIR / "spectral" / "spectral_type_rf_model.pkl")
spectral_le = joblib.load(MODEL_DIR / "spectral" / "spectral_label_encoder.pkl")

# ---------- Life Supporting Star ----------
exo_scaler = joblib.load(MODEL_DIR / "Exo" / "scaler.pkl")
exo_model = joblib.load(MODEL_DIR / "Exo" / "life_supporting_star_rf_model.pkl")
exo_le = joblib.load(MODEL_DIR / "Exo" / "label_encoder.pkl")

# ======================================================
# INPUT SCHEMA
# ======================================================
class UGRIZInput(BaseModel):
    U: float
    G: float
    R: float
    I: float
    Z: float

# ======================================================
# SDSS COLOR RANGES
# ======================================================
COLOR_RANGES = {
    "u_g": (-0.5, 2.8),
    "g_r": (-0.4, 1.6),
    "r_i": (-0.4, 1.3),
    "i_z": (-0.4, 1.1),
}

# ======================================================
# HELPERS
# ======================================================
def reliability_label(conf):
    if conf >= 80:
        return "High"
    elif conf >= 55:
        return "Medium"
    return "Low"


def feature_influence(X, model, scaler, noise=0.02):
    base = model.predict(scaler.transform(X))[0]
    impacts = []

    for i in range(X.shape[1]):
        Xp = X.copy()
        Xp[0, i] += noise
        pert = model.predict(scaler.transform(Xp))[0]
        impacts.append(abs(pert - base))

    impacts = np.array(impacts)
    if impacts.sum() == 0:
        return [25, 25, 25, 25]

    return (impacts / impacts.sum() * 100).round(1).tolist()

# ======================================================
# ENDPOINT
# ======================================================
@router.post("/")
def predict(input: UGRIZInput):
    try:
        u_g = input.U - input.G
        g_r = input.G - input.R
        r_i = input.R - input.I
        i_z = input.I - input.Z

        X = np.array([[u_g, g_r, r_i, i_z]])

        valid_colors = True
        warnings = []

        for key, value in zip(["u_g", "g_r", "r_i", "i_z"], X[0]):
            lo, hi = COLOR_RANGES[key]
            if not (lo <= value <= hi):
                valid_colors = False
                warnings.append(f"{key}={value:.2f} outside SDSS range")

        N = 30
        sigma = 0.02

        teff_vals = []
        metal_vals = []
        spec_vals = []
        exo_vals = []

        for _ in range(N):
            Xn = X + np.random.normal(0, sigma, X.shape)

            teff_vals.append(
                teff_model.predict(teff_scaler.transform(Xn))[0]
            )

            metal_encoded = metal_model.predict(metal_scaler.transform(Xn))
            metal_vals.append(metal_le.inverse_transform(metal_encoded)[0])

            spec_encoded = spectral_model.predict(spectral_scaler.transform(Xn))
            spec_vals.append(spectral_le.inverse_transform(spec_encoded)[0])

            exo_encoded = exo_model.predict(exo_scaler.transform(Xn))
            exo_vals.append(exo_le.inverse_transform(exo_encoded)[0])

        Teff = float(np.mean(teff_vals))
        Teff_unc = float(np.std(teff_vals))

        Spectral_Type, Spectral_conf = np.unique(spec_vals, return_counts=True)
        Spectral_Type = Spectral_Type[np.argmax(Spectral_conf)]
        Spectral_conf = int(100 * np.max(Spectral_conf) / N)

        Metallicity_Class, Metallicity_conf = np.unique(metal_vals, return_counts=True)
        Metallicity_Class = Metallicity_Class[np.argmax(Metallicity_conf)]
        Metallicity_conf = int(100 * np.max(Metallicity_conf) / N)

        Life_Supporting, Exo_conf = np.unique(exo_vals, return_counts=True)
        Life_Supporting = Life_Supporting[np.argmax(Exo_conf)]
        Exo_conf = int(100 * np.max(Exo_conf) / N)

        overall_conf = int((Spectral_conf + Metallicity_conf + Exo_conf) / 3)

        color_influence = feature_influence(X, teff_model, teff_scaler)

        return {
            "u_g": u_g,
            "g_r": g_r,
            "r_i": r_i,
            "i_z": i_z,
            "valid_colors": valid_colors,
            "warnings": warnings,
            "Teff": Teff,
            "Teff_uncertainty": Teff_unc,
            "Metallicity_Class": Metallicity_Class,
            "Metallicity_confidence": Metallicity_conf,
            "Spectral_Type": Spectral_Type,
            "Spectral_confidence": Spectral_conf,
            "Life_Supporting_Star": Life_Supporting,
            "Life_Supporting_confidence": Exo_conf,
            "Prediction_reliability": reliability_label(overall_conf),
            "color_influence": {
                "u-g": color_influence[0],
                "g-r": color_influence[1],
                "r-i": color_influence[2],
                "i-z": color_influence[3],
            },
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
