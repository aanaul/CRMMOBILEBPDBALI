import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const out = path.join(root, 'netlify-static');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(source, out, { recursive: true });
const html = await readFile(path.join(source, 'index.html'), 'utf8');
await writeFile(path.join(out, 'index.html'), html.replace('src="connected.js"', 'src="connected.js?v=direct-api-2"'));
const clientPath = path.join(out, 'connected.js');
const client = await readFile(clientPath, 'utf8');
const expected = "const API_ORIGIN='https://jarivis-crm-focus-cms.aaul72.chatgpt.site';";
if (!client.startsWith(expected)) throw new Error('API configuration changed: review Netlify proxy configuration.');
// Preserve the backend URL. The backend explicitly allows the mobile Netlify origin.
console.log('Netlify static frontend ready: netlify-static; API connected directly to Cloudflare.');
