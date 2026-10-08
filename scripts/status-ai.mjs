// Lee las PRs mergeadas desde la última revisión en cada repo de proyecto y pide a un
// modelo (API compatible con OpenAI, por defecto NaN) que actualice el estado público
// y el changelog de src/data/status.json si alguna PR lo cambia. El resultado no se
// publica solo: el workflow status.yml lo propone como PR en este repo.
//
// Solo se envía al modelo el título y la descripción de cada PR, nunca código.
//
// Entorno: NAN_API_KEY, NAN_MODEL, NAN_BASE_URL (opcional), ACTIVITY_TOKEN (o `gh` en local),
// SINCE (opcional, YYYY-MM-DD: revisar desde esa fecha en lugar del checkedUntil de cada proyecto).
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { REPOS, TOKEN, api } from './github.mjs';

const FILE = new URL('../src/data/status.json', import.meta.url);
const BASE_URL = (process.env.NAN_BASE_URL || 'https://api.nan.builders/v1').replace(/\/$/, '');
const MODEL = process.env.NAN_MODEL;
const KEY = process.env.NAN_API_KEY;
const CHUNK = 25; // PRs por llamada al modelo
const BODY_MAX = 1500; // caracteres de descripción por PR
const TEXT_MAX = 160;
const LIST_MAX = 8;
const CHANGELOG_MAX = 30;
const FIELDS = ['now', 'done', 'doing', 'next'];

const SYSTEM = `Eres el editor de la web de portfolio de Juan Carlos Rodicio (rcuadrado.es).
Recibes el estado público actual de UN proyecto, en español y en inglés, y las PRs mergeadas
desde la última revisión (título y descripción). Decide si alguna cambia lo que la web debe
contar del proyecto.

Reglas:
- Solo cuentan los cambios visibles o los hitos: funcionalidades nuevas, fases cerradas,
  releases, lanzamientos, cambios de rumbo. Ignora chores, sincronizaciones de harness,
  refactors internos, dependencias, CI, tests y documentación interna, salvo que cierren un hito.
- No inventes ni exageres: afirma solo lo que la PR demuestra.
- La web es pública y el repo puede ser privado: nunca incluyas nombres de ficheros, rutas,
  URLs, claves, secretos, IPs, servidores, nombres de clientes o personas, ni detalles de
  infraestructura o seguridad.
- Textos cortos (máximo 120 caracteres), en español de España y en inglés, con el mismo sentido.
- "changelog": una entrada por cambio relevante; puedes agrupar varias PRs en una entrada.
  "prs" son los números de las PRs que la respaldan.
- "status": incluye solo los campos que cambian. Cada lista sustituye entera a la actual.
  "now" es una línea muy corta para la tarjeta de la portada; "doing", lo que está en curso;
  "next", lo siguiente; "done", lo conseguido (conserva lo anterior que siga siendo relevante,
  máximo 6 elementos).

Responde SOLO con un objeto JSON, sin texto alrededor, con esta forma:
{"changelog":[{"prs":[123],"es":"...","en":"..."}],
 "status":{"now":{"es":"...","en":"..."},"doing":{"es":["..."],"en":["..."]}}}
Si nada aplica, responde {"changelog":[],"status":{}}.`;

// ---------- GitHub ----------

async function mergedPRs(repo, since, until) {
  const prs = [];
  for (let page = 1; page <= 10; page++) {
    const res = await api(`${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=100&page=${page}`);
    const batch = await res.json();
    for (const pr of batch) {
      if (pr.merged_at && pr.merged_at > since && pr.merged_at <= until) {
        prs.push({ number: pr.number, title: pr.title, merged_at: pr.merged_at, body: (pr.body || '').slice(0, BODY_MAX) });
      }
    }
    // Ordenadas por actualización: a partir de aquí ya no puede haber merges en la ventana.
    if (batch.length < 100 || batch.at(-1).updated_at < since) break;
  }
  return prs.sort((a, b) => a.merged_at.localeCompare(b.merged_at));
}

// ---------- modelo ----------

async function chat(messages, jsonMode = true) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.2, ...(jsonMode && { response_format: { type: 'json_object' } }) }),
    signal: AbortSignal.timeout(180_000),
  });
  // No todos los servidores compatibles aceptan response_format: se reintenta sin él.
  if (res.status === 400 && jsonMode) return chat(messages, false);
  if (!res.ok) throw new Error(`modelo: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

function parseJSON(text) {
  const clean = text.replace(/<think>[\s\S]*?<\/think>/g, '');
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error('la respuesta no contiene JSON');
  return JSON.parse(clean.slice(start, end + 1));
}

// ---------- validación ----------

const LEAK = /https?:\/\/|www\.|@[\w-]+\.[a-z]{2,}\b|\b\d{1,3}(\.\d{1,3}){3}\b|\b[\w-]+\/[\w./-]+\.\w{1,5}\b|(sk|ghp|github_pat|key)[-_][A-Za-z0-9]{8,}/i;

function text(v, where) {
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${where}: texto vacío`);
  const t = v.trim();
  if (t.length > TEXT_MAX) throw new Error(`${where}: más de ${TEXT_MAX} caracteres`);
  if (LEAK.test(t)) throw new Error(`${where}: parece contener una URL, ruta, IP o clave: "${t}"`);
  return t;
}

