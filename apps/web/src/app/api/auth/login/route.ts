import { NextRequest } from 'next/server';
import { loginUser } from '@/lib/services';
import { signToken, ApiError, handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await loginUser(email, password);
    const token = await signToken({ id: user.id, email: user.email, role: user.role });
    return json({ user, token });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      return handleApiError(new ApiError(error.message, 401));
    }
    return handleApiError(error);
  }
}
