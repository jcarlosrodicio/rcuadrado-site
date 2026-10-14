/** Redondea a una décima para que los path del SVG no lleven decimales de sobra. */
export const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Curva suave (Catmull-Rom a Bézier) que pasa por los puntos. Los puntos de control no
 * bajan de la línea base, para no dibujar valores negativos que no existen.
 */
export function smooth(p: number[][], base: number) {
  let d = `M${r1(p[0][0])},${r1(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    const c1y = Math.min(base, b[1] + (c[1] - a[1]) / 6), c2y = Math.min(base, c[1] - (e[1] - b[1]) / 6);
    d += ` C${r1(b[0] + (c[0] - a[0]) / 6)},${r1(c1y)} ${r1(c[0] - (e[0] - b[0]) / 6)},${r1(c2y)} ${r1(c[0])},${r1(c[1])}`;
  }
  return d;
}
