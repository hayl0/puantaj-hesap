"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Expense categories based on Turkish Uniform Chart of Accounts
const EXPENSE_CATEGORIES = [
  {
    value: "personel",
    label: "Personel Giderleri",
    description: "Maaşlar, primler, SGK ödemeleri",
  },
  {
    value: "kira",
    label: "Kira",
    description: "İşyeri kira ödemeleri",
  },
  {
    value: "faturalar",
    label: "Faturalar",
    description: "Elektrik, su, internet, telefon",
  },
  {
    value: "malzeme",
    label: "Malzeme",
    description: "İlk madde, yardımcı madde",
  },
  {
    value: "pazarlama",
    label: "Pazarlama ve Reklam",
    description: "Reklam, tanıtım, promosyon giderleri",
  },
  {
    value: "ulasim",
    label: "Ulaşım",
    description: "Araç, yakıt, yol masrafları",
  },
  {
    value: "vergiler",
    label: "Vergiler ve Lisanslar",
    description: "KDV, kurumlar vergisi, lisans ücretleri",
  },
  {
    value: "ofis",
    label: "Ofis Malzemeleri",
    description: "Kırtasiye, ekipman, sarf malzemeler",
  },
  {
    value: "bakim",
    label: "Bakım ve Onarım",
    description: "Ekipman, bina bakım giderleri",
  },
  {
    value: "profesyonel",
    label: "Profesyonel Hizmetler",
    description: "Danışmanlık, avukatlık, muhasebe",
  },
  {
    value: "finansman",
    label: "Finansman Giderleri",
    description: "Banka faizleri, komisyonlar",
  },
  {
    value: "diger",
    label: "Diğer Giderler",
    description: "Diğer kategorilere girmeyen giderler",
  },
];

export interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
}

interface ExpenseTableProps {
  entries?: ExpenseEntry[];
  onEntriesChange?: (entries: ExpenseEntry[]) => void;
}

