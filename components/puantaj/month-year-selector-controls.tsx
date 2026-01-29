"use client";

import { useState } from "react";
import { CalendarDays, UserPlus, Printer, Download, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MONTHS = [
  { value: "1", label: "Ocak" },
  { value: "2", label: "Şubat" },
  { value: "3", label: "Mart" },
  { value: "4", label: "Nisan" },
  { value: "5", label: "Mayıs" },
  { value: "6", label: "Haziran" },
  { value: "7", label: "Temmuz" },
  { value: "8", label: "Ağustos" },
  { value: "9", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];

const DEPARTMENTS = [
  "İdari",
  "Üretim",
  "Satış",
  "Muhasebe",
  "İnsan Kaynakları",
  "Bilgi Teknolojileri",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => ({
  value: String(currentYear - 2 + i),
  label: String(currentYear - 2 + i),
}));

interface MonthYearSelectorControlsProps {
  selectedMonth?: string;
  selectedYear?: string;
  onMonthChange?: (month: string) => void;
  onYearChange?: (year: string) => void;
  onAddEmployee?: (employee: {
    sicilNo: string;
    adSoyad: string;
    departman: string;
  }) => void;
  onPrint?: () => void;
  onExport?: () => void;
}

export function MonthYearSelectorControls({
  selectedMonth = String(new Date().getMonth() + 1),
  selectedYear = String(currentYear),
  onMonthChange,
  onYearChange,
  onAddEmployee,
  onPrint,
  onExport,
}: MonthYearSelectorControlsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    sicilNo: "",
    adSoyad: "",
    departman: "",
  });

  const handleAddEmployee = () => {
    if (newEmployee.sicilNo && newEmployee.adSoyad && newEmployee.departman) {
      onAddEmployee?.(newEmployee);
      setNewEmployee({ sicilNo: "", adSoyad: "", departman: "" });
      setIsModalOpen(false);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Month/Year Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-charcoal">
            <CalendarDays className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wide">
              Dönem Seçimi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={selectedMonth}
              onValueChange={(value) => onMonthChange?.(value)}
            >
              <SelectTrigger className="w-[140px] brutalist-border bg-white font-semibold focus:ring-2 focus:ring-royal-blue rounded-none">
                <SelectValue placeholder="Ay Seçin" />
              </SelectTrigger>
              <SelectContent className="brutalist-border bg-white rounded-none">
                {MONTHS.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className="font-medium cursor-pointer hover:bg-royal-blue hover:text-white focus:bg-royal-blue focus:text-white"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedYear}
              onValueChange={(value) => onYearChange?.(value)}
            >
              <SelectTrigger className="w-[100px] brutalist-border bg-white font-semibold focus:ring-2 focus:ring-royal-blue rounded-none">
                <SelectValue placeholder="Yıl" />
              </SelectTrigger>
              <SelectContent className="brutalist-border bg-white rounded-none">
                {YEARS.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={year.value}
                    className="font-medium cursor-pointer hover:bg-royal-blue hover:text-white focus:bg-royal-blue focus:text-white"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-charcoal font-bold text-sm uppercase tracking-wide brutalist-border transition-all duration-150 hover:bg-royal-blue hover:text-white hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] brutalist-shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Yeni Personel Ekle</span>
            <span className="sm:hidden">Ekle</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-charcoal font-bold text-sm uppercase tracking-wide brutalist-border transition-all duration-150 hover:bg-royal-blue hover:text-white hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] brutalist-shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-charcoal font-bold text-sm uppercase tracking-wide brutalist-border transition-all duration-150 hover:bg-royal-blue hover:text-white hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] brutalist-shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Dışa Aktar</span>
            <span className="sm:hidden">Aktar</span>
          </button>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="brutalist-border brutalist-shadow bg-white rounded-none max-w-md">
          <DialogHeader className="border-b-3 border-charcoal pb-4">
            <DialogTitle className="text-xl font-bold text-charcoal flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-royal-blue" />
              Yeni Personel Ekle
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Puantaj tablosuna yeni bir personel kaydı ekleyin.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="sicilNo"
                className="text-sm font-bold uppercase tracking-wide text-charcoal"
              >
                Sicil No
              </Label>
              <Input
                id="sicilNo"
                value={newEmployee.sicilNo}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, sicilNo: e.target.value })
                }
                placeholder="ör: P001"
                className="brutalist-border rounded-none bg-white focus:ring-2 focus:ring-royal-blue"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="adSoyad"
                className="text-sm font-bold uppercase tracking-wide text-charcoal"
              >
                Ad Soyad
              </Label>
              <Input
                id="adSoyad"
                value={newEmployee.adSoyad}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, adSoyad: e.target.value })
                }
                placeholder="ör: Ahmet Yılmaz"
                className="brutalist-border rounded-none bg-white focus:ring-2 focus:ring-royal-blue"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="departman"
                className="text-sm font-bold uppercase tracking-wide text-charcoal"
              >
                Departman
              </Label>
              <Select
                value={newEmployee.departman}
                onValueChange={(value) =>
                  setNewEmployee({ ...newEmployee, departman: value })
                }
              >
                <SelectTrigger
                  id="departman"
                  className="brutalist-border rounded-none bg-white focus:ring-2 focus:ring-royal-blue"
                >
                  <SelectValue placeholder="Departman Seçin" />
                </SelectTrigger>
                <SelectContent className="brutalist-border bg-white rounded-none">
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem
                      key={dept}
                      value={dept}
                      className="font-medium cursor-pointer hover:bg-royal-blue hover:text-white focus:bg-royal-blue focus:text-white"
                    >
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t-3 border-charcoal">
            <button
              onClick={() => setIsModalOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-warm-gray text-charcoal font-bold text-sm uppercase tracking-wide brutalist-border transition-all duration-150 hover:bg-charcoal hover:text-white"
            >
              <X className="w-4 h-4" />
              İptal
            </button>
            <button
              onClick={handleAddEmployee}
              disabled={
                !newEmployee.sicilNo ||
                !newEmployee.adSoyad ||
                !newEmployee.departman
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-royal-blue text-white font-bold text-sm uppercase tracking-wide brutalist-border transition-all duration-150 hover:bg-royal-blue-light disabled:opacity-50 disabled:cursor-not-allowed brutalist-shadow-sm hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <UserPlus className="w-4 h-4" />
              Personel Ekle
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
