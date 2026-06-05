import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `৳${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `৳${(price / 100000).toFixed(1)} Lakh`;
  }
  return `৳${price.toLocaleString('en-BD')}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-BD');
}

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Alcove Residences',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  phone: process.env.NEXT_PUBLIC_PHONE || '+8801712345678',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '8801712345678',
  email: 'hello@alcove.bd',
  tagline: 'Curated Premium Apartments in Dhaka',
  description:
    'A premium curated resale apartment platform in Dhaka. Browse handpicked, verified apartments managed directly by our team.',
};

export const DHAKA_AREAS = [
  { slug: 'gulshan', name: 'Gulshan', description: 'Dhaka\'s most prestigious diplomatic zone' },
  { slug: 'banani', name: 'Banani', description: 'Premium commercial and residential hub' },
  { slug: 'baridhara', name: 'Baridhara', description: 'Exclusive gated community living' },
  { slug: 'dhanmondi', name: 'Dhanmondi', description: 'Classic heritage neighborhood charm' },
  { slug: 'uttara', name: 'Uttara', description: 'Modern planned urban community' },
  { slug: 'bashundhara', name: 'Bashundhara', description: 'Expansive residential township' },
];

export const BUDGET_RANGES = [
  { label: 'Under ৳1.5 Cr', min: 0, max: 15000000 },
  { label: '৳1.5 – 3 Cr', min: 15000000, max: 30000000 },
  { label: '৳3 – 5 Cr', min: 30000000, max: 50000000 },
  { label: 'Above ৳5 Cr', min: 50000000, max: 999999999 },
];
