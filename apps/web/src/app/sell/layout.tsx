import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your Apartment',
  description: 'Get a free professional valuation for your apartment. Alcove acquires premium secondary apartments in Dhaka.',
};

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children;
}
