import {FIELD as F,UNITS,STAGES} from './engine.mjs';
const rect=(c,x,y,w,h,color,r=0)=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()};
const line=(c,x,y,x2,y2,color,width=1)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke()};
const circle=(c,x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()};
const poly=(c,pts,color)=>{c.fillStyle=color;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()};
const glow=(c,x,y,r,color)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');circle(c,x,y,r,g)};
export function towerArt(c,t,time=0,scale=1){c.save();c.translate(t.x||0,t.y||0);c.scale(scale,scale);const color=UNITS[t.type].color;const recoil=(t.recoil||0)*5;
 c.save();c.scale(1,.42);circle(c,0,15,32,'#0007');c.restore();
 poly(c,[[-28,-18],[19,-18],[29,-6],[29,23],[-18,28],[-29,16]],'#111c25');rect(c,-26,-19,52,40,'#303f49',6);rect(c,-22,-19,44,32,'#52616b',5);rect(c,-19,-15,38,26,'#24343e',4);
 for(const x of [-24,20])for(const y of [-14,16]){circle(c,x,y,2,'#a0adb2');circle(c,x,y,1,'#26353e')}
 if(t.type==='wall'){rect(c,-20,-29,40,57,'#1c2a36',6);rect(c,-22,-33,40,55,'#71828a',5);rect(c,-16,-27,27,44,'#41515e',3);for(let y=-24;y<20;y+=10){rect(c,-12,y,20,3,'#9eacb0',1)}rect(c,15,-25,6,39,'#bed3d4',2);for(let y=-26;y<16;y+=12)rect(c,16,y,4,5,color);}
 else if(t.type==='reactor'){glow(c,0,-4,40,'#b7db8430');rect(c,-16,-24,32,47,'#354741',7);rect(c,-11,-27,22,40,'#162c29',5);const h=25+Math.sin(time*3)*3;rect(c,-7,10-h,14,h,'#b7db84',3);for(let y=-23;y<19;y+=9)rect(c,-18,y,5,4,'#b2b7a5');circle(c,0,-8,6,'#e0ffb5');rect(c,-14,17,28,4,'#203e33');}
 else{circle(c,-1,0,22,'#15232e');circle(c,-1,-3,20,'#677b85');circle(c,-1,-3,16,'#3a505c');c.translate(-recoil,-6);
 if(t.type==='mortar'){rect(c,-16,-17,33,31,'#8c7967',6);rect(c,-10,-14,42,24,'#4f5b61',4);rect(c,8,-12,32,20,'#b5a798',3);rect(c,34,-14,9,24,'#3d4248',3);rect(c,40,-10,5,16,'#151f29',2);rect(c,-16,-10,6,15,color,2);rect(c,-8,-18,18,3,'#e9c8a1',1);}
 else if(t.type==='frost'){poly(c,[[-18,-12],[4,-19],[19,-10],[19,10],[-1,16],[-18,8]],'#6a7f9d');rect(c,0,-8,34,13,'#334b70',3);rect(c,28,-12,10,21,'#adc9ee',3);glow(c,36,-2,18,'#8baeff55');circle(c,36,-2,4,'#ddf5ff');for(let x=4;x<29;x+=7)rect(c,x,-7,3,11,'#86bcff',1);}
 else{poly(c,[[-19,-12],[2,-18],[17,-10],[17,10],[-5,16],[-19,8]],'#6b8591');rect(c,0,-10,38,6,'#9eafb4',2);rect(c,0,3,38,6,'#9eafb4',2);rect(c,25,-12,9,23,'#293b49',3);rect(c,-17,-7,12,8,color,2);rect(c,-13,6,16,4,'#2b4451',1);}}
 if(t.level>1){for(let i=0;i<t.level;i++)circle(c,-8+i*7,29,2,'#f5c37b')}
 if(t.flash>0){c.globalAlpha=.5;circle(c,0,0,27,'#fff')}
 c.restore();}
