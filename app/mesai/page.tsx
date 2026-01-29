export default function MesaiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">⏰ Mesai Yönetimi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Toplam Mesai</h3>
            <p className="text-3xl font-bold text-white">112 saat</p>
            <p className="text-amber-400 text-sm mt-1">Bu ay</p>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-rose-600/20 border border-red-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Mesai Maliyeti</h3>
            <p className="text-3xl font-bold text-white">₺8,400</p>
            <p className="text-red-400 text-sm mt-1">Ek ödeme</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-emerald-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Onay Bekleyen</h3>
            <p className="text-3xl font-bold text-white">5 istek</p>
            <p className="text-emerald-400 text-sm mt-1">İnceleme için</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Mesai Talepleri</h2>
            <div className="space-y-4">
              {[
                { name: "Ahmet Yılmaz", hours: 4, date: "2024-01-15", status: "Onaylandı" },
                { name: "Mehmet Kaya", hours: 6, date: "2024-01-14", status: "Bekliyor" },
                { name: "Can Demir", hours: 3, date: "2024-01-13", status: "Reddedildi" },
                { name: "Selin Yıldız", hours: 5, date: "2024-01-12", status: "Onaylandı" },
              ].map((req, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{req.name}</p>
                    <p className="text-gray-400 text-sm">{req.date} • {req.hours} saat</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    req.status === 'Onaylandı' ? 'bg-green-500/20 text-green-400' :
                    req.status === 'Bekliyor' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Hızlı Mesai Ekle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Personel</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>Ahmet Yılmaz</option>
                  <option>Ayşe Demir</option>
                  <option>Mehmet Kaya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Saat</label>
                <input type="number" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" defaultValue="2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tarih</label>
                <input type="date" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition">
                Mesai Kaydı Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
