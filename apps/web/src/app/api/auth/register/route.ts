import { NextRequest } from 'next/server';
import { registerUser } from '@/lib/services';
import { signToken, requireAuth, ApiError, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await registerUser(body);
    const token = await signToken({ id: user.id, email: user.email, role: user.role });
    return json({ user, token }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already registered') {
      return handleApiError(new ApiError(error.message, 409));
    }
    return handleApiError(error);
  }
}
