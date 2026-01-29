"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  UserPlus,
  Printer,
  Download,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

// Types
type AttendanceCode = "Ç" | "İ" | "R" | "T" | "";

interface Employee {
  id: string;
  sicilNo: string;
  adSoyad: string;
  departman: string;
  attendance: AttendanceCode[];
}

const DEPARTMENTS = [
  "İdari",
  "Üretim",
  "Satış",
  "Muhasebe",
  "İnsan Kaynakları",
  "Bilgi İşlem",
];

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const YEARS = [2024, 2025, 2026];

// Initial sample data
const initialEmployees: Employee[] = [
  {
    id: "1",
    sicilNo: "1001",
    adSoyad: "Ahmet Yılmaz",
    departman: "Üretim",
    attendance: Array(31).fill(""),
  },
  {
    id: "2",
    sicilNo: "1002",
    adSoyad: "Ayşe Kaya",
    departman: "Muhasebe",
    attendance: Array(31).fill(""),
  },
  {
    id: "3",
    sicilNo: "1003",
    adSoyad: "Mehmet Demir",
    departman: "Satış",
    attendance: Array(31).fill(""),
  },
  {
    id: "4",
    sicilNo: "1004",
    adSoyad: "Fatma Çelik",
    departman: "İdari",
    attendance: Array(31).fill(""),
  },
  {
    id: "5",
    sicilNo: "1005",
    adSoyad: "Ali Öztürk",
    departman: "Bilgi İşlem",
    attendance: Array(31).fill(""),
  },
];

// Helper function to get days in month
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Attendance code cell background
function getCodeBackground(code: AttendanceCode): string {
  switch (code) {
    case "Ç":
      return "bg-worked-green";
    case "İ":
      return "bg-leave-yellow";
    case "R":
      return "bg-sick-orange";
    case "T":
      return "bg-holiday-gray";
    default:
      return "bg-white";
  }
}

// Attendance code tooltip
function getCodeTooltip(code: AttendanceCode): string {
  switch (code) {
    case "Ç":
      return "Çalıştı - Worked";
    case "İ":
      return "İzinli - On Leave";
    case "R":
      return "Raporlu - Sick Leave";
    case "T":
      return "Tatil - Holiday";
    default:
      return "Boş - Empty";
  }
}

