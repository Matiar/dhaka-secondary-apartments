'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ApartmentImage } from '@/lib/mock-data';

interface ImageGalleryProps {
  images: ApartmentImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        <div
          className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:min-h-[480px] cursor-pointer group"
          onClick={() => { setActiveIndex(0); setFullscreen(true); }}
        >
          <Image
            src={images[0]?.url}
            alt={images[0]?.alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {images.slice(1, 5).map((img, i) => (
          <div
            key={img.id}
            className="relative aspect-[4/3] cursor-pointer group hidden md:block"
            onClick={() => { setActiveIndex(i + 1); setFullscreen(true); }}
          >
            <Image
              src={img.url}
              alt={img.alt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="25vw"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">+{images.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={() => setFullscreen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <button
              className="absolute left-4 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={goPrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={goNext}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-8"
            >
              <Image
                src={images[activeIndex]?.url}
                alt={images[activeIndex]?.alt || title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
