import {randomUUID} from 'node:crypto';
import {generate} from './server.mjs';
export class PrototypeWorkspace {
  constructor({generator=generate,maxProjects=10}={}){this.generator=generator;this.maxProjects=maxProjects;this.projects=new Map()}
  async create(prompt,options={}){
    if(this.projects.size>=this.maxProjects)throw Error('Project capacity reached');
    const result=await this.generator(prompt,options);
    const id=randomUUID(); const project={id,revision:1,prompt,html:result.html,mode:result.mode,history:[{revision:1,prompt,html:result.html}]};
    this.projects.set(id,project);return {id,revision:1,html:project.html,mode:project.mode};
  }
  get(id){const p=this.projects.get(id);if(!p)throw Error('Project not found');return {id:p.id,revision:p.revision,html:p.html,mode:p.mode}}
  async edit(id,prompt,expectedRevision,options={}){
    const p=this.projects.get(id);if(!p)throw Error('Project not found');
    if(p.revision!==expectedRevision)throw Error('Revision conflict');
    const edited=await this.generator('Existing website HTML:\n'+p.html.slice(0,40000)+'\nRequested change:\n'+prompt,options);
    if(p.revision!==expectedRevision)throw Error('Revision conflict');
    p.revision++;p.html=edited.html;p.mode=edited.mode;p.history.push({revision:p.revision,prompt,html:p.html});
    return this.get(id);
  }
  restore(id,revision,expectedRevision){
    const p=this.projects.get(id);if(!p)throw Error('Project not found');
    if(p.revision!==expectedRevision)throw Error('Revision conflict');
    const prior=p.history.find(x=>x.revision===revision);if(!prior)throw Error('Revision not found');
    p.revision++;p.html=prior.html;p.history.push({revision:p.revision,prompt:'restore '+revision,html:p.html});return this.get(id);
  }
}
