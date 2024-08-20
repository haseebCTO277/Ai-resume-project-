// File: /app/dashboard/admin/AdminNav.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Admin', href: '/dashboard/admin' },
    { name: 'Config', href: '/dashboard/admin/config' },
  ];

  return (
    <nav className="flex space-x-4 mb-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${
            pathname === item.href
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 hover:bg-blue-100'
          } px-3 py-2 rounded-md text-sm font-medium`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}