import React from "react";
import { BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PriceTrendChart({ data }) {
  // Check if we have valid data with prices > 0
  const hasValidData = data && data.some((d) => d.price > 0);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
        <BarChart3 size={18} className="text-blue-600" /> Price Comparison
      </h3>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              domain={hasValidData ? ["dataMin - 50", "dataMax + 50"] : [0, 1000]}
              width={60}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                padding: "12px 16px",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Price"]}
              labelFormatter={(label) => label}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563eb",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 7,
                fill: "#2563eb",
                strokeWidth: 3,
                stroke: "#fff",
              }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {!hasValidData && (
        <p className="text-center text-sm text-slate-400 mt-2">
          Search for flights to see price comparison
        </p>
      )}
    </div>
  );
}
