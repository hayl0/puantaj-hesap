"use client";

import { useState } from "react";
import { HeroSection } from "@/components/layout/hero-section";
import { GelirGiderControls } from "@/components/gelir-gider/gelir-gider-controls";
import { MonthlySummary } from "@/components/gelir-gider/monthly-summary";
import { IncomeTable } from "@/components/income-table";
import { ExpenseTable } from "@/components/expense-table";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { IncomeExpenseBarChart } from "@/components/charts/income-expense-bar-chart";

export default function GelirGiderPage() {
  // Sample data for demonstration - these would come from the income/expense tables
  const [totalIncome] = useState(45750.00);
  const [totalExpenses] = useState(32480.50);
  const [showVisualizations, setShowVisualizations] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title="Gelir Gider ve Harcama Tablosu"
        subtitle="Aylık gelir ve giderleri kategorize edin, net kar/zarar durumunu anında görün"
        size="small"
      />

      {/* Controls Section */}
      <section className="py-6 px-6 lg:px-8 bg-warm-gray/50 border-b-4 border-charcoal">
        <div className="max-w-7xl mx-auto">
          <GelirGiderControls 
            showVisualizations={showVisualizations}
            onVisualizationToggle={setShowVisualizations}
          />
        </div>
      </section>

      {/* Monthly Summary Section */}
      <section className="py-8 md:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MonthlySummary 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
          />
        </div>
      </section>

      {/* Income Section */}
      <section className="py-8 md:py-12 px-6 lg:px-8 bg-warm-gray/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
            Gelirler
          </h2>
          <IncomeTable />
        </div>
      </section>

      {/* Expenses Section */}
      <section className="py-8 md:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
            Giderler
          </h2>
          <ExpenseTable />
        </div>
      </section>

      {/* Visualizations Section */}
      {showVisualizations && (
        <section className="py-8 md:py-12 px-6 lg:px-8 bg-warm-gray/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Görselleştirme
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ExpensePieChart />
              <IncomeExpenseBarChart totalIncome={totalIncome} totalExpense={totalExpenses} />
            </div>
          </div>
        </section>
      )}

      {/* Instructions Section */}
      <section className="py-8 md:py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white brutalist-border brutalist-shadow p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-6">
              Kullanım Kılavuzu
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-charcoal mb-4">Gelir Kategorileri</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-royal-blue mt-1.5 flex-shrink-0" />
                    <span><strong>Satış Gelirleri:</strong> Ürün satışlarından elde edilen gelirler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-royal-blue mt-1.5 flex-shrink-0" />
                    <span><strong>Hizmet Gelirleri:</strong> Sunulan hizmetlerden elde edilen gelirler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-royal-blue mt-1.5 flex-shrink-0" />
                    <span><strong>Faiz Gelirleri:</strong> Banka hesaplarından elde edilen faiz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-royal-blue mt-1.5 flex-shrink-0" />
                    <span><strong>Kira Gelirleri:</strong> Kiralanan varlıklardan elde edilen gelir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-royal-blue mt-1.5 flex-shrink-0" />
                    <span><strong>Diğer Gelirler:</strong> Yukarıdaki kategorilere girmeyen gelirler</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-4">Gider Kategorileri</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-soft-coral mt-1.5 flex-shrink-0" />
                    <span><strong>Personel Giderleri:</strong> Maaşlar, primler, SGK ödemeleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-soft-coral mt-1.5 flex-shrink-0" />
                    <span><strong>Kira:</strong> İşyeri kira ödemeleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-soft-coral mt-1.5 flex-shrink-0" />
                    <span><strong>Faturalar:</strong> Elektrik, su, internet, telefon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-soft-coral mt-1.5 flex-shrink-0" />
                    <span><strong>Vergiler:</strong> KDV, kurumlar vergisi, diğer vergiler</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-royal-blue/5 brutalist-border">
              <p className="text-charcoal text-sm">
                <strong>Format Bilgisi:</strong> Tarihler GG.AA.YYYY formatında (örn: 01.01.2025), 
                tutarlar TL cinsinden binlik ayraçlı olarak girilmelidir (örn: 1.250,50 TL).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
