type Props = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHead({ eyebrow, title, text, align = "left", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p data-reveal className={`eyebrow flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        <span className="hairline inline-block w-10" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 data-reveal className="mt-5 font-serif text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.02] text-cream">
        {title}
      </h2>
      {text && (
        <p data-reveal className="mt-5 text-base leading-relaxed text-mute md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}
