'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitContact } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/utils';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitContact(form);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-4">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-neutral-900 mb-4">Contact Us</h1>
          <p className="text-neutral-600">
            Have questions about our collection or want to discuss your apartment? We&apos;re here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-neutral-600 hover:text-neutral-900">{SITE_CONFIG.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-neutral-600 hover:text-neutral-900">{SITE_CONFIG.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Office</h3>
                <p className="text-neutral-600">Gulshan-2, Dhaka 1212, Bangladesh</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="font-medium text-neutral-900 mb-1">Message Sent!</p>
                <p className="text-sm text-neutral-500">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" rows={4} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
