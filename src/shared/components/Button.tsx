import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-lg shadow-[#ed1e79]/20 hover:brightness-110 hover:scale-[1.02] hover:animate-[gradient-shimmer_2s_ease_infinite] active:scale-[0.97] active:transition-[transform] active:duration-100",
  secondary:
    "border border-border bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20 active:bg-white/[0.08]",
};

const baseStyles =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7e5f] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={styles} {...rest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
