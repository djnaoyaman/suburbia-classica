'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'), data=require('../reference-data.js'), renderer=require('../reference-sections.js');
const headings={'CM':'cm','教科書・鑑賞教材':'textbooks','楽譜・他のサービスで聴く':'resources'};
let count=0;
for(const [id,ref] of Object.entries(data)){
 const file=path.join(root,'songs',id+'.html');let html=fs.readFileSync(file,'utf8');
 for(const [heading,type] of Object.entries(headings)){
  const pattern=new RegExp('<section(?: data-reference="[^"]+")?><h2>'+heading+'</h2>[\\s\\S]*?</section>','g');
  const hits=html.match(pattern)||[];if(hits.length!==1)throw Error(id+': '+heading+' matches '+hits.length);
  html=html.replace(pattern,'<section data-reference="'+type+'"><h2>'+heading+'</h2>'+renderer.render(ref,type)+'</section>');
 }
 // Permit a repeat build after initial conversion.
 fs.writeFileSync(file,html);count++;
}
console.log('Rendered reference sections for '+count+' static articles.');
