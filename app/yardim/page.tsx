import { HeroSection } from "@/components/layout/hero-section";
import Link from "next/link";

export default function YardimPage() {
  return (
    <div className="flex flex-col">

      {/* Main Content */}
      <section className="py-12 md:py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-white brutalist-border brutalist-shadow p-6 mb-10">
            <h2 className="text-xl font-bold text-charcoal mb-4">Hızlı Erişim</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="#puantaj"
                className="px-4 py-2 bg-royal-blue/10 brutalist-border font-semibold text-charcoal hover:bg-royal-blue hover:text-white transition-colors"
              >
                Puantaj Tablosu
              </a>
              <a
                href="#gelir-gider"
                className="px-4 py-2 bg-royal-blue/10 brutalist-border font-semibold text-charcoal hover:bg-royal-blue hover:text-white transition-colors"
              >
                Gelir-Gider Tablosu
              </a>
              <a
                href="#formatlar"
                className="px-4 py-2 bg-royal-blue/10 brutalist-border font-semibold text-charcoal hover:bg-royal-blue hover:text-white transition-colors"
              >
                Formatlar
              </a>
            </div>
          </div>

          {/* Puantaj Section */}
          <div id="puantaj" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 pb-2 border-b-4 border-charcoal">
              Aylık Puantaj Tablosu Kullanımı
            </h2>

            <div className="space-y-6">
              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Genel Bakış</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Puantaj tablosu, personel devam durumlarını günlük olarak kaydetmenize ve takip etmenize olanak tanır. 
                  Her personel için 31 günlük kayıt yapabilir, toplamları otomatik olarak hesaplatabilirsiniz.
                </p>
              </div>

              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Personel Bilgileri</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-charcoal mt-2 flex-shrink-0" />
                    <span><strong>Sicil No:</strong> Personelin benzersiz kimlik numarası</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-charcoal mt-2 flex-shrink-0" />
                    <span><strong>Ad Soyad:</strong> Personelin tam adı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-charcoal mt-2 flex-shrink-0" />
                    <span><strong>Departman:</strong> İdari, Üretim, Satış veya Muhasebe</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Puantaj Kodları</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-worked-green/30">
                    <span className="w-10 h-10 flex items-center justify-center bg-worked-green brutalist-border font-bold">Ç</span>
                    <div>
                      <p className="font-bold text-charcoal">Çalıştı</p>
                      <p className="text-xs text-muted-foreground">Normal mesai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-leave-yellow/30">
                    <span className="w-10 h-10 flex items-center justify-center bg-leave-yellow brutalist-border font-bold">İ</span>
                    <div>
                      <p className="font-bold text-charcoal">İzinli</p>
                      <p className="text-xs text-muted-foreground">Onaylı izin</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-sick-orange/30">
                    <span className="w-10 h-10 flex items-center justify-center bg-sick-orange brutalist-border font-bold">R</span>
                    <div>
                      <p className="font-bold text-charcoal">Raporlu</p>
                      <p className="text-xs text-muted-foreground">Sağlık raporu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-holiday-gray/30">
                    <span className="w-10 h-10 flex items-center justify-center bg-holiday-gray brutalist-border font-bold">T</span>
                    <div>
                      <p className="font-bold text-charcoal">Tatil</p>
                      <p className="text-xs text-muted-foreground">Resmi/hafta sonu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gelir-Gider Section */}
          <div id="gelir-gider" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 pb-2 border-b-4 border-charcoal">
              Gelir-Gider Tablosu Kullanımı
            </h2>

            <div className="space-y-6">
              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Genel Bakış</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gelir-Gider tablosu, işletmenizin aylık mali durumunu takip etmenizi sağlar. 
                  Tüm gelir ve giderlerinizi kategorize edebilir, net kar/zarar durumunuzu anında görebilirsiniz.
                </p>
              </div>

              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Gelir Kategorileri</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Satış Gelirleri:</strong> Ürün satışlarından elde edilen gelirler</li>
                  <li>• <strong>Hizmet Gelirleri:</strong> Sunulan hizmetlerden elde edilen gelirler</li>
                  <li>• <strong>Faiz Gelirleri:</strong> Banka hesaplarından elde edilen faiz</li>
                  <li>• <strong>Kira Gelirleri:</strong> Kiralanan varlıklardan elde edilen gelir</li>
                  <li>• <strong>Diğer Gelirler:</strong> Diğer kaynaklardan elde edilen gelirler</li>
                </ul>
              </div>

              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Gider Kategorileri</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Personel Giderleri:</strong> Maaşlar, primler, SGK ödemeleri</li>
                  <li>• <strong>Kira:</strong> İşyeri kira ödemeleri</li>
                  <li>• <strong>Faturalar:</strong> Elektrik, su, internet, telefon giderleri</li>
                  <li>• <strong>Malzeme:</strong> Hammadde ve yardımcı malzeme giderleri</li>
                  <li>• <strong>Pazarlama ve Reklam:</strong> Tanıtım ve reklam giderleri</li>
                  <li>• <strong>Ulaşım:</strong> Nakliye ve ulaşım giderleri</li>
                  <li>• <strong>Vergiler ve Lisanslar:</strong> Vergi ve yasal yükümlülükler</li>
                  <li>• <strong>Bakım ve Onarım:</strong> Ekipman ve tesis bakım giderleri</li>
                  <li>• <strong>Finansman Giderleri:</strong> Banka komisyonları, faiz ödemeleri</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formatlar Section */}
          <div id="formatlar" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 pb-2 border-b-4 border-charcoal">
              Format Bilgileri
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Tarih Formatı</h3>
                <p className="text-muted-foreground mb-2">GG.AA.YYYY</p>
                <p className="font-mono text-charcoal bg-warm-gray p-2">Örnek: 01.01.2025</p>
              </div>

              <div className="bg-white brutalist-border brutalist-shadow-sm p-6">
                <h3 className="text-lg font-bold text-charcoal mb-3">Para Birimi Formatı</h3>
                <p className="text-muted-foreground mb-2">TL (Binlik ayraçlı)</p>
                <p className="font-mono text-charcoal bg-warm-gray p-2">Örnek: 1.250,50 TL</p>
              </div>
            </div>
          </div>

          {/* Back Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/puantaj"
              className="px-6 py-3 bg-white brutalist-border font-bold text-charcoal hover:bg-royal-blue hover:text-white hover:border-royal-blue transition-all"
            >
              Puantaj Tablosuna Git
            </Link>
            <Link
              href="/gelir-gider"
              className="px-6 py-3 bg-white brutalist-border font-bold text-charcoal hover:bg-royal-blue hover:text-white hover:border-royal-blue transition-all"
            >
              Gelir-Gider Tablosuna Git
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
