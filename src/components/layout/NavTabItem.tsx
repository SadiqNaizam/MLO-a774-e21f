import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface NavTabItemProps {
  to: string;
  label: string;
  isNew?: boolean;
}

const NavTabItem: React.FC<NavTabItemProps> = ({ to, label, isNew }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname.startsWith(to) && to !== "/");
  console.log(`Rendering NavTabItem: ${label}, isActive: ${isActive}`);

  return (
    <Link
      to={to}
      className={cn(
        "relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isActive ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary" : "text-muted-foreground"
      )}
    >
      {label}
      {isNew && (
        <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs px-1 py-0.5 leading-none">
          NEW
        </Badge>
      )}
    </Link>
  );
};

export default NavTabItem;