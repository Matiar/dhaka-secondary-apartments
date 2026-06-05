'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_APARTMENTS } from '@/lib/mock-data';
import { ApartmentCard } from '@/components/apartments/apartment-card';

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/login');
  }, [router]);

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
            <User className="h-6 w-6 text-neutral-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">My Account</h1>
            <p className="text-sm text-neutral-500">Manage your saved apartments and visit requests</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="rounded-2xl border border-neutral-100 p-6 flex items-center gap-4">
            <Heart className="h-8 w-8 text-rose-500" />
            <div>
              <p className="font-semibold text-neutral-900">Saved Apartments</p>
              <p className="text-sm text-neutral-500">Apartments you&apos;ve bookmarked</p>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-100 p-6 flex items-center gap-4">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-semibold text-neutral-900">Visit Requests</p>
              <p className="text-sm text-neutral-500">Scheduled property viewings</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Browse More Apartments</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {MOCK_APARTMENTS.slice(0, 3).map((apt, i) => (
            <ApartmentCard key={apt.id} apartment={apt} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/apartments">
            <Button variant="outline">View Full Collection</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
