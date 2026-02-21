import React from "react";

const AboutUs = () => {
  return (
    <div
      style={{
        padding: "120px 24px 60px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#1C1C1C",
          padding: "40px",
          borderRadius: "16px",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 26px rgba(74, 123, 167, 0.2)",
          color: "#e0e6ed",
          border: "1px solid rgba(100, 150, 200, 0.2)",
          maxWidth: "980px",
          width: "100%",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px 0",
            color: "#a8c5dd",
            fontSize: "28px",
            fontWeight: "600",
            letterSpacing: "0.3px",
          }}
        >
          About This System
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* =========================
              WHAT THIS APP DOES
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              What This Application Does
            </h3>
            <p style={{ margin: "0 0 10px 0", color: "#c5d3e0", lineHeight: 1.6 }}>
              You enter SDSS UGRIZ magnitudes. The system computes color indices and sends them to
              trained machine learning models.
            </p>
            <p style={{ margin: "0", color: "#c5d3e0", lineHeight: 1.6 }}>
              The models predict Spectral Type, Effective Temperature (Teff), Metallicity Class,
              and Suitability to Host Habitable Exoplanets.
            </p>
          </section>

          {/* =========================
              HOW IT WORKS
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              How It Works
            </h3>
            <ol style={{ margin: "0", paddingLeft: "18px", color: "#c5d3e0", lineHeight: 1.7 }}>
              <li>Convert magnitudes into color indices.</li>
              <li>(Optional) Apply Galactic Reddening / Extinction correction.</li>
              <li>Feed the corrected colors into trained ML models.</li>
              <li>Return predictions with uncertainty and agreement scores.</li>
            </ol>
          </section>

          {/* =========================
              COLOR INDEX EQUATIONS
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              Color Indices Used (Simple Equations)
            </h3>
            <p style={{ margin: "0 0 10px 0", color: "#c5d3e0", lineHeight: 1.6 }}>
              Instead of using raw magnitudes directly, we use color differences (indices), which
              help represent the star’s temperature and behavior.
            </p>

            <div
              style={{
                background: "rgba(15, 31, 53, 0.7)",
                border: "1px solid rgba(100, 150, 200, 0.2)",
                borderRadius: "10px",
                padding: "14px 16px",
                color: "#c5d3e0",
                lineHeight: 1.8,
                fontSize: "14px",
              }}
            >
              <div>u − g = U − G</div>
              <div>g − r = G − R</div>
              <div>r − i = R − I</div>
              <div>i − z = I − Z</div>
            </div>
          </section>

          {/* =========================
              EXTINCTION / REDDENING
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              Galactic Reddening / Extinction Correction (Optional)
            </h3>

            <p style={{ margin: "0 0 10px 0", color: "#c5d3e0", lineHeight: 1.6 }}>
              Dust in our galaxy can make stars appear redder and dimmer than they really are.
              If you enable extinction correction, the system tries to estimate the “true” magnitudes
              before prediction.
            </p>

            <p style={{ margin: "0 0 12px 0", color: "#c5d3e0", lineHeight: 1.6 }}>
              We use the standard extinction law:
              <span style={{ color: "#b8d1e8", fontWeight: "600" }}> Aλ = Rλ × E(B−V) </span>
              and corrected magnitudes:
              <span style={{ color: "#b8d1e8", fontWeight: "600" }}> m(corrected) = m(observed) − Aλ</span>.
            </p>

            <div
              style={{
                background: "rgba(15, 31, 53, 0.7)",
                border: "1px solid rgba(100, 150, 200, 0.2)",
                borderRadius: "10px",
                padding: "14px 16px",
                color: "#c5d3e0",
                lineHeight: 1.8,
                fontSize: "14px",
              }}
            >
              <div style={{ color: "#a8c5dd", fontWeight: "600", marginBottom: "6px" }}>
                What is E(B−V)?
              </div>
              <div>
                E(B−V) is a common measurement of how much dust reddening exists along the star’s line of sight.
                If you don’t know the exact value, you can use presets (Low / Medium / High) for demonstration.
              </div>
              <div style={{ marginTop: "10px", color: "#a8c5dd", fontWeight: "600" }}>
                Where to get E(B−V) (recommended):
              </div>
              <div>
                Use the IRSA Dust Tools (NASA) with the star’s sky coordinates (RA/Dec) to obtain a realistic E(B−V).
              </div>
            </div>
          </section>

          {/* =========================
              SCIENTIFIC FOUNDATION
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              Scientific Foundation
            </h3>
            <p style={{ margin: "0", color: "#c5d3e0", lineHeight: 1.6 }}>
              The system is based on the SDSS photometric system. The extinction correction uses the
              standard Rv = 3.1 dust model and the widely used extinction law Aλ = Rλ E(B−V).
            </p>
          </section>

          {/* =========================
              WHY IT MATTERS
          ========================= */}
          <section
            style={{
              background: "rgba(20, 35, 60, 0.55)",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(100, 150, 200, 0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#4a7ba7",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
              }}
            >
              Why It Matters
            </h3>
            <p style={{ margin: "0", color: "#c5d3e0", lineHeight: 1.6 }}>
              This is a photometry-only prediction tool, so no spectroscopy is required. That makes it useful
              for large sky surveys where fast, scalable classification is needed. The extinction option provides
              a more astro-realistic enhancement when dust information is available.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
