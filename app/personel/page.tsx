export default function PersonelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">👥 Personel Yönetimi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Toplam Personel</h3>
            <p className="text-3xl font-bold text-white">47</p>
            <p className="text-blue-400 text-sm mt-1">Aktif: 45</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Bu Ay İşe Alınan</h3>
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-green-400 text-sm mt-1">+%6.8</p>
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Ortalama Maaş</h3>
            <p className="text-3xl font-bold text-white">₺32,450</p>
            <p className="text-amber-400 text-sm mt-1">Aylık</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-violet-600/20 border border-purple-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">İzin Kullanımı</h3>
            <p className="text-3xl font-bold text-white">18</p>
            <p className="text-purple-400 text-sm mt-1">Gün (bu ay)</p>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Personel Listesi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left">Ad Soyad</th>
                  <th className="py-3 text-left">Departman</th>
                  <th className="py-3 text-left">Pozisyon</th>
                  <th className="py-3 text-left">İşe Giriş</th>
                  <th className="py-3 text-left">Durum</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Ahmet Yılmaz", dept: "Yazılım", position: "Senior Developer", hireDate: "2022-03-15", status: "Aktif" },
                  { name: "Ayşe Demir", dept: "İK", position: "IK Müdürü", hireDate: "2021-06-20", status: "Aktif" },
                  { name: "Mehmet Kaya", dept: "Satış", position: "Satış Direktörü", hireDate: "2020-11-10", status: "Aktif" },
                  { name: "Zeynep Şahin", dept: "Muhasebe", position: "Finans Uzmanı", hireDate: "2023-01-05", status: "İzinli" },
                  { name: "Can Demir", dept: "Pazarlama", position: "PM", hireDate: "2022-08-30", status: "Aktif" },
                ].map((person, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 font-medium">{person.name}</td>
                    <td className="py-3">{person.dept}</td>
                    <td className="py-3">{person.position}</td>
                    <td className="py-3">{person.hireDate}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        person.status === 'Aktif' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {person.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