// Format number as Turkish currency
function formatCurrency(value: string): string {
  const num = parseFloat(value.replace(/\./g, "").replace(",", "."));
  if (isNaN(num)) return "";
  return num.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Parse Turkish currency format to number
function parseCurrency(value: string): number {
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

// Format date input to DD.MM.YYYY
function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
}

export function ExpenseTable({
  entries: controlledEntries,
  onEntriesChange,
}: ExpenseTableProps) {
  const [internalEntries, setInternalEntries] = React.useState<ExpenseEntry[]>(
    () => {
      // Initialize with 8 empty rows as specified
      return Array.from({ length: 8 }, (_, i) => ({
        id: `expense-${i + 1}`,
        date: "",
        category: "",
        description: "",
        amount: "",
      }));
    }
  );

  const entries = controlledEntries ?? internalEntries;
  const setEntries = onEntriesChange ?? setInternalEntries;

  const updateEntry = (
    id: string,
    field: keyof ExpenseEntry,
    value: string
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setEntries(updated);
  };

  const addRow = () => {
    const newEntry: ExpenseEntry = {
      id: `expense-${Date.now()}`,
      date: "",
      category: "",
      description: "",
      amount: "",
    };
    setEntries([...entries, newEntry]);
  };

  const deleteRow = (id: string) => {
    if (entries.length <= 1) return;
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Calculate total
  const totalExpense = entries.reduce((sum, entry) => {
    return sum + parseCurrency(entry.amount);
  }, 0);

  const getCategoryLabel = (value: string) => {
    return (
      EXPENSE_CATEGORIES.find((cat) => cat.value === value)?.label || value
    );
  };

  return (
    <TooltipProvider>
      <div className="bg-white brutalist-border brutalist-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-charcoal hover:bg-charcoal border-b-3 border-charcoal">
                <TableHead className="text-white font-bold text-sm w-[130px]">
                  Tarih
                </TableHead>
                <TableHead className="text-white font-bold text-sm w-[200px]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help border-b border-dashed border-white/50">
                        Kategori
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs bg-charcoal text-white brutalist-border p-3"
                    >
                      <p className="text-xs">
                        Gider kategorisi seçiniz. Her kategori için açıklama
                        görmek için üzerine gelin.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead className="text-white font-bold text-sm min-w-[200px]">
                  Açıklama
                </TableHead>
                <TableHead className="text-white font-bold text-sm w-[150px] text-right">
                  Tutar (TL)
                </TableHead>
                <TableHead className="text-white font-bold text-sm w-[60px] text-center">
                  Sil
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  className={`border-b-2 border-charcoal/20 ${
                    index % 2 === 0 ? "bg-white" : "bg-warm-gray/20"
                  } hover:bg-soft-coral/5`}
                >
                  <TableCell className="p-2">
                    <Input
                      type="text"
                      placeholder="GG.AA.YYYY"
                      value={entry.date}
                      onChange={(e) => {
                        const formatted = formatDateInput(e.target.value);
                        updateEntry(entry.id, "date", formatted);
                      }}
                      maxLength={10}
                      className="h-9 text-sm brutalist-border bg-white focus:bg-off-white"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select
                      value={entry.category}
                      onValueChange={(value) =>
                        updateEntry(entry.id, "category", value)
                      }
                    >
                      <SelectTrigger className="h-9 text-sm brutalist-border bg-white w-full">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent className="brutalist-border bg-white max-h-[300px]">
                        {EXPENSE_CATEGORIES.map((category) => (
                          <Tooltip key={category.value}>
                            <TooltipTrigger asChild>
                              <SelectItem
                                value={category.value}
                                className="cursor-pointer hover:bg-soft-coral/10 focus:bg-soft-coral/10"
                              >
                                {category.label}
                              </SelectItem>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="bg-charcoal text-white brutalist-border p-2"
                            >
                              <p className="text-xs">{category.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="text"
                      placeholder="Gider açıklaması"
                      value={entry.description}
                      onChange={(e) =>
                        updateEntry(entry.id, "description", e.target.value)
                      }
                      maxLength={200}
                      className="h-9 text-sm brutalist-border bg-white focus:bg-off-white"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="text"
                      placeholder="0,00"
                      value={entry.amount}
                      onChange={(e) => {
                        // Allow only numbers, dots, and commas
                        const value = e.target.value.replace(
                          /[^0-9.,]/g,
                          ""
                        );
                        updateEntry(entry.id, "amount", value);
                      }}
                      onBlur={(e) => {
                        const formatted = formatCurrency(e.target.value);
                        if (formatted) {
                          updateEntry(entry.id, "amount", formatted);
                        }
                      }}
                      className="h-9 text-sm brutalist-border bg-white focus:bg-off-white text-right font-mono"
                    />
                  </TableCell>
                  <TableCell className="p-2 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => deleteRow(entry.id)}
                          disabled={entries.length <= 1}
                          className="hover:bg-loss-red/10 hover:text-loss-red disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Satırı sil</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="bg-charcoal text-white"
                      >
                        Bu satırı sil
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-warm-gray/50 border-t-3 border-charcoal">
              <TableRow className="hover:bg-warm-gray/70">
                <TableCell
                  colSpan={3}
                  className="text-right font-bold text-charcoal text-base"
                >
                  Toplam Gider:
                </TableCell>
                <TableCell className="text-right font-bold text-loss-red text-base font-mono">
                  {totalExpense.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  TL
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Add Row Button */}
        <div className="p-4 border-t-3 border-charcoal bg-off-white">
          <Button
            onClick={addRow}
            variant="outline"
            className="w-full sm:w-auto brutalist-border bg-white hover:bg-soft-coral hover:text-white hover:border-soft-coral transition-colors font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Gider Ekle
          </Button>
        </div>

        {/* Category Legend */}
        <div className="p-4 border-t-2 border-charcoal/20 bg-soft-coral/5">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">
            Kategori Açıklamaları:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {EXPENSE_CATEGORIES.slice(0, 8).map((cat) => (
              <Tooltip key={cat.value}>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground cursor-help flex items-center gap-1">
                    <span className="w-2 h-2 bg-soft-coral flex-shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-charcoal text-white brutalist-border p-2"
                >
                  <p className="text-xs">{cat.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
