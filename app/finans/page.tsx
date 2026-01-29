export default function FinansPage() {
  const transactions = [
    { id: 1, name: "Ahmet Yılmaz", amount: 15.450, date: "15 Ara", type: "Maaş" },
    { id: 2, name: "Ayşe Demir", amount: 12.800, date: "15 Ara", type: "Maaş" },
    { id: 3, name: "Kira Geliri", amount: 25.000, date: "10 Ara", type: "Gelir" },
    { id: 4, name: "Elektrik Faturası", amount: -3.200, date: "5 Ara", type: "Gider" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">💰 Finans Yönetimi</h1>
        
        {/* Toplam Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-700/30 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Toplam Gelir</h3>
            <p className="text-3xl font-bold text-white">₺248,500</p>
            <p className="text-green-400 text-sm mt-1">+12% geçen aya göre</p>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-rose-600/20 border border-red-700/30 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Toplam Gider</h3>
            <p className="text-3xl font-bold text-white">₺187,200</p>
            <p className="text-red-400 text-sm mt-1">+8% geçen aya göre</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-700/30 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Net Kar</h3>
            <p className="text-3xl font-bold text-white">₺61,300</p>
            <p className="text-blue-400 text-sm mt-1">+18% geçen aya göre</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-violet-600/20 border border-purple-700/30 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-2">Bekleyen Ödeme</h3>
            <p className="text-3xl font-bold text-white">₺42,500</p>
            <p className="text-purple-400 text-sm mt-1">3 müşteri</p>
          </div>
        </div>

        {/* İşlem Geçmişi */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Son İşlemler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left">Personel/İşlem</th>
                  <th className="py-3 text-left">Tutar</th>
                  <th className="py-3 text-left">Tarih</th>
                  <th className="py-3 text-left">Tip</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3">{tx.name}</td>
                    <td className={`py-3 font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ₺{tx.amount.toLocaleString('tr-TR')}
                    </td>
                    <td className="py-3 text-gray-300">{tx.date}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${tx.type === 'Maaş' ? 'bg-blue-500/20 text-blue-300' : tx.type === 'Gelir' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {tx.type}
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
