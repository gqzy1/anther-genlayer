export const MONTHS=['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
export const PLANTS=[
{id:'crocus',name:'Early crocus',latin:'Crocus tommasinianus',months:[2,3],season:'Spring',color:'#a59bb5',source:'https://www.rhs.org.uk/plants/25699/crocus-tommasinianus/details',note:'RHS flags pollinator value and spring flowering. February–March is an illustrative UK planning window.'},
{id:'salvia',name:'Woodland sage',latin:'Salvia nemorosa',months:[6,7,8,9],season:'Summer · autumn',color:'#8f83a6',source:'https://www.rhs.org.uk/plants/60176/salvia-nemorosa/details',note:'RHS describes summer into autumn flowering. June–September is an illustrative planning conversion; deadheading and cultivar affect duration.'},
{id:'rosemary',name:'Rosemary',latin:'Salvia rosmarinus',months:[4,5,6],season:'Spring · summer',color:'#9badd0',source:'https://www.rhs.org.uk/plants/384211/salvia-rosmarinus-ro/details',note:'RHS describes mid-spring to summer flowering. April–June is an illustrative UK window; occasional autumn flowers are excluded from the coverage model.'},
{id:'ivy',name:'Common ivy',latin:'Hedera helix',months:[9,10],season:'Autumn',color:'#b5b17c',source:'https://www.rhs.org.uk/plants/43091/hedera-helix/details',note:'RHS describes nectar-rich autumn flowers on mature plants. September–October is an illustrative window. Juvenile ivy does not provide the same flowering coverage.'}
];
export function coverage(ids,plants=PLANTS){const selected=plants.filter(p=>ids.includes(p.id));return MONTHS.map((name,i)=>({name,month:i+2,plants:selected.filter(p=>p.months.includes(i+2)).map(p=>p.id)}));}
export function validateSource(raw){try{const u=new URL(raw);return u.protocol==='https:'&&u.hostname==='www.rhs.org.uk'&&u.pathname.startsWith('/plants/')&&!u.username&&!u.password&&!u.port&&!u.search&&!u.hash;}catch{return false;}}
// Conservative filter: a record must match both source and exact taxon.
export function consensusCoverage(ids,records,plants=PLANTS){
 const seasonMonths={spring:[2,3,4,5],summer:[6,7,8],autumn:[9,10],winter:[2]};
 const eligible=plants.flatMap(p=>{const r=records.get(p.source);if(!r?.accepted||r.plant!==p.latin||r.url!==p.source)return [];const allowed=new Set(r.assessment.seasons.flatMap(s=>seasonMonths[s]||[]));return [{...p,months:p.months.filter(m=>allowed.has(m))}];});
 return coverage(ids,eligible);
}
