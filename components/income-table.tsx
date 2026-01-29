"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, Info } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { tr } from "date-fns/locale";

// Income categories as specified
const INCOME_CATEGORIES = [
  { value: "satis", label: "Satış Gelirleri", description: "Ürün satışlarından elde edilen gelirler" },
  { value: "hizmet", label: "Hizmet Gelirleri", description: "Sunulan hizmetlerden elde edilen gelirler" },
  { value: "faiz", label: "Faiz Gelirleri", description: "Banka hesaplarından elde edilen faiz" },
  { value: "kira", label: "Kira Gelirleri", description: "Kiralanan varlıklardan elde edilen gelir" },
  { value: "diger", label: "Diğer Gelirler", description: "Yukarıdaki kategorilere girmeyen gelirler" },
];

interface IncomeEntry {
  id: string;
  date: Date | null;
  description: string;
  category: string;
  amount: string;
}

// Format number to Turkish currency format (1.234,56)
function formatCurrency(value: string): string {
  // Remove all non-numeric characters except comma
  const cleanValue = value.replace(/[^\d,]/g, "");
  
  // Split by comma for decimal handling
  const parts = cleanValue.split(",");
  let integerPart = parts[0] || "";
  const decimalPart = parts[1]?.slice(0, 2) || "";
  
  // Remove leading zeros
  integerPart = integerPart.replace(/^0+/, "") || "0";
  
  // Add thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  if (parts.length > 1) {
    return `${integerPart},${decimalPart}`;
  }
  return integerPart;
}

// Parse currency string to number
function parseCurrency(value: string): number {
  if (!value) return 0;
  // Remove thousand separators and replace comma with dot
  const cleanValue = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue) || 0;
}

