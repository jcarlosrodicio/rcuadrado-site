import activity from './activity.json';

export type Lang = 'es' | 'en';
type T<V = string> = Record<Lang, V>;
export type Kind = 'app' | 'agents' | 'data';
export type Status = 'published' | 'building' | 'paused';

export interface Activity { since: string; last: string; commits: number; weeks: number[] }

export interface Project {
  id: string;
  name: string;
  kind: Kind;
  status: Status;
  color: string;
  icon?: string;
  glyph?: string;
  tagline: T;
  now?: T;
  version?: T;
  role: T;
  about: T;
  stack: string[];
  done: T<string[]>;
  doing: T<string[]>;
  next: T<string[]>;
  links: { label: T; url: string }[];
  gallery?: string[];
  cli?: string;
  activity?: Activity;
}

const projects: Omit<Project, 'activity'>[] = [
  {
    id: 'tally', name: 'Tally', kind: 'app', status: 'published', color: 'oklch(0.56 0.2 262)',
    icon: '/assets/tally-icon.png',
    tagline: { es: 'Control de gastos sin conectar el banco.', en: 'Expense tracking without connecting your bank.' },
    now: { es: 'Mejoras tras la 2.6.0', en: 'Improvements after 2.6.0' },
    version: { es: 'v2.6.0 · App Store y Google Play', en: 'v2.6.0 · App Store and Google Play' },
    role: { es: 'Todo: producto, diseño, código, release y ASO.', en: 'Everything: product, design, code, release and ASO.' },
    about: {
      es: 'App de finanzas personales para iOS y Android. Los datos privados viven en el móvil (local-first) y solo salen las cuentas que el usuario decide compartir, cifradas. Límites Clean, DDD y hexagonal por funcionalidad, persistencia con Drift, Supabase Auth y releases automatizadas con fastlane.',
      en: 'Personal finance app for iOS and Android. Private data stays on the phone (local-first); only the accounts the user chooses to share leave it, encrypted. Feature-owned Clean, DDD and hexagonal boundaries, Drift persistence, Supabase Auth and releases automated with fastlane.',
    },
    stack: ['Flutter', 'Drift', 'Supabase', 'fastlane', 'RevenueCat', 'PostHog', 'Sentry'],
    done: {
      es: ['Publicada en App Store y Google Play', 'Multi-cuenta, 45 divisas, metas y estadísticas', 'Importación de extractos y Norma 43 (PRO)', 'Cuentas compartidas cifradas vía Supabase (PRO)', 'Captura de pagos desde Apple Pay y Google Wallet (PRO)'],
      en: ['Live on the App Store and Google Play', 'Multiple accounts, 45 currencies, goals and statistics', 'Bank statement and Norma 43 import (PRO)', 'Encrypted shared accounts through Supabase (PRO)', 'Payment capture from Apple Pay and Google Wallet (PRO)'],
    },
    doing: { es: ['Siguiente versión, sin fecha fijada'], en: ['Next version, no date set'] },
    next: { es: [], en: [] },
    links: [
      { label: { es: 'Web', en: 'Website' }, url: 'https://tally.rcuadrado.es' },
      { label: { es: 'App Store', en: 'App Store' }, url: 'https://apps.apple.com/es/app/tally-control-de-gastos/id6768200630' },
      { label: { es: 'Google Play', en: 'Google Play' }, url: 'https://play.google.com/store/apps/details?id=com.rcuadrado.tally' },
    ],
    gallery: ['/assets/tally-01.png', '/assets/tally-02-anadir-gasto.png', '/assets/tally-03.png', '/assets/tally-04-cuentas.png', '/assets/tally-05-tickets.png', '/assets/tally-06-metas.png'],
  },
  {
    id: 'grapit', name: 'Grapit', kind: 'app', status: 'building', color: 'oklch(0.55 0.09 185)',
    icon: '/assets/grapit-icon.png',
    tagline: { es: 'Firma, escanea y une PDFs sin que salgan del móvil.', en: 'Sign, scan and merge PDFs without them leaving your phone.' },
    now: { es: 'Herramientas del MVP · 10 de 25 fases hacia la v1', en: 'MVP tools · 10 of 25 phases to v1' },
    role: { es: 'Todo: producto, diseño y código.', en: 'Everything: product, design and code.' },
    about: {
      es: 'Caja de herramientas PDF que lo procesa todo en el dispositivo: sin servidor, sin cuenta y sin anuncios, con Pro de pago único. Accesibilidad como requisito: texto dinámico al 200 %, VoiceOver y TalkBack.',
      en: 'PDF toolbox that processes everything on the device: no server, no account, no ads, with a one-off Pro purchase. Accessibility as a requirement: dynamic type up to 200%, VoiceOver and TalkBack.',
    },
    stack: ['Flutter', 'Syncfusion PDF', 'On-device'],
    done: {
      es: ['Motor PDF probado con documentos grandes', 'Abrir y compartir desde otras apps en iOS y Android', 'Firmar, unir y bóveda de firmas', 'Límites de Pro (aún sin compras)'],
      en: ['PDF engine proven on large documents', 'Open in and share from other apps on iOS and Android', 'Sign, merge and a signature vault', 'Pro limits (no purchases yet)'],
    },
    doing: { es: ['Escanear y ajustar el escaneo'], en: ['Scanning and scan adjustment'] },
    next: {
      es: ['Dividir, anotar, formularios y OCR', 'Bloqueado: compras (RevenueCat) y analítica (PostHog EU)', 'Lanzamiento en las dos tiendas'],
      en: ['Split, annotate, forms and OCR', 'Blocked: purchases (RevenueCat) and analytics (PostHog EU)', 'Launch on both stores'],
    },
    links: [],
  },
  {
    id: 'intriga', name: 'Intriga', kind: 'app', status: 'building', color: 'oklch(0.72 0.15 70)',
    icon: '/assets/intriga-icon.png',
    tagline: { es: 'Juego de misterio: investigas el móvil de otra persona.', en: 'Mystery game: you investigate someone else’s phone.' },
    now: { es: 'Revisando el caso gratuito tras el playtest', en: 'Reworking the free case after the playtest' },
    role: { es: 'Todo: diseño del juego, casos y código.', en: 'Everything: game design, cases and code.' },
    about: {
      es: 'Cada caso es un formato propio que se valida con un CLI. Un agente Solver intenta resolverlo y un Critic juzga si es justo antes de que lo juegue una persona. Primer caso gratis, el resto con pago único.',
      en: 'Each case is a custom format validated by a CLI. A Solver agent tries to crack it and a Critic judges whether it is fair before a person ever plays it. First case free, the rest as one-off purchases.',
    },
    stack: ['Flutter', 'Dart CLI', 'Solver + Critic agents'],
    done: {
      es: ['Formato de caso y validador (case validate)', 'Móvil del caso: mensajes, galería, notas, calendario, llamadas', 'Skill de autoría con Solver y Critic', 'Primer caso gratuito', 'Playtest con personas reales (hito 1)'],
      en: ['Case format and validator (case validate)', 'The case phone: messages, gallery, notes, calendar, calls', 'Authoring skill with Solver and Critic', 'First free case', 'Playtest with real people (milestone 1)'],
    },
    doing: { es: ['Revisión del caso gratuito y ajustes de interfaz del playtest'], en: ['Free case rework and UI fixes from the playtest'] },
    next: {
      es: ['Catálogo remoto, pistas y compras', 'Tres casos de pago', 'Lanzamiento en las dos tiendas'],
      en: ['Remote catalogue, hints and purchases', 'Three paid cases', 'Launch on both stores'],
    },
    links: [],
  },
  {
    id: 'aqorin', name: 'Aqorin', kind: 'agents', status: 'building', color: 'oklch(0.64 0.2 37)',
    glyph: 'Aq',
    tagline: { es: 'Orquestación de agentes de código, independiente del runtime.', en: 'Runtime-agnostic orchestration for coding agents.' },
    now: { es: 'Thesis Validation Track tras cerrar la fase 23', en: 'Thesis Validation Track after closing phase 23' },
    version: { es: '@aqorin/cli 0.1.0 en npm · repo privado', en: '@aqorin/cli 0.1.0 on npm · private repo' },
    role: { es: 'Diseño, arquitectura y código.', en: 'Design, architecture and code.' },
    about: {
      es: 'Es dueño de flujos de ingeniería canónicos y mapea su ejecución sobre distintos runtimes de agentes: OpenCode, jcode, Pi y Codex. SDK de adaptadores por capacidades sobre paquetes TypeScript hexagonales y contratos JSON Schema, así que un runtime nuevo es un adaptador y no una reescritura. Ejecuciones durables en SQLite, provisión con consentimiento y checkpoints de experiencia humana obligatorios.',
      en: 'Owns canonical engineering workflows and maps their execution onto different coding-agent runtimes: OpenCode, jcode, Pi and Codex. Capability-based Runtime Adapter SDK over hexagonal TypeScript packages and JSON Schema contracts, so a new runtime is an adapter, not a rewrite. SQLite-backed durable runs, consent-gated provisioning and mandatory Human Experience Checkpoints.',
    },
    stack: ['TypeScript', 'Node', 'SQLite', 'JSON Schema'],
    done: {
      es: ['@aqorin/cli 0.1.0 publicado en npm (macOS arm64 verificado)', '23 fases de producto cerradas con evidencia de salida', 'TV0 cerrada'],
      en: ['@aqorin/cli 0.1.0 published on npm (macOS arm64 verified)', '23 product phases closed with recorded exit evidence', 'TV0 closed'],
    },
    doing: { es: ['Thesis Validation Track'], en: ['Thesis Validation Track'] },
    next: { es: [], en: [] },
    links: [{ label: { es: 'Web', en: 'Website' }, url: 'https://aqorin.rcuadrado.es' }],
    cli: 'npm i -g @aqorin/cli',
  },
  {
    id: 'norma', name: 'norma', kind: 'agents', status: 'building', color: 'oklch(0.42 0.02 85)',
    glyph: 'n',
    tagline: { es: 'El harness de tareas para agentes, instalable en cualquier repo.', en: 'The agent task harness, installable in any repository.' },
    now: { es: 'Afinando la v0.20.0 en mis repos', en: 'Tuning v0.20.0 across my repos' },
    version: { es: 'v0.20.0 · repo privado', en: 'v0.20.0 · private repo' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'Un bucle, una puerta de verificación y una librería de skills, iguales sea cual sea el agente que conduce, porque todo se referencia por ruta de fichero y lo hace cumplir git, no el sistema de hooks de un agente concreto. Es el harness que uso en el resto de mis proyectos.',
      en: 'One loop, one verification gate and one skill library, identical whichever agent is driving, because everything is referenced by file path and enforced by git rather than by any single agent’s hook system. It is the harness I use across my other projects.',
    },
    stack: ['Shell', 'git hooks', 'Agent skills'],
    done: {
      es: ['16 perfiles de stack (Flutter, Swift, Go, Rust, Next, Django...)', 'install, upgrade, doctor y start', 'Instalado en mis otros repos'],
      en: ['16 stack profiles (Flutter, Swift, Go, Rust, Next, Django...)', 'install, upgrade, doctor and start', 'Installed in my other repos'],
    },
    doing: { es: [], en: [] },
    next: { es: [], en: [] },
    links: [],
    cli: 'norma install',
  },
  {
    id: 'oak', name: 'OAK', kind: 'agents', status: 'published', color: 'oklch(0.58 0.13 145)',
    glyph: 'OAK',
    tagline: { es: 'Un equipo de agentes especializados para OpenCode.', en: 'A team of specialised agents for OpenCode.' },
    now: { es: 'Estable en v1.1.1', en: 'Stable at v1.1.1' },
    version: { es: 'v1.1.1 · Apache-2.0', en: 'v1.1.1 · Apache-2.0' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'OpenCode Agent Orchestration Kit: nueve roles especializados (lead, researcher, designer, specifier, developer, reviewer, evaluator, debugger y evolver) detrás de un router acotado. Flujos durables sobre snapshots JSON versionados e historial JSONL append-only, con hash de contratos, IDs idempotentes y bloqueo exclusivo para reanudar tras un fallo. Autonomía acotada: contratos explícitos, límites de iteración y una revisión independiente de solo lectura contra el alcance original.',
      en: 'OpenCode Agent Orchestration Kit: nine specialised roles (lead, researcher, designer, specifier, developer, reviewer, evaluator, debugger and evolver) behind a bounded lead router. Durable workflows on schema-versioned JSON snapshots and append-only JSONL history, with contract hashing, idempotent action IDs and exclusive locking for crash-safe resume. Bounded autonomy: explicit contracts, iteration caps and an independent read-only review against the original scope.',
    },
    stack: ['OpenCode', 'Node.js 22/24', 'Apache-2.0'],
    done: {
      es: ['Release v1.1.1', 'Modelo asignable por rol, agnóstico de proveedor', 'Reanudación segura tras fallos'],
      en: ['Release v1.1.1', 'Per-role model assignment, provider-agnostic', 'Crash-safe resume'],
    },
    doing: { es: [], en: [] },
    next: { es: [], en: [] },
    links: [{ label: { es: 'GitHub', en: 'GitHub' }, url: 'https://github.com/jcarlosrodicio/opencode-agent-orchestration-kit' }],
  },
  {
    id: 'grodar', name: 'Grodar', kind: 'data', status: 'building', color: 'oklch(0.58 0.18 350)',
    glyph: 'G',
    tagline: { es: 'Radar de crecimiento: señales de visibilidad convertidas en oportunidades.', en: 'Growth radar: visibility signals turned into opportunities.' },
    now: { es: 'Fase 4: secretos y conexiones', en: 'Phase 4: secrets and connections' },
    version: { es: 'Repo privado', en: 'Private repo' },
    role: { es: 'Diseño, arquitectura y código.', en: 'Design, architecture and code.' },
    about: {
      es: 'Plataforma multi-proyecto sobre un pipeline explícito: observación, señal, oportunidad, acción, experimento, medición y aprendizaje. Ingiere Search Console, Bing, Google Play, App Store Connect, SERP y búsqueda con IA, guarda los hechos en PostgreSQL y deriva oportunidades deterministas y explicables. Se expone en un dashboard y en Grodar MCP, para que los agentes consuman el mismo contrato que las personas.',
      en: 'Multi-project platform built on one explicit pipeline: observation, signal, opportunity, action, experiment, measurement and learning. Ingests Search Console, Bing, Google Play, App Store Connect, SERP and AI search, keeps the facts in PostgreSQL and derives deterministic, explainable opportunities. Exposed through a dashboard and Grodar MCP, so agents consume the same contract as humans.',
    },
    stack: ['TypeScript', 'pnpm + turbo', 'PostgreSQL', 'Drizzle', 'MCP'],
    done: {
      es: ['Monorepo y value objects', 'Aggregate Project', 'PostgreSQL y Drizzle, con el mismo contract test en memoria, PGlite y Postgres 17', 'CLI grodar y proyectos en YAML'],
      en: ['Monorepo and value objects', 'Project aggregate', 'PostgreSQL and Drizzle, one contract test suite on in-memory, PGlite and Postgres 17', 'grodar CLI and YAML project definitions'],
    },
    doing: { es: ['Secretos y conexiones'], en: ['Secrets and connections'] },
    next: { es: ['Conectores de fuentes', 'Señales y oportunidades', 'Dashboard y Grodar MCP'], en: ['Source connectors', 'Signals and opportunities', 'Dashboard and Grodar MCP'] },
    links: [],
  },
  {
    id: 'obs', name: 'Agent observability', kind: 'data', status: 'building', color: 'oklch(0.52 0.15 295)',
    glyph: 'Ob',
    tagline: { es: 'Trazas y evaluación de los agentes que ejecuto.', en: 'Tracing and evaluation for the agents I run.' },
    now: { es: 'Fase 25: evaluador en sombra', en: 'Phase 25: shadow evaluator' },
    role: { es: 'Diseño, infraestructura y código.', en: 'Design, infrastructure and code.' },
    about: {
      es: 'Laboratorio por fases de observabilidad de sistemas agénticos, desplegado en un NAS con agentes reales y con redacción fail-closed de datos sensibles. LangFuse traza cada agente que ejecuto y esas trazas alimentan puntuaciones y evaluadores propios, así que un cambio de harness se juzga por resultados medidos. Aparte, un Arize Phoenix autoalojado traza las llamadas a LLM del escaneo de tickets de Tally.',
      en: 'Phased lab for agentic-system observability, deployed on a NAS with real agents and fail-closed redaction of sensitive data. LangFuse traces every agent I run and those traces feed task scores and custom evaluators, so a harness change is judged on measured outcomes. Separately, a self-hosted Arize Phoenix traces the receipt-scan LLM calls in Tally.',
    },
    stack: ['OpenTelemetry', 'LangFuse', 'Arize Phoenix', 'Tempo', 'Prometheus', 'Grafana'],
    done: {
      es: ['Trazas OTel, Collector, métricas y dashboards', 'Convenciones GenAI, router, retry y subagentes', 'Despliegue en NAS con agentes reales', 'Primera campaña real de benchmark: 12 observaciones verificadas'],
      en: ['OTel traces, Collector, metrics and dashboards', 'GenAI conventions, routing, retries and subagents', 'NAS deployment with real agents', 'First real benchmark campaign: 12 verified observations'],
    },
    doing: { es: ['Evaluador en sombra'], en: ['Shadow evaluator'] },
    next: { es: [], en: [] },
    links: [],
  },
  {
    id: 'cinepedia', name: 'Cinepedia', kind: 'app', status: 'published', color: 'oklch(0.58 0.15 25)',
    glyph: 'C',
    tagline: { es: 'Navegador de información de cine para iOS y Android.', en: 'Film information browser for iOS and Android.' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'App Flutter que integra APIs externas de cine detrás de una arquitectura modular. Está publicada, pero ahora mismo no la estoy desarrollando.',
      en: 'Flutter app integrating external film APIs behind a modular architecture. It is live, but I am not actively developing it right now.',
    },
    version: { es: 'App Store y Google Play · sin desarrollo activo', en: 'App Store and Google Play · not in active development' },
    stack: ['Flutter', 'REST APIs'],
    done: { es: ['Publicada en App Store y Google Play'], en: ['Live on the App Store and Google Play'] },
    doing: { es: [], en: [] },
    next: { es: [], en: [] },
    links: [
      { label: { es: 'App Store', en: 'App Store' }, url: 'https://apps.apple.com/es/app/cinepedia/id6463052440' },
      { label: { es: 'Google Play', en: 'Google Play' }, url: 'https://play.google.com/store/apps/details?id=com.rcuadrado.cinepedia' },
    ],
  },
];

const data = activity.projects as Record<string, Activity>;

/** Proyectos ordenados por actividad reciente; los que no tienen git quedan al final. */
export const PROJECTS: Project[] = projects
  .map((p) => ({ ...p, activity: data[p.id] }))
  .sort((a, b) => (b.activity?.last ?? '').localeCompare(a.activity?.last ?? ''));

export const GENERATED_AT = activity.generatedAt;
