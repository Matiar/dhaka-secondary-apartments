import { NextRequest } from 'next/server';
import { getUserProfile } from '@/lib/services';
import { requireAuth, ApiError, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const profile = await getUserProfile(user.id);
    if (!profile) throw new ApiError('Unauthorized', 401);
    return json(profile);
  } catch (error) {
    return handleApiError(error);
  }
}