function bilingualList(v, where) {
  const out = {};
  for (const lang of ['es', 'en']) {
    if (!Array.isArray(v?.[lang]) || v[lang].length > LIST_MAX) throw new Error(`${where}.${lang}: lista inválida`);
    out[lang] = v[lang].map((t, i) => text(t, `${where}.${lang}[${i}]`));
  }
  if (out.es.length !== out.en.length) throw new Error(`${where}: es y en no tienen los mismos elementos`);
  return out;
}

function validate(answer, prNumbers) {
  if (typeof answer !== 'object' || !answer) throw new Error('respuesta no es un objeto');
  const changelog = (answer.changelog ?? []).slice(0, 8).map((e, i) => {
    const prs = (Array.isArray(e.prs) ? e.prs : []).map(Number).filter((n) => prNumbers.has(n));
    if (!prs.length) throw new Error(`changelog[${i}]: no cita ninguna PR de la lista`);
    return { prs, es: text(e.es, `changelog[${i}].es`), en: text(e.en, `changelog[${i}].en`) };
  });
  const status = {};
  for (const [key, value] of Object.entries(answer.status ?? {})) {
    if (!FIELDS.includes(key)) throw new Error(`status.${key}: campo no permitido`);
    status[key] = key === 'now'
      ? { es: text(value?.es, 'status.now.es'), en: text(value?.en, 'status.now.en') }
      : bilingualList(value, `status.${key}`);
  }
  return { changelog, status };
}

// ---------- principal ----------

if (!KEY || !MODEL) {
  console.log('· Faltan NAN_API_KEY o NAN_MODEL: no se revisan PRs.');
  process.exit(0);
}
if (!TOKEN) throw new Error('Falta ACTIVITY_TOKEN (o `gh` autenticado) para leer las PRs.');

const state = JSON.parse(readFileSync(FILE, 'utf8'));
const until = new Date().toISOString().slice(0, 19) + 'Z';
const touched = [];

for (const [id, [, repo]] of Object.entries(REPOS)) {
  const project = state.projects[id];
  // Cada proyecto lleva su propio corte: si uno falla, los demás no se reprocesan.
  const since = process.env.SINCE ? `${process.env.SINCE}T00:00:00Z` : project.checkedUntil ?? state.checkedUntil;
  let prs;
  try {
    prs = await mergedPRs(repo, since, until);
  } catch (e) {
    console.warn(`· ${id}: no se pudieron leer las PRs (${e.message})`);
    continue;
  }
  if (!prs.length) { project.checkedUntil = until; console.log(`· ${id}: sin PRs mergeadas`); continue; }
  const isPublic = !(await (await api(repo)).json()).private;

  for (let i = 0; i < prs.length; i += CHUNK) {
    const chunk = prs.slice(i, i + CHUNK);
    const current = Object.fromEntries(FIELDS.map((k) => [k, project[k]]).filter(([, v]) => v));
    try {
      const reply = await chat([
        { role: 'system', content: SYSTEM },
        { role: 'user', content: JSON.stringify({ project: id, status: current, prs: chunk }) },
      ]);
      const { changelog, status } = validate(parseJSON(reply), new Set(chunk.map((p) => p.number)));
      const mergedAt = Object.fromEntries(chunk.map((p) => [p.number, p.merged_at.slice(0, 10)]));
      const entries = changelog.map((e) => ({
        date: e.prs.map((n) => mergedAt[n]).sort().at(-1),
        prs: e.prs,
        ...(isPublic && { url: `https://github.com/jcarlosrodicio/${repo}/pull/${e.prs[0]}` }),
        es: e.es,
        en: e.en,
      }));
      project.changelog = [...entries, ...(project.changelog ?? [])]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, CHANGELOG_MAX);
      Object.assign(project, status);
      const changed = entries.length || Object.keys(status).length;
      console.log(`${changed ? '✓' : '·'} ${id}: ${chunk.length} PRs → ${entries.length} entradas, campos: ${Object.keys(status).join(', ') || 'ninguno'}`);
      if (changed) touched.push(id);
      project.checkedUntil = i + CHUNK >= prs.length ? until : chunk.at(-1).merged_at;
    } catch (e) {
      // El corte se queda en el último lote bueno: estas PRs se reintentan la próxima vez.
      console.warn(`· ${id}: respuesta descartada (${e.message})`);
      break;
    }
  }
}
writeFileSync(FILE, JSON.stringify(state, null, 2) + '\n');

const unique = [...new Set(touched)];
console.log(unique.length ? `Proyectos actualizados: ${unique.join(', ')}` : 'Ningún cambio de contenido.');
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `changed=${unique.length > 0}\nprojects=${unique.join(', ')}\n`);
}
