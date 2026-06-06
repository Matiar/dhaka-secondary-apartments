import { NextRequest } from 'next/server';
import { createContactInquiry } from '@/lib/services';
import { handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return json(await createContactInquiry(body), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
