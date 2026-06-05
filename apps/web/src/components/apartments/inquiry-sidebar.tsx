'use client';

import { Phone, MessageCircle, Calendar, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatPrice, SITE_CONFIG } from '@/lib/utils';
import { submitVisitRequest } from '@/lib/api';
import { useState } from 'react';
import type { Apartment } from '@/lib/mock-data';

interface InquirySidebarProps {
  apartment: Apartment;
}

export function InquirySidebar({ apartment }: InquirySidebarProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${apartment.title}" (${formatPrice(apartment.price)}). Please share more details.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitVisitRequest(apartment.id, form);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="sticky top-24 space-y-6">
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
        <p className="text-3xl font-semibold text-neutral-900">{formatPrice(apartment.price)}</p>
        <p className="text-sm text-neutral-500 mt-1">{apartment.area} · {apartment.sizeSqft.toLocaleString()} sqft</p>

        <div className="flex gap-2 mt-4">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </a>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="whatsapp" className="w-full">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">Schedule a Visit</h3>
        <p className="text-sm text-neutral-500 mb-5">Our team will contact you within 24 hours.</p>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="font-medium text-neutral-900">Request Submitted!</p>
            <p className="text-sm text-neutral-500 mt-1">We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+880 1XXX XXXXXX"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Preferred visit time or questions..."
                className="mt-1.5"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Request Visit'}
            </Button>
          </form>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Heart className="h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}

export function MobileContactBar({ apartment }: InquirySidebarProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${apartment.title}" (${formatPrice(apartment.price)}).`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-neutral-100 p-3 flex gap-2 shadow-lg">
      <a href={`tel:${SITE_CONFIG.phone}`} className="flex-1">
        <Button variant="outline" className="w-full">
          <Phone className="h-4 w-4" />
          Call
        </Button>
      </a>
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button variant="whatsapp" className="w-full">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </a>
      <a href="#visit-form" className="flex-1">
        <Button className="w-full">
          <Calendar className="h-4 w-4" />
          Visit
        </Button>
      </a>
    </div>
  );
}
