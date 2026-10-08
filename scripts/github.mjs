// Repos de los proyectos y acceso a la API de GitHub, compartido por los scripts.
import { execFileSync } from 'node:child_process';

export const OWNER = 'jcarlosrodicio';

// id del proyecto en la web -> [ruta local relativa a $HOME, repo en GitHub]
export const REPOS = {
  tally: ['Nasito/Desarrollo/apps/tally', 'tally'],
  grapit: ['Nasito/Desarrollo/apps/grapit', 'grapit'],
  intriga: ['Nasito/Desarrollo/apps/intriga', 'intriga'],
  aqorin: ['Nasito/Desarrollo/apps/aqorin', 'aqorin'],
  norma: ['Nasito/Desarrollo/norma', 'norma'],
  oak: ['Desarrollo/opencode-agent-orchestration-kit', 'opencode-agent-orchestration-kit'],
  grodar: ['Nasito/Desarrollo/apps/grodar', 'grodar'],
  obs: ['Nasito/Desarrollo/agent-observability', 'agent-observability'],
};

/** ACTIVITY_TOKEN en CI; en local, el token de `gh` de la cuenta personal. */
export const TOKEN = process.env.ACTIVITY_TOKEN || ghToken();

function ghToken() {
  try {
    return execFileSync('gh', ['auth', 'token', '--user', OWNER], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

/** GET a /repos/OWNER/<path>. Devuelve la Response (202 incluido) o lanza si falla. */
export async function api(path) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!res.ok && res.status !== 202) throw new Error(`${path}: HTTP ${res.status}`);
  return res;
}
