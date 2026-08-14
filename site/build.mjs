import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
const root=new URL('..',import.meta.url).pathname,site=join(root,'site'),out=join(site,'dist');
const docs=['INDEX.md','README.md','02_TIMELINE/timeline.md','02_TIMELINE/layers/case-timeline.md','02_TIMELINE/layers/ledger-timeline.md'];
await mkdir(out,{recursive:true});for(const f of ['index.html','style.css','app.js'])await cp(join(site,f),join(out,f));await cp(join(root,'assets'),join(out,'assets'),{recursive:true});for(const f of docs){const to=join(out,'record',f);await mkdir(dirname(to),{recursive:true});await writeFile(to,await readFile(join(root,f)))}console.log(`Built Evidence Room with ${docs.length} reader documents.`);
