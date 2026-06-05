import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alcove Residences',
    short_name: 'Alcove',
    description: 'Premium curated apartments in Dhaka',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#171717',
  };
}
