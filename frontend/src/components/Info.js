import React from "react";

const infoData = {
  O: {
    text: "O-type stars are extremely hot, blue, and massive. They are rare but dominate the light of young stellar populations.",
    exoplanetSuitability: [
      "❌ Exoplanet hosting: Extremely unlikely",
      "Very short stellar lifetime (a few million years), insufficient for planet formation and evolution",
      "Intense ultraviolet and X-ray radiation strips planetary atmospheres",
      "Strong stellar winds destabilize protoplanetary disks",
      "Habitable zones are very distant and short-lived"
    ],
    examples: "Zeta Puppis, HD 93129A",
    temperature: "30,000 – 50,000 K"
  },

  B: {
    text: "B-type stars are very luminous and blue-white in color. Often found in young stellar clusters.",
    exoplanetSuitability: [
      "❌ Exoplanet hosting: Very unlikely",
      "High UV radiation damages planetary atmospheres",
      "Short-to-moderate stellar lifespan limits biological evolution",
      "Strong radiation pressure disrupts disk stability",
      "Few confirmed planetary detections around B-type stars"
    ],
    examples: "Rigel, Spica",
    temperature: "10,000 – 30,000 K"
  },

  A: {
    text: "A-type stars are white and often used as photometric calibrators due to their smooth spectra.",
    exoplanetSuitability: [
      "⚠️ Exoplanet hosting: Possible but uncommon",
      "Moderate stellar lifetime allows gas giant formation",
      "High luminosity pushes habitable zone farther out",
      "Weaker magnetic activity than cooler stars",
      "Confirmed exoplanets exist, mostly massive planets"
    ],
    examples: "Sirius A, Vega",
    temperature: "7,500 – 10,000 K"
  },

  F: {
    text: "F-type stars are slightly hotter and more massive than the Sun, with white-yellow color.",
    exoplanetSuitability: [
      "✅ Exoplanet hosting: Moderately suitable",
      "Stable main-sequence lifetime supports planet formation",
      "Habitable zones exist but receive higher UV radiation",
      "Good balance between luminosity and lifespan",
      "Several known planetary systems"
    ],
    examples: "Procyon A, Upsilon Andromedae A",
    temperature: "6,000 – 7,500 K"
  },

  G: {
    text: "G-type stars like our Sun are stable and yellow. They support complex planetary systems.",
    exoplanetSuitability: [
      "✅ Exoplanet hosting: Highly suitable",
      "Long-lived and stable main-sequence phase",
      "Well-defined and stable habitable zone",
      "Moderate radiation environment",
      "Highest number of known potentially habitable exoplanets"
    ],
    examples: "Sun (Sol), Alpha Centauri A",
    temperature: "5,200 – 6,000 K"
  },

  K: {
    text: "K-type stars are cooler and orange. They are stable and long-lived — excellent for planetary systems.",
    exoplanetSuitability: [
      "✅ Exoplanet hosting: Very high suitability",
      "Extremely long stellar lifetimes (tens of billions of years)",
      "Stable habitable zones close to the star",
      "Lower radiation than G-type stars",
      "Excellent candidates for life-bearing planets"
    ],
    examples: "Epsilon Eridani, HD 40307",
    temperature: "3,900 – 5,200 K"
  },

  M: {
    text: "M-type stars (red dwarfs) are the most common stars in the universe.",
    exoplanetSuitability: [
      "✅ Exoplanet hosting: Very high (with caveats)",
      "Extremely long-lived stars (>100 billion years)",
      "Habitable zones are very close to the star",
      "Tidal locking likely for habitable-zone planets",
      "Early stellar flares may impact atmospheres"
    ],
    examples: "Proxima Centauri, Barnard's Star",
    temperature: "2,400 – 3,900 K"
  },
};

/* ===============================
   INFO CARD
=============================== */
function InfoCard({ type }) {
  const info = infoData[type];
  if (!info) return null;

  const imageUrl = `/spectral_types/StarType-${type}.png`;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "30px",
        background: "#111",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 0 25px rgba(0,0,0,0.6)",
        color: "#fff",
      }}
    >
      <div style={{ flex: "1 1 55%", paddingRight: "25px" }}>
        <h2 style={{ color: "#00d1ff", marginBottom: "20px" }}>
          Spectral Type: {type}
        </h2>

        <h3 style={{ color: "#ffaa00" }}>Overview</h3>
        <p>{info.text}</p>

        <h3 style={{ color: "#ffaa00", marginTop: "15px" }}>
          Suitability for Exoplanets
        </h3>
        <ul>
          {info.exoplanetSuitability.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3 style={{ color: "#ffaa00", marginTop: "15px" }}>
          Example Stars
        </h3>
        <p>{info.examples}</p>

        <h3 style={{ color: "#ffaa00", marginTop: "15px" }}>
          Temperature Range
        </h3>
        <p>{info.temperature}</p>
      </div>

      <div
        style={{
          flex: "1 1 40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageUrl}
          alt={`StarType-${type}`}
          style={{
            width: "100%",
            maxWidth: "350px",
            borderRadius: "12px",
            objectFit: "contain",
            border: "2px solid #333",
          }}
        />
      </div>
    </div>
  );
}

/* ===============================
   MAIN INFO HANDLER
=============================== */
export default function Info({ spectralType }) {
  if (!spectralType) return null;

  // Normalize & split merged labels like "O or B", "K or M"
  const typesToShow = spectralType
    .split("or")
    .map((t) => t.trim())
    .map((t) => t.charAt(0))
    .filter((t) => infoData[t]);

  return (
    <div style={{ marginTop: "30px" }}>
      {typesToShow.map((type) => (
        <InfoCard key={type} type={type} />
      ))}
    </div>
  );
}
