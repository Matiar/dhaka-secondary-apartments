import { getLocations } from '@/lib/services';
import { handleApiError, json } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    return json(await getLocations());
  } catch (error) {
    return handleApiError(error);
  }
}
