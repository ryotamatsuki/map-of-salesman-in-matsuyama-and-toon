const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const file of ['ehime_supply_routes.html','legacy-map.html']){
 test(file+': all third-party JS are pinned and modern',()=>{
  const html=fs.readFileSync(file,'utf8');
  const scripts=[...html.matchAll(/<script\b[^>]*src="(https:\/\/[^"]+)"[^>]*>/g)].map(m=>m[0]);
  assert.equal(scripts.length,4);
  for(const script of scripts){
   assert.match(script,/integrity="sha384-[A-Za-z0-9+/=]+"/);
   assert.match(script,/crossorigin="anonymous"/);
  }
  assert.doesNotMatch(html,/jquery-1\.12\.4/);
 });
}
