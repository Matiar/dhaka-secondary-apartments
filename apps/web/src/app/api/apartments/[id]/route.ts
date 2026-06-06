import { NextRequest } from 'next/server';
import { updateApartment, archiveApartment } from '@/lib/services';
import { requireAuth, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth(request, ['ADMIN']);
    const { id } = await params;
    const body = await request.json();
    return json(await updateApartment(id, body));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth(request, ['ADMIN']);
    const { id } = await params;
    return json(await archiveApartment(id));
  } catch (error) {
    return handleApiError(error);
  }
}
