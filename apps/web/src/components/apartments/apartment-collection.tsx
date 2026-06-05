'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApartmentCard } from '@/components/apartments/apartment-card';
import { Button } from '@/components/ui/button';
import { getApartments } from '@/lib/api';
import { DHAKA_AREAS, BUDGET_RANGES } from '@/lib/utils';
import type { Apartment } from '@/lib/mock-data';
import { SlidersHorizontal, X } from 'lucide-react';

export function ApartmentCollection() {
  const searchParams = useSearchParams();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    area: searchParams.get('area') || '',
    budget: '',
    bedrooms: searchParams.get('bedrooms') || '',
    minSize: '',
    parking: false,
    furnished: false,
    lift: false,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const budgetRange = BUDGET_RANGES.find((b) => b.label === filters.budget);

      const result = await getApartments({
        area: filters.area || undefined,
        minPrice: budgetRange?.min,
        maxPrice: budgetRange?.max,
        bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
        minSize: filters.minSize ? parseInt(filters.minSize) : undefined,
        parking: filters.parking || undefined,
        furnished: filters.furnished || undefined,
        lift: filters.lift || undefined,
      });

      setApartments(result.data);
      setTotal(result.meta.total);
      setLoading(false);
    }
    load();
  }, [filters]);

  const clearFilters = () => {
    setFilters({ area: '', budget: '', bedrooms: '', minSize: '', parking: false, furnished: false, lift: false });
  };

  const hasActiveFilters = filters.area || filters.budget || filters.bedrooms || filters.minSize || filters.parking || filters.furnished || filters.lift;

  return (
    <div>
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        <select
          value={filters.area}
          onChange={(e) => setFilters({ ...filters, area: e.target.value })}
          className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-sm"
        >
          <option value="">All Areas</option>
          {DHAKA_AREAS.map((a) => (
            <option key={a.slug} value={a.slug}>{a.name}</option>
          ))}
        </select>

        <select
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-sm"
        >
          <option value="">Any Budget</option>
          {BUDGET_RANGES.map((b) => (
            <option key={b.label} value={b.label}>{b.label}</option>
          ))}
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-sm"
        >
          <option value="">Bedrooms</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} Bed{n > 1 ? 's' : ''}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}

        <span className="text-sm text-neutral-500 ml-auto">{total} apartments</span>
      </div>

      {/* Optional Filters Panel */}
      {showFilters && (
        <div className="mb-8 p-6 rounded-2xl border border-neutral-100 bg-neutral-50/50 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.parking}
              onChange={(e) => setFilters({ ...filters, parking: e.target.checked })}
              className="rounded"
            />
            Parking
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.furnished}
              onChange={(e) => setFilters({ ...filters, furnished: e.target.checked })}
              className="rounded"
            />
            Furnished
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.lift}
              onChange={(e) => setFilters({ ...filters, lift: e.target.checked })}
              className="rounded"
            />
            Lift Available
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Min Size:</span>
            <input
              type="number"
              value={filters.minSize}
              onChange={(e) => setFilters({ ...filters, minSize: e.target.value })}
              placeholder="sqft"
              className="h-9 w-24 rounded-xl border border-neutral-200 bg-white px-3 text-sm"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : apartments.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg font-medium text-neutral-900 mb-2">No apartments found</p>
          <p className="text-neutral-500 mb-6">Try adjusting your filters</p>
          <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt, i) => (
            <ApartmentCard key={apt.id} apartment={apt} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
