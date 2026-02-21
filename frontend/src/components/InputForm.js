import React, { useState } from "react";
import API from "../services/api";

export default function InputForm({ setPrediction }) {
  const [inputs, setInputs] = useState({ U: "", G: "", R: "", I: "", Z: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyExtinction, setApplyExtinction] = useState(false);
  const [extinctionMode, setExtinctionMode] = useState("preset");
  const [dustLevel, setDustLevel] = useState("low");
  const [customEBV, setCustomEBV] = useState("");

  const MIN_MAG = 12;
  const MAX_MAG = 24;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const computeColors = () => {
    const U = parseFloat(inputs.U);
    const G = parseFloat(inputs.G);
    const R = parseFloat(inputs.R);
    const I = parseFloat(inputs.I);
    const Z = parseFloat(inputs.Z);

    if ([U, G, R, I, Z].some(isNaN)) return null;

    return {
      u_g: (U - G).toFixed(3),
      g_r: (G - R).toFixed(3),
      r_i: (R - I).toFixed(3),
      i_z: (I - Z).toFixed(3),
      G: G,
    };
  };

  const colors = computeColors();

  const handlePredict = async () => {
    const values = ["U", "G", "R", "I", "Z"].map((v) => parseFloat(inputs[v]));

    // Check if any field is empty
    if (values.some((v) => isNaN(v))) {
      setError("All UGRIZ values must be entered.");
      return;
    }

    // Check if values are in the valid 12-24 range
    if (values.some((v) => v < MIN_MAG || v > MAX_MAG)) {
      setError(`All values must be between ${MIN_MAG} and ${MAX_MAG}.`);
      return;
    }

    // Determine EBV value if extinction is enabled
    let ebvValue = 0;
    if (applyExtinction) {
      if (extinctionMode === "preset") {
        const presetMap = { low: 0.03, medium: 0.10, high: 0.30 };
        ebvValue = presetMap[dustLevel];
      } else {
        const customVal = parseFloat(customEBV);
        if (isNaN(customVal)) {
          setError("Custom E(B−V) must be a valid number.");
          return;
        }
        ebvValue = customVal;
      }
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post("/predict/", {
        U: parseFloat(inputs.U),
        G: parseFloat(inputs.G),
        R: parseFloat(inputs.R),
        I: parseFloat(inputs.I),
        Z: parseFloat(inputs.Z),
        apply_extinction: applyExtinction,
        ebv: ebvValue,
      });
      setPrediction({
        ...response.data,
        input_U: parseFloat(inputs.U),
        input_G: parseFloat(inputs.G),
        input_R: parseFloat(inputs.R),
        input_I: parseFloat(inputs.I),
        input_Z: parseFloat(inputs.Z),
        extinction_applied: applyExtinction,
        ebv_used: ebvValue,
        u_g: parseFloat(colors.u_g),
        g_r: parseFloat(colors.g_r),
        r_i: parseFloat(colors.r_i),
        i_z: parseFloat(colors.i_z),
        G: colors.G,
      });
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#1C1C1C",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
        color: "#e0e6ed",
        marginTop: "80px",
        border: "1px solid rgba(100, 150, 200, 0.2)",
      }}
    >
      <h2 style={{ 
        marginBottom: "28px", 
        color: "#a8c5dd",
        fontSize: "26px",
        fontWeight: "600",
        letterSpacing: "0.3px",
      }}>
        Enter UGRIZ Values
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {["U", "G", "R", "I", "Z"].map((v) => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <label style={{ 
              width: "35px", 
              fontWeight: "600",
              fontSize: "15px",
              color: "#8fa3c0",
            }}>{v}:</label>
            <input
              type="number"
              step="any"
              name={v}
              value={inputs[v]}
              onChange={handleChange}
              placeholder={`${v} (${MIN_MAG}-${MAX_MAG})`}
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(100, 150, 200, 0.25)",
                background: "rgba(15, 31, 53, 0.7)",
                color: "#c5d3e0",
                fontSize: "15px",
                transition: "all 0.25s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(120, 170, 220, 0.5)";
                e.target.style.background = "rgba(15, 31, 53, 0.9)";
                e.target.style.boxShadow = "0 0 12px rgba(120, 170, 220, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(100, 150, 200, 0.25)";
                e.target.style.background = "rgba(15, 31, 53, 0.7)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        ))}
      </div>

      {colors && (
        <div
          style={{
            marginTop: "28px",
            background: "rgba(20, 35, 60, 0.6)",
            padding: "16px 18px",
            borderRadius: "10px",
            border: "1px solid rgba(100, 150, 200, 0.2)",
          }}
        >
          <h4 style={{ 
            color: "#a8c5dd",
            marginBottom: "12px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.2px",
            textTransform: "uppercase",
          }}>Computed Color Indices</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <p style={{ margin: "0", fontSize: "13px", color: "#9ab3cc" }}>u − g: <span style={{ color: "#b8d1e8", fontWeight: "600" }}>{colors.u_g}</span></p>
            <p style={{ margin: "0", fontSize: "13px", color: "#9ab3cc" }}>g − r: <span style={{ color: "#b8d1e8", fontWeight: "600" }}>{colors.g_r}</span></p>
            <p style={{ margin: "0", fontSize: "13px", color: "#9ab3cc" }}>r − i: <span style={{ color: "#b8d1e8", fontWeight: "600" }}>{colors.r_i}</span></p>
            <p style={{ margin: "0", fontSize: "13px", color: "#9ab3cc" }}>i − z: <span style={{ color: "#b8d1e8", fontWeight: "600" }}>{colors.i_z}</span></p>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "28px",
          background: "rgba(20, 35, 60, 0.6)",
          padding: "16px 18px",
          borderRadius: "10px",
          border: "1px solid rgba(100, 150, 200, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <input
            type="checkbox"
            id="applyExtinction"
            checked={applyExtinction}
            onChange={(e) => setApplyExtinction(e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              accentColor: "#4a7ba7",
            }}
          />
          <label 
            htmlFor="applyExtinction"
            style={{
              color: "#a8c5dd",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.2px",
              cursor: "pointer",
            }}
          >
            Apply Galactic Reddening / Extinction Correction
          </label>
        </div>

        {applyExtinction && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "20px", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  id="presetMode"
                  name="extinctionMode"
                  value="preset"
                  checked={extinctionMode === "preset"}
                  onChange={(e) => setExtinctionMode(e.target.value)}
                  style={{
                    cursor: "pointer",
                    accentColor: "#4a7ba7",
                  }}
                />
                <label 
                  htmlFor="presetMode"
                  style={{
                    color: "#9ab3cc",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Preset
                </label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  id="customMode"
                  name="extinctionMode"
                  value="custom"
                  checked={extinctionMode === "custom"}
                  onChange={(e) => setExtinctionMode(e.target.value)}
                  style={{
                    cursor: "pointer",
                    accentColor: "#4a7ba7",
                  }}
                />
                <label 
                  htmlFor="customMode"
                  style={{
                    color: "#9ab3cc",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Custom E(B−V)
                </label>
              </div>
            </div>

            {extinctionMode === "preset" ? (
              <select
                value={dustLevel}
                onChange={(e) => setDustLevel(e.target.value)}
                style={{
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(100, 150, 200, 0.25)",
                  background: "rgba(15, 31, 53, 0.7)",
                  color: "#c5d3e0",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(120, 170, 220, 0.5)";
                  e.target.style.background = "rgba(15, 31, 53, 0.9)";
                  e.target.style.boxShadow = "0 0 12px rgba(120, 170, 220, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(100, 150, 200, 0.25)";
                  e.target.style.background = "rgba(15, 31, 53, 0.7)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="low">Low (E(B−V)=0.03)</option>
                <option value="medium">Medium (E(B−V)=0.10)</option>
                <option value="high">High (E(B−V)=0.30)</option>
              </select>
            ) : (
              <input
                type="number"
                step="0.01"
                value={customEBV}
                onChange={(e) => setCustomEBV(e.target.value)}
                placeholder="E(B−V) value"
                style={{
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(100, 150, 200, 0.25)",
                  background: "rgba(15, 31, 53, 0.7)",
                  color: "#c5d3e0",
                  fontSize: "13px",
                  transition: "all 0.25s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(120, 170, 220, 0.5)";
                  e.target.style.background = "rgba(15, 31, 53, 0.9)";
                  e.target.style.boxShadow = "0 0 12px rgba(120, 170, 220, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(100, 150, 200, 0.25)";
                  e.target.style.background = "rgba(15, 31, 53, 0.7)";
                  e.target.style.boxShadow = "none";
                }}
              />
            )}
          </div>
        )}
      </div>

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          marginTop: "28px",
          padding: "12px 28px",
          background: loading 
            ? "linear-gradient(135deg, #1a2a45 0%, #152040 100%)" 
            : "linear-gradient(135deg, #4a7ba7 0%, #357a9f 100%)",
          color: loading ? "#6a8aaa" : "#ffffff",
          fontWeight: "600",
          fontSize: "15px",
          border: "1px solid " + (loading ? "rgba(100, 150, 200, 0.15)" : "rgba(120, 170, 220, 0.3)"),
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.25s ease",
          width: "100%",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 6px 20px rgba(74, 123, 167, 0.25)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {error && (
        <p style={{ 
          color: "#d4a5a0", 
          marginTop: "20px",
          padding: "12px 14px",
          background: "rgba(150, 100, 95, 0.12)",
          borderRadius: "8px",
          border: "1px solid rgba(150, 100, 95, 0.25)",
          fontSize: "13px",
          margin: "20px 0 0 0",
        }}>{error}</p>
      )}
    </div>
  );
}
