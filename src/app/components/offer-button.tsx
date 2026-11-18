import type { ReactNode } from "react";
import SiteLink from "./site-link";

/**
 * Raised button that grows on hover / keyboard focus and presses in when clicked.
 * Renders a link when `href` is given, otherwise a <button> (pass `onClick`).
 * Styles: ".offer-btn" in globals.css. variant "block" = full width, "compact" = smaller (inside cards).
 */
export default function OfferButton({
  href,
  target,
  onClick,
  disabled,
  submit,
  label,
  variant,
  className = "",
}: {
  href?: string;
  target?: string;
  onClick?: () => void;
  disabled?: boolean;
  submit?: boolean;
  label: ReactNode;
  variant?: "block" | "compact";
  className?: string;
}) {
  const inner = <span className="offer-btn__text">{label}</span>;
  return (
    <div className={`offer-btn ${variant ? `offer-btn--${variant}` : ""} ${className}`}>
      {href ? (
        <SiteLink href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} onClick={onClick} className="offer-btn__btn">
          {inner}
        </SiteLink>
      ) : (
        <button type={submit ? "submit" : "button"} onClick={onClick} disabled={disabled} className="offer-btn__btn disabled:opacity-50 disabled:cursor-not-allowed">
          {inner}
        </button>
      )}
    </div>
  );
}
