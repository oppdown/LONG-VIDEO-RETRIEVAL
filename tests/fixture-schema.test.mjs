import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const fixtureDir = join(process.cwd(), 'tests', 'fixtures', 'dense');
const expectedKinds = new Set(['real_motion', 'no_change', 'motion_change', 'suspicious_pixel_only_change']);

test('dense fixtures preserve the source-frame evidence contract', async () => {
  const names = (await readdir(fixtureDir)).filter((name) => name.endsWith('.json')).sort();
  assert.equal(names.length, 4);

  for (const name of names) {
    const fixture = JSON.parse(await readFile(join(fixtureDir, name), 'utf8'));
    assert.match(fixture.id, /^dense-[a-z-]+-\d{3}$/);
    assert.ok(fixture.description.length > 20);
    assert.ok(expectedKinds.has(fixture.expected));
    assert.ok(fixture.frames.length >= 2);

    for (let index = 1; index < fixture.frames.length; index += 1) {
      const previous = fixture.frames[index - 1];
      const current = fixture.frames[index];
      assert.equal(current.source_frame_index, previous.source_frame_index + 1, `${name} skips a source frame`);
      assert.ok(current.pts_us > previous.pts_us, `${name} has non-increasing PTS`);
      assert.equal(typeof current.pixel_digest, 'string');
      for (const key of ['changed_pixel_ratio', 'motion_energy', 'entity_displacement', 'motion_change']) {
        assert.equal(typeof current[key], 'number', `${name} missing numeric ${key}`);
        assert.ok(current[key] >= 0 && current[key] <= 1, `${name} has out-of-range ${key}`);
      }
    }
  }
});

