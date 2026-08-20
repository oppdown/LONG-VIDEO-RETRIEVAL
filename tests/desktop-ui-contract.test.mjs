import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const appSource = await readFile(new URL('../apps/desktop/src/App.tsx', import.meta.url), 'utf8');
const stylesSource = await readFile(new URL('../apps/desktop/src/styles.css', import.meta.url), 'utf8');

test('desktop task intake exposes radio profiles and prompt input', () => {
  assert.match(appSource, /type="radio"/);
  assert.match(appSource, /name="task-profile"/);
  assert.match(appSource, /Task prompt \/ question\(s\)/);
  assert.match(appSource, /aria-label="Task prompt or questions"/);
  assert.match(appSource, /type="file"/);
  assert.doesNotMatch(appSource, /<select\b/);
  assert.match(stylesSource, /\.profile-option\.is-selected/);
  assert.match(stylesSource, /textarea \{/);
});
