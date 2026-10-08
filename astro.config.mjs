import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rcuadrado.es',
  trailingSlash: 'always',
  security: {
    // Astro añade una <meta> CSP con los hashes de sus scripts y estilos.
    // style-src-attr permite los style="" de colores y alturas, que no ejecutan código.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
});
