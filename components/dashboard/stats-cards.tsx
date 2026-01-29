export default function StatsCards() {
  const stats = [
    { title: "Toplam Personel", value: "47", change: "+3 bu ay", color: "blue" },
    { title: "Devam Oranı", value: "94.2%", change: "+2.1% artış", color: "green" },
    { title: "Aylık Gelir", value: "₺125,430", change: "+8.5% artış", color: "purple" },
    { title: "Hedef Tamamlanma", value: "78%", change: "%12 kaldı", color: "orange" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow border">
          <h3 className="text-gray-600 text-sm">{stat.title}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
          <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
