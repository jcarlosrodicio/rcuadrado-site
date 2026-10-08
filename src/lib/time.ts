import type { Lang } from '../data/projects';

const DAY = 86400000;

/** "hace 3 días" / "3 days ago". El cliente lo recalcula con la fecha real (ver Layout). */
export function ago(date: string | undefined, lang: Lang, now = new Date()): string {
  if (!date) return '';
  const d = Math.max(0, Math.round((now.getTime() - new Date(date).getTime()) / DAY));
  if (lang === 'es') {
    if (d === 0) return 'hoy';
    if (d === 1) return 'ayer';
    return d < 14 ? `hace ${d} días` : `hace ${Math.round(d / 7)} semanas`;
  }
  if (d === 0) return 'today';
  if (d === 1) return 'yesterday';
  return d < 14 ? `${d} days ago` : `${Math.round(d / 7)} weeks ago`;
}

export const daysSince = (date: string | undefined, now = new Date()) =>
  date ? Math.round((now.getTime() - new Date(date).getTime()) / DAY) : Infinity;
