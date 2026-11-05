import assert from 'node:assert/strict';
import {Battle,UNITS} from '../dist/engine.mjs';
function plan(b){const lanes=b.config.lanes;const commands=[];
for(const row of lanes)commands.push(['pulse',1,row]);
commands.push(['reactor',0,lanes[0]],['reactor',0,lanes.at(-1)]);
if(b.stage>=2)for(const row of lanes)commands.push(['mortar',2,row]);
if(b.stage>=1)for(const row of lanes)commands.push(['frost',3,row]);
for(const row of lanes)commands.push(['pulse',b.stage>=1?4:2,row]);
for(const row of lanes)commands.push(['wall',6,row]);
return commands;}
for(let stage=0;stage<5;stage++){const b=new Battle(stage);const planList=plan(b);let next=0;
function shop(){while(next<planList.length){const [type,col,row]=planList[next];if(!b.build(type,col,row))break;next++}if(next===planList.length){for(const t of b.towers.filter(t=>!['wall','reactor'].includes(t.type)))if(t.level<3)b.upgrade(t.id);}}
shop();b.launch();for(let n=0;n<20000&&!['won','lost'].includes(b.phase);n++){b.step(.05);b.events=[];if(n%20===0)shop();if(b.stage>=1&&b.enemies.length>7&&b.cooldown===0){const target=b.enemies.find(e=>e.type==='boss')||b.enemies[Math.floor(b.enemies.length/2)];b.strike(target.x,target.y)}}
assert.equal(b.phase,'won',`Operation ${stage+1} must be winnable`);assert(b.hp>0);
console.log({stage:stage+1,phase:b.phase,hp:b.hp,seconds:Math.round(b.time),kills:b.kills,towers:b.towers.length,plan:next,energy:Math.round(b.energy)});
}
