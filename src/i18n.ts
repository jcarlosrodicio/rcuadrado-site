import type { Kind, Lang, Status } from './data/projects';

export const LANGS: Lang[] = ['es', 'en'];

export const home = (lang: Lang) => (lang === 'es' ? '/' : '/en/');
export const projectUrl = (lang: Lang, id: string) => (lang === 'es' ? `/proyectos/${id}/` : `/en/projects/${id}/`);

export const CONTACT = {
  email: 'support@rcuadrado.es',
  github: 'https://github.com/jcarlosrodicio',
  linkedin: 'https://linkedin.com/in/jcarlosrodicio',
  cv: '/cv/juan-carlos-rodicio-cv-en.pdf',
};

/** Persona en schema.org, compartida por la portada y las fichas. */
export const PERSON = {
  '@type': 'Person',
  '@id': 'https://rcuadrado.es/#person',
  name: 'Juan Carlos Rodicio',
  jobTitle: 'AI Engineer',
  url: 'https://rcuadrado.es/',
  email: `mailto:${CONTACT.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
  sameAs: [CONTACT.github, CONTACT.linkedin],
  knowsAbout: ['AI agents', 'Agent orchestration', 'LLM observability', 'Java', 'Spring Boot', 'Microservices', 'Hexagonal architecture', 'Flutter', 'TypeScript'],
};

export const UI = {
  es: {
    title: 'Juan Carlos Rodicio · AI Engineer · Rcuadrado',
    description: 'AI Engineer y Senior Software Engineer en Sevilla. Harnesses para agentes de código, once años de backend Java y apps móviles publicadas.',
    nav: { work: 'Trabajo', career: 'Trayectoria', contact: 'Contacto' },
    write: 'Escríbeme',
    heroA: 'Agentes de código que trabajan',
    heroB: 'con método.',
    lede: 'Soy Juan Carlos, AI Engineer en Sevilla. Once años haciendo backends en Java y Spring Boot; ahora diseño harnesses que convierten a los agentes en flujos acotados y revisables, y publico mis propias apps de principio a fin. Busco puesto de AI Engineer o Senior Software Engineer, en remoto.',
    downloadCv: 'CV en inglés (PDF)',
    chartLabel: 'Commits por semana y proyecto durante las últimas 4 semanas',
    weeksAgo: 'hace 4 semanas',
    today: 'hoy',
    chartTitle: 'Cuatro semanas de commits, una línea por proyecto.',
    chartTotal: 'en total, sacados de git el',
    chartHint: 'Pasa por encima de una línea para ver qué es; haz clic para abrir el proyecto.',
    commitsSince: 'commits desde',
    more: 'Más proyectos',
    details: 'Ficha del proyecto',
    work: 'Trabajo',
    nowPrefix: 'Ahora',
    career: 'Trayectoria',
    education: 'Formación',
    recs: 'Lo que dicen',
    recsLink: 'Verlas en LinkedIn',
    recsRel: { manager: 'mi responsable directo', team: 'mismo equipo', po: 'Product Owner de mi equipo' },
    recsAt: 'En',
    recsOriginal: 'Original en inglés',
    what: 'Qué hago',
    proof: 'Hecho en',
    contactTitle: '¿Un puesto, un proyecto o una pregunta?',
    contactText: 'Respondo en un par de días. Si es una oferta, cuéntame el equipo y el problema; me interesa más eso que el stack.',
    copy: 'Copiar',
    copied: 'Copiado',
    footer: 'Rcuadrado es una persona, no una sociedad.',
    dataNote: 'Actividad sacada de git el',
    // ficha
    crumbs: 'Trabajo',
    prev: 'Anterior',
    next: 'Siguiente',
    whatIs: 'Qué es',
    state: 'Estado',
    done: 'Hecho',
    doing: 'Ahora',
    later: 'Después',
    emptyDone: 'Nada todavía.',
    emptyDoing: 'Nada en curso.',
    emptyLater: 'Sin planes cerrados.',
    tryIt: 'Pruébalo',
    changes: 'Cambios recientes',
    launchVideo: 'Vídeo de lanzamiento',
    changesNote: 'Resumen de las PRs mergeadas, actualizado a diario.',
    myRole: 'Mi papel',
    started: 'Empezado',
    lastChange: 'Último cambio',
    commits: 'Commits',
    stack: 'Stack',
    activity: 'Actividad, últimas 26 semanas',
    halfYearAgo: 'hace 26 semanas',
    screenshots: 'Capturas de',
    otherLang: 'English',
  },
  en: {
    title: 'Juan Carlos Rodicio · AI Engineer · Rcuadrado',
    description: 'AI Engineer and Senior Software Engineer in Seville, Spain. Harnesses for coding agents, eleven years of Java backends and shipped mobile apps.',
    nav: { work: 'Work', career: 'Career', contact: 'Contact' },
    write: 'Get in touch',
    heroA: 'Coding agents that work',
    heroB: 'with method.',
    lede: 'I’m Juan Carlos, an AI Engineer in Seville, Spain. Eleven years building Java and Spring Boot backends; now I design harnesses that turn coding agents into bounded, reviewable workflows, and I ship my own apps end to end. Looking for an AI Engineer or Senior Software Engineer role, remote.',
    downloadCv: 'CV (PDF)',
    chartLabel: 'Commits per week and project over the last 4 weeks',
    weeksAgo: '4 weeks ago',
    today: 'today',
    chartTitle: 'Four weeks of commits, one line per project.',
    chartTotal: 'in total, pulled from git on',
    chartHint: 'Hover a line to see what it is; click to open the project.',
    commitsSince: 'commits since',
    more: 'More projects',
    details: 'Project page',
    work: 'Work',
    nowPrefix: 'Now',
    career: 'Career',
    education: 'Education',
    recs: 'What they say',
    recsLink: 'See them on LinkedIn',
    recsRel: { manager: 'my direct manager', team: 'same team', po: 'my team’s Product Owner' },
    recsAt: 'At',
    recsOriginal: 'Original in Spanish',
    what: 'What I do',
    proof: 'Done in',
    contactTitle: 'A role, a project or a question?',
    contactText: 'I reply within a couple of days. If it is a job offer, tell me about the team and the problem; I care more about that than the stack.',
    copy: 'Copy',
    copied: 'Copied',
    footer: 'Rcuadrado is a person, not a company.',
    dataNote: 'Activity pulled from git on',
    crumbs: 'Work',
    prev: 'Previous',
    next: 'Next',
    whatIs: 'What it is',
    state: 'Status',
    done: 'Done',
    doing: 'Now',
    later: 'Later',
    emptyDone: 'Nothing yet.',
    emptyDoing: 'Nothing in progress.',
    emptyLater: 'No firm plans.',
    tryIt: 'Try it',
    changes: 'Recent changes',
    launchVideo: 'Launch video',
    changesNote: 'Summary of merged pull requests, updated daily.',
    myRole: 'My role',
    started: 'Started',
    lastChange: 'Last change',
    commits: 'Commits',
    stack: 'Stack',
    activity: 'Activity, last 26 weeks',
    halfYearAgo: '26 weeks ago',
    screenshots: 'Screenshots of',
    otherLang: 'Español',
  },
};

export const KIND: Record<Lang, Record<Kind, string>> = {
  es: { app: 'App móvil', agents: 'Agentes IA', data: 'Datos y observabilidad' },
  en: { app: 'Mobile app', agents: 'AI agents', data: 'Data and observability' },
};

export const STATUS: Record<Lang, Record<Status, string>> = {
  es: { published: 'Publicado', building: 'En desarrollo', paused: 'En pausa' },
  en: { published: 'Shipped', building: 'In progress', paused: 'Paused' },
};

export const WHAT_I_DO = {
  es: [
    { title: 'Orquestación de agentes de código', text: 'Harnesses multiagente con fases explícitas, estado durable y reanudable, contratos, límites de iteración y modelo por rol.', proof: 'OAK, Aqorin y norma' },
    { title: 'Backend Java y Spring Boot', text: 'Microservicios, sistemas event-driven, CQRS y arquitectura hexagonal. APIs REST, GraphQL y gRPC.', proof: 'Lookiero, Grupo Avalon, Sngular y Deloitte' },
    { title: 'Observabilidad y evaluación de agentes', text: 'Trazas de cada ejecución que alimentan puntuaciones y evaluadores, para juzgar un cambio por resultados medidos.', proof: 'Agent observability y Tally' },
    { title: 'Apps móviles de principio a fin', text: 'Producto, diseño, Flutter, Supabase y releases automatizadas con fastlane.', proof: 'Tally, en App Store y Google Play' },
  ],
  en: [
    { title: 'Coding-agent orchestration', text: 'Multi-agent harnesses with explicit phases, durable resumable state, contracts, iteration budgets and per-role model routing.', proof: 'OAK, Aqorin and norma' },
    { title: 'Java and Spring Boot backends', text: 'Microservices, event-driven systems, CQRS and hexagonal architecture. REST, GraphQL and gRPC APIs.', proof: 'Lookiero, Grupo Avalon, Sngular and Deloitte' },
    { title: 'Agent observability and evaluation', text: 'Traces of every run feeding scores and evaluators, so a change is judged on measured outcomes.', proof: 'Agent observability and Tally' },
    { title: 'Mobile apps end to end', text: 'Product, design, Flutter, Supabase and releases automated with fastlane.', proof: 'Tally, on the App Store and Google Play' },
  ],
};

export const CAREER = [
  {
    from: '04/2022', to: null, company: 'Lookiero Tech', place: { es: 'Remoto', en: 'Remote' }, role: 'Senior Software Engineer',
    text: {
      es: 'Backend Java y Spring Boot en microservicios con arquitectura hexagonal y CQRS, APIs REST y GraphQL y flujos asíncronos con RabbitMQ. Servidor MCP para el equipo de producto, skills de agentes dentro del repo y un modelo de IA en AWS que valida direcciones en el flujo de entrega.',
      en: 'Java and Spring Boot backend on microservices with hexagonal architecture and CQRS, REST and GraphQL APIs and asynchronous flows with RabbitMQ. An MCP server for the product team, in-repo agent skills and an AI model on AWS that validates addresses in the delivery flow.',
    },
  },
  {
    from: '10/2021', to: '04/2022', company: 'Grupo Avalon', place: { es: 'Remoto', en: 'Remote' }, role: 'Senior Software Developer',
    text: { es: 'Microservicios Java 11 y Spring Boot integrados por REST, Kafka e IBM MQ.', en: 'Java 11 and Spring Boot microservices integrated over REST, Kafka and IBM MQ.' },
  },
  {
    from: '12/2020', to: '10/2021', company: 'Sngular', place: { es: 'Sevilla', en: 'Seville' }, role: 'Software Developer',
    text: { es: 'Microservicios con Spring Boot y MongoDB, diseño de soluciones e integraciones REST y gRPC.', en: 'Spring Boot and MongoDB microservices, solution design and REST and gRPC integrations.' },
  },
  {
    from: '04/2018', to: '12/2020', company: 'Deloitte', place: { es: 'Sevilla', en: 'Seville' }, role: 'Technical Analyst',
    text: { es: 'Modernización de servicios e integración de sistemas empresariales; coordinación técnica del equipo.', en: 'Service modernisation and enterprise system integration; technical coordination of the team.' },
  },
  {
    from: '02/2016', to: '04/2018', company: 'SDOS', place: { es: 'Sevilla', en: 'Seville' }, role: 'Programmer',
    text: { es: 'Backend Java y frontend Angular sobre Oracle y MySQL.', en: 'Java backend and Angular frontend on Oracle and MySQL.' },
  },
];

export const EDUCATION = {
  es: [['2010 – 2015', 'Grado en Ingeniería del Software', 'Escuela Técnica Superior de Ingeniería Informática, Sevilla'], ['2008 – 2010', 'Técnico Superior en Administración de Sistemas Informáticos', 'Nuevas Profesiones, Sevilla']],
  en: [['2010 – 2015', 'Software Engineering Degree', 'Higher School of Computer Engineering, Seville'], ['2008 – 2010', 'Higher Vocational Training, Computer Systems Administration', 'Nuevas Profesiones, Seville']],
};

// Recomendaciones de LinkedIn, copiadas literalmente y en su idioma original (sin traducir
// ni corregir). Sin fotos: solo iniciales. Más recientes primero.
export const RECOMMENDATIONS: { name: string; headline: string; company: string; relation: 'manager' | 'team' | 'po'; date: string; lang: Lang; text: string[] }[] = [
  {
    name: 'Daniel Escudero', headline: 'EMBA | Product Manager | Business Strategy | Growth Strategy | Go-to-Market Strategy', company: 'Lookiero', relation: 'po', date: '2022-12-15', lang: 'en',
    text: [
      'Juan Carlos is one of those people that every Product Manager would love to have on all their teams.',
      'In addition to offering confidence in technical aspects, he is able to offer very good solutions. In addition to his technical knowledge, he is capable of generating a very good environment in the co-creation of products and technology with the rest of the team.',
      'He is without a doubt an amazing person for the team!',
    ],
  },
  {
    name: 'Benjamin Iriarte', headline: 'Technical Lead', company: 'Lookiero', relation: 'manager', date: '2022-12-15', lang: 'en',
    text: [
      'Juan Carlos is a highly passionate developer always taking care of code quality.',
      'Proving the most appropriate technical solution depending on the business demands and taking into account different points of view.',
      'It was a really pleasure to have him as part of the squad and I recommend him without hesitation.',
    ],
  },
  {
    name: 'Pedro José Barrios Gausí', headline: 'Senior Java Software Engineer', company: 'Sngular', relation: 'team', date: '2021-10-23', lang: 'es',
    text: ['Gran trabajador y compañero. Una persona que hace su trabajo muy bien, no duda en ofrecerse a ayudar a sus compañeros, que genera un ambiente agradable y de confianza al resto del equipo. Cualquier equipo que lo tenga, va a tener en su proyecto un gran programador.'],
  },
  {
    name: 'Iago Trancón Barros', headline: 'Analista Programador en Seresco', company: 'Sngular', relation: 'manager', date: '2021-10-14', lang: 'es',
    text: [
      'Juan Carlos es técnicamente excelente y un gran compañero de equipo. Muy proactivo e independiente lo que le permite asumir tareas de análisis y diseño sin problemas.',
      'Siempre busca la mejora continua en su trabajo y ayuda a crear muy buen ambiente.',
      'Un placer trabajar con él.',
    ],
  },
  {
    name: 'Antonio Jesús Ocaña Campos', headline: 'Engineering Manager | Tech Delivery Lead', company: 'Deloitte', relation: 'manager', date: '2020-11-24', lang: 'es',
    text: ['Juan Carlos es un gran profesional con el que he tenido la oportunidad de compartir muchos momentos. Gran persona y valor seguro en cualquier proyecto!'],
  },
];
