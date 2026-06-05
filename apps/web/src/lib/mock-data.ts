export interface ApartmentImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ApartmentFeature {
  id: string;
  name: string;
  category: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  city: string;
  featured?: boolean;
}

export interface Apartment {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  area: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqft: number;
  floor: number;
  totalFloors?: number;
  buildingAge?: number;
  parking: boolean;
  furnished: boolean;
  lift: boolean;
  ownershipType?: string;
  verified: boolean;
  featured: boolean;
  status: string;
  viewCount: number;
  buildingName?: string;
  buildingInfo?: string;
  floorDetails?: string;
  ownershipDetails?: string;
  nearbyLandmarks?: Array<{ name: string; type: string; distance: string }>;
  images: ApartmentImage[];
  features: ApartmentFeature[];
  location: Location;
  similar?: Apartment[];
  publishedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const MOCK_APARTMENTS: Apartment[] = [
  {
    id: '1',
    slug: 'gulshan-lakeview-residence-3bed',
    title: 'Gulshan Lakeview Residence — 3 Bed Premium',
    description: 'A meticulously curated 3-bedroom apartment overlooking Gulshan Lake. This residence offers floor-to-ceiling windows, premium Italian marble flooring, and a fully equipped modern kitchen.',
    price: 28500000,
    area: 'Gulshan',
    address: 'Road 108, Gulshan-2, Dhaka',
    latitude: 23.7925,
    longitude: 90.4078,
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 2200,
    floor: 12,
    totalFloors: 18,
    buildingAge: 8,
    parking: true,
    furnished: true,
    lift: true,
    ownershipType: 'Freehold',
    verified: true,
    featured: true,
    status: 'ACTIVE',
    viewCount: 342,
    buildingName: 'Lakeview Tower',
    buildingInfo: 'Premium residential tower with 24/7 security, backup generator, and rooftop garden.',
    floorDetails: '12th floor with unobstructed lake views. Corner unit with cross ventilation.',
    ownershipDetails: 'Clear title, mutation complete, no encumbrances.',
    nearbyLandmarks: [
      { name: 'Gulshan Lake Park', type: 'park', distance: '200m' },
      { name: 'United Hospital', type: 'hospital', distance: '1.2km' },
      { name: 'Gulshan Circle 2', type: 'landmark', distance: '500m' },
    ],
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200', alt: 'Living room', isPrimary: true },
      { id: '2', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200', alt: 'Bedroom', isPrimary: false },
      { id: '3', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200', alt: 'Kitchen', isPrimary: false },
    ],
    features: [
      { id: '1', name: 'Lake View', category: 'general' },
      { id: '2', name: 'Central AC', category: 'general' },
      { id: '3', name: 'Modular Kitchen', category: 'general' },
      { id: '4', name: 'Master Ensuite', category: 'general' },
      { id: '5', name: 'Balcony', category: 'general' },
    ],
    location: { id: '1', name: 'Gulshan', slug: 'gulshan', city: 'Dhaka', featured: true },
  },
  {
    id: '2',
    slug: 'banani-skyline-penthouse-4bed',
    title: 'Banani Skyline Penthouse — 4 Bed Luxury',
    description: 'An exceptional penthouse in the heart of Banani. Spanning the top two floors with a private terrace, this residence defines luxury living in Dhaka.',
    price: 52000000,
    area: 'Banani',
    address: 'Kemal Ataturk Avenue, Banani, Dhaka',
    latitude: 23.7937,
    longitude: 90.4066,
    bedrooms: 4,
    bathrooms: 4,
    sizeSqft: 3800,
    floor: 16,
    totalFloors: 16,
    buildingAge: 5,
    parking: true,
    furnished: true,
    lift: true,
    ownershipType: 'Freehold',
    verified: true,
    featured: true,
    status: 'ACTIVE',
    viewCount: 518,
    buildingName: 'Skyline Heights',
    buildingInfo: 'Boutique luxury tower with concierge service and infinity pool.',
    floorDetails: 'Penthouse spanning 16th and 17th floors with 800 sqft private terrace.',
    ownershipDetails: 'Single owner, all documents verified.',
    nearbyLandmarks: [
      { name: 'Banani Bazar', type: 'market', distance: '300m' },
      { name: 'Apollo Hospital', type: 'hospital', distance: '800m' },
    ],
    images: [
      { id: '4', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', alt: 'Exterior', isPrimary: true },
      { id: '5', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', alt: 'Interior', isPrimary: false },
    ],
    features: [
      { id: '6', name: 'Private Terrace', category: 'general' },
      { id: '7', name: 'Panoramic Views', category: 'general' },
      { id: '8', name: 'Smart Home', category: 'general' },
    ],
    location: { id: '2', name: 'Banani', slug: 'banani', city: 'Dhaka', featured: true },
  },
  {
    id: '3',
    slug: 'dhanmondi-heritage-apartment-3bed',
    title: 'Dhanmondi Heritage Apartment — 3 Bed Classic',
    description: 'A charming heritage-style apartment in the prestigious Dhanmondi area. High ceilings, original hardwood floors restored to perfection.',
    price: 18500000,
    area: 'Dhanmondi',
    address: 'Road 27 (Old), Dhanmondi, Dhaka',
    latitude: 23.7461,
    longitude: 90.3742,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqft: 1850,
    floor: 4,
    totalFloors: 6,
    buildingAge: 25,
    parking: true,
    furnished: false,
    lift: true,
    ownershipType: 'Freehold',
    verified: true,
    featured: true,
    status: 'ACTIVE',
    viewCount: 267,
    buildingName: 'Heritage Villa',
    images: [
      { id: '6', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', alt: 'Living', isPrimary: true },
      { id: '7', url: 'https://images.unsplash.com/photo-1600573472555-3579b8e821a6?w=1200', alt: 'Dining', isPrimary: false },
    ],
    features: [
      { id: '9', name: 'Garden View', category: 'general' },
      { id: '10', name: 'High Ceilings', category: 'general' },
    ],
    location: { id: '4', name: 'Dhanmondi', slug: 'dhanmondi', city: 'Dhaka', featured: true },
  },
  {
    id: '4',
    slug: 'baridhara-diplomatic-zone-3bed',
    title: 'Baridhara Diplomatic Zone — 3 Bed Executive',
    description: 'Located in the exclusive Baridhara diplomatic zone, this executive apartment offers unparalleled privacy and security.',
    price: 35000000,
    area: 'Baridhara',
    address: 'Baridhara DOHS, Dhaka',
    latitude: 23.8041,
    longitude: 90.4152,
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 2400,
    floor: 8,
    totalFloors: 12,
    buildingAge: 10,
    parking: true,
    furnished: true,
    lift: true,
    verified: true,
    featured: false,
    status: 'ACTIVE',
    viewCount: 189,
    images: [
      { id: '8', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', alt: 'Exterior', isPrimary: true },
    ],
    features: [{ id: '11', name: 'Diplomatic Zone', category: 'general' }],
    location: { id: '3', name: 'Baridhara', slug: 'baridhara', city: 'Dhaka', featured: true },
  },
  {
    id: '5',
    slug: 'uttara-modern-living-2bed',
    title: 'Uttara Modern Living — 2 Bed Contemporary',
    description: 'A contemporary 2-bedroom apartment in Uttara\'s premium sector. Perfect for young professionals or small families.',
    price: 12500000,
    area: 'Uttara',
    address: 'Sector 7, Uttara, Dhaka',
    latitude: 23.8759,
    longitude: 90.3795,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqft: 1350,
    floor: 6,
    totalFloors: 10,
    buildingAge: 6,
    parking: true,
    furnished: false,
    lift: true,
    verified: true,
    featured: false,
    status: 'ACTIVE',
    viewCount: 145,
    images: [
      { id: '9', url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200', alt: 'Living', isPrimary: true },
    ],
    features: [{ id: '12', name: 'City Views', category: 'general' }],
    location: { id: '5', name: 'Uttara', slug: 'uttara', city: 'Dhaka', featured: true },
  },
  {
    id: '6',
    slug: 'gulshan-corner-suite-2bed',
    title: 'Gulshan Corner Suite — 2 Bed Designer',
    description: 'A designer 2-bedroom corner suite in Gulshan-1. Recently renovated with imported fixtures and bespoke interior design.',
    price: 22000000,
    area: 'Gulshan',
    address: 'Road 45, Gulshan-1, Dhaka',
    latitude: 23.7808,
    longitude: 90.4125,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqft: 1600,
    floor: 9,
    totalFloors: 14,
    buildingAge: 12,
    parking: true,
    furnished: true,
    lift: true,
    verified: true,
    featured: true,
    status: 'ACTIVE',
    viewCount: 298,
    images: [
      { id: '10', url: 'https://images.unsplash.com/photo-1600210492493-3a8b2c86e1c6?w=1200', alt: 'Interior', isPrimary: true },
    ],
    features: [{ id: '13', name: 'Designer Interior', category: 'general' }],
    location: { id: '1', name: 'Gulshan', slug: 'gulshan', city: 'Dhaka', featured: true },
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rashid Ahmed', role: 'Business Owner', content: 'Alcove made buying our Gulshan apartment seamless. Every detail was verified, and the process was transparent from start to finish.', rating: 5 },
  { id: '2', name: 'Nadia Rahman', role: 'Doctor', content: 'We sold our Dhanmondi apartment through Alcove\'s valuation service. Fair price, professional team, and zero hassle.', rating: 5 },
  { id: '3', name: 'Karim Hassan', role: 'Engineer', content: 'The curated selection saved us months of searching. Each apartment we viewed was exactly as described — verified and premium.', rating: 5 },
];

export const MOCK_FAQS: Faq[] = [
  { id: '1', question: 'How does Alcove differ from other property websites?', answer: 'Alcove is not a marketplace. We personally acquire, verify, and curate every apartment in our collection. You browse only handpicked, admin-approved inventory.' },
  { id: '2', question: 'Can I list my apartment on Alcove?', answer: 'We don\'t accept public listings. Instead, apartment owners submit a free valuation request. If your property meets our criteria, we evaluate and potentially acquire it.' },
  { id: '3', question: 'Are all apartments verified?', answer: 'Yes. Every apartment goes through rigorous verification including legal title check, physical inspection, and documentation review.' },
  { id: '4', question: 'How do I schedule a visit?', answer: 'Browse our collection, select an apartment, and submit a visit request. Our team will contact you within 24 hours.' },
  { id: '5', question: 'What areas do you cover?', answer: 'We focus on premium residential areas in Dhaka including Gulshan, Banani, Baridhara, Dhanmondi, and Uttara.' },
  { id: '6', question: 'Is there a fee for buyers?', answer: 'No. Browsing our curated collection and submitting inquiries is completely free for buyers.' },
];
