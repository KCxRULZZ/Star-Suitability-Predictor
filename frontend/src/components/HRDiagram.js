import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function HRDiagram({ star, useAbsolute }) {
  if (!star) return null;

  const distance = 100; // pc
  const g_mag = star.G || 15; // fallback
  const gr = star.g_r;

  // Compute magnitude
  const M_g = useAbsolute ? g_mag - 5 * Math.log10(distance / 10) : g_mag;

  const data = [{ gr, M_g }];

  return (
    <div style={{ 
      width: "100%",
      marginTop: "120px",
      padding: "0 5px 40px 5px",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1400px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        borderRadius: "20px",
        padding: "60px",
        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(51, 65, 85, 0.6)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative gradient blur */}
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0, 209, 255, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3 style={{
            color: "#f1f5f9",
            fontSize: "24px",
            fontWeight: "700",
            marginTop: "0",
            marginBottom: "60px",
            letterSpacing: "0.5px",
            background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            ✦ HR Diagram Analysis
          </h3>
          
          <ResponsiveContainer width="100%" height={580}>
            <ScatterChart margin={{ top: 20, right: 40, bottom: 100, left: 120 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(100, 116, 139, 0.2)"
                verticalPoints={[0]}
              />
              <XAxis
                type="number"
                dataKey="gr"
                name="g-r"
                label={{ 
                  value: "g - r (Color Index)", 
                  position: "insideBottom", 
                  offset: -35,
                  fill: "#cbd5e1",
                  fontSize: 14,
                  fontWeight: 500
                }}
                domain={[-0.5, 2]}
                stroke="#475569"
                style={{ fontSize: "12px", fill: "#94a3b8" }}
              />
              <YAxis
                type="number"
                dataKey="M_g"
                name={useAbsolute ? "M_g" : "Apparent g"}
                label={{ 
                  value: useAbsolute ? "Absolute Magnitude (M_g)" : "Apparent Magnitude (g)", 
                  angle: -90, 
                  position: "insideLeft",
                  offset: -10,
                  fill: "#cbd5e1",
                  fontSize: 14,
                  fontWeight: 500
                }}
                domain={[15, -5]}
                stroke="#475569"
                style={{ fontSize: "12px", fill: "#94a3b8" }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "5 5", stroke: "#00d1ff", opacity: 0.6 }}
                formatter={(value, name) => [value.toFixed(4), name]}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "2px solid rgba(0, 209, 255, 0.4)",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
                  padding: "12px 16px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={40}
                wrapperStyle={{ 
                  paddingTop: "50px",
                  fontSize: "14px"
                }}
                iconType="circle"
              />
              <Scatter 
                name="Predicted Star" 
                data={data} 
                fill="#00d1ff"
                fillOpacity={0.9}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
