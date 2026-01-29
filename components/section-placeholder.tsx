interface SectionPlaceholderProps {
  title: string;
  description?: string;
  height?: string;
}

export function SectionPlaceholder({
  title,
  description,
  height = "min-h-[400px]",
}: SectionPlaceholderProps) {
  return (
    <div
      className={`${height} brutalist-border bg-white brutalist-shadow p-8 flex flex-col items-center justify-center text-center`}
    >
      <div className="w-16 h-16 bg-royal-blue/10 brutalist-border flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-royal-blue" />
      </div>
      <h3 className="text-xl font-bold text-charcoal mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-md">{description}</p>
      )}
    </div>
  );
}
