import fs from 'node:fs/promises';
import http from 'node:http';
const port=Number(process.env.PORT||4173);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function makeDemo(prompt){return '<h1>'+esc(prompt)+'</h1><p>Offline preview only; not AI-generated.</p>'}
export async function generate(prompt,{key=process.env.DEEPSEEK_API_KEY,request=fetch,demo=false}={}){
 if(demo)return {mode:'offline-demo',html:makeDemo(prompt)};
 if(!key)throw Error('DEEPSEEK_API_KEY not configured');
 const r=await request('https://api.deepseek.com/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.DEEPSEEK_MODEL||'deepseek-chat',max_tokens:2000,messages:[{role:'system',content:'Return an HTML fragment for a polished responsive website with inline styles. No scripts, frames, forms, external resources, event handlers, markdown.'},{role:'user',content:prompt}]})});
 if(!r.ok)throw Error('DeepSeek API returned '+r.status);
 const j=await r.json();return {mode:'deepseek',html:String(j.choices?.[0]?.message?.content||'')};
}
export function createServer(){return http.createServer(async(req,res)=>{
 res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.url==='/'&&req.method==='GET'){res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-src 'self'; object-src 'none'; base-uri 'none'");res.end(await fs.readFile(new URL('./index.html',import.meta.url)));return}
 if(req.url==='/health'){res.end(JSON.stringify({ok:true,aiConfigured:!!process.env.DEEPSEEK_API_KEY}));return}
 if(req.url!=='/api/generate'||req.method!=='POST'){res.writeHead(404);res.end('{}');return}
 let body='';try{for await(const c of req){body+=c;if(body.length>6000)throw Error('Payload exceeds limit')}const p=JSON.parse(body);if(typeof p.prompt!=='string'||p.prompt.length<4||p.prompt.length>1200)throw Error('Invalid prompt');const out=await generate(p.prompt,{demo:p.demo===true});res.end(JSON.stringify({...out,html:'<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;unsafe-inline&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;">'+out.html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi,'').replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi,'') }))}
 catch(e){res.writeHead(e.message.includes('not configured')?503:400);res.end(JSON.stringify({error:e.message}))}
})}
if(process.argv[1]?.endsWith('/server.mjs'))createServer().listen(port,'127.0.0.1',()=>console.log('Stage1 server listening on localhost:'+port));
