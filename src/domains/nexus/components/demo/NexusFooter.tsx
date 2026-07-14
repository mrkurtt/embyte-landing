import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Nexus", href: "#" },
    { label: "Campus", href: "#" },
    { label: "Weddings", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function NexusFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0d1119]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-10 lg:px-8 xl:px-0 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/embyte-icon.png"
                alt="embyte"
                width={100}
                height={28}
                className="h-7 w-auto"
              />
              <span
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "-0.02em",
                }}
              >
                embyte
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Modular event infrastructure for gate security, RSVPs, and
              collaborative media.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3
              className="text-foreground"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="text-foreground"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-foreground"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/[0.08] pt-8">
          <p className="text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} Ordlabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
