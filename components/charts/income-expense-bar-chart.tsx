"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface IncomeExpenseBarChartProps {
  totalIncome?: number;
  totalExpense?: number;
}

export function IncomeExpenseBarChart({
  totalIncome = 45750.0,
  totalExpense = 32480.5,
}: IncomeExpenseBarChartProps) {
  const data = [
    {
      name: "Gelir",
      value: totalIncome,
      fill: "#4169E1", // royal-blue
    },
    {
      name: "Gider",
      value: totalExpense,
      fill: "#FF6B6B", // soft-coral
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " TL";
  };

  const netAmount = totalIncome - totalExpense;
  const isProfit = netAmount >= 0;

  return (
    <div className="bg-white brutalist-border brutalist-shadow p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-charcoal">Gelir vs Gider</h3>
        <div
          className={`px-4 py-2 text-sm font-bold ${
            isProfit
              ? "bg-profit-green/10 text-profit-green"
              : "bg-loss-red/10 text-loss-red"
          }`}
          style={{ border: `3px solid ${isProfit ? "#2E7D32" : "#C62828"}` }}
        >
          {isProfit ? "Net Kar" : "Net Zarar"}: {formatCurrency(Math.abs(netAmount))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 80, left: 60, bottom: 20 }}
            barCategoryGap="30%"
          >
            <XAxis
              type="number"
              tickFormatter={(value) =>
                new Intl.NumberFormat("tr-TR", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
              axisLine={{ stroke: "#2C2C2C", strokeWidth: 2 }}
              tickLine={{ stroke: "#2C2C2C", strokeWidth: 1 }}
              tick={{ fill: "#2C2C2C", fontSize: 12, fontWeight: 600 }}
              domain={[0, "auto"]}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={{ stroke: "#2C2C2C", strokeWidth: 2 }}
              tickLine={false}
              tick={{ fill: "#2C2C2C", fontSize: 14, fontWeight: 700 }}
              width={50}
            />
            <Bar
              dataKey="value"
              radius={0}
              maxBarSize={60}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  style={{ outline: "none" }}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value: number) => formatCurrency(value)}
                fill="#2C2C2C"
                fontSize={12}
                fontWeight={600}
                style={{ outline: "none" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-6 pt-4 border-t-[3px] border-charcoal/30">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5"
            style={{ backgroundColor: "#4169E1", border: "3px solid #FFFFFF", outline: "2px solid #2C2C2C" }}
          />
          <span className="text-sm font-bold text-charcoal">Toplam Gelir</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5"
            style={{ backgroundColor: "#FF6B6B", border: "3px solid #FFFFFF", outline: "2px solid #2C2C2C" }}
          />
          <span className="text-sm font-bold text-charcoal">Toplam Gider</span>
        </div>
      </div>
    </div>
  );
}
