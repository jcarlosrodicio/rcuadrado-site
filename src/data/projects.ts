import activity from './activity.json';
import status from './status.json';

export type Lang = 'es' | 'en';
type T<V = string> = Record<Lang, V>;
export type Kind = 'app' | 'agents' | 'data';
export type Status = 'published' | 'building' | 'paused';

/** Entrada del changelog; la escribe scripts/status-ai.mjs a partir de PRs mergeadas. */
export interface ChangelogEntry { date: string; prs: number[]; url?: string; es: string; en: string }

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
  changelog: ChangelogEntry[];
  gallery?: string[];
  /** Vídeo propio (mp4 en public/assets) con su imagen de portada. */
  video?: { src: string; poster: string };
  cli?: string;
  activity?: Activity;
}

type Editable = 'now' | 'done' | 'doing' | 'next' | 'changelog' | 'activity';

// Lo que cambia con el trabajo (Ahora, Hecho, En curso, Después, changelog) vive en
// status.json, que puede actualizar la IA con una PR revisable.
const projects: Omit<Project, Editable>[] = [
  {
    id: 'tally', name: 'Tally', kind: 'app', status: 'published', color: 'oklch(0.56 0.2 262)',
    icon: '/assets/tally-icon.png',
    tagline: { es: 'Control de gastos sin conectar el banco.', en: 'Expense tracking without connecting your bank.' },
    version: { es: 'v2.6.0 · App Store y Google Play', en: 'v2.6.0 · App Store and Google Play' },
    role: { es: 'Todo: producto, diseño, código, release y ASO.', en: 'Everything: product, design, code, release and ASO.' },
    about: {
      es: 'App de finanzas personales para iOS y Android. Los datos privados viven en el móvil (local-first) y solo salen las cuentas que el usuario decide compartir, cifradas. Límites Clean, DDD y hexagonal por funcionalidad, persistencia con Drift, Supabase Auth y releases automatizadas con fastlane.',
      en: 'Personal finance app for iOS and Android. Private data stays on the phone (local-first); only the accounts the user chooses to share leave it, encrypted. Feature-owned Clean, DDD and hexagonal boundaries, Drift persistence, Supabase Auth and releases automated with fastlane.',
    },
    stack: ['Flutter', 'Drift', 'Supabase', 'fastlane', 'RevenueCat', 'PostHog', 'Sentry'],
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
    role: { es: 'Todo: producto, diseño y código.', en: 'Everything: product, design and code.' },
    about: {
      es: 'Caja de herramientas PDF que lo procesa todo en el dispositivo: sin servidor, sin cuenta y sin anuncios, con Pro de pago único. Accesibilidad como requisito: texto dinámico al 200 %, VoiceOver y TalkBack.',
      en: 'PDF toolbox that processes everything on the device: no server, no account, no ads, with a one-off Pro purchase. Accessibility as a requirement: dynamic type up to 200%, VoiceOver and TalkBack.',
    },
    stack: ['Flutter', 'Syncfusion PDF', 'On-device'],
    links: [],
  },
  {
    id: 'intriga', name: 'Intriga', kind: 'app', status: 'building', color: 'oklch(0.72 0.15 70)',
    icon: '/assets/intriga-icon.png',
    tagline: { es: 'Juego de misterio: investigas el móvil de otra persona.', en: 'Mystery game: you investigate someone else’s phone.' },
    role: { es: 'Todo: diseño del juego, casos y código.', en: 'Everything: game design, cases and code.' },
    about: {
      es: 'Cada caso es un formato propio que se valida con un CLI. Un agente Solver intenta resolverlo y un Critic juzga si es justo antes de que lo juegue una persona. Primer caso gratis, el resto con pago único.',
      en: 'Each case is a custom format validated by a CLI. A Solver agent tries to crack it and a Critic judges whether it is fair before a person ever plays it. First case free, the rest as one-off purchases.',
    },
    stack: ['Flutter', 'Dart CLI', 'Solver + Critic agents'],
    links: [],
  },
  {
    id: 'aqorin', name: 'Aqorin', kind: 'agents', status: 'building', color: 'oklch(0.64 0.2 37)',
    glyph: 'Aq',
    tagline: { es: 'Orquestación de agentes de código, independiente del runtime.', en: 'Runtime-agnostic orchestration for coding agents.' },
    version: { es: '@aqorin/cli 0.2.0 en npm · repo privado', en: '@aqorin/cli 0.2.0 on npm · private repo' },
    role: { es: 'Diseño, arquitectura y código.', en: 'Design, architecture and code.' },
    about: {
      es: 'Es dueño de flujos de ingeniería canónicos y mapea su ejecución sobre distintos runtimes de agentes: Claude Code, Codex, OpenCode y Pi. SDK de adaptadores por capacidades sobre paquetes TypeScript hexagonales y contratos JSON Schema, así que un runtime nuevo es un adaptador y no una reescritura. Ejecuciones durables en SQLite, provisión con consentimiento y checkpoints de experiencia humana obligatorios.',
      en: 'Owns canonical engineering workflows and maps their execution onto different coding-agent runtimes: Claude Code, Codex, OpenCode and Pi. Capability-based Runtime Adapter SDK over hexagonal TypeScript packages and JSON Schema contracts, so a new runtime is an adapter, not a rewrite. SQLite-backed durable runs, consent-gated provisioning and mandatory Human Experience Checkpoints.',
    },
    stack: ['TypeScript', 'Node', 'SQLite', 'JSON Schema'],
    links: [{ label: { es: 'Web', en: 'Website' }, url: 'https://aqorin.rcuadrado.es' }],
    cli: 'npm i -g @aqorin/cli',
  },
  {
    id: 'norma', name: 'norma', kind: 'agents', status: 'published', color: 'oklch(0.42 0.02 85)',
    glyph: 'n',
    tagline: { es: 'Un bucle, una puerta y unas skills para cualquier agente de código, impuestos por git.', en: 'One task loop, one gate and one skill library for every coding agent, enforced by git.' },
    version: { es: 'v0.21.0 · MIT · open source', en: 'v0.21.0 · MIT · open source' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'Instala y mantiene un harness de tareas en cualquier repositorio. Conduzca quien conduzca (Claude Code, Codex, OpenCode, Cursor…), el agente sigue el mismo procedimiento, leído por ruta de fichero desde el repo, y no puede hacer commit hasta pasar la misma puerta de verificación: la impone un hook de git, no el sistema de un agente concreto. POSIX sh, sin dependencias. Es el harness que uso en el resto de mis proyectos.',
      en: 'Installs and maintains a task harness in any repository. Whatever agent is driving (Claude Code, Codex, OpenCode, Cursor…), it follows the same procedure, read by file path from the repo, and cannot commit until the same verification gate has passed: a git hook enforces it, not any one agent’s hook system. POSIX sh, no dependencies. It is the harness I use across my other projects.',
    },
    stack: ['POSIX sh', 'git hooks', 'Agent skills', 'Homebrew'],
    links: [{ label: { es: 'GitHub', en: 'GitHub' }, url: 'https://github.com/jcarlosrodicio/norma' }],
    video: { src: '/assets/norma-launch.mp4', poster: '/assets/norma-launch-poster.jpg' },
    cli: 'brew install jcarlosrodicio/tap/norma',
  },
  {
    id: 'oak', name: 'OAK', kind: 'agents', status: 'published', color: 'oklch(0.58 0.13 145)',
    glyph: 'OAK',
    tagline: { es: 'Un equipo de agentes especializados para OpenCode.', en: 'A team of specialised agents for OpenCode.' },
    version: { es: 'v1.1.1 · Apache-2.0', en: 'v1.1.1 · Apache-2.0' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'OpenCode Agent Orchestration Kit: nueve roles especializados (lead, researcher, designer, specifier, developer, reviewer, evaluator, debugger y evolver) detrás de un router acotado. Flujos durables sobre snapshots JSON versionados e historial JSONL append-only, con hash de contratos, IDs idempotentes y bloqueo exclusivo para reanudar tras un fallo. Autonomía acotada: contratos explícitos, límites de iteración y una revisión independiente de solo lectura contra el alcance original.',
      en: 'OpenCode Agent Orchestration Kit: nine specialised roles (lead, researcher, designer, specifier, developer, reviewer, evaluator, debugger and evolver) behind a bounded lead router. Durable workflows on schema-versioned JSON snapshots and append-only JSONL history, with contract hashing, idempotent action IDs and exclusive locking for crash-safe resume. Bounded autonomy: explicit contracts, iteration caps and an independent read-only review against the original scope.',
    },
    stack: ['OpenCode', 'Node.js 22/24', 'Apache-2.0'],
    links: [{ label: { es: 'GitHub', en: 'GitHub' }, url: 'https://github.com/jcarlosrodicio/opencode-agent-orchestration-kit' }],
  },
  {
    id: 'grodar', name: 'Grodar', kind: 'data', status: 'building', color: 'oklch(0.58 0.18 350)',
    glyph: 'G',
    tagline: { es: 'Radar de crecimiento: señales de visibilidad convertidas en oportunidades.', en: 'Growth radar: visibility signals turned into opportunities.' },
    version: { es: 'Repo privado', en: 'Private repo' },
    role: { es: 'Diseño, arquitectura y código.', en: 'Design, architecture and code.' },
    about: {
      es: 'Plataforma multi-proyecto sobre un pipeline explícito: observación, señal, oportunidad, acción, experimento, medición y aprendizaje. Ingiere Search Console, Bing, Google Play, App Store Connect, SERP y búsqueda con IA, guarda los hechos en PostgreSQL y deriva oportunidades deterministas y explicables. Se expone en un dashboard y en Grodar MCP, para que los agentes consuman el mismo contrato que las personas.',
      en: 'Multi-project platform built on one explicit pipeline: observation, signal, opportunity, action, experiment, measurement and learning. Ingests Search Console, Bing, Google Play, App Store Connect, SERP and AI search, keeps the facts in PostgreSQL and derives deterministic, explainable opportunities. Exposed through a dashboard and Grodar MCP, so agents consume the same contract as humans.',
    },
    stack: ['TypeScript', 'pnpm + turbo', 'PostgreSQL', 'Drizzle', 'MCP'],
    links: [],
  },
  {
    id: 'obs', name: 'Agent observability', kind: 'data', status: 'building', color: 'oklch(0.52 0.15 295)',
    glyph: 'Ob',
    tagline: { es: 'Trazas y evaluación de los agentes que ejecuto.', en: 'Tracing and evaluation for the agents I run.' },
    role: { es: 'Diseño, infraestructura y código.', en: 'Design, infrastructure and code.' },
    about: {
      es: 'Laboratorio por fases de observabilidad de sistemas agénticos, desplegado en un NAS con agentes reales y con redacción fail-closed de datos sensibles. LangFuse traza cada agente que ejecuto y esas trazas alimentan puntuaciones y evaluadores propios, así que un cambio de harness se juzga por resultados medidos. Aparte, un Arize Phoenix autoalojado traza las llamadas a LLM del escaneo de tickets de Tally.',
      en: 'Phased lab for agentic-system observability, deployed on a NAS with real agents and fail-closed redaction of sensitive data. LangFuse traces every agent I run and those traces feed task scores and custom evaluators, so a harness change is judged on measured outcomes. Separately, a self-hosted Arize Phoenix traces the receipt-scan LLM calls in Tally.',
    },
    stack: ['OpenTelemetry', 'LangFuse', 'Arize Phoenix', 'Tempo', 'Prometheus', 'Grafana'],
    links: [],
  },
  {
    id: 'cinepedia', name: 'Cinepedia', kind: 'app', status: 'published', color: 'oklch(0.58 0.15 25)',
    icon: '/assets/cinepedia-icon.png',
    tagline: { es: 'Estrenos de cine y series, en salas y en streaming.', en: 'Film and TV releases, in cinemas and on streaming.' },
    role: { es: 'Diseño y código.', en: 'Design and code.' },
    about: {
      es: 'App de información de cine y series: estrenos en salas y en plataformas de streaming, lo más visto y búsqueda, con filtros por plataforma y favoritos. Hecha en Flutter, integra APIs externas de cine detrás de una arquitectura modular. Publicada desde 2023; ahora mismo no la estoy desarrollando.',
      en: 'Film and TV information app: releases in cinemas and on streaming platforms, trending titles and search, with platform filters and favourites. Built in Flutter, it integrates external film APIs behind a modular architecture. Live since 2023; I am not actively developing it right now.',
    },
    version: { es: 'v3.3.0 · App Store y Google Play · sin desarrollo activo', en: 'v3.3.0 · App Store and Google Play · not in active development' },
    stack: ['Flutter', 'REST APIs'],
    gallery: ['/assets/cinepedia-01.jpg', '/assets/cinepedia-02.jpg', '/assets/cinepedia-03.jpg', '/assets/cinepedia-04.jpg', '/assets/cinepedia-05.jpg', '/assets/cinepedia-06.jpg', '/assets/cinepedia-07.jpg'],
    links: [
      { label: { es: 'App Store', en: 'App Store' }, url: 'https://apps.apple.com/es/app/cinepedia/id6463052440' },
      { label: { es: 'Google Play', en: 'Google Play' }, url: 'https://play.google.com/store/apps/details?id=com.rcuadrado.cinepedia' },
    ],
  },
];

const data = activity.projects as Record<string, Activity>;
const editable = status.projects as Record<string, Pick<Project, 'now' | 'done' | 'doing' | 'next' | 'changelog'>>;

/** Proyectos ordenados por actividad reciente; los que no tienen git quedan al final. */
export const PROJECTS: Project[] = projects
  .map((p) => ({ ...p, ...editable[p.id], activity: data[p.id] }))
  .sort((a, b) => (b.activity?.last ?? '').localeCompare(a.activity?.last ?? ''));

export const GENERATED_AT = activity.generatedAt;
