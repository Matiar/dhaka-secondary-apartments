import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, Bed, Bath, Maximize, Building, Calendar, Car, Sofa, ArrowUpDown, MapPin } from 'lucide-react';
import { getApartmentBySlug } from '@/lib/api';
import { formatPrice, SITE_CONFIG } from '@/lib/utils';
import { ImageGallery } from '@/components/apartments/image-gallery';
import { InquirySidebar, MobileContactBar } from '@/components/apartments/inquiry-sidebar';
import { ApartmentMap } from '@/components/maps/apartment-map';
import { ApartmentCard } from '@/components/apartments/apartment-card';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = await getApartmentBySlug(slug);
  if (!apartment) return { title: 'Apartment Not Found' };

  return {
    title: apartment.title,
    description: apartment.description.substring(0, 160),
    openGraph: {
      title: apartment.title,
      description: apartment.description.substring(0, 160),
      images: apartment.images[0]?.url ? [{ url: apartment.images[0].url }] : [],
      type: 'website',
    },
  };
}

export default async function ApartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const apartment = await getApartmentBySlug(slug);

  if (!apartment) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: apartment.title,
    description: apartment.description,
    url: `${SITE_CONFIG.url}/apartments/${apartment.slug}`,
    offers: {
      '@type': 'Offer',
      price: apartment.price,
      priceCurrency: 'BDT',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: apartment.area,
      addressRegion: 'Dhaka',
      addressCountry: 'BD',
      streetAddress: apartment.address,
    },
    numberOfRooms: apartment.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: apartment.sizeSqft,
      unitCode: 'FTK',
    },
  };

  const specs = [
    { icon: Bed, label: 'Bedrooms', value: apartment.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: apartment.bathrooms },
    { icon: Maximize, label: 'Size', value: `${apartment.sizeSqft.toLocaleString()} sqft` },
    { icon: ArrowUpDown, label: 'Floor', value: `${apartment.floor}${apartment.totalFloors ? ` / ${apartment.totalFloors}` : ''}` },
    { icon: Building, label: 'Building Age', value: apartment.buildingAge ? `${apartment.buildingAge} years` : 'N/A' },
    { icon: Car, label: 'Parking', value: apartment.parking ? 'Yes' : 'No' },
    { icon: Sofa, label: 'Furnished', value: apartment.furnished ? 'Yes' : 'No' },
    { icon: Calendar, label: 'Ownership', value: apartment.ownershipType || 'Verified' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-20 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {apartment.verified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified Apartment
                </span>
              )}
              <span className="text-sm text-neutral-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {apartment.address}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-medium text-neutral-900 mb-2">
              {apartment.title}
            </h1>
            <p className="text-3xl font-semibold text-neutral-900">{formatPrice(apartment.price)}</p>
          </div>

          {/* Gallery */}
          <ImageGallery images={apartment.images} title={apartment.title} />

          <div className="grid lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                    <spec.icon className="h-4 w-4 text-neutral-400 mb-2" />
                    <p className="text-xs text-neutral-500 mb-0.5">{spec.label}</p>
                    <p className="font-semibold text-neutral-900">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Overview</h2>
                <p className="text-neutral-600 leading-relaxed">{apartment.description}</p>
              </section>

              {/* Features */}
              {apartment.features.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Apartment Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {apartment.features.map((f) => (
                      <span key={f.id} className="px-4 py-2 rounded-full bg-neutral-100 text-sm text-neutral-700">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Floor Information */}
              {(apartment.floorDetails || apartment.buildingInfo) && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Floor & Building</h2>
                  {apartment.buildingName && (
                    <p className="font-medium text-neutral-900 mb-2">{apartment.buildingName}</p>
                  )}
                  {apartment.floorDetails && (
                    <p className="text-neutral-600 leading-relaxed mb-3">{apartment.floorDetails}</p>
                  )}
                  {apartment.buildingInfo && (
                    <p className="text-neutral-600 leading-relaxed">{apartment.buildingInfo}</p>
                  )}
                </section>
              )}

              {/* Ownership */}
              {apartment.ownershipDetails && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Ownership Details</h2>
                  <p className="text-neutral-600 leading-relaxed">{apartment.ownershipDetails}</p>
                </section>
              )}

              {/* Location Map */}
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Location</h2>
                <ApartmentMap
                  latitude={apartment.latitude}
                  longitude={apartment.longitude}
                  title={apartment.title}
                />
              </section>

              {/* Nearby Places */}
              {apartment.nearbyLandmarks && apartment.nearbyLandmarks.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Nearby Places</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {apartment.nearbyLandmarks.map((place) => (
                      <div key={place.name} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100">
                        <div>
                          <p className="font-medium text-neutral-900">{place.name}</p>
                          <p className="text-xs text-neutral-500 capitalize">{place.type}</p>
                        </div>
                        <span className="text-sm text-neutral-600">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Similar Apartments */}
              {apartment.similar && apartment.similar.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">Similar Apartments</h2>
                  <div className="grid gap-8 md:grid-cols-3">
                    {apartment.similar.map((apt, i) => (
                      <ApartmentCard key={apt.id} apartment={apt} index={i} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div id="visit-form">
              <InquirySidebar apartment={apartment} />
            </div>
          </div>
        </div>
      </div>

      <MobileContactBar apartment={apartment} />
    </>
  );
}
