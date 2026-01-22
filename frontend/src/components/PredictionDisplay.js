import React from "react";

export default function PredictionDisplay({ prediction }) {
  if (!prediction) return null;

  // ===============================
  // RELIABILITY COLOR
  // ===============================
  const reliabilityColor = {
    High: "#00ff99",
    Medium: "#ffaa00",
    Low: "#ff5555",
  }[prediction.Prediction_reliability] || "#aaa";

  const influence = prediction.color_influence || {};

  return (
    <div
      style={{
        background: "#1c1c1c",
        padding: "24px",
        borderRadius: "12px",
        marginTop: "30px",
        border: "1px solid #333",
        color: "#ffffff",
      }}
    >
      <h2 style={{ color: "#00d1ff", marginBottom: "20px" }}>
        Prediction Results
      </h2>

      {/* ===============================
          VALIDITY WARNING
      =============================== */}
      {prediction.valid_colors === false && (
        <div
          style={{
            background: "#330000",
            color: "#ff5555",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #ff4444",
          }}
        >
          ⚠️ Input colors are outside model validity range.
          Predictions may be unreliable.
        </div>
      )}

      {/* ===============================
          CORE RESULTS
      =============================== */}
      <Section>
        <Row label="Spectral Type" value={prediction.Spectral_Type} />
        <Row
          label="Effective Temperature"
          value={`${Number(prediction.Teff).toFixed(0)} K`}
        />
        <Row
          label="Metallicity Class"
          value={prediction.Metallicity_Class}
        />
        <Row
          label="Suitability For Hosting"
          value={String(prediction.Life_Supporting_Star)}
        />
      </Section>

      {/* ===============================
          UNCERTAINTY & AGREEMENT
      =============================== */}
      <Section title="Prediction Uncertainty & Agreement">
        <Row
          label="Teff Uncertainty"
          value={`± ${Number(prediction.Teff_uncertainty).toFixed(0)} K`}
        />
        <Row
          label="Spectral Agreement"
          value={`${prediction.Spectral_confidence}%`}
        />
        <Row
          label="Metallicity Agreement"
          value={`${prediction.Metallicity_confidence}%`}
        />
        <Row
          label="Suitability Agreement"
          value={`${prediction.Life_Supporting_agreement ?? prediction.Life_Supporting_confidence}%`}
        />
      </Section>

      {/* ===============================
          FEATURE INFLUENCE
      =============================== */}
      <Section title="Color Feature Influence">
        {Object.entries(influence).map(([key, value]) => (
          <Bar key={key} label={key} value={value} />
        ))}
      </Section>

      {/* ===============================
          OVERALL RELIABILITY
      =============================== */}
      <div
        style={{
          marginTop: "18px",
          padding: "12px",
          borderRadius: "8px",
          border: `2px solid ${reliabilityColor}`,
          color: reliabilityColor,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Prediction Reliability: {prediction.Prediction_reliability}
      </div>
    </div>
  );
}

/* ===============================
   REUSABLE COMPONENTS
=============================== */

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "#aaaaaa" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        marginTop: "20px",
        background: "#111111",
        padding: "14px",
        borderRadius: "8px",
      }}
    >
      {title && (
        <h3 style={{ color: "#00d1ff", marginBottom: "10px" }}>
          {title}
        </h3>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {children}
      </div>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        style={{
          background: "#222222",
          height: "8px",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: "#00d1ff",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
