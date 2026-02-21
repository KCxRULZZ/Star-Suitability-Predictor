import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import PredictionDisplay from "./components/PredictionDisplay";
import Info from "./components/Info";
import HRDiagram from "./components/HRDiagram";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [useAbsolute, setUseAbsolute] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const predictionRef = useRef(null);

  const handlePrediction = (data) => {
    setPrediction(data);
    setTimeout(() => {
      predictionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleMagnitude = () => {
    setUseAbsolute(!useAbsolute);
  };

  // Formatted description text
  const infoContent = useAbsolute ? (
    <div>
      <p>
        <strong>Pseudo-Absolute M<sub>g</sub>:</strong> Represents how bright the star would appear
        if it were at a standard distance of 100 parsecs. This allows fair comparison of stars at
        different distances.
      </p>
      <p>
        <strong>X-axis (g − r color):</strong> Indicates the star's surface temperature:
        <ul>
          <li>Blue = hot</li>
          <li>Red = cool</li>
        </ul>
      </p>
      <p>
        <strong>Y-axis (M<sub>g</sub> brightness):</strong> Brighter stars appear at the top.
      </p>
    </div>
  ) : (
    <div>
      <p>
        <strong>Apparent g:</strong> Represents how bright the star appears from Earth. Stars farther
        away appear dimmer than closer stars of the same intrinsic brightness.
      </p>
      <p>
        <strong>X-axis (g − r color):</strong> Shows temperature:
        <ul>
          <li>Blue = hot</li>
          <li>Red = cool</li>
        </ul>
      </p>
      <p>
        <strong>Y-axis (Apparent g brightness):</strong> Shows how bright the star looks in the sky.
      </p>
    </div>
  );

  const HomePage = () => (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <div style={{ width: "45%", marginTop: "80px" }}>
          <img
            src="/spectral_types/mainpic.png"
            alt="space"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
        <div style={{ width: "45%" }}>
          <InputForm setPrediction={handlePrediction} />
        </div>
      </div>

      {prediction && (
        <div ref={predictionRef} style={{ padding: "20px" }}>
          <PredictionDisplay prediction={prediction} />
          <Info spectralType={prediction.Spectral_Type} />

          {/* HR Diagram Controls */}
          <div
            style={{
              marginTop: "30px",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left: Magnitude toggle */}
            <button
              onClick={toggleMagnitude}
              style={{
                background: "#00d1ff",
                color: "#000",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {useAbsolute ? "Show Apparent g" : "Show Pseudo-Absolute M_g"}
            </button>

            {/* Right: Info button */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              <button
                style={{
                  background: "#222",
                  color: "#00d1ff",
                  border: "1px solid #00d1ff",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                i
              </button>

              {showInfo && (
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: "0px",
                    background: "#111",
                    color: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #333",
                    width: "340px",
                    zIndex: 300,
                    boxShadow: "0 0 15px rgba(0,255,255,0.3)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {infoContent}
                </div>
              )}
            </div>
          </div>

          <HRDiagram star={prediction} useAbsolute={useAbsolute} />
        </div>
      )}
    </>
  );

  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial", color: "white", background: "#000", minHeight: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
