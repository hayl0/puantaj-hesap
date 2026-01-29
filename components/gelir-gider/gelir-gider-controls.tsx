"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarDays,
  FolderCog,
  BarChart3,
  FileDown,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
} from "lucide-react";

// Turkish month names
const MONTHS = [
  { value: "01", label: "Ocak" },
  { value: "02", label: "Şubat" },
  { value: "03", label: "Mart" },
  { value: "04", label: "Nisan" },
  { value: "05", label: "Mayıs" },
  { value: "06", label: "Haziran" },
  { value: "07", label: "Temmuz" },
  { value: "08", label: "Ağustos" },
  { value: "09", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];

// Generate years from 2020 to current year + 1
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 2019 + 1 }, (_, i) => ({
  value: String(2020 + i),
  label: String(2020 + i),
}));

// Default categories
const DEFAULT_INCOME_CATEGORIES = [
  "Satış Gelirleri",
  "Hizmet Gelirleri",
  "Faiz Gelirleri",
  "Kira Gelirleri",
  "Diğer Gelirler",
];

const DEFAULT_EXPENSE_CATEGORIES = [
  "Personel Giderleri",
  "Kira",
  "Faturalar",
  "Malzeme",
  "Pazarlama ve Reklam",
  "Ulaşım",
  "Vergiler ve Lisanslar",
  "Ofis Malzemeleri",
  "Bakım ve Onarım",
  "Profesyonel Hizmetler",
  "Finansman Giderleri",
  "Diğer Giderler",
];

interface GelirGiderControlsProps {
  onMonthChange?: (month: string) => void;
  onYearChange?: (year: string) => void;
  onVisualizationToggle?: (visible: boolean) => void;
  onExportPDF?: () => void;
  onCategoriesChange?: (
    incomeCategories: string[],
    expenseCategories: string[]
  ) => void;
  showVisualizations?: boolean;
}

