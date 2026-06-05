import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ApartmentCollection } from '@/components/apartments/apartment-collection';

export const metadata: Metadata = {
  title: 'Apartment Collection',
  description: 'Browse our curated collection of verified premium apartments in Dhaka.',
};

export default function ApartmentsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12">
          <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">Our Collection</p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-neutral-900 mb-4">
            Curated Apartments
          </h1>
          <p className="text-neutral-600 max-w-2xl">
            A handpicked selection of verified premium residences. Each apartment personally acquired and managed by our team.
          </p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse bg-neutral-100 rounded-2xl" />}>
          <ApartmentCollection />
        </Suspense>
      </div>
    </div>
  );
}
