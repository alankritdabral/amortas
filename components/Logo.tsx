import Link from "next/link";

/** Amortas loop mark. Colour comes from `currentColor`. */
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="56 36 734 458" className={className} fill="none" aria-hidden="true">
      <path
        d="M262 378 C215 455 116 462 98 376 C90 304 155 260 228 262 C335 280 450 425 644 437 C752 442 756 345 711 267 C676 199 627 66 543 77 C488 86 452 145 386 238"
        stroke="currentColor"
        strokeWidth="58"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Logo lockups, picked by background:
 * - "light": orange mark + black wordmark, for white surfaces (navbar, drawer)
 * - "dark": orange mark + white wordmark, for black surfaces (footer)
 */
export function Logo({
  variant = "light",
  href = "/",
  onClick,
  className = "",
  size = "md",
}: {
  variant?: "light" | "dark";
  href?: string;
  onClick?: () => void;
  className?: string;
  /** "lg" is the bigger lockup used in the desktop navbar. */
  size?: "md" | "lg";
}) {
  const lg = size === "lg";
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Amortas home"
      className={`inline-flex items-center shrink-0 ${lg ? "gap-3" : "gap-2.5"} ${className}`}
    >
      <LogoMark className={`${lg ? "h-7 sm:h-8 lg:h-[38px]" : "h-7 sm:h-8"} w-auto text-[#FD6C01]`} />
      <span
        className={`${lg ? "text-[22px] sm:text-2xl lg:text-[31px]" : "text-[22px] sm:text-2xl"} font-extrabold tracking-[-0.04em] leading-none ${
          variant === "dark" ? "text-white" : "text-[#252525]"
        }`}
      >
        Amortas
      </span>
    </Link>
  );
}
