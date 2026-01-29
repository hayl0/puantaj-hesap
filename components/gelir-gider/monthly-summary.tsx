"use client";

import { TrendingUp, TrendingDown, Minus, Wallet, Receipt, PiggyBank } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonthlySummaryProps {
  totalIncome: number;
  totalExpenses: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + " TL";
}

export function MonthlySummary({ totalIncome, totalExpenses }: MonthlySummaryProps) {
  const netProfitLoss = totalIncome - totalExpenses;
  const isProfit = netProfitLoss > 0;
  const isLoss = netProfitLoss < 0;
  const isNeutral = netProfitLoss === 0;

  const profitMargin = totalIncome > 0 ? (netProfitLoss / totalIncome) * 100 : 0;

  return (
    <TooltipProvider>
      <div className="bg-white brutalist-border-thick brutalist-shadow p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
          <span className="w-2 h-8 bg-royal-blue" />
          Aylık Özet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Income Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-off-white brutalist-border p-5 transition-transform hover:translate-x-1 hover:-translate-y-1 cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-royal-blue flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-charcoal uppercase tracking-wide">
                    Toplam Gelir
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-royal-blue">
                  {formatCurrency(totalIncome)}
                </p>
                <div className="mt-2 h-1 bg-royal-blue/20">
                  <div 
                    className="h-full bg-royal-blue transition-all duration-500"
                    style={{ width: totalIncome > 0 ? "100%" : "0%" }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-charcoal text-white brutalist-border-thick border-charcoal">
              <p>Satış, hizmet, faiz ve diğer tüm gelir kaynaklarının toplamı</p>
            </TooltipContent>
          </Tooltip>

          {/* Total Expenses Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-off-white brutalist-border p-5 transition-transform hover:translate-x-1 hover:-translate-y-1 cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-soft-coral flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-charcoal uppercase tracking-wide">
                    Toplam Gider
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-soft-coral">
                  {formatCurrency(totalExpenses)}
                </p>
                <div className="mt-2 h-1 bg-soft-coral/20">
                  <div 
                    className="h-full bg-soft-coral transition-all duration-500"
                    style={{ 
                      width: totalIncome > 0 
                        ? `${Math.min((totalExpenses / totalIncome) * 100, 100)}%` 
                        : totalExpenses > 0 ? "100%" : "0%" 
                    }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-charcoal text-white brutalist-border-thick border-charcoal">
              <p>Personel, kira, faturalar ve diğer tüm gider kalemlerinin toplamı</p>
            </TooltipContent>
          </Tooltip>

          {/* Net Profit/Loss Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={`brutalist-border p-5 transition-transform hover:translate-x-1 hover:-translate-y-1 cursor-default ${
                  isProfit 
                    ? "bg-profit-green/10 border-profit-green" 
                    : isLoss 
                      ? "bg-loss-red/10 border-loss-red" 
                      : "bg-warm-gray/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center ${
                      isProfit 
                        ? "bg-profit-green" 
                        : isLoss 
                          ? "bg-loss-red" 
                          : "bg-charcoal"
                    }`}
                  >
                    <PiggyBank className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-charcoal uppercase tracking-wide">
                    Net {isProfit ? "Kar" : isLoss ? "Zarar" : "Kar/Zarar"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p 
                    className={`text-2xl md:text-3xl font-bold ${
                      isProfit 
                        ? "text-profit-green" 
                        : isLoss 
                          ? "text-loss-red" 
                          : "text-charcoal"
                    }`}
                  >
                    {isLoss ? "-" : ""}{formatCurrency(Math.abs(netProfitLoss))}
                  </p>
                  {isProfit && <TrendingUp className="w-6 h-6 text-profit-green" />}
                  {isLoss && <TrendingDown className="w-6 h-6 text-loss-red" />}
                  {isNeutral && <Minus className="w-6 h-6 text-charcoal" />}
                </div>
                {totalIncome > 0 && (
                  <p className={`text-sm mt-2 font-medium ${
                    isProfit 
                      ? "text-profit-green" 
                      : isLoss 
                        ? "text-loss-red" 
                        : "text-muted-foreground"
                  }`}>
                    {isProfit ? "+" : ""}{profitMargin.toFixed(1)}% kar marjı
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-charcoal text-white brutalist-border-thick border-charcoal">
              <p>Toplam Gelir - Toplam Gider = Net Kar/Zarar</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Summary Formula Bar */}
        <div className="mt-6 p-4 bg-charcoal text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-base font-mono">
          <span className="text-royal-blue-light font-bold">{formatCurrency(totalIncome)}</span>
          <span className="text-warm-gray">-</span>
          <span className="text-soft-coral font-bold">{formatCurrency(totalExpenses)}</span>
          <span className="text-warm-gray">=</span>
          <span className={`font-bold ${
            isProfit 
              ? "text-green-400" 
              : isLoss 
                ? "text-red-400" 
                : "text-white"
          }`}>
            {isLoss ? "-" : ""}{formatCurrency(Math.abs(netProfitLoss))}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