export function GelirGiderControls({
  onMonthChange,
  onYearChange,
  onVisualizationToggle,
  onExportPDF,
  onCategoriesChange,
  showVisualizations = true,
}: GelirGiderControlsProps) {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [visualizationsVisible, setVisualizationsVisible] =
    useState(showVisualizations);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // Category management state
  const [incomeCategories, setIncomeCategories] = useState<string[]>(
    DEFAULT_INCOME_CATEGORIES
  );
  const [expenseCategories, setExpenseCategories] = useState<string[]>(
    DEFAULT_EXPENSE_CATEGORIES
  );
  const [newIncomeCategory, setNewIncomeCategory] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    onMonthChange?.(value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    onYearChange?.(value);
  };

  const toggleVisualizations = () => {
    const newState = !visualizationsVisible;
    setVisualizationsVisible(newState);
    onVisualizationToggle?.(newState);
  };

  const handleExportPDF = () => {
    onExportPDF?.();
    // Show feedback to user
    alert(
      `PDF raporu hazırlanıyor: ${
        MONTHS.find((m) => m.value === selectedMonth)?.label
      } ${selectedYear}`
    );
  };

  const addIncomeCategory = () => {
    if (newIncomeCategory.trim() && !incomeCategories.includes(newIncomeCategory.trim())) {
      const updated = [...incomeCategories, newIncomeCategory.trim()];
      setIncomeCategories(updated);
      setNewIncomeCategory("");
      onCategoriesChange?.(updated, expenseCategories);
    }
  };

  const addExpenseCategory = () => {
    if (newExpenseCategory.trim() && !expenseCategories.includes(newExpenseCategory.trim())) {
      const updated = [...expenseCategories, newExpenseCategory.trim()];
      setExpenseCategories(updated);
      setNewExpenseCategory("");
      onCategoriesChange?.(incomeCategories, updated);
    }
  };

  const removeIncomeCategory = (category: string) => {
    const updated = incomeCategories.filter((c) => c !== category);
    setIncomeCategories(updated);
    onCategoriesChange?.(updated, expenseCategories);
  };

  const removeExpenseCategory = (category: string) => {
    const updated = expenseCategories.filter((c) => c !== category);
    setExpenseCategories(updated);
    onCategoriesChange?.(incomeCategories, updated);
  };

  const selectedMonthLabel = MONTHS.find((m) => m.value === selectedMonth)?.label;

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        {/* Month/Year Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-charcoal">
            <CalendarDays className="w-5 h-5 text-royal-blue" />
            <span className="font-semibold text-sm">Dönem Seçimi:</span>
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[130px] brutalist-border bg-white font-medium focus:ring-royal-blue">
                <SelectValue placeholder="Ay seçin" />
              </SelectTrigger>
              <SelectContent className="brutalist-border bg-white">
                {MONTHS.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className="font-medium hover:bg-royal-blue/10 focus:bg-royal-blue/10 cursor-pointer"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[100px] brutalist-border bg-white font-medium focus:ring-royal-blue">
                <SelectValue placeholder="Yıl" />
              </SelectTrigger>
              <SelectContent className="brutalist-border bg-white">
                {YEARS.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={year.value}
                    className="font-medium hover:bg-royal-blue/10 focus:bg-royal-blue/10 cursor-pointer"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected period badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-royal-blue/10 brutalist-border text-charcoal text-sm font-semibold">
            <span>{selectedMonthLabel}</span>
            <span>{selectedYear}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Management */}
          <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="brutalist-border bg-white hover:bg-royal-blue hover:text-white hover:border-royal-blue transition-colors font-semibold gap-2"
                  >
                    <FolderCog className="w-4 h-4" />
                    <span className="hidden sm:inline">Kategori Yönetimi</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent className="brutalist-border bg-charcoal text-white">
                <p>Gelir ve gider kategorilerini düzenleyin</p>
              </TooltipContent>
            </Tooltip>

            <DialogContent className="brutalist-border brutalist-shadow bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-charcoal flex items-center gap-2">
                  <FolderCog className="w-5 h-5 text-royal-blue" />
                  Kategori Yönetimi
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Gelir ve gider tablolarında kullanılacak kategorileri buradan
                  yönetebilirsiniz.
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 py-4">
                {/* Income Categories */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-charcoal">
                    <TrendingUp className="w-4 h-4 text-profit-green" />
                    <h3 className="font-bold text-charcoal">
                      Gelir Kategorileri
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {incomeCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 bg-profit-green/10 brutalist-border text-sm"
                      >
                        <span className="font-medium text-charcoal">
                          {category}
                        </span>
                        <button
                          onClick={() => removeIncomeCategory(category)}
                          className="p-1 hover:bg-loss-red/20 rounded transition-colors"
                          aria-label={`${category} kategorisini sil`}
                        >
                          <Trash2 className="w-4 h-4 text-loss-red" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Yeni kategori..."
                      value={newIncomeCategory}
                      onChange={(e) => setNewIncomeCategory(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addIncomeCategory()}
                      className="brutalist-border"
                    />
                    <Button
                      onClick={addIncomeCategory}
                      size="icon"
                      className="brutalist-border bg-profit-green hover:bg-profit-green/80 text-white flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expense Categories */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-charcoal">
                    <TrendingDown className="w-4 h-4 text-loss-red" />
                    <h3 className="font-bold text-charcoal">
                      Gider Kategorileri
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {expenseCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 bg-loss-red/10 brutalist-border text-sm"
                      >
                        <span className="font-medium text-charcoal">
                          {category}
                        </span>
                        <button
                          onClick={() => removeExpenseCategory(category)}
                          className="p-1 hover:bg-loss-red/20 rounded transition-colors"
                          aria-label={`${category} kategorisini sil`}
                        >
                          <Trash2 className="w-4 h-4 text-loss-red" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Yeni kategori..."
                      value={newExpenseCategory}
                      onChange={(e) => setNewExpenseCategory(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addExpenseCategory()}
                      className="brutalist-border"
                    />
                    <Button
                      onClick={addExpenseCategory}
                      size="icon"
                      className="brutalist-border bg-loss-red hover:bg-loss-red/80 text-white flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={() => setCategoryModalOpen(false)}
                  className="brutalist-border bg-royal-blue hover:bg-royal-blue/90 text-white font-semibold"
                >
                  Tamam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Toggle Visualizations */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={toggleVisualizations}
                className={`brutalist-border font-semibold gap-2 transition-colors ${
                  visualizationsVisible
                    ? "bg-royal-blue text-white hover:bg-royal-blue/90"
                    : "bg-white hover:bg-royal-blue hover:text-white"
                }`}
              >
                {visualizationsVisible ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {visualizationsVisible ? "Grafikleri Gizle" : "Grafikleri Göster"}
                </span>
                <BarChart3 className="w-4 h-4 sm:hidden" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="brutalist-border bg-charcoal text-white">
              <p>
                {visualizationsVisible
                  ? "Grafik bölümünü gizle"
                  : "Grafik bölümünü göster"}
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Export PDF */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleExportPDF}
                className="brutalist-border brutalist-shadow-sm bg-soft-coral hover:bg-soft-coral/90 text-white font-semibold gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">PDF İndir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="brutalist-border bg-charcoal text-white">
              <p>
                {selectedMonthLabel} {selectedYear} raporunu PDF olarak indirin
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
