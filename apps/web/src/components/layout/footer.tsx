import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/utils';

const footerLinks = {
  explore: [
    { href: '/apartments', label: 'Our Collection' },
    { href: '/about', label: 'About Us' },
    { href: '/sell', label: 'Sell Your Apartment' },
    { href: '/contact', label: 'Contact' },
  ],
  areas: [
    { href: '/apartments?area=gulshan', label: 'Gulshan' },
    { href: '/apartments?area=banani', label: 'Banani' },
    { href: '/apartments?area=dhanmondi', label: 'Dhanmondi' },
    { href: '/apartments?area=uttara', label: 'Uttara' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-semibold text-white tracking-tight">Alcove</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1">Residences</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Premium curated resale apartments in Dhaka. Every property verified, every transaction trusted.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Gulshan-2, Dhaka, Bangladesh
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Areas</h4>
            <ul className="space-y-3">
              {footerLinks.areas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">For Owners</h4>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              Looking to sell your apartment? Get a free valuation from our expert team.
            </p>
            <Link
              href="/sell"
              className="inline-flex items-center text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
            >
              Get Free Valuation →
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Alcove Residences. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Curated apartments only · No public listings · Verified inventory
          </p>
        </div>
      </div>
    </footer>
  );
}
