'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  featuredCount: number;
}

export function HeroSection({ featuredCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] mb-6">
            Curated Premium Apartments · Dhaka
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-6">
            Discover Verified<br />Residences
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            A handpicked collection of premium secondary apartments in Dhaka.
            Every property verified, curated, and managed by our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apartments">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-white/90 min-w-[200px]">
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent min-w-[200px]"
              >
                Sell Your Apartment
              </Button>
            </Link>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-white/50"
          >
            {featuredCount}+ verified apartments · Premium Dhaka locations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
