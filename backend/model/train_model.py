import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import joblib

# Load data
data = pd.read_csv('../../Balanced_SDSS_Spectral.csv')

# Select features and targets
features = data[['u-g', 'g-r', 'r-i', 'i-z']]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(features)

# Targets
y_FeH = data['FeH']
y_Teff = data['Teff']
y_Metallicity = data['Metallicity_Class']
y_Spectral = data['Spectral_Type']

# Train models
rf_FeH = RandomForestRegressor(n_estimators=100, random_state=42)
rf_FeH.fit(X_scaled, y_FeH)

rf_Teff = RandomForestRegressor(n_estimators=100, random_state=42)
rf_Teff.fit(X_scaled, y_Teff)

rf_Metal = RandomForestClassifier(n_estimators=100, random_state=42)
rf_Metal.fit(X_scaled, y_Metallicity)

rf_Spectral = RandomForestClassifier(n_estimators=100, random_state=42)
rf_Spectral.fit(X_scaled, y_Spectral)

# Save models & scaler
joblib.dump(rf_FeH, 'FeH_model.pkl')
joblib.dump(rf_Teff, 'Teff_model.pkl')
joblib.dump(rf_Metal, 'Metallicity_model.pkl')
joblib.dump(rf_Spectral, 'Spectral_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("✅ Models trained and saved successfully.")
