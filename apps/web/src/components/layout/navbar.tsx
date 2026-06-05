'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, SITE_CONFIG } from '@/lib/utils';

const navLinks = [
  { href: '/apartments', label: 'Collection' },
  { href: '/about', label: 'About' },
  { href: '/sell', label: 'Sell Your Apartment' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const lightNav = isHome && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        !lightNav
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span className={cn('text-xl font-semibold tracking-tight', !lightNav ? 'text-neutral-900' : 'text-white')}>
            Alcove
          </span>
          <span className={cn('text-[10px] uppercase tracking-[0.2em]', !lightNav ? 'text-neutral-500' : 'text-white/70')}>
            Residences
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:opacity-70',
                !lightNav ? 'text-neutral-700' : 'text-white/90'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className={lightNav ? 'text-white hover:bg-white/10' : ''}>
              Sign In
            </Button>
          </Link>
          <Link href={`tel:${SITE_CONFIG.phone}`}>
            <Button variant={!lightNav ? 'default' : 'outline'} size="sm" className={lightNav ? 'border-white/30 text-white hover:bg-white/10 bg-transparent' : ''}>
              <Phone className="h-4 w-4" />
              Call Us
            </Button>
          </Link>
        </div>

        <button
          className={cn('lg:hidden p-2', !lightNav ? 'text-neutral-900' : 'text-white')}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-neutral-100 overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 px-4">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href={`tel:${SITE_CONFIG.phone}`} className="flex-1">
                  <Button className="w-full">Call Us</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
