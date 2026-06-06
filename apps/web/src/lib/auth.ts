import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'change-this-to-a-secure-random-string'
);

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.sub as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return verifyToken(header.slice(7));
}

export async function requireAuth(request: NextRequest, roles?: string[]): Promise<AuthUser> {
  const user = await getAuthUser(request);
  if (!user) throw new ApiError('Unauthorized', 401);
  if (roles && !roles.includes(user.role)) throw new ApiError('Forbidden', 403);
  return user;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 400
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json({ message: error.message }, { status: error.status });
  }
  console.error(error);
  return Response.json({ message: 'Internal server error' }, { status: 500 });
}

export function json<T>(data: T, status = 200) {
  return Response.json(data, { status });
}
