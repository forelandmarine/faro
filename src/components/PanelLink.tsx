import Link from "next/link";

/**
 * A way further in, from a landing panel to the page that covers the same
 * ground properly.
 *
 * The landing nav scrolls between panels, so until now /work, /services,
 * /about, /process and /contact could not be reached from the homepage at all.
 * They were in the sitemap and indexed, and nothing on the front page pointed
 * at them. These are the doors.
 */
export function PanelLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 mt-8 text-accent text-xs font-semibold tracking-wider uppercase border-b border-accent/30 hover:border-accent pb-1 transition-colors"
    >
      {children}
      <svg
        width="20"
        height="8"
        viewBox="0 0 20 8"
        fill="none"
        aria-hidden
        className="shrink-0 transition-transform group-hover:translate-x-1"
      >
        <path
          d="M0 4h17M14 1l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
