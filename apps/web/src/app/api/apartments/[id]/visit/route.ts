import { NextRequest } from 'next/server';
import { createVisitRequest } from '@/lib/services';
import { getAuthUser, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const user = await getAuthUser(request);
    return json(await createVisitRequest(id, body, user?.id));
  } catch (error) {
    return handleApiError(error);
  }
}
