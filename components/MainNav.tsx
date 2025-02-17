'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainNavProps {
  data: string[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((category) => {
    const formattedCategory = category
      .toLowerCase()
      .replace(/'/g, '')
      .replace(/\s+/g, '-');

    return {
      href: `/category/${formattedCategory}`,
      label: category,
      active: pathname === `/category/${formattedCategory}`,
    };
  });

  return (
    <nav className="mx-6 flex items-cetner space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-black',
            route.active ? 'text-black' : 'text-neutral-500'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
