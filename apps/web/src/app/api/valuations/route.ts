import { NextRequest } from 'next/server';
import { createValuation } from '@/lib/services';
import { handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return json(await createValuation(body), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
