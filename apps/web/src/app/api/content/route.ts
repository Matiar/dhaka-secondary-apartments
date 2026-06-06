import { getPublicContent } from '@/lib/services';
import { handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return json(await getPublicContent());
  } catch (error) {
    return handleApiError(error);
  }
}
