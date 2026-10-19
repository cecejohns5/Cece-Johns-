"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Tasks" },
  { href: "/progress", label: "Progress" },
  { href: "/profile", label: "Profile" },
  { href: "/account", label: "Account" },
];

// The row of tabs on every page. It sits at the top on a computer and at the
// bottom of the screen on a phone. The tab for the current page is highlighted.
export default function TabBar() {
  const pathname = usePathname();

  // The log-in and sign-up pages count as part of the Account tab.
  const current =
    pathname === "/login" || pathname === "/signup" ? "/account" : pathname;

  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={current === tab.href ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
