// Regenera src/data/activity.json con la actividad de cada proyecto.
// Fuente, por orden:
//   1. API de GitHub (rama por defecto): refleja lo publicado desde cualquier máquina.
//      Token: ACTIVITY_TOKEN, o en local el de `gh` (ver github.mjs).
//   2. git local, si no hay token o la API falla y el repo está en esta máquina.
//   3. Los datos anteriores.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { REPOS, TOKEN, api } from './github.mjs';

const WEEKS = 26;
const WEEK = 7 * 24 * 3600;
const OUT = new URL('../src/data/activity.json', import.meta.url);

const day = (seconds) => new Date(seconds * 1000).toISOString().slice(0, 10);
const now = Math.floor(Date.now() / 1000);

function fromGit(dir) {
  const stamps = execFileSync('git', ['-C', dir, 'log', '--all', '--format=%at'], { encoding: 'utf8' })
    .trim().split('\n').filter(Boolean).map(Number);
  const weeks = Array(WEEKS).fill(0);
  for (const t of stamps) {
    const ago = Math.floor((now - t) / WEEK);
    if (ago < WEEKS) weeks[WEEKS - 1 - ago]++;
  }
  return { since: day(Math.min(...stamps)), last: day(Math.max(...stamps)), commits: stamps.length, weeks };
}

async function fromGitHub(repo, previous) {
  // GitHub calcula las estadísticas en segundo plano y responde 202 hasta tenerlas.
  let stats;
  for (let i = 0; i < 8 && !Array.isArray(stats); i++) {
    const res = await api(`${repo}/stats/commit_activity`);
    if (res.status === 202) await new Promise((r) => setTimeout(r, 3000));
    else stats = await res.json();
  }
  if (!Array.isArray(stats)) throw new Error(`${repo}: estadísticas no disponibles todavía`);

  const head = await api(`${repo}/commits?per_page=1`);
  const [latest] = await head.json();
  const lastPage = Number(head.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)?.[1] ?? 1);
  let since = previous?.since;
  if (!since) {
    const [first] = await (await api(`${repo}/commits?per_page=1&page=${lastPage}`)).json();
    since = first.commit.committer.date.slice(0, 10);
  }
  return {
    since,
    last: latest.commit.committer.date.slice(0, 10),
    commits: lastPage,
    weeks: stats.slice(-WEEKS).map((w) => w.total),
  };
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { projects: {} };
const projects = { ...previous.projects };

for (const [id, [rel, repo]] of Object.entries(REPOS)) {
  const dir = join(homedir(), rel);
  let source = 'github';
  try {
    if (!TOKEN) throw new Error('sin token de GitHub');
    projects[id] = await fromGitHub(repo, previous.projects[id]);
  } catch (e) {
    if (!existsSync(join(dir, '.git'))) {
      console.warn(`· ${id}: ${e.message} y sin repo local; se conservan los datos anteriores`);
      continue;
    }
    console.warn(`· ${id}: ${e.message}; uso git local`);
    projects[id] = fromGit(dir);
    source = 'git local';
  }
  console.log(`✓ ${id} (${source}): ${projects[id].commits} commits, último ${projects[id].last}`);
}

writeFileSync(OUT, JSON.stringify({ generatedAt: day(now), projects }, null, 2) + '\n');
