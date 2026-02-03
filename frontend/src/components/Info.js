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

  const videoUrl = `/spectral_types/StarType-${type}.webm`;

  const cardStyles = {
    container: {
      display: "grid",
      gridTemplateColumns: "0.8fr 1.4fr",
      gap: "40px",
      marginBottom: "40px",
      background: "linear-gradient(135deg, rgba(20, 20, 28, 0.95) 0%, rgba(25, 25, 35, 0.95) 100%)",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      color: "#fff",
      transition: "all 0.3s ease"
    },
    textSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      letterSpacing: "0.5px",
      marginBottom: "8px",
      color: "#f5f5f5",
      textTransform: "uppercase",
    },
    divider: {
      height: "2px",
      width: "60px",
      background: "rgba(255, 255, 255, 0.2)",
      marginBottom: "28px",
      borderRadius: "1px",
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: "#a8a8a8",
      marginTop: "24px",
      marginBottom: "12px",
    },
    paragraph: {
      fontSize: "15px",
      lineHeight: "1.7",
      color: "#d4d4d4",
      marginBottom: "16px",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 24px 0",
    },
    li: {
      fontSize: "14px",
      lineHeight: "1.65",
      color: "#c8c8c8",
      marginBottom: "10px",
      paddingLeft: "20px",
      position: "relative",
    },
    liMarker: {
      position: "absolute",
      left: "0",
      color: "#707070",
      fontWeight: "500",
    },
    temperatureBox: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "14px 16px",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "500",
      color: "#e0e0e0",
      marginBottom: "24px",
    },
    examplesBox: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "14px 16px",
      borderRadius: "8px",
      fontSize: "15px",
      color: "#e0e0e0",
      marginBottom: "24px",
    }
  };

  return (
    <div style={cardStyles.container}>
      {/* Left: Text Content */}
      <div style={cardStyles.textSection}>
        <h2 style={cardStyles.title}>Star Type {type}</h2>
        <div style={cardStyles.divider} />

        <h3 style={cardStyles.sectionTitle}>Overview</h3>
        <p style={cardStyles.paragraph}>{info.text}</p>

        <h3 style={cardStyles.sectionTitle}>Suitability for Exoplanets</h3>
        <ul style={cardStyles.ul}>
          {info.exoplanetSuitability.map((item, i) => (
            <li key={i} style={cardStyles.li}>
              <span style={cardStyles.liMarker}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 style={cardStyles.sectionTitle}>Example Stars</h3>
        <div style={cardStyles.examplesBox}>{info.examples}</div>

        <h3 style={cardStyles.sectionTitle}>Temperature Range</h3>
        <div style={cardStyles.temperatureBox}>{info.temperature}</div>
      </div>

      {/* Right: Video Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            aspectRatio: "1 / 1",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            overflow: "hidden",
          }}
        >
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
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
