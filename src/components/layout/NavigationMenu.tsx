import React from 'react';
import { Link } from 'react-router-dom';
import NavTabItem, { NavTabItemProps } from './NavTabItem';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, UserCircle } from 'lucide-react'; // Placeholder icons

interface NavigationMenuProps {
  navItems: NavTabItemProps[];
  // Add other props like user state, onLogin, onLogout, onBecomeHost etc.
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ navItems }) => {
  console.log("Rendering NavigationMenu");

  // Basic responsive navigation bar structure
  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              YourLogo
            </Link>
          </div>

          {/* Desktop Navigation Tabs - Centered */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-1">
            {navItems.map((item, index) => (
              <NavTabItem key={index} to={item.to} label={item.label} isNew={item.isNew} />
            ))}
          </div>

          {/* Desktop User Actions - Right Aligned */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" className="font-semibold">Become a host</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English (US)</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                {/* Add more languages */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center space-x-2 px-3 py-2 h-auto">
                  <Menu className="h-4 w-4" />
                  <UserCircle className="h-6 w-6 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign up</DropdownMenuItem>
                <DropdownMenuItem>Log in</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Gift cards</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            {/* Mobile menu content would typically be handled by a Sheet or Collapsible component */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;