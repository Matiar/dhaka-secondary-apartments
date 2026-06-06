import { NextRequest } from 'next/server';
import { getDashboardStats } from '@/lib/services';
import { requireAuth, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request, ['ADMIN']);
    return json(await getDashboardStats());
  } catch (error) {
    return handleApiError(error);
  }
}