// Format date to GG.AA.YYYY
function formatDateTR(date: Date | null): string {
  if (!date) return "";
  return format(date, "dd.MM.yyyy");
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Create empty entry
function createEmptyEntry(): IncomeEntry {
  return {
    id: generateId(),
    date: null,
    description: "",
    category: "",
    amount: "",
  };
}

// Initial data with 5 empty rows
function getInitialEntries(): IncomeEntry[] {
  return Array.from({ length: 5 }, () => createEmptyEntry());
}

export function IncomeTable() {
  const [entries, setEntries] = useState<IncomeEntry[]>(getInitialEntries);

  // Update entry field
  const updateEntry = useCallback(
    (id: string, field: keyof IncomeEntry, value: string | Date | null) => {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        )
      );
    },
    []
  );

  // Handle amount change with formatting
  const handleAmountChange = useCallback(
    (id: string, rawValue: string) => {
      const formatted = formatCurrency(rawValue);
      updateEntry(id, "amount", formatted);
    },
    [updateEntry]
  );

  // Add new row
  const addRow = useCallback(() => {
    setEntries((prev) => [...prev, createEmptyEntry()]);
  }, []);

  // Delete row
  const deleteRow = useCallback((id: string) => {
    setEntries((prev) => {
      const filtered = prev.filter((entry) => entry.id !== id);
      // Keep at least one row
      return filtered.length > 0 ? filtered : [createEmptyEntry()];
    });
  }, []);

  // Calculate total
  const total = entries.reduce(
    (sum, entry) => sum + parseCurrency(entry.amount),
    0
  );

  // Format total for display
  const formattedTotal = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <TooltipProvider>
      <div className="bg-white brutalist-border brutalist-shadow overflow-hidden">
        {/* Table Header Info */}
        <div className="bg-charcoal text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Gelir Kayıtları</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">
                  Gelir kayıtlarınızı buraya girin. Tarih GG.AA.YYYY formatında,
                  tutarlar TL cinsinden binlik ayraçlı olarak girilmelidir.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-sm">
            <span className="opacity-75">Toplam: </span>
            <span className="font-bold text-muted-yellow">{formattedTotal} TL</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-warm-gray/50 border-b-2 border-charcoal">
                <TableHead className="w-[140px] font-bold text-charcoal">
                  Tarih
                </TableHead>
                <TableHead className="min-w-[200px] font-bold text-charcoal">
                  Açıklama
                </TableHead>
                <TableHead className="w-[180px] font-bold text-charcoal">
                  <div className="flex items-center gap-1">
                    Kategori
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-0.5 hover:bg-charcoal/10 rounded transition-colors">
                          <Info className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm">
                        <div className="space-y-1">
                          {INCOME_CATEGORIES.map((cat) => (
                            <p key={cat.value} className="text-xs">
                              <strong>{cat.label}:</strong> {cat.description}
                            </p>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="w-[150px] font-bold text-charcoal text-right">
                  Tutar (TL)
                </TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  className={`border-b border-warm-gray ${
                    index % 2 === 0 ? "bg-white" : "bg-off-white/50"
                  } hover:bg-royal-blue/5 transition-colors`}
                >
                  {/* Date Cell */}
                  <TableCell className="p-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-9 brutalist-border-thin bg-white hover:bg-warm-gray/30"
                          style={{ border: "2px solid #2C2C2C" }}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-charcoal/60" />
                          {entry.date ? (
                            <span className="text-charcoal">
                              {formatDateTR(entry.date)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              GG.AA.YYYY
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 brutalist-border" align="start">
                        <Calendar
                          mode="single"
                          selected={entry.date || undefined}
                          onSelect={(date) => updateEntry(entry.id, "date", date || null)}
                          locale={tr}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </TableCell>

                  {/* Description Cell */}
                  <TableCell className="p-2">
                    <Input
                      value={entry.description}
                      onChange={(e) =>
                        updateEntry(entry.id, "description", e.target.value)
                      }
                      placeholder="Açıklama giriniz..."
                      maxLength={200}
                      className="h-9 bg-white brutalist-border-thin focus:ring-royal-blue"
                      style={{ border: "2px solid #2C2C2C" }}
                    />
                  </TableCell>

                  {/* Category Cell */}
                  <TableCell className="p-2">
                    <Select
                      value={entry.category}
                      onValueChange={(value) =>
                        updateEntry(entry.id, "category", value)
                      }
                    >
                      <SelectTrigger 
                        className="h-9 bg-white brutalist-border-thin"
                        style={{ border: "2px solid #2C2C2C" }}
                      >
                        <SelectValue placeholder="Seçiniz..." />
                      </SelectTrigger>
                      <SelectContent className="brutalist-border">
                        {INCOME_CATEGORIES.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                            className="cursor-pointer"
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>{category.label}</span>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p className="text-xs">{category.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Amount Cell */}
                  <TableCell className="p-2">
                    <div className="relative">
                      <Input
                        value={entry.amount}
                        onChange={(e) =>
                          handleAmountChange(entry.id, e.target.value)
                        }
                        placeholder="0,00"
                        className="h-9 bg-white brutalist-border-thin text-right pr-10 font-mono"
                        style={{ border: "2px solid #2C2C2C" }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        TL
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions Cell */}
                  <TableCell className="p-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRow(entry.id)}
                          className="h-8 w-8 text-charcoal/60 hover:text-loss-red hover:bg-loss-red/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Kaydı Sil</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with Add Button and Total */}
        <div className="border-t-2 border-charcoal bg-warm-gray/30 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            onClick={addRow}
            className="bg-royal-blue text-white hover:bg-royal-blue/90 brutalist-shadow-sm font-bold gap-2"
            style={{ border: "2px solid #2C2C2C" }}
          >
            <Plus className="h-4 w-4" />
            Yeni Gelir Ekle
          </Button>

          <div className="flex items-center gap-4 bg-white px-4 py-2 brutalist-border">
            <span className="text-charcoal font-bold">Toplam Gelir:</span>
            <span className="text-xl font-bold text-profit-green font-mono">
              {formattedTotal} TL
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
