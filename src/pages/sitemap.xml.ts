import { PROJECTS } from '../data/projects';
import { home, projectUrl } from '../i18n';

// Cada página con su par en el otro idioma (hreflang), para que Google las relacione.
export function GET({ site }: { site: URL }) {
  const abs = (path: string) => new URL(path, site).href;
  const pairs = [
    { es: home('es'), en: home('en') },
    ...PROJECTS.map((p) => ({ es: projectUrl('es', p.id), en: projectUrl('en', p.id) })),
  ];
  const urls = pairs.flatMap((pair) =>
    (['es', 'en'] as const).map((lang) => `  <url>
    <loc>${abs(pair[lang])}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${abs(pair.es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(pair.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pair.es)}"/>
  </url>`),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
