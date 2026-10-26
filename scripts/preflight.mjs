import {createClient} from 'genlayer-js';import {studionet} from 'genlayer-js/chains';import {readFileSync} from 'node:fs';
const c=createClient({chain:studionet});
try{const s=await c.getContractSchemaForCode(readFileSync('contracts/anther.py','utf8'));console.log(JSON.stringify(s));}catch(e){console.error(e.message);process.exitCode=1;}
