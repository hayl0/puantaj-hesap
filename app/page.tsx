import StatsCards from "@/components/dashboard/stats-cards";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">İş Takip Panosu</h1>
        <p className="text-gray-600 mt-2">Personel, puantaj ve finans takibi</p>
      </div>

      {/* İstatistik Kartları */}
      <StatsCards />

      {/* Hızlı Erişim Butonları */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition">
          <div className="text-lg font-semibold">Puantaj Girişi</div>
          <div className="text-sm opacity-90">Yeni kayıt ekle</div>
        </button>
        
        <button className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition">
          <div className="text-lg font-semibold">Rapor Al</div>
          <div className="text-sm opacity-90">Aylık raporlar</div>
        </button>
        
        <button className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition">
          <div className="text-lg font-semibold">Personel Ekle</div>
          <div className="text-sm opacity-90">Yeni çalışan</div>
        </button>
        
        <button className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700 transition">
          <div className="text-lg font-semibold">Finans</div>
          <div className="text-sm opacity-90">Gelir-gider</div>
        </button>
      </div>

      {/* Son İşlemler Tablosu */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Son İşlemler</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Personel</th>
                <th className="text-left p-3">Tarih</th>
                <th className="text-left p-3">İşlem</th>
                <th className="text-left p-3">Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Ahmet Yılmaz</td>
                <td className="p-3">29.01.2024</td>
                <td className="p-3">Mesai Girişi</td>
                <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Tamamlandı</span></td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Ayşe Demir</td>
                <td className="p-3">29.01.2024</td>
                <td className="p-3">İzin Talebi</td>
                <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Beklemede</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
