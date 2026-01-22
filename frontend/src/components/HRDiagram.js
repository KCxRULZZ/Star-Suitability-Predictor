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
    <div style={{ width: "100%", height: 400, marginTop: "30px" }}>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="gr"
            name="g-r"
            label={{ value: "g - r", position: "insideBottom", offset: -5 }}
            domain={[-0.5, 2]}
          />
          <YAxis
            type="number"
            dataKey="M_g"
            name={useAbsolute ? "M_g" : "Apparent g"}
            label={{ value: useAbsolute ? "M_g" : "Apparent g", angle: -90, position: "insideLeft" }}
            domain={[15, -5]} // invert y-axis
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [value.toFixed(2), name]}
          />
          <Legend />
          <Scatter name="Predicted Star" data={data} fill="#00d1ff" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
