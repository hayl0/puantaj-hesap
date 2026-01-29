import React from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ToolCard({ title, description, icon }: ToolCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <button className="mt-4 text-sm font-medium text-primary hover:underline">
        Detaylı İncele →
      </button>
    </div>
  );
}
