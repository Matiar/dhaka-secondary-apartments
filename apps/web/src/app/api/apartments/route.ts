import { NextRequest } from 'next/server';
import { findAllApartments, createApartment } from '@/lib/services';
import { requireAuth, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const filters = {
      area: params.get('area') || undefined,
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
      bedrooms: params.get('bedrooms') ? Number(params.get('bedrooms')) : undefined,
      minSize: params.get('minSize') ? Number(params.get('minSize')) : undefined,
      maxSize: params.get('maxSize') ? Number(params.get('maxSize')) : undefined,
      parking: params.get('parking') === 'true' ? true : params.get('parking') === 'false' ? false : undefined,
      furnished: params.get('furnished') === 'true' ? true : params.get('furnished') === 'false' ? false : undefined,
      lift: params.get('lift') === 'true' ? true : params.get('lift') === 'false' ? false : undefined,
      page: params.get('page') ? Number(params.get('page')) : 1,
      limit: params.get('limit') ? Number(params.get('limit')) : 12,
    };
    return json(await findAllApartments(filters));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(request, ['ADMIN']);
    const body = await request.json();
    return json(await createApartment(body), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
