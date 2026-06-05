'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, BadgeCheck } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import type { Apartment } from '@/lib/mock-data';

interface ApartmentCardProps {
  apartment: Apartment;
  index?: number;
  variant?: 'default' | 'featured';
}

export function ApartmentCard({ apartment, index = 0, variant = 'default' }: ApartmentCardProps) {
  const primaryImage = apartment.images.find((img) => img.isPrimary) || apartment.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/apartments/${apartment.slug}`} className="group block">
        <div className={cn(
          'relative overflow-hidden rounded-2xl bg-neutral-100',
          variant === 'featured' ? 'aspect-[4/5]' : 'aspect-[4/3]'
        )}>
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || apartment.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {apartment.verified && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-neutral-900 backdrop-blur-sm">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
              Verified
            </div>
          )}

          {apartment.featured && (
            <div className="absolute top-4 right-4 rounded-full bg-amber-700/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Featured
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-2xl font-semibold text-white mb-1">{formatPrice(apartment.price)}</p>
            <h3 className="text-sm font-medium text-white/90 line-clamp-1">{apartment.title}</h3>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5" />
            {apartment.area}
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {apartment.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {apartment.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {apartment.sizeSqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
