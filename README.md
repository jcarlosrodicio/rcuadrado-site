# rcuadrado

Web personal de Juan Carlos Rodicio (Rcuadrado). Astro estático, español en `/` e
inglés en `/en/`.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # regenera la actividad y genera dist/
```

## Dónde se edita cada cosa

| Qué | Fichero |
|---|---|
| Proyectos (textos, estado, enlaces, capturas) | `src/data/projects.ts` |
| Portada, trayectoria, qué hago, contacto | `src/i18n.ts` |
| Estilos | `src/styles/global.css` |
| CV descargable | `public/cv/juan-carlos-rodicio-cv-en.pdf` |

## Actividad automática

`src/data/activity.json` (commits por semana, último commit, total) lo genera
`scripts/activity.mjs` desde la API de GitHub, rama por defecto de cada repo. En local
usa el token de `gh auth token --user jcarlosrodicio`; si no hay token, lee el git local;
si tampoco, conserva los datos anteriores. Lo que no se actualiza solo son los textos
("Ahora", Hecho / Ahora / Después): esos se editan en `projects.ts`.

El workflow `.github/workflows/deploy.yml` lo ejecuta en cada push a `main` y cada día a
las 05:17 UTC, guarda el JSON en el repo y publica en GitHub Pages.

### Puesta en marcha (una vez)

1. Crear el repo en GitHub y subir este proyecto a `main`.
2. Crear un token *fine-grained* en la cuenta `jcarlosrodicio`: acceso solo a los repos de
   los proyectos (tally, grapit, intriga, aqorin, norma, opencode-agent-orchestration-kit,
   grodar, agent-observability), permiso **Contents: read-only**. Guardarlo como secreto
   `ACTIVITY_TOKEN` del repo. Caduca como mucho al año: si caduca, la web sigue
   publicándose con los últimos datos.
3. Settings → Pages → Source: **GitHub Actions**. Dominio propio: `rcuadrado.es`.
4. DNS de `rcuadrado.es` (hoy apunta a IONOS, 217.160.0.85): registros A de GitHub Pages
   (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) y
   `www` como CNAME a `jcarlosrodicio.github.io`. Activar HTTPS cuando haya certificado.

Un proyecto nuevo con actividad: añadirlo en `src/data/projects.ts` y en `REPOS` de
`scripts/activity.mjs`, y dar acceso al token a ese repo.
