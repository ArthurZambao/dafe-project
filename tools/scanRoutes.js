/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs').promises;
const path = require('path');

const ROOTS = [
  path.resolve(__dirname, '..', 'src', 'modules'),
  path.resolve(__dirname, '..', 'src', 'app'),
];

function routeFromDir(dir) {
  // encontra qual ROOT contém o diretório e calcula a rota relativa a esse ROOT
  for (const ROOT of ROOTS) {
    if (dir.startsWith(ROOT)) {
      const rel = path.relative(ROOT, dir);
      if (!rel || rel === '') return '/';
      return '/' + rel.replace(/\\+/g, '/');
    }
  }
  // fallback: relativo ao src se não estiver em nenhum ROOT conhecido
  const fallbackRoot = path.resolve(__dirname, '..', 'src');
  const rel = path.relative(fallbackRoot, dir);
  return '/' + rel.replace(/\\+/g, '/');
}

async function walk(dir, cb) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, cb);
    else await cb(full);
  }
}

function classify(content) {
  const hasUseClient = /(^|\n)\s*["']use client["']/.test(content);
  const revalidate = content.match(/export\s+const\s+revalidate\s*=\s*([^\n;]+)/);
  const dynamic = content.match(/export\s+const\s+dynamic\s*=\s*['"]([^'"]+)['"]/);
  const hasNoStore = /no-store/.test(content) || /cache:\s*['"]no-store['"]/.test(content);
  const hasFetch = /fetch\(/.test(content);
  const usesReqHeaders = /\b(req|request|headers|cookies)\b/.test(content);
  const hasRouteHandler = /export\s+default\s+function\s+handler|export\s+function\s+GET|export\s+function\s+POST/.test(content);

  if (hasUseClient) return { kind: 'client', reason: 'contains "use client"' };
  if (dynamic && dynamic[1] === 'force-static') return { kind: 'force-static', reason: 'export const dynamic = \"force-static\"' };
  if (dynamic && dynamic[1] === 'force-dynamic') return { kind: 'force-dynamic', reason: 'export const dynamic = \"force-dynamic\"' };
  if (revalidate) return { kind: 'ISR', reason: 'export const revalidate = ' + revalidate[1].trim() };
  if (hasNoStore || (hasFetch && usesReqHeaders) || hasRouteHandler) return { kind: 'likely-SSR', reason: [hasNoStore ? 'no-store present' : null, hasFetch ? 'uses fetch' : null, usesReqHeaders ? 'uses req/headers/cookies' : null, hasRouteHandler ? 'route handler present' : null].filter(Boolean).join('; ') };
  if (hasFetch) return { kind: 'maybe-dynamic-fetch', reason: 'uses fetch (without obvious no-store/revalidate)' };
  return { kind: 'likely-static', reason: 'no client/dynamic/revalidate/no-store detected' };
}

(async () => {
  try {
    const routes = new Map(); // dir -> aggregated content
    // collect page/layout/route files by directory for each root
    for (const ROOT of ROOTS) {
      try {
        // pula roots que não existem
        await fs.access(ROOT);
      } catch (err) {
        console.warn(`Skipping missing root: ${ROOT}`);
        continue;
      }
      await walk(ROOT, async (file) => {
        const base = path.basename(file);
        if (!['page.tsx','page.ts','layout.tsx','layout.ts','route.ts','route.js','route.tsx'].includes(base)) return;
        const dir = path.dirname(file);
        const content = await fs.readFile(file, 'utf8');
        if (!routes.has(dir)) routes.set(dir, '');
        routes.set(dir, routes.get(dir) + '\n' + `// file: ${base}\n` + content);
      });
    }

    const report = [];
    for (const [dir, content] of routes.entries()) {
      const route = routeFromDir(dir);
      const cls = classify(content);
      report.push({ route, dir: path.relative(path.resolve(__dirname, '..'), dir), kind: cls.kind, reason: cls.reason });
    }

    // Also detect directories that have no page/layout file (skip)
    report.sort((a,b)=>a.route.localeCompare(b.route));
    const mdLines = ['# Route scan report', '', `Scanned: ${new Date().toISOString()}`, ''];
    for (const r of report) {
      mdLines.push(`- ${r.route} — ${r.kind} (${r.reason})  `);
    }
    const out = mdLines.join('\n');
    await fs.writeFile(path.join(__dirname, 'route-report.md'), out, 'utf8');
    console.log(out);
    console.log('\nReport written to tools/route-report.md');
  } catch (err) {
    console.error('Erro ao escanear:', err);
    process.exit(1);
  }
})();