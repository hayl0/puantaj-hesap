import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-sm font-medium">İş Takip Sistemi</p>
          <p className="text-sm text-muted-foreground text-center md:text-left">Personel puantajı ve finansal takip için kapsamlı çözüm</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gizlilik</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Koşullar</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">İletişim</a>
        </div>
      </div>
    </footer>
  );
}
