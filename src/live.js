import {createClient,createAccount,generatePrivateKey} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus} from 'genlayer-js/types';
const reader=createClient({chain:studionet});
export function createSessionWallet(){
 let key=sessionStorage.getItem('anther-studionet-session-key');
 if(!key){key=generatePrivateKey();sessionStorage.setItem('anther-studionet-session-key',key);}
 const signer=createAccount(key);
 return {address:signer.address,signer};
}
export async function assess({address,plant,url,provider,account,signer,onStatus}){
 if(signer){if(signer.address.toLowerCase()!==account.toLowerCase())throw Error('Session account mismatch');if(await reader.getChainId()!==61999)throw Error('Unexpected network');}
 else{
  if(parseInt(await provider.request({method:'eth_chainId'}),16)!==61999)throw Error('Select Stable Studionet 61999');
  const active=await provider.request({method:'eth_accounts'});
  if(!active[0]||active[0].toLowerCase()!==account.toLowerCase())throw Error('Wallet account changed. Connect the current account again.');
 }
 if(await reader.getGasPrice()!==0n)throw Error('Nonzero gas price: assessment stopped to preserve zero-cost operation.');
 const pendingKey='anther-pending:'+address+':'+account.toLowerCase()+':'+url;
 let hash;try{hash=localStorage.getItem(pendingKey);}catch{}
 const existing=await reader.readContract({address,functionName:'get_record',args:[account,url],stateStatus:'finalized'});
 // An interrupted receipt wait may finish before the next page visit.
 if(existing&&!hash)throw Error('This wallet already assessed this source. Its immutable record is available on chain.');
 if(!hash){
  onStatus(signer?'Submitting with your zero-balance Studionet test wallet…':'Awaiting wallet signature…');
  const writer=signer?createClient({chain:studionet,account:signer}):createClient({chain:studionet,account,provider});
  hash=await writer.writeContract({address,functionName:'assess',args:[plant,url],value:0n,consensusMaxRotations:0});
  try{localStorage.setItem(pendingKey,hash);}catch{}
 }
 onStatus('Submitted '+hash+' · awaiting finality. Do not submit again.');
 let receipt;
 try{receipt=await reader.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED,interval:5000,retries:60});}
 catch(e){throw Error('Tracking paused for '+hash+'. Submit this same source again to resume tracking without a new transaction. '+e.message);}
 if(receipt.txExecutionResultName==='FINISHED_WITH_ERROR'||(receipt.result!==undefined&&![6,'6','SUCCESS','MAJORITY_AGREE'].includes(receipt.result)))throw Error('Assessment did not succeed. Inspect receipt: '+hash);
 const raw=await reader.readContract({address,functionName:'get_record',args:[account,url],stateStatus:'finalized'});
 const record=typeof raw==='string'&&raw?JSON.parse(raw):raw;
 if(!record||record.plant!==plant||record.url!==url)throw Error('Finalized transaction has no matching record: '+hash);
 try{localStorage.removeItem(pendingKey);}catch{}
 return {hash,receipt,record,owner:account,contract:address,chainId:61999};
}
export async function readRecord(address,owner,url){const raw=await reader.readContract({address,functionName:'get_record',args:[owner,url],stateStatus:'finalized'});return typeof raw==='string'&&raw?JSON.parse(raw):raw;}