export function InteractiveAttendanceTable() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    sicilNo: "",
    adSoyad: "",
    departman: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const daysInMonth = useMemo(
    () => getDaysInMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );

  // Calculate totals for an employee
  const calculateTotals = (attendance: AttendanceCode[]) => {
    const totals = { worked: 0, leave: 0, sick: 0, holiday: 0 };
    attendance.slice(0, daysInMonth).forEach((code) => {
      if (code === "Ç") totals.worked++;
      else if (code === "İ") totals.leave++;
      else if (code === "R") totals.sick++;
      else if (code === "T") totals.holiday++;
    });
    return totals;
  };

  // Calculate company-wide totals
  const companyTotals = useMemo(() => {
    return employees.reduce(
      (acc, emp) => {
        const empTotals = calculateTotals(emp.attendance);
        acc.worked += empTotals.worked;
        acc.leave += empTotals.leave;
        acc.sick += empTotals.sick;
        acc.holiday += empTotals.holiday;
        return acc;
      },
      { worked: 0, leave: 0, sick: 0, holiday: 0 }
    );
  }, [employees, daysInMonth]);

  // Update attendance for an employee
  const updateAttendance = (
    employeeId: string,
    dayIndex: number,
    code: AttendanceCode
  ) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          const newAttendance = [...emp.attendance];
          newAttendance[dayIndex] = code;
          return { ...emp, attendance: newAttendance };
        }
        return emp;
      })
    );
  };

  // Add new employee
  const handleAddEmployee = () => {
    if (newEmployee.sicilNo && newEmployee.adSoyad && newEmployee.departman) {
      const employee: Employee = {
        id: Date.now().toString(),
        ...newEmployee,
        attendance: Array(31).fill(""),
      };
      setEmployees((prev) => [...prev, employee]);
      setNewEmployee({ sicilNo: "", adSoyad: "", departman: "" });
      setIsAddDialogOpen(false);
    }
  };

  // Delete employee
  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // Edit employee
  const handleEditEmployee = () => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp))
      );
      setEditingEmployee(null);
      setIsEditDialogOpen(false);
    }
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Export handler (CSV)
  const handleExport = () => {
    const headers = [
      "Sicil No",
      "Ad Soyad",
      "Departman",
      ...Array.from({ length: daysInMonth }, (_, i) => `Gün ${i + 1}`),
      "Çalışma",
      "İzin",
      "Rapor",
      "Tatil",
    ];

    const rows = employees.map((emp) => {
      const totals = calculateTotals(emp.attendance);
      return [
        emp.sicilNo,
        emp.adSoyad,
        emp.departman,
        ...emp.attendance.slice(0, daysInMonth),
        totals.worked,
        totals.leave,
        totals.sick,
        totals.holiday,
      ];
    });

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `puantaj_${MONTHS[selectedMonth]}_${selectedYear}.csv`;
    link.click();
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Controls Section */}
        <div className="bg-white brutalist-border brutalist-shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Month/Year Selector */}
            <div className="flex flex-wrap gap-3 items-center">
              <label className="font-bold text-charcoal">Dönem:</label>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(v) => setSelectedMonth(parseInt(v))}
              >
                <SelectTrigger className="w-[140px] brutalist-border bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(v) => setSelectedYear(parseInt(v))}
              >
                <SelectTrigger className="w-[100px] brutalist-border bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Add Employee Dialog */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="brutalist-border bg-royal-blue hover:bg-royal-blue-light text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Yeni Personel
                  </Button>
                </DialogTrigger>
                <DialogContent className="brutalist-border brutalist-shadow">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Yeni Personel Ekle
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="font-bold text-sm">Sicil No</label>
                      <Input
                        className="brutalist-border"
                        value={newEmployee.sicilNo}
                        onChange={(e) =>
                          setNewEmployee((prev) => ({
                            ...prev,
                            sicilNo: e.target.value,
                          }))
                        }
                        placeholder="Örn: 1006"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-sm">Ad Soyad</label>
                      <Input
                        className="brutalist-border"
                        value={newEmployee.adSoyad}
                        onChange={(e) =>
                          setNewEmployee((prev) => ({
                            ...prev,
                            adSoyad: e.target.value,
                          }))
                        }
                        placeholder="Örn: Zeynep Yıldız"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-sm">Departman</label>
                      <Select
                        value={newEmployee.departman}
                        onValueChange={(v) =>
                          setNewEmployee((prev) => ({ ...prev, departman: v }))
                        }
                      >
                        <SelectTrigger className="brutalist-border">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="brutalist-border bg-transparent">
                        İptal
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleAddEmployee}
                      className="brutalist-border bg-royal-blue hover:bg-royal-blue-light text-white"
                    >
                      Ekle
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="brutalist-border bg-transparent"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 mr-2" />
                Yazdır
              </Button>
              <Button
                variant="outline"
                className="brutalist-border bg-transparent"
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white brutalist-border brutalist-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[1200px]">
              {/* Table Header */}
              <thead>
                <tr className="bg-charcoal text-white">
                  {/* Fixed columns */}
                  <th className="sticky left-0 z-20 bg-charcoal border-r-2 border-warm-gray p-3 text-left font-bold min-w-[80px]">
                    Sicil No
                  </th>
                  <th className="sticky left-[80px] z-20 bg-charcoal border-r-2 border-warm-gray p-3 text-left font-bold min-w-[150px]">
                    Ad Soyad
                  </th>
                  <th className="sticky left-[230px] z-20 bg-charcoal border-r-4 border-royal-blue p-3 text-left font-bold min-w-[120px]">
                    Departman
                  </th>

                  {/* Day columns */}
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <th
                      key={i}
                      className="p-2 text-center font-bold min-w-[44px] border-r border-warm-gray/30"
                    >
                      {i + 1}
                    </th>
                  ))}

                  {/* Total columns */}
                  <th className="border-l-4 border-royal-blue p-2 text-center font-bold min-w-[50px] bg-worked-green/30">
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">Ç</TooltipTrigger>
                      <TooltipContent>Toplam Çalışma Günü</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="p-2 text-center font-bold min-w-[50px] bg-leave-yellow/30">
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">İ</TooltipTrigger>
                      <TooltipContent>Toplam İzin Günü</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="p-2 text-center font-bold min-w-[50px] bg-sick-orange/30">
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">R</TooltipTrigger>
                      <TooltipContent>Toplam Rapor Günü</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="p-2 text-center font-bold min-w-[50px] bg-holiday-gray/30">
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">T</TooltipTrigger>
                      <TooltipContent>Toplam Tatil</TooltipContent>
                    </Tooltip>
                  </th>

                  {/* Actions column */}
                  <th className="border-l-2 border-warm-gray p-2 text-center font-bold min-w-[80px]">
                    İşlem
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {employees.map((employee, empIndex) => {
                  const totals = calculateTotals(employee.attendance);
                  return (
                    <tr
                      key={employee.id}
                      className={`border-b-2 border-warm-gray hover:bg-warm-gray/20 ${
                        empIndex % 2 === 0 ? "bg-off-white/50" : "bg-white"
                      }`}
                    >
                      {/* Fixed columns */}
                      <td className="sticky left-0 z-10 bg-inherit border-r-2 border-warm-gray p-2 font-mono text-sm">
                        {employee.sicilNo}
                      </td>
                      <td className="sticky left-[80px] z-10 bg-inherit border-r-2 border-warm-gray p-2 font-medium">
                        {employee.adSoyad}
                      </td>
                      <td className="sticky left-[230px] z-10 bg-inherit border-r-4 border-royal-blue p-2 text-sm">
                        <span className="px-2 py-1 bg-royal-blue/10 rounded text-charcoal">
                          {employee.departman}
                        </span>
                      </td>

                      {/* Day cells */}
                      {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                        <td
                          key={dayIndex}
                          className={`p-0 border-r border-warm-gray/50 ${getCodeBackground(
                            employee.attendance[dayIndex]
                          )}`}
                        >
                          <Select
                            value={employee.attendance[dayIndex] || "empty"}
                            onValueChange={(v) =>
                              updateAttendance(
                                employee.id,
                                dayIndex,
                                v === "empty" ? "" : (v as AttendanceCode)
                              )
                            }
                          >
                            <SelectTrigger className="h-10 w-full border-0 bg-transparent text-center font-bold text-charcoal focus:ring-2 focus:ring-royal-blue rounded-none">
                              <SelectValue>
                                {employee.attendance[dayIndex] || "-"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="empty">
                                <span className="text-muted-foreground">-</span>
                              </SelectItem>
                              <SelectItem value="Ç">
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 bg-worked-green border border-charcoal" />
                                  Ç - Çalıştı
                                </span>
                              </SelectItem>
                              <SelectItem value="İ">
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 bg-leave-yellow border border-charcoal" />
                                  İ - İzinli
                                </span>
                              </SelectItem>
                              <SelectItem value="R">
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 bg-sick-orange border border-charcoal" />
                                  R - Raporlu
                                </span>
                              </SelectItem>
                              <SelectItem value="T">
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 bg-holiday-gray border border-charcoal" />
                                  T - Tatil
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      ))}

                      {/* Total cells */}
                      <td className="border-l-4 border-royal-blue p-2 text-center font-bold bg-worked-green/20">
                        {totals.worked}
                      </td>
                      <td className="p-2 text-center font-bold bg-leave-yellow/20">
                        {totals.leave}
                      </td>
                      <td className="p-2 text-center font-bold bg-sick-orange/20">
                        {totals.sick}
                      </td>
                      <td className="p-2 text-center font-bold bg-holiday-gray/20">
                        {totals.holiday}
                      </td>

                      {/* Actions */}
                      <td className="border-l-2 border-warm-gray p-2">
                        <div className="flex justify-center gap-1">
                          {/* Edit Dialog */}
                          <Dialog
                            open={isEditDialogOpen && editingEmployee?.id === employee.id}
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (open) setEditingEmployee({ ...employee });
                              else setEditingEmployee(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-royal-blue/20"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="brutalist-border brutalist-shadow">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-bold">
                                  Personel Düzenle
                                </DialogTitle>
                              </DialogHeader>
                              {editingEmployee && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <label className="font-bold text-sm">
                                      Sicil No
                                    </label>
                                    <Input
                                      className="brutalist-border"
                                      value={editingEmployee.sicilNo}
                                      onChange={(e) =>
                                        setEditingEmployee((prev) =>
                                          prev
                                            ? { ...prev, sicilNo: e.target.value }
                                            : null
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="font-bold text-sm">
                                      Ad Soyad
                                    </label>
                                    <Input
                                      className="brutalist-border"
                                      value={editingEmployee.adSoyad}
                                      onChange={(e) =>
                                        setEditingEmployee((prev) =>
                                          prev
                                            ? { ...prev, adSoyad: e.target.value }
                                            : null
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="font-bold text-sm">
                                      Departman
                                    </label>
                                    <Select
                                      value={editingEmployee.departman}
                                      onValueChange={(v) =>
                                        setEditingEmployee((prev) =>
                                          prev ? { ...prev, departman: v } : null
                                        )
                                      }
                                    >
                                      <SelectTrigger className="brutalist-border">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {DEPARTMENTS.map((dept) => (
                                          <SelectItem key={dept} value={dept}>
                                            {dept}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className="brutalist-border bg-transparent"
                                  >
                                    İptal
                                  </Button>
                                </DialogClose>
                                <Button
                                  onClick={handleEditEmployee}
                                  className="brutalist-border bg-royal-blue hover:bg-royal-blue-light text-white"
                                >
                                  Kaydet
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete Confirmation */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-soft-coral/20 text-loss-red"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="brutalist-border brutalist-shadow">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold">
                                  Personeli Sil
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <strong>{employee.adSoyad}</strong> isimli
                                  personeli silmek istediğinizden emin misiniz? Bu
                                  işlem geri alınamaz.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="brutalist-border">
                                  İptal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteEmployee(employee.id)}
                                  className="brutalist-border bg-loss-red hover:bg-loss-red/80 text-white"
                                >
                                  Sil
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Summary Row */}
                <tr className="bg-charcoal text-white font-bold">
                  <td
                    colSpan={3}
                    className="sticky left-0 z-10 bg-charcoal p-3 text-right border-r-4 border-royal-blue"
                  >
                    TOPLAM ({employees.length} Personel)
                  </td>
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <td key={i} className="p-2 border-r border-warm-gray/30" />
                  ))}
                  <td className="border-l-4 border-royal-blue p-2 text-center bg-worked-green/40 text-charcoal">
                    {companyTotals.worked}
                  </td>
                  <td className="p-2 text-center bg-leave-yellow/40 text-charcoal">
                    {companyTotals.leave}
                  </td>
                  <td className="p-2 text-center bg-sick-orange/40 text-charcoal">
                    {companyTotals.sick}
                  </td>
                  <td className="p-2 text-center bg-holiday-gray/40 text-charcoal">
                    {companyTotals.holiday}
                  </td>
                  <td className="border-l-2 border-warm-gray p-2" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Summary Cards */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <div className="bg-worked-green/30 brutalist-border p-4 text-center">
            <div className="text-2xl font-bold text-charcoal">
              {companyTotals.worked}
            </div>
            <div className="text-sm text-muted-foreground">Çalışma Günü</div>
          </div>
          <div className="bg-leave-yellow/30 brutalist-border p-4 text-center">
            <div className="text-2xl font-bold text-charcoal">
              {companyTotals.leave}
            </div>
            <div className="text-sm text-muted-foreground">İzin Günü</div>
          </div>
          <div className="bg-sick-orange/30 brutalist-border p-4 text-center">
            <div className="text-2xl font-bold text-charcoal">
              {companyTotals.sick}
            </div>
            <div className="text-sm text-muted-foreground">Rapor Günü</div>
          </div>
          <div className="bg-holiday-gray/30 brutalist-border p-4 text-center">
            <div className="text-2xl font-bold text-charcoal">
              {companyTotals.holiday}
            </div>
            <div className="text-sm text-muted-foreground">Tatil</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
