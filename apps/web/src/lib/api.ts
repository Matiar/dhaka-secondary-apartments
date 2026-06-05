import {
  MOCK_APARTMENTS,
  MOCK_TESTIMONIALS,
  MOCK_FAQS,
  type Apartment,
  type Testimonial,
  type Faq,
} from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface ApartmentFilters {
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minSize?: number;
  maxSize?: number;
  parking?: boolean;
  furnished?: boolean;
  lift?: boolean;
  page?: number;
  limit?: number;
}

function filterMockApartments(filters: ApartmentFilters): PaginatedResponse<Apartment> {
  let results = [...MOCK_APARTMENTS];

  if (filters.area) {
    results = results.filter((a) => a.location.slug === filters.area);
  }
  if (filters.minPrice) {
    results = results.filter((a) => a.price >= filters.minPrice!);
  }
  if (filters.maxPrice) {
    results = results.filter((a) => a.price <= filters.maxPrice!);
  }
  if (filters.bedrooms) {
    results = results.filter((a) => a.bedrooms === filters.bedrooms);
  }
  if (filters.minSize) {
    results = results.filter((a) => a.sizeSqft >= filters.minSize!);
  }
  if (filters.maxSize) {
    results = results.filter((a) => a.sizeSqft <= filters.maxSize!);
  }
  if (filters.parking !== undefined) {
    results = results.filter((a) => a.parking === filters.parking);
  }
  if (filters.furnished !== undefined) {
    results = results.filter((a) => a.furnished === filters.furnished);
  }
  if (filters.lift !== undefined) {
    results = results.filter((a) => a.lift === filters.lift);
  }

  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const start = (page - 1) * limit;

  return {
    data: results.slice(start, start + limit),
    meta: { total: results.length, page, limit, totalPages: Math.ceil(results.length / limit) },
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function getApartments(filters: ApartmentFilters = {}): Promise<PaginatedResponse<Apartment>> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value));
  });

  const result = await fetchApi<PaginatedResponse<Apartment>>(
    `/apartments?${params.toString()}`
  );
  return result || filterMockApartments(filters);
}

export async function getFeaturedApartments() {
  const result = await fetchApi<Apartment[]>('/apartments/featured');
  return result || MOCK_APARTMENTS.filter((a) => a.featured);
}

export async function getRecentApartments() {
  const result = await fetchApi<Apartment[]>('/apartments/recent');
  return result || MOCK_APARTMENTS.slice(0, 4);
}

export async function getApartmentBySlug(slug: string) {
  const result = await fetchApi<Apartment>(`/apartments/${slug}`);
  if (result) return result;

  const apt = MOCK_APARTMENTS.find((a) => a.slug === slug);
  if (!apt) return null;

  const similar = MOCK_APARTMENTS.filter(
    (a) => a.id !== apt.id && (a.location.slug === apt.location.slug || a.bedrooms === apt.bedrooms)
  ).slice(0, 3);

  return { ...apt, similar };
}

export async function getLocations() {
  const result = await fetchApi<Array<{ id: string; name: string; slug: string }>>('/apartments/locations');
  if (result) return result;
  return MOCK_APARTMENTS.map((a) => a.location).filter(
    (loc, i, arr) => arr.findIndex((l) => l.slug === loc.slug) === i
  );
}

export async function getPublicContent() {
  const result = await fetchApi<{
    testimonials: Testimonial[];
    faqs: Faq[];
    locations: unknown[];
  }>('/content');
  if (result) return result;
  return {
    testimonials: MOCK_TESTIMONIALS,
    faqs: MOCK_FAQS,
    locations: [],
  };
}

export async function submitVisitRequest(
  apartmentId: string,
  data: { name: string; phone: string; email?: string; message?: string; preferredDate?: string }
) {
  const result = await fetch(`${API_URL}/apartments/${apartmentId}/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result.ok;
}

export async function submitContact(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  const result = await fetch(`${API_URL}/inquiries/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result.ok;
}

export async function submitValuation(data: Record<string, unknown>) {
  const result = await fetch(`${API_URL}/valuations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result.ok;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function register(data: { email: string; name: string; password: string; phone?: string }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getAdminDashboard(token: string) {
  const res = await fetch(`${API_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}
