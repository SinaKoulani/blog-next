"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "Posts", href: "/admin/posts" },
  { label: "New Post", href: "/admin/posts/new" },
  { label: "Categories", href: "/admin/categories" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin/posts") {
      return (
        pathname === href ||
        (pathname.startsWith(`${href}/`) && pathname !== "/admin/posts/new")
      );
    }

    return pathname === href;
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white p-4 sm:w-64">
      <nav aria-label="Admin navigation">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        type="button"
        className="mt-auto rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
      >
        Logout
      </button>
    </aside>
  );
}