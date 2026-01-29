"use client";

import { Calendar, Filter, Download, Plus, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function PuantajPage() {
  const [selectedMonth, setSelectedMonth] = useState('Ocak 2024');
  
  const employees = [
    { id: 1, name: "Halil Bey", days: [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0] },
    { id: 2, name: "Ayşe Demir", days: [1,1,1,1,1,0,0,1,1,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0] },
    { id: 3, name: "Mehmet Kaya", days: [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0] },
    { id: 4, name: "Zeynep Şahin", days: [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0] },
    { id: 5, name: "Can Öztürk", days: [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,0,1,1,0,0] },
  ];

  const months = ['Ocak 2024', 'Şubat 2024', 'Mart 2024', 'Nisan 2024', 'Mayıs 2024', 'Haziran 2024'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Calendar className="mr-3 h-8 w-8 text-blue-600" />
          Puantaj Takip Sistemi
        </h1>
        <p className="text-gray-600 mt-2">Personel devam durumlarını takip edin ve yönetin</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Month Selector */}
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-4 pr-10 py-2.5 border rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button className="flex items-center px-4 py-2.5 border rounded-xl hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Personel ara..."
                className="pl-10 pr-4 py-2.5 border rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kayıt
            </button>
            <button className="flex items-center px-4 py-2.5 border rounded-xl hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Excel İndir
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-2xl border">
          <div className="text-green-600 text-2xl mb-2">📅</div>
          <h3 className="font-bold text-lg">Toplam Gün</h3>
          <p className="text-3xl font-bold mt-2">22</p>
          <p className="text-sm text-gray-500">Çalışma günü</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <div className="text-blue-600 text-2xl mb-2">👥</div>
          <h3 className="font-bold text-lg">Devam Eden</h3>
          <p className="text-3xl font-bold mt-2">45</p>
          <p className="text-sm text-gray-500">Personel</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <div className="text-yellow-600 text-2xl mb-2">🏖️</div>
          <h3 className="font-bold text-lg">İzinli</h3>
          <p className="text-3xl font-bold mt-2">2</p>
          <p className="text-sm text-gray-500">Personel</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <div className="text-red-600 text-2xl mb-2">⚠️</div>
          <h3 className="font-bold text-lg">Devamsız</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <p className="text-sm text-gray-500">Personel</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-900">Personel</th>
                <th className="py-4 px-6 text-center font-semibold text-gray-900">Toplam</th>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <th key={day} className="py-4 px-2 text-center font-medium text-gray-700 text-sm">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">ID: {employee.id.toString().padStart(3, '0')}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {employee.days.filter(d => d === 1).length} gün
                    </span>
                  </td>
                  {employee.days.map((day, index) => (
                    <td key={index} className="py-4 px-2 text-center">
                      <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                        day === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {day === 1 ? '✓' : '✗'}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-green-100 text-green-800 rounded-full flex items-center justify-center mr-2">✓</div>
          <span>Çalıştı</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-red-100 text-red-800 rounded-full flex items-center justify-center mr-2">✗</div>
          <span>Çalışmadı</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2">İ</div>
          <span>İzinli</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center mr-2">R</div>
          <span>Raporlu</span>
        </div>
      </div>
    </div>
  );
}
