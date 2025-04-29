'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function PagePath() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center space-x-2 text-gray-600">
        <li>
          <Link
            href="/"
            className="hover:underline text-blue-600 font-semibold"
          >
            Home
          </Link>
        </li>

        {parts.map((part, idx) => {
          const href = '/' + parts.slice(0, idx + 1).join('/');
          const label = decodeURIComponent(part).replace(/[-_]/g, ' ');

          const isLast = idx === parts.length - 1;

          return (
            <li key={idx} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="capitalize text-gray-800 font-medium">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:underline capitalize text-blue-600"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
