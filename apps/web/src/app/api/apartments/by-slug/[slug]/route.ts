import { NextRequest } from 'next/server';
import { findApartmentBySlug } from '@/lib/services';
import { ApiError, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const apartment = await findApartmentBySlug(slug);
    if (!apartment) throw new ApiError('Apartment not found', 404);
    return json(apartment);
  } catch (error) {
    return handleApiError(error);
  }
}
