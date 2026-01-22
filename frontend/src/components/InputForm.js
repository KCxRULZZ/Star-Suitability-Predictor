import React, { useState } from "react";
import API from "../services/api";

export default function InputForm({ setPrediction }) {
  const [inputs, setInputs] = useState({ U: "", G: "", R: "", I: "", Z: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    setLoading(true);
    setError("");

    try {
      const response = await API.post("/predict/", {
        U: parseFloat(inputs.U),
        G: parseFloat(inputs.G),
        R: parseFloat(inputs.R),
        I: parseFloat(inputs.I),
        Z: parseFloat(inputs.Z),
      });
      setPrediction({ ...response.data, g_r: parseFloat(colors.g_r), G: colors.G });
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
        background: "#111",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#00d1ff" }}>
        Enter UGRIZ Values
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {["U", "G", "R", "I", "Z"].map((v) => (
          <div key={v} style={{ display: "flex", gap: "10px" }}>
            <label style={{ width: "30px", fontWeight: "bold" }}>{v}:</label>
            <input
              type="number"
              step="any"
              name={v}
              value={inputs[v]}
              onChange={handleChange}
              placeholder={`Enter ${v} (${MIN_MAG}-${MAX_MAG})`}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#222",
                color: "#fff",
              }}
            />
          </div>
        ))}
      </div>

      {colors && (
        <div
          style={{
            marginTop: "20px",
            background: "#000",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
          }}
        >
          <h4 style={{ color: "#00d1ff" }}>Computed Color Indices</h4>
          <p>u − g: {colors.u_g}</p>
          <p>g − r: {colors.g_r}</p>
          <p>r − i: {colors.r_i}</p>
          <p>i − z: {colors.i_z}</p>
        </div>
      )}

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: loading ? "#555" : "#00d1ff",
          color: "#000",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
    </div>
  );
}
