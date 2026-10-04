import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {content, projects} from '../src/content.mjs';

// Release checks for broken routes/assets and accidental publication of source records.
for (const [lang, file] of [['zh','index.html'],['en','en/index.html']]) {
  const html = await readFile(file,'utf8');
  assert(html.includes(`<html lang="${content[lang].lang}">`),`${file}: document language`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: exactly one main heading`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${file}: unique element IDs`);
  for (const project of projects) assert(ids.includes(project.id),`${file}: project ${project.id}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|data:)/.test(target)) continue;
    if (target.startsWith('#')) {assert(ids.includes(target.slice(1)),`${file}: anchor ${target}`);continue;}
    await access(resolve(dirname(file),target.endsWith('/')?`${target}index.html`:target));
  }
  for (const phrase of ['TODO','Lorem ipsum']) {
    assert(!html.includes(phrase),`${file}: unexpected placeholder`);
  }
  assert(!html.includes('upload/'),`${file}: uploaded source records must not be linked`);
  assert((await readFile('assets/styles.css','utf8')).includes('prefers-reduced-motion'));
}
console.log('Checked both languages: local links, assets, anchors, project IDs, metadata, and source-record exclusion.');
