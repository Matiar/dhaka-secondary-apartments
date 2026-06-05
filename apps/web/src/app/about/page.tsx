import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Eye, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Alcove Residences — Dhaka\'s premium curated apartment acquisition and resale platform.',
};

const values = [
  { icon: Shield, title: 'Trust First', description: 'Every apartment is legally verified, physically inspected, and documentation-reviewed before entering our collection.' },
  { icon: Eye, title: 'Curated Quality', description: 'We maintain a limited inventory of 15–20 premium apartments, ensuring each property receives the attention it deserves.' },
  { icon: Handshake, title: 'Transparent Process', description: 'From valuation to handover, we maintain complete transparency with both apartment owners and buyers.' },
];

const process = [
  { step: '01', title: 'Owner Contact', description: 'Apartment owners reach out for a free professional valuation.' },
  { step: '02', title: 'Evaluation', description: 'Our expert team inspects the property, verifies documents, and assesses market value.' },
  { step: '03', title: 'Acquisition', description: 'We negotiate and acquire apartments that meet our quality standards.' },
  { step: '04', title: 'Curation', description: 'Selected apartments are professionally presented on our platform with verified details.' },
  { step: '05', title: 'Buyer Match', description: 'Qualified buyers browse our collection and schedule visits through our team.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-4">About Alcove</p>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-6 leading-tight">
              Redefining Secondary Apartment Sales in Dhaka
            </h1>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Alcove Residences is not a property marketplace. We are a curated apartment acquisition and resale business,
              dedicated to bringing trust, transparency, and premium quality to Dhaka&apos;s secondary apartment market.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Founded on the belief that buying and selling apartments should be a premium, hassle-free experience,
              we personally manage every property in our collection — from initial valuation to final handover.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
              alt="About Alcove Residences"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-medium text-neutral-900">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                  <v.icon className="h-6 w-6 text-neutral-700" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-3xl font-serif font-medium text-neutral-900">Our Business Model</h2>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {process.map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <span className="text-3xl font-serif font-medium text-amber-700/30 shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-medium mb-4">Ready to Get Started?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Whether you&apos;re looking to buy a premium apartment or sell yours, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apartments">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-white/90">
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                Sell Your Apartment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
