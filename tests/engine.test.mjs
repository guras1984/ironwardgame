import assert from 'node:assert/strict';
import {Battle,STAGES,UNITS,ENEMIES,position} from '../dist/engine.mjs';
const enemy=(type='scout',x=600,row=2)=>({id:99,type,x,row,y:position(0,row).y,hp:ENEMIES[type].hp,maxHp:ENEMIES[type].hp,slow:0,cd:1,missile:0,flash:0,walk:0});
{
 const b=new Battle(0),initial=b.energy;assert.equal(b.build('mortar',0,2),false);assert.equal(b.build('pulse',-1,2),false);assert.equal(b.build('pulse',0,0),false);assert.equal(b.build('pulse',0,2),true);assert.equal(b.build('pulse',0,2),false);assert.equal(b.energy,initial-100);b.step(100);assert.equal(b.energy,initial-100,'No preparation-phase energy farming');b.energy=999;const t=b.towers[0];assert(b.upgrade(t.id));assert(b.upgrade(t.id));assert.equal(t.level,3);assert.equal(b.upgrade(t.id),false);assert.equal(t.hp,t.maxHp);const before=b.energy;assert(b.sell(t.id));assert.equal(b.energy,before+60);assert.equal(b.towers.length,0);
}
{
 const b=new Battle(2);const armored=enemy('armor');b.enemies=[armored];b.hit(armored,100);assert.equal(armored.hp,188);b.hit(armored,100,true);assert.equal(armored.hp,88);
 const scout=enemy(),support=enemy('support',620);support.id=100;b.enemies=[scout,support];b.hit(scout,50);assert.equal(scout.hp,48,'Support field reduces incoming damage');
 b.phase='fight';assert(b.strike(600,301));assert.equal(b.strike(600,301),false,'Cooldown prevents repeated strikes');assert.equal(b.cooldown,38);
}
{
 const b=new Battle(1);b.energy=999;b.build('frost',2,2);b.phase='fight';b.queue=[{at:100,type:'scout',lane:2}];b.enemies=[enemy('armor',650)];for(let i=0;i<10;i++)b.step(.05);assert(b.enemies[0].slow>0,'Frost projectiles slow targets');
}
{
 const b=new Battle(0);b.launch();for(let n=0;n<10000&&!['won','lost'].includes(b.phase);n++){b.step(.1);b.events=[]}assert.equal(b.phase,'lost','An undefended base must lose');assert.equal(b.hp,0);
}
{
 const b=new Battle(4);b.build('pulse',1,2);b.phase='fight';b.queue=[{at:100,type:'scout',lane:2}];b.enemies=[enemy('boss',800)];const before=b.towers[0].hp;b.step(.05);assert(b.towers[0].hp<before,'Boss missiles hit distant towers');assert(b.events.some(e=>e.type==='missile'));
}
for(const [i,s] of STAGES.entries()){assert(s.waves.length>=3);for(const w of s.waves)for(const e of w){assert(s.lanes.includes(e.lane));assert(ENEMIES[e.type]);assert(e.at>=0)}if(i<4)assert(!s.waves.flat().some(e=>e.type==='boss'));}assert(STAGES[4].waves.at(-1).some(e=>e.type==='boss'));
console.log('PASS: construction, locked units, economy, upgrades, selling, armor, shields, cryo, orbital cooldown, defeat, boss missiles, five wave schedules.');
