"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample expense data by category for demonstration
const expenseData = [
  { name: "Personel Giderleri", value: 45000, fill: "#4169E1" },
  { name: "Kira", value: 12000, fill: "#FF6B6B" },
  { name: "Faturalar", value: 3500, fill: "#FFD93D" },
  { name: "Malzeme", value: 8200, fill: "#5179F1" },
  { name: "Pazarlama", value: 5500, fill: "#2E7D32" },
  { name: "Ulaşım", value: 2800, fill: "#E57373" },
  { name: "Vergiler", value: 7500, fill: "#7986CB" },
  { name: "Diğer", value: 3200, fill: "#90A4AE" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + " TL";
};

const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      fill: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
    
    return (
      <div className="bg-white brutalist-border brutalist-shadow-sm p-3">
        <p className="font-bold text-charcoal text-sm">{data.name}</p>
        <p className="text-charcoal text-sm mt-1">
          <span className="font-semibold">{formatCurrency(data.value)}</span>
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Toplam giderin %{percentage}'i
        </p>
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
    payload: {
      value: number;
    };
  }>;
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;
  
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 px-2">
      {payload.map((entry, index) => {
        const percentage = ((entry.payload.value / totalExpenses) * 100).toFixed(1);
        return (
          <div key={`legend-${index}`} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-charcoal truncate" title={entry.value}>
              {entry.value}
            </span>
            <span className="text-muted-foreground ml-auto">%{percentage}</span>
          </div>
        );
      })}
    </div>
  );
};

export function ExpensePieChart() {
  return (
    <Card className="bg-white brutalist-border brutalist-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-charcoal">
          Gider Dağılımı
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Kategorilere göre aylık gider dağılımı
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="45%"
                innerRadius={0}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="#FFFFFF"
                strokeWidth={2}
              >
                {expenseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={<CustomLegend />}
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Total summary */}
        <div className="mt-4 pt-4 border-t-2 border-charcoal">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-charcoal">Toplam Gider</span>
            <span className="text-lg font-bold text-soft-coral">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
