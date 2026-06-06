import { NextRequest } from 'next/server';
import { toggleSaveApartment } from '@/lib/services';
import { requireAuth, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(request);
    const { id } = await params;
    return json(await toggleSaveApartment(user.id, id));
  } catch (error) {
    return handleApiError(error);
  }
}
