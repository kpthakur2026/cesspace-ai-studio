import {strict as assert} from 'node:assert';import {generate,createServer} from './server.mjs';
assert.match((await generate('Test website',{demo:true})).html,/Offline preview/);
await assert.rejects(generate('Test website',{key:''}),/not configured/);
const mock=async()=>({ok:true,json:async()=>({choices:[{message:{content:'<h1>Test success</h1>'}}]})});
assert.match((await generate('Test website',{key:'fixture',request:mock})).html,/Test success/);
const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const p=s.address().port;
const bad=await fetch('http://127.0.0.1:'+p+'/api/generate',{method:'POST',body:JSON.stringify({prompt:'x'})});assert.equal(bad.status,400);
s.close();console.log('PASS: demo, fail-closed missing key, mocked adapter, invalid prompt');
