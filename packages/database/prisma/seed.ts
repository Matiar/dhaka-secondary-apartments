import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const LOCATIONS = [
  { name: 'Gulshan', slug: 'gulshan', latitude: 23.7925, longitude: 90.4078, featured: true },
  { name: 'Banani', slug: 'banani', latitude: 23.7937, longitude: 90.4066, featured: true },
  { name: 'Baridhara', slug: 'baridhara', latitude: 23.8041, longitude: 90.4152, featured: true },
  { name: 'Dhanmondi', slug: 'dhanmondi', latitude: 23.7461, longitude: 90.3742, featured: true },
  { name: 'Uttara', slug: 'uttara', latitude: 23.8759, longitude: 90.3795, featured: true },
  { name: 'Bashundhara', slug: 'bashundhara', latitude: 23.8223, longitude: 90.4254, featured: false },
  { name: 'Mirpur', slug: 'mirpur', latitude: 23.8223, longitude: 90.3654, featured: false },
  { name: 'Mohammadpur', slug: 'mohammadpur', latitude: 23.7654, longitude: 90.3589, featured: false },
];

const APARTMENTS = [
  {
    slug: 'gulshan-lakeview-residence-3bed',
    title: 'Gulshan Lakeview Residence — 3 Bed Premium',
    description: 'A meticulously curated 3-bedroom apartment overlooking Gulshan Lake. This residence offers floor-to-ceiling windows, premium Italian marble flooring, and a fully equipped modern kitchen. Acquired and verified by our team, this apartment represents the finest in Dhaka secondary market living.',
    price: 28500000,
    area: 'Gulshan',
    locationSlug: 'gulshan',
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
    featured: true,
    buildingName: 'Lakeview Tower',
    buildingInfo: 'Premium residential tower with 24/7 security, backup generator, and rooftop garden.',
    floorDetails: '12th floor with unobstructed lake views. Corner unit with cross ventilation.',
    ownershipDetails: 'Clear title, mutation complete, no encumbrances.',
    nearbyLandmarks: [
      { name: 'Gulshan Lake Park', type: 'park', distance: '200m' },
      { name: 'United Hospital', type: 'hospital', distance: '1.2km' },
      { name: 'Gulshan Circle 2', type: 'landmark', distance: '500m' },
    ],
    features: ['Lake View', 'Central AC', 'Modular Kitchen', 'Master Ensuite', 'Balcony', 'Generator Backup', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
    ],
  },
  {
    slug: 'banani-skyline-penthouse-4bed',
    title: 'Banani Skyline Penthouse — 4 Bed Luxury',
    description: 'An exceptional penthouse in the heart of Banani. Spanning the top two floors with a private terrace, this residence defines luxury living in Dhaka. Handpicked by our acquisition team for its architectural excellence and prime location.',
    price: 52000000,
    area: 'Banani',
    locationSlug: 'banani',
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
    featured: true,
    buildingName: 'Skyline Heights',
    buildingInfo: 'Boutique luxury tower with concierge service and infinity pool.',
    floorDetails: 'Penthouse spanning 16th and 17th floors with 800 sqft private terrace.',
    ownershipDetails: 'Single owner, all documents verified.',
    nearbyLandmarks: [
      { name: 'Banani Bazar', type: 'market', distance: '300m' },
      { name: 'Apollo Hospital', type: 'hospital', distance: '800m' },
      { name: 'Banani Mosque', type: 'mosque', distance: '400m' },
    ],
    features: ['Private Terrace', 'Panoramic Views', 'Smart Home', 'Walk-in Closet', 'Home Office', 'Jacuzzi', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    ],
  },
  {
    slug: 'dhanmondi-heritage-apartment-3bed',
    title: 'Dhanmondi Heritage Apartment — 3 Bed Classic',
    description: 'A charming heritage-style apartment in the prestigious Dhanmondi area. High ceilings, original hardwood floors restored to perfection, and a serene garden-facing balcony make this a rare find in Dhaka\'s secondary market.',
    price: 18500000,
    area: 'Dhanmondi',
    locationSlug: 'dhanmondi',
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
    featured: true,
    buildingName: 'Heritage Villa',
    buildingInfo: 'Classic Dhanmondi building with mature trees and quiet surroundings.',
    floorDetails: '4th floor with garden views and excellent natural light.',
    ownershipDetails: 'Mutation updated, tax paid up to date.',
    nearbyLandmarks: [
      { name: 'Dhanmondi Lake', type: 'park', distance: '400m' },
      { name: 'Square Hospital', type: 'hospital', distance: '1.5km' },
      { name: 'Dhanmondi 27 Mosque', type: 'mosque', distance: '200m' },
    ],
    features: ['Garden View', 'High Ceilings', 'Hardwood Floors', 'Spacious Living', 'Natural Light', 'Quiet Location'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600573472555-3579b8e821a6?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f84d070ca?w=1200',
    ],
  },
  {
    slug: 'baridhara-diplomatic-zone-3bed',
    title: 'Baridhara Diplomatic Zone — 3 Bed Executive',
    description: 'Located in the exclusive Baridhara diplomatic zone, this executive apartment offers unparalleled privacy and security. Ideal for professionals and families seeking a premium address in Dhaka.',
    price: 35000000,
    area: 'Baridhara',
    locationSlug: 'baridhara',
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
    ownershipType: 'Freehold',
    featured: false,
    buildingName: 'Diplomatic Residences',
    buildingInfo: 'Gated community with diplomatic-grade security.',
    floorDetails: '8th floor corner unit with dual aspect views.',
    ownershipDetails: 'Verified clear title with complete documentation.',
    nearbyLandmarks: [
      { name: 'Baridhara Golf Club', type: 'landmark', distance: '1km' },
      { name: 'International School Dhaka', type: 'school', distance: '800m' },
      { name: 'Evercare Hospital', type: 'hospital', distance: '2km' },
    ],
    features: ['Diplomatic Zone', 'Gated Community', 'Premium Finishes', 'Ensuite Bedrooms', 'Study Room', 'Maid Room'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
    ],
  },
  {
    slug: 'uttara-modern-living-2bed',
    title: 'Uttara Modern Living — 2 Bed Contemporary',
    description: 'A contemporary 2-bedroom apartment in Uttara\'s premium sector. Perfect for young professionals or small families, this verified apartment offers modern amenities at an accessible premium price point.',
    price: 12500000,
    area: 'Uttara',
    locationSlug: 'uttara',
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
    ownershipType: 'Freehold',
    featured: false,
    buildingName: 'Uttara Central',
    buildingInfo: 'Modern residential complex with gym and community hall.',
    floorDetails: '6th floor with city skyline views.',
    ownershipDetails: 'Single owner, ready for immediate transfer.',
    nearbyLandmarks: [
      { name: 'Uttara Lake', type: 'park', distance: '500m' },
      { name: 'Uttara Central Mosque', type: 'mosque', distance: '300m' },
      { name: 'Scholastica School', type: 'school', distance: '1km' },
    ],
    features: ['City Views', 'Open Plan Living', 'Modern Kitchen', 'Community Gym', 'Playground', 'Wide Roads'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
    ],
  },
  {
    slug: 'gulshan-corner-suite-2bed',
    title: 'Gulshan Corner Suite — 2 Bed Designer',
    description: 'A designer 2-bedroom corner suite in Gulshan-1. Recently renovated with imported fixtures and a bespoke interior design, this apartment is move-in ready for discerning buyers.',
    price: 22000000,
    area: 'Gulshan',
    locationSlug: 'gulshan',
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
    ownershipType: 'Freehold',
    featured: true,
    buildingName: 'Gulshan Corner Tower',
    buildingInfo: 'Well-maintained tower with dedicated parking and security.',
    floorDetails: 'Corner unit on 9th floor with dual balconies.',
    ownershipDetails: 'All legal documents verified by our legal team.',
    nearbyLandmarks: [
      { name: 'Gulshan-1 Circle', type: 'landmark', distance: '600m' },
      { name: 'Labaid Hospital', type: 'hospital', distance: '1km' },
      { name: 'Gulshan Model School', type: 'school', distance: '700m' },
    ],
    features: ['Designer Interior', 'Corner Unit', 'Dual Balcony', 'Imported Fixtures', 'Move-in Ready', 'Premium Location'],
    images: [
      'https://images.unsplash.com/photo-1600210492493-3a8b2c86e1c6?w=1200',
      'https://images.unsplash.com/photo-1600566752355-3579b8e821a6?w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
    ],
  },
];

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const buyerPassword = await bcrypt.hash('buyer123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@alcove.bd' },
    update: {},
    create: {
      email: 'admin@alcove.bd',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      name: 'Demo Buyer',
      phone: '+8801712345678',
      passwordHash: buyerPassword,
      role: 'BUYER',
      emailVerified: true,
    },
  });

  for (const [index, loc] of LOCATIONS.entries()) {
    await prisma.location.upsert({
      where: { slug: loc.slug },
      update: {},
      create: { ...loc, sortOrder: index },
    });
  }

  for (const apt of APARTMENTS) {
    const location = await prisma.location.findUnique({ where: { slug: apt.locationSlug } });
    if (!location) continue;

    const { features, images, locationSlug, ...aptData } = apt;

    await prisma.apartment.upsert({
      where: { slug: apt.slug },
      update: {},
      create: {
        ...aptData,
        locationId: location.id,
        status: 'ACTIVE',
        verified: true,
        publishedAt: new Date(),
        images: {
          create: images.map((url, i) => ({
            url,
            alt: `${apt.title} - Image ${i + 1}`,
            sortOrder: i,
            isPrimary: i === 0,
          })),
        },
        features: {
          create: features.map((name) => ({ name, category: 'general' })),
        },
      },
    });
  }

  const testimonials = [
    { name: 'Rashid Ahmed', role: 'Business Owner', content: 'Alcove made buying our Gulshan apartment seamless. Every detail was verified, and the process was transparent from start to finish.', rating: 5 },
    { name: 'Nadia Rahman', role: 'Doctor', content: 'We sold our Dhanmondi apartment through Alcove\'s valuation service. Fair price, professional team, and zero hassle.', rating: 5 },
    { name: 'Karim Hassan', role: 'Engineer', content: 'The curated selection saved us months of searching. Each apartment we viewed was exactly as described — verified and premium.', rating: 5 },
  ];

  for (const [index, t] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...t, sortOrder: index } });
    }
  }

  const faqs = [
    { question: 'How does Alcove differ from other property websites?', answer: 'Alcove is not a marketplace. We personally acquire, verify, and curate every apartment in our collection. You browse only handpicked, admin-approved inventory — no agent listings or unverified properties.' },
    { question: 'Can I list my apartment on Alcove?', answer: 'We don\'t accept public listings. Instead, apartment owners submit a free valuation request. If your property meets our criteria, we evaluate, negotiate, and potentially acquire it for our curated collection.' },
    { question: 'Are all apartments verified?', answer: 'Yes. Every apartment in our collection goes through a rigorous verification process including legal title check, physical inspection, and documentation review before being published.' },
    { question: 'How do I schedule a visit?', answer: 'Browse our collection, select an apartment, and submit a visit request. Our team will contact you within 24 hours to arrange a convenient viewing time.' },
    { question: 'What areas do you cover?', answer: 'We focus on premium residential areas in Dhaka including Gulshan, Banani, Baridhara, Dhanmondi, Uttara, and select neighborhoods.' },
    { question: 'Is there a fee for buyers?', answer: 'No. Browsing our curated collection and submitting inquiries is completely free for buyers. Our business model is built on apartment acquisition and resale.' },
  ];

  for (const [index, faq] of faqs.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await prisma.faq.create({ data: { ...faq, sortOrder: index } });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
