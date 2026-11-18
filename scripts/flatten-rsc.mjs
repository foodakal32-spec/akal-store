// Next on Windows exports RSC prefetch payloads as `__next.a/b/__PAGE__.txt`; the client requests `__next.a.b.__PAGE__.txt`.
// Copy them to the flat names so prefetching works on any static host.
import fs from "node:fs"; import path from "node:path";
let n = 0;
// a nested file lives at <host>/__next.a/b/f.txt -> <host>/__next.a.b.f.txt
const flatTop = (host, top) => {
  const walk = (dir, name) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name), `${name}.${e.name}`);
      else { fs.copyFileSync(path.join(dir, e.name), path.join(host, `${name}.${e.name}`)); n++; }
    }
  };
  walk(path.join(host, top), top);
};
const scan = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith("__next.")) flatTop(d, e.name); else scan(path.join(d, e.name));
  }
};
scan("out"); console.log(`flatten-rsc: ${n} files`);
