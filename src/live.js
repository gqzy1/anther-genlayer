import {createClient} from 'genlayer-js';import {studionet} from 'genlayer-js/chains';import {TransactionStatus} from 'genlayer-js/types';
const reader=createClient({chain:studionet});
export async function assess({address,plant,url,provider,account,onStatus}){
 if(parseInt(await provider.request({method:'eth_chainId'}),16)!==61999)throw Error('Select Stable Studionet 61999');
 const active=await provider.request({method:'eth_accounts'});
 if(!active[0]||active[0].toLowerCase()!==account.toLowerCase())throw Error('Wallet account changed. Connect the current account again.');
 if(await reader.getGasPrice()!==0n)throw Error('Nonzero gas price: assessment stopped to preserve zero-cost operation.');
 const existing=await reader.readContract({address,functionName:'get_record',args:[account,url],stateStatus:'finalized'});
 if(existing)throw Error('This wallet already assessed this source; use the existing record.');
 const writer=createClient({chain:studionet,account,provider});
 const pendingKey='anther-pending:'+address+':'+account.toLowerCase()+':'+url;
 let hash;try{hash=localStorage.getItem(pendingKey);}catch{}
 if(!hash){onStatus('Awaiting wallet signature…');
 hash=await writer.writeContract({address,functionName:'assess',args:[plant,url],value:0n,consensusMaxRotations:0});
 try{localStorage.setItem(pendingKey,hash);}catch{}
 }
 onStatus('Submitted '+hash+' · awaiting finality. Do not submit again.');
 let receipt;try{receipt=await reader.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED,interval:5000,retries:60});}catch(e){throw Error('Tracking paused for '+hash+'. Submit this same source again to resume tracking without a new transaction. '+e.message);}
 if(receipt.txExecutionResultName==='FINISHED_WITH_ERROR'||(receipt.result!==undefined&&![6,'6','SUCCESS','MAJORITY_AGREE'].includes(receipt.result)))throw Error('Assessment did not succeed. Inspect receipt: '+hash);
 const raw=await reader.readContract({address,functionName:'get_record',args:[account,url],stateStatus:'finalized'});
 const record=typeof raw==='string'&&raw?JSON.parse(raw):raw;
 if(!record||record.plant!==plant||record.url!==url)throw Error('Finalized transaction has no matching new record: '+hash);
 try{localStorage.removeItem(pendingKey);}catch{}
 return {hash,receipt,record};
}
export async function readRecord(address,owner,url){const raw=await reader.readContract({address,functionName:'get_record',args:[owner,url],stateStatus:'finalized'});return typeof raw==='string'&&raw?JSON.parse(raw):raw;}
