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
| Proyectos (textos fijos, enlaces, capturas) | `src/data/projects.ts` |
| Estado de cada proyecto (Ahora, Hecho, En curso, Después, changelog) | `src/data/status.json` |
| Portada, trayectoria, qué hago, contacto | `src/i18n.ts` |
| Estilos | `src/styles/global.css` |
| CV descargable | `public/cv/juan-carlos-rodicio-cv-en.pdf` |

## Actividad automática

`src/data/activity.json` (commits por semana, último commit, total) lo genera
`scripts/activity.mjs` desde la API de GitHub, rama por defecto de cada repo. En local
usa el token de `gh auth token --user jcarlosrodicio`; si no hay token, lee el git local;
si tampoco, conserva los datos anteriores.

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

Un proyecto nuevo con actividad: añadirlo en `src/data/projects.ts`, en `src/data/status.json`
y en `REPOS` de `scripts/github.mjs`, y dar acceso al token a ese repo.

## Estado y changelog con IA

`.github/workflows/status.yml` se ejecuta cada día (05:47 UTC) y a mano desde Actions.
`scripts/status-ai.mjs` lee las PRs mergeadas desde la última revisión de cada proyecto
(**solo título y descripción**, nunca código), se las pasa a un modelo con API compatible
con OpenAI (NaN por defecto) junto con el estado actual, y aplica lo que proponga en
`src/data/status.json`: entradas de changelog y, si cambia, Ahora / Hecho / En curso /
Después, en español e inglés.

Antes de aceptar una respuesta la valida: JSON con la forma esperada, PRs que existen,
textos cortos y sin URLs, rutas, IPs ni claves. Si un proyecto falla, su corte
(`checkedUntil`) no avanza y se reintenta al día siguiente.

Nunca publica solo: deja los cambios en la rama `ia/estado` con **una PR** para revisar.
Mientras esa PR siga abierta, los cambios de los días siguientes se acumulan en ella. Si la
cierras sin mergear, se descarta y el siguiente día se vuelve a proponer desde `main`. Los
textos de una PR de este repo son públicos aunque no se mergee.

Configuración (Settings → Secrets and variables → Actions):

| Nombre | Tipo | Valor |
|---|---|---|
| `NAN_API_KEY` | secreto | clave de la API de NaN |
| `NAN_MODEL` | variable | id del modelo, p. ej. el que devuelva `GET /v1/models` |
| `NAN_BASE_URL` | variable (opcional) | por defecto `https://api.nan.builders/v1` |
| `ACTIVITY_TOKEN` | secreto | el mismo token de la actividad, con **Pull requests: read-only** además de Contents |

Para revisar un periodo pasado: Actions → Estado con IA → Run workflow → `since: YYYY-MM-DD`.
