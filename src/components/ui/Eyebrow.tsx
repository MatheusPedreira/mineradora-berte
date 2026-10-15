type EyebrowProps = {
  children: React.ReactNode;
  index?: string;
  tone?: "dark" | "light";
  className?: string;
};

export function Eyebrow({ children, index, tone = "light", className = "" }: EyebrowProps) {
  const color = tone === "dark" ? "text-sand" : "text-basalt";
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold tracking-eyebrow uppercase ${color} ${className}`}>
      {index ? (
        <>
          <span className="font-display tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
