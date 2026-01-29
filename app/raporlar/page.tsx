export default function RaporlarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <h1 className="text-3xl font-bold text-white mb-6">📊 Raporlar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-2">Aylık Mesai Raporu</h3>
          <p className="text-gray-400">Personel mesai özetleri</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-2">Maaş Bordroları</h3>
          <p className="text-gray-400">Ödeme detayları ve kesintiler</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-2">Devam Takibi</h3>
          <p className="text-gray-400">Devamsızlık ve izin raporları</p>
        </div>
      </div>
    </div>
  );
}