export function enemyArt(c,e,time){c.save();c.translate(e.x,e.y);const k=e.type,walk=Math.sin(e.walk||0),s=k==='boss'?1.7:k==='runner'?.8:1;c.scale(s,s);c.save();c.scale(1,.4);circle(c,0,28,28,'#0006');c.restore();if(k==='support'){glow(c,0,0,68,'#b78bff20');c.strokeStyle='#bda5ff50';c.lineWidth=1;c.beginPath();c.arc(0,0,39+Math.sin(time*3)*3,0,Math.PI*2);c.stroke();c.translate(0,Math.sin(time*3)*5-8);for(const side of [-1,1]){rect(c,side*24-7,-3,14,8,'#526174',3);line(c,side*13,0,side*25,0,'#bda5ff',3)}poly(c,[[-21,-10],[0,-23],[22,-9],[17,14],[-15,14]],'#735c91');poly(c,[[-15,-9],[0,-17],[15,-8],[10,7],[-9,7]],'#343347');circle(c,-4,-2,7,'#c8adff');}
 else{const armored=k==='armor'||k==='boss';for(const side of [-1,1]){const foot=side*walk*(armored?3:7);rect(c,-10+foot,side*17-5,29,12,'#222b35',4);rect(c,-7+foot,side*17-7,23,7,armored?'#6f6c69':'#5d6976',3)}
 if(armored){rect(c,-22,-27,43,49,'#302e30',8);rect(c,-27,-24,42,45,k==='boss'?'#885b4b':'#74706c',7);poly(c,[[-27,-19],[-14,-27],[11,-23],[12,11],[-17,17],[-29,6]],k==='boss'?'#b27d5b':'#a09a8e');rect(c,-25,-15,20,26,'#4d4b4d',4);rect(c,-28,-10,7,15,'#f8a86b',2);for(let i=0;i<3;i++)rect(c,-13+i*7,-20,4,8,'#d2c1a5',1);if(k==='boss'){rect(c,6,-37,22,15,'#343740',3);rect(c,8,24,22,15,'#343740',3);for(let i=0;i<3;i++){circle(c,11+i*6,-30,2,'#ef7964');circle(c,11+i*6,31,2,'#ef7964')}glow(c,-27,0,24,'#fda26c50')}}
 else{poly(c,[[-21,-14],[2,-20],[19,-9],[17,14],[-4,20],[-23,9]],k==='runner'?'#8b6655':'#75828c');poly(c,[[-18,-9],[3,-14],[11,-5],[10,10],[-8,13],[-20,6]],'#35444e');rect(c,-23,-5,10,10,k==='runner'?'#ffc66e':'#ff8770',3);rect(c,1,-9,11,15,'#48525c',2);line(c,6,-17,15,-29,'#8394a0',2);circle(c,15,-29,2,'#f48876')}}
 if(e.slow>0){c.strokeStyle='#9ac5ff';c.lineWidth=2;c.beginPath();c.arc(0,0,29,0,Math.PI*2);c.stroke();glow(c,0,0,32,'#8baeff20')}
 if(e.flash>0){c.globalAlpha=.55;circle(c,0,0,25,'#fff')}
 c.restore();if(e.hp<e.maxHp||k==='boss'){const w=k==='boss'?88:38,y=e.y-(k==='boss'?68:38);rect(c,e.x-w/2,y,w,4,'#0009',2);rect(c,e.x-w/2,y,w*Math.max(0,e.hp/e.maxHp),4,k==='boss'?'#ffad6b':'#ed8575',2)}}
