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
      </Section>

      {/* ===============================
          SUITABILITY FOR HOSTING (HIGHLIGHTED)
      =============================== */}
      <SuitabilityCard value={String(prediction.Life_Supporting_Star)} />

      {/* ===============================
          UNCERTAINTY & AGREEMENT (2x2 GRID)
      =============================== */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "#00d1ff", marginBottom: "20px" }}>
          Prediction Uncertainty & Agreement
        </h3>
        <GridMetrics
          teffUncertainty={Number(prediction.Teff_uncertainty).toFixed(0)}
          spectralAgreement={prediction.Spectral_confidence}
          metallicityAgreement={prediction.Metallicity_confidence}
          suitabilityAgreement={prediction.Life_Supporting_agreement ?? prediction.Life_Supporting_confidence}
        />
      </div>

      {/* ===============================
          FEATURE INFLUENCE
      =============================== */}
      <ColorInfluenceSection>
        {Object.entries(influence).map(([key, value]) => (
          <Bar key={key} label={key} value={value} />
        ))}
      </ColorInfluenceSection>

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px",
        background: "linear-gradient(135deg, rgba(0, 209, 255, 0.05) 0%, rgba(0, 209, 255, 0.02) 100%)",
        borderRadius: "8px",
        border: "1px solid rgba(0, 209, 255, 0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          color: "#ffffff",
          fontWeight: "700",
          fontSize: "15px",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#00d1ff",
          fontWeight: "600",
          fontSize: "15px",
          letterSpacing: "0.5px",
        }}
      >
        {value}
      </span>
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

function ColorInfluenceSection({ children }) {
  return (
    <div
      style={{
        marginTop: "24px",
        padding: "0",
      }}
    >
      {/* Section Header with Cosmic Theme */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "2px solid rgba(0, 209, 255, 0.3)",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "24px",
            background: "linear-gradient(180deg, #ff4500 0%, #ffff00 50%, #4169e1 100%)",
            borderRadius: "2px",
            boxShadow: "0 0 10px rgba(0, 209, 255, 0.5)",
          }}
        />
        <h3
          style={{
            color: "#00d1ff",
            fontSize: "18px",
            fontWeight: "700",
            letterSpacing: "1px",
            margin: "0",
            textTransform: "uppercase",
          }}
        >
          Color Feature Influence
        </h3>
      </div>

      {/* Container for bars */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0, 209, 255, 0.04) 0%, rgba(20, 30, 50, 0.04) 100%)",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid rgba(0, 209, 255, 0.1)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(0, 209, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Bar({ label, value }) {
  // Astronomy-themed color mapping based on stellar properties
  const getAstroColor = (val) => {
    // Red dwarf, Yellow dwarf, White, Blue star progression
    if (val >= 90) return { color: "#4169e1", name: "Blue" }; // Blue Star
    if (val >= 70) return { color: "#87ceeb", name: "Cyan" }; // White-ish
    if (val >= 50) return { color: "#ffff00", name: "Yellow" }; // Yellow dwarf
    if (val >= 30) return { color: "#ff8c00", name: "Orange" }; // Orange dwarf
    return { color: "#ff4500", name: "Red" }; // Red dwarf
  };

  const colorData = getAstroColor(value);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(0, 209, 255, 0.08) 0%, rgba(0, 209, 255, 0.02) 100%)",
        padding: "16px",
        borderRadius: "10px",
        border: "1px solid rgba(0, 209, 255, 0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div>
          <span
            style={{
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "14px",
              textTransform: "capitalize",
              letterSpacing: "0.5px",
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              color: colorData.color,
              fontWeight: "700",
              fontSize: "14px",
            }}
          >
            {value}%
          </span>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: colorData.color,
              boxShadow: `0 0 8px ${colorData.color}80`,
            }}
          />
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(90deg, rgba(0, 209, 255, 0.1) 0%, rgba(0, 209, 255, 0.05) 100%)",
          height: "12px",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${colorData.color} 0%, ${colorData.color}cc 100%)`,
            borderRadius: "6px",
            boxShadow: `0 0 12px ${colorData.color}80, inset 0 1px 2px rgba(255, 255, 255, 0.1)`,
            transition: "width 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* ===============================
   CIRCULAR PROGRESS INDICATOR
=============================== */

function CircularProgress({ value, label }) {
  const percentage = Math.min(value, 100);
  const circumference = 2 * Math.PI * 55; // radius = 55
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const getColor = (pct) => {
    if (pct >= 80) return "#00ff99";
    if (pct >= 60) return "#00d1ff";
    if (pct >= 40) return "#ffaa00";
    return "#ff5555";
  };

  const color = getColor(percentage);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        height: "100%",
      }}
    >
      <div style={{ position: "relative", width: "150px", height: "150px" }}>
        {/* Background circle */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
            filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))",
          }}
          width="150"
          height="150"
        >
          <circle
            cx="75"
            cy="75"
            r="55"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
          />
        </svg>

        {/* Progress circle */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
          }}
          width="150"
          height="150"
        >
          <circle
            cx="75"
            cy="75"
            r="55"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>

        {/* Center percentage text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: color,
              lineHeight: "1",
            }}
          >
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>
      <span
        style={{
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ===============================
   TEFF UNCERTAINTY CARD
=============================== */

function TeffUncertaintyCard({ value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "16px",
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "#00d1ff",
          textShadow: "0 0 10px rgba(0, 209, 255, 0.3)",
        }}
      >
        ±{value}
      </div>
      <div style={{ fontSize: "16px", color: "#888888", fontWeight: "500" }}>
        K
      </div>
      <span
        style={{
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "700",
        }}
      >
        Teff Uncertainty
      </span>
    </div>
  );
}

/* ===============================
   2x2 GRID METRICS
=============================== */

function GridMetrics({
  teffUncertainty,
  spectralAgreement,
  metallicityAgreement,
  suitabilityAgreement,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      {/* Top Left: Teff Uncertainty */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid rgba(0, 209, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          minHeight: "280px",
        }}
      >
        <TeffUncertaintyCard value={teffUncertainty} />
      </div>

      {/* Top Right: Spectral Agreement */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid rgba(0, 209, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          minHeight: "280px",
        }}
      >
        <CircularProgress
          value={spectralAgreement}
          label="Spectral Agreement"
        />
      </div>

      {/* Bottom Left: Metallicity Agreement */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid rgba(0, 209, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          minHeight: "280px",
        }}
      >
        <CircularProgress
          value={metallicityAgreement}
          label="Metallicity Agreement"
        />
      </div>

      {/* Bottom Right: Suitability Agreement */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid rgba(0, 209, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          minHeight: "280px",
        }}
      >
        <CircularProgress
          value={suitabilityAgreement}
          label="Suitability Agreement"
        />
      </div>
    </div>
  );
}

/* ===============================
   SUITABILITY CARD
=============================== */

function SuitabilityCard({ value }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
        padding: "28px",
        borderRadius: "12px",
        border: "1px solid rgba(0, 209, 255, 0.25)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        marginTop: "24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#ffffff",
          fontWeight: "700",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          lineHeight: "1.4",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        Suitability For Hosting Habitable Exoplanets
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#00d1ff",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
