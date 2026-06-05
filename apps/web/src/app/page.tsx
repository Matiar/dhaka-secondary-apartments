import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Home, Users, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApartmentCard } from '@/components/apartments/apartment-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getFeaturedApartments, getRecentApartments, getPublicContent } from '@/lib/api';
import { DHAKA_AREAS, SITE_CONFIG } from '@/lib/utils';
import { HeroSection } from '@/components/home/hero-section';

export default async function HomePage() {
  const [featured, recent, content] = await Promise.all([
    getFeaturedApartments(),
    getRecentApartments(),
    getPublicContent(),
  ]);

  const whyChooseUs = [
    { icon: Shield, title: 'Verified Apartments', description: 'Every property undergoes legal verification, physical inspection, and documentation review before listing.' },
    { icon: Home, title: 'Curated Collection', description: 'We personally acquire and manage each apartment. No agent listings, no unverified inventory.' },
    { icon: Users, title: 'Expert Team', description: 'Our experienced team handles everything from valuation to handover, ensuring a seamless experience.' },
    { icon: Clock, title: 'Hassle-Free Process', description: 'Skip the endless searching. Browse our handpicked collection and schedule visits with confidence.' },
  ];

  return (
    <>
      <HeroSection featuredCount={featured.length} />

      {/* Featured Apartments */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">Featured Collection</p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
                Handpicked Residences
              </h2>
            </div>
            <Link href="/apartments" className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((apt, i) => (
              <ApartmentCard key={apt.id} apartment={apt} index={i} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Curated Showcase */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                alt="Premium apartment interior"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-4">Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-6">
                A Curated Showroom,<br />Not a Marketplace
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Unlike traditional property portals, Alcove operates as a curated acquisition and resale business.
                We evaluate, acquire, and manage every apartment in our collection — ensuring quality, authenticity, and trust.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                With typically 15–20 active apartments at any time, each property receives the attention it deserves.
                No clutter, no noise — just premium residences ready for their next owner.
              </p>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn Our Story <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">Why Alcove</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              Trust Built Into Every Step
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-6 w-6 text-neutral-700" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-amber-500 uppercase tracking-wider mb-4">For Apartment Owners</p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                Sell Your Apartment<br />Quickly & Hassle-Free
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Get a free professional valuation from our expert team. If your apartment meets our criteria,
                we handle the entire acquisition process — verified buyers, fair pricing, zero hassle.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {['Free Valuation', 'Verified Buyers', 'Fair Pricing', 'Quick Process'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/sell">
                <Button variant="accent" size="lg">
                  Get Free Valuation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Apartment valuation"
                fill
                className="object-cover opacity-80"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">New Arrivals</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              Recently Added
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {recent.map((apt, i) => (
              <ApartmentCard key={apt.id} apartment={apt} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Dhaka Area Highlights */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">Explore Dhaka</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              Premium Neighborhoods
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DHAKA_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/apartments?area=${area.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-neutral-900 p-8 min-h-[200px] flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 transition-all" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-1">{area.name}</h3>
                  <p className="text-sm text-white/70">{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {content.testimonials.map((t) => (
              <div key={t.id} className="p-8 rounded-2xl border border-neutral-100 bg-neutral-50/50">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-neutral-900">{t.name}</p>
                  {t.role && <p className="text-sm text-neutral-500">{t.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              Common Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4">
            Ready to Find Your Home?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Browse our curated collection or speak with our team to find the perfect apartment in Dhaka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apartments">
              <Button size="lg">Browse Collection</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