export class Renderer{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.fx=[];this.shake=0;this.time=0;this.stage=-1;this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.resize();}
 resize(){const dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=1000*dpr;this.canvas.height=600*dpr;this.c.setTransform(dpr,0,0,dpr,0,0)}
 background(stage){this.stage=stage;this.bg=document.createElement('canvas');this.bg.width=1000;this.bg.height=600;const c=this.bg.getContext('2d'),theme=STAGES[stage],warm=stage===1||stage===2;
 rect(c,0,0,1000,600,stage===3?'#242535':stage===4?'#302729':warm?'#252b2c':'#18252d');const g=c.createLinearGradient(0,0,1000,600);g.addColorStop(0,warm?'#5b4d3a55':'#486a7340');g.addColorStop(.7,'#101e2200');g.addColorStop(1,'#030c13aa');rect(c,0,0,1000,600,g);
 for(let i=0;i<1100;i++){const x=(i*739+53)%1000,y=(i*293+11)%600;rect(c,x,y,i%3+1,1,i%2?'#ffffff06':'#00000015')}
 for(let row=0;row<5;row++){const y=F.y+row*F.ch;rect(c,131,y-2,729,82,'#00000035',4);for(let col=0;col<8;col++){const x=F.x+col*F.cw;const active=theme.lanes.includes(row);rect(c,x,y,83,78,active?(row%2?'#36434a':'#3b484e'):'#25323a',3);rect(c,x+1,y+1,81,1,'#a4c6c223');rect(c,x+3,y+72,77,4,'#16262b70',1);line(c,x+7,y+8,x+16,y+8,'#b7d5d027');line(c,x+7,y+8,x+7,y+16,'#b7d5d027');line(c,x+76,y+68,x+67,y+68,'#b7d5d027');for(const [dx,dy] of [[5,5],[78,5],[5,68],[78,68]])circle(c,x+dx,y+dy,1.2,'#111f27');if(!active){for(let n=0;n<3;n++)line(c,x+20+n*15,y+29,x+30+n*15,y+39,'#798c8720',2)}else{circle(c,x+41,y+38,1.3,'#b1ccc025')}}
 for(let x=879;x<1000;x+=19){line(c,x,y+12,x+13,y+12,'#b2a18722',2);line(c,x,y+65,x+13,y+65,'#b2a18722',2)}
 c.font='10px monospace';c.fillStyle='#8ea9ac';c.fillText('0'+(row+1),113,y+43);}
 // Pipework, landing strips, service plates.
 for(const y of [65,540]){rect(c,20,y,930,7,'#0d1b24',3);rect(c,20,y+1,930,3,'#52646d',2);for(let x=35;x<970;x+=45)rect(c,x,y-2,5,11,'#273944',2)}
 for(let x=150;x<847;x+=22){poly(c,[[x,77],[x+8,77],[x+3,83],[x-5,83]],'#a0a17340');poly(c,[[x,520],[x+8,520],[x+3,526],[x-5,526]],'#a0a17340')}
 rect(c,17,181,77,234,'#101d26',10);rect(c,20,175,72,231,'#52636b',9);rect(c,26,181,58,216,'#283b46',6);for(let y=196;y<382;y+=22){rect(c,28,y,54,12,'#172935',3);rect(c,32,y+2,44,2,'#687c80')}
 rect(c,30,250,52,100,'#152e37',5);rect(c,36,260,40,78,'#304f55',4);rect(c,43,271,26,55,'#7bc8c4',5);rect(c,48,275,16,47,'#b4f2db',3);
 c.save();c.translate(52,151);c.rotate(-Math.PI/2);c.font='10px monospace';c.fillStyle='#a6c5c6';c.fillText('CORE / A-01',-50,0);c.restore();
 c.font='bold 11px monospace';c.fillStyle='#b5c5c1';c.fillText(theme.zone,145,37);c.font='10px monospace';c.fillStyle='#708a91';c.fillText('IRONWARD DEFENSE SYSTEMS',145,566);c.fillText('HOSTILE ENTRY →',864,565);
 for(let x=870;x<995;x+=31){rect(c,x,28,20,20,'#0e1c24',3);rect(c,x+4,33,12,2,theme.color+'70');rect(c,x+4,40,8,2,'#45616a')}
 }
 event(e){const burst=(n,color,speed=100)=>{for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=speed*(.3+Math.random());this.fx.push({kind:'spark',x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:.2+Math.random()*.5,max:.7,color,size:2+Math.random()*3})}};
 if(['kill','blast','strike','destroy','missile','breach'].includes(e.type)){const big=e.type==='strike'||e.boss;this.fx.push({kind:'ring',x:e.x,y:e.y,life:.55,max:.55,r:big?140:e.type==='blast'?90:45,color:e.type==='breach'?'#ff7662':'#ffbd74'});burst(this.reduced?4:big?45:20,'#ffd594',big?250:140);this.shake=Math.max(this.shake,big?10:4);this.fx.push({kind:'smoke',x:e.x,y:e.y,life:1.4,max:1.4,r:big?65:30,color:'#1b2028'});if(e.type==='strike')this.fx.push({kind:'orbital',x:e.x,y:e.y,life:.45,max:.45});}
 if(e.type==='hit')burst(this.reduced?1:4,'#ffd49b',80);
 if(e.type==='shoot'){this.fx.push({kind:'flash',x:e.x,y:e.y,life:.09,max:.09,color:e.weapon==='frost'?'#c7e3ff':'#ffe6af'});}
 if(['build','upgrade'].includes(e.type)){this.fx.push({kind:'ring',x:e.x,y:e.y,life:.5,max:.5,r:45,color:e.color});burst(8,e.color,70)}
 if(['income','kill'].includes(e.type))this.fx.push({kind:'text',x:e.x,y:e.y-20,life:1,max:1,text:'+'+e.value,color:e.type==='income'?'#c1e89b':'#f4c897'});
 }
 draw(b,dt,hover,selected,selectedTower,strikeMode){this.time+=dt;if(this.stage!==b.stage)this.background(b.stage);const c=this.c;c.save();c.clearRect(0,0,1000,600);if(!this.reduced&&this.shake>0)c.translate((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake);this.shake=Math.max(0,this.shake-dt*25);c.drawImage(this.bg,0,0);
 glow(c,55,300,90,`rgba(125,227,206,${.07+Math.sin(this.time*2)*.02})`);
 for(const row of b.config.lanes){const y=positionY(row);c.fillStyle='#df8169';poly(c,[[970,y-8],[960,y],[970,y+8]],'#d98d6b70');if(b.phase==='fight'&&b.queue.some(e=>e.lane===row&&e.at-b.waveTime<3)){glow(c,945,y,40,'#ff986740');line(c,937,y-12,948,y, '#f8b486',2);line(c,948,y,937,y+12,'#f8b486',2)}}
 if(hover&&b.config.lanes.includes(hover.row)){const {col,row}=hover,x=F.x+col*F.cw,y=F.y+row*F.ch;if(strikeMode){glow(c,x+43,y+42,135,'#f3a66b35');c.strokeStyle='#f9b378';c.lineWidth=2;c.beginPath();c.arc(x+43,y+42,135,0,Math.PI*2);c.stroke()}else{const can=selected&&!b.towerAt(col,row)&&b.energy>=UNITS[selected].cost;rect(c,x,y,83,78,can?'#a5e7d225':'#ffffff0c',4);c.strokeStyle=can?'#a5e7d2':'#adbbc3';c.lineWidth=1;c.strokeRect(x+2,y+2,79,74);if(can){c.globalAlpha=.4;towerArt(c,{type:selected,x:x+43,y:y+42},this.time);c.globalAlpha=1}}}
 for(const t of b.towers){if(t.id===selectedTower){c.strokeStyle='#d4e8b7';c.setLineDash([4,5]);c.lineWidth=2;c.beginPath();c.ellipse(t.x,t.y+12,36,25,0,0,7);c.stroke();c.setLineDash([])}towerArt(c,t,this.time);if(t.hp<t.maxHp){rect(c,t.x-22,t.y-37,44,3,'#101e27');rect(c,t.x-22,t.y-37,44*t.hp/t.maxHp,3,'#a7d5bf')}}
 for(const e of b.enemies){if(e.type==='support'){c.strokeStyle='#b3a0e622';c.lineWidth=1;c.beginPath();c.arc(e.x,e.y,140,0,7);c.stroke()}enemyArt(c,e,this.time)}
 for(const s of b.shots){const p=Math.min(1,s.age/s.duration),x=s.sx+(s.tx-s.sx)*p,y=s.sy+(s.ty-s.sy)*p-(s.type==='mortar'?Math.sin(p*Math.PI)*80:0);if(s.type==='mortar'){glow(c,x,y,15,'#ffa65e50');circle(c,x,y,5,'#fbe2a2');circle(c,x-1,y-2,2,'#fff')}else{line(c,x-18,y,x+3,y,s.type==='frost'?'#b4dfff':'#ffe8b4',3);glow(c,x,y,10,s.type==='frost'?'#8bbfff50':'#ffe49a70')}}
 for(const f of this.fx){f.life-=dt;if(f.life<=0)continue;const p=1-f.life/f.max;c.globalAlpha=Math.min(1,f.life*3);if(f.kind==='smoke'){glow(c,f.x,f.y-p*26,f.r*(.5+p),'#1c2027aa');if(p<.2)glow(c,f.x,f.y,f.r,'#ffb87999')}if(f.kind==='orbital'){c.lineWidth=(1-p)*18;c.strokeStyle='#e1faff';c.shadowBlur=25;c.shadowColor='#87dfff';c.beginPath();c.moveTo(f.x-60,-50);c.lineTo(f.x,f.y);c.stroke();c.shadowBlur=0}if(f.kind==='spark'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=130*dt;rect(c,f.x,f.y,f.size*(1-p*.5),2,f.color,1)}if(f.kind==='ring'){c.lineWidth=(1-p)*6;c.strokeStyle=f.color;c.beginPath();c.arc(f.x,f.y,5+f.r*p,0,7);c.stroke();glow(c,f.x,f.y,f.r*.6*(1-p)+5,f.color+'55')}if(f.kind==='flash'){poly(c,[[f.x-4,f.y-9],[f.x+27,f.y],[f.x-4,f.y+9],[f.x+6,f.y]],f.color);glow(c,f.x,f.y,28,f.color+'66')}if(f.kind==='text'){c.font='bold 13px monospace';c.fillStyle=f.color;c.textAlign='center';c.fillText(f.text,f.x,f.y-p*27);c.textAlign='left'}c.globalAlpha=1}this.fx=this.fx.filter(f=>f.life>0).slice(-500);
 if(b.phase==='prep'){c.font='11px monospace';c.fillStyle='#b3c9c8';c.fillText('DEPLOYMENT PHASE  /  방어 유닛을 배치하세요',145,588)}c.restore();}
}
function positionY(row){return F.y+(row+.5)*F.ch}
