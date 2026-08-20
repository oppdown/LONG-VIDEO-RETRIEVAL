import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layout = await readFile(new URL('../docs/_layouts/default.html', import.meta.url), 'utf8');
const downloads = await readFile(new URL('../docs/downloads.md', import.meta.url), 'utf8');
const changelog = await readFile(new URL('../docs/changelog.md', import.meta.url), 'utf8');

test('Pages layout exposes shared navigation', () => {
  assert.match(layout, /aria-label="Primary navigation"/);
  assert.match(layout, /\/downloads\.html/);
  assert.match(layout, /\/changelog\.html/);
});

test('downloads page exposes current direct Windows assets', () => {
  assert.match(downloads, /v0\.1\.0-test\.4\/LONG\.VIDEO\.RETRIEVAL_0\.1\.0_x64-setup\.exe/);
  assert.match(downloads, /v0\.1\.0-test\.4\/LONG\.VIDEO\.RETRIEVAL_0\.1\.0_x64_en-US\.msi/);
  assert.match(downloads, /29c045ec91891643656bf328d38579c53600ffd62c70c34d74cf04050f8448a3/);
  assert.match(downloads, /892ddcc89e5f39f980698f2b801d00e929eff5e4862019b0a8e03f4403c5461d/);
});

test('changelog records actual current release and verification', () => {
  assert.match(changelog, /v0\.1\.0-test\.4/);
  assert.match(changelog, /c1f8930/);
  assert.match(changelog, /Windows release workflow completed successfully/);
  assert.match(changelog, /FFmpeg/);
});
