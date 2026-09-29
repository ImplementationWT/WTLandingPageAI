(function(){
var CAL='https://calendly.com/discoverycall-alejandro/your-first-monday-app';
var IC={arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',down:'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',check:'<polyline points="20 6 9 17 4 12"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',chat:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z"/>',spark:'<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>',linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',upwork:'<path d="M3 5v6a4 4 0 0 0 8 0V5"/><path d="M11 11c1 3 3 6 6 6a3.5 3.5 0 0 0 0-7c-2.5 0-4 2.5-5 5l-2 7"/>'};
document.querySelectorAll('.msi[data-i]').forEach(function(el){var p=IC[el.dataset.i];if(p)el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';});

// starfield
var sf=document.getElementById('starfield');
if(sf){var n=innerWidth<760?70:140,h='';for(var i=0;i<n;i++){var s=(Math.random()*1.6+.5).toFixed(2);h+='<i style="left:'+(Math.random()*100).toFixed(2)+'%;top:'+(Math.random()*100).toFixed(2)+'%;width:'+s+'px;height:'+s+'px;--b:'+(Math.random()*.2+.08).toFixed(2)+';--p:'+(Math.random()*.5+.35).toFixed(2)+';--d:'+(Math.random()*4+3).toFixed(1)+'s;--l:'+(Math.random()*-6).toFixed(1)+'s"></i>';}sf.innerHTML=h;}

// nav
var nav=document.getElementById('nav');
addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>20);},{passive:true});

// reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fade-up').forEach(function(el){io.observe(el);});

// rail
var rl=document.getElementById('railLabel');
var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var p=e.target.dataset.rail.split('|');rl.innerHTML='<b>'+p[0]+'</b> '+p[1];}});},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('[data-rail]').forEach(function(s){rio.observe(s);});

// FAQ
document.querySelectorAll('.faq-q').forEach(function(b){b.addEventListener('click',function(){var it=b.parentElement,o=it.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(x){x.classList.remove('open');});if(!o)it.classList.add('open');});});

// Quoter
var S={areas:0,users:10,portal:false,partner:false,billing:'annual',plan:'starter'};
var $=function(id){return document.getElementById(id);};
var fmt=function(v){return '$'+v.toLocaleString('en-US');};
var PLAN={starter:{p:100,d:'Starter, $100 per month: up to 5 databases per app, apps for your team only.'},pro:{p:250,d:'Pro, $250 per month: up to 20 databases per app, and apps your clients can open.'}};
function line(k,v,cls){return '<div class="qs-line'+(cls?' '+cls:'')+'"><span>'+k+'</span><span>'+v+'</span></div>';}
function render(){
if(S.portal)S.plan='pro';
var fees=5000+2500*S.areas+(S.portal?3000:0);
$('qAreas').textContent=S.areas+(S.areas===1?' area':' areas');
$('qUsers').textContent=S.users+(S.users===1?' user':' users');
document.querySelector('[data-step="areas"][data-d="-1"]').disabled=S.areas<=0;
document.querySelector('[data-step="users"][data-d="-1"]').disabled=S.users<=1;
$('qPortal').setAttribute('aria-checked',S.portal);$('qPartner').setAttribute('aria-checked',S.partner);
document.querySelectorAll('#qBilling button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===S.billing);});
document.querySelectorAll('#qPlan button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===S.plan);b.disabled=S.portal&&b.dataset.v==='starter';b.style.opacity=b.disabled?.4:'';});
$('qPlanDesc').textContent=PLAN[S.plan].d+(S.portal?' Required for the client portal.':'');
$('sTotal').textContent=fmt(fees);
$('sInc').textContent='Includes '+(2+S.areas)+' areas, up to '+(3+2*S.areas)+' apps'+(S.portal?', a client portal':'')+', and 15 sessions with your team.';
var L=line('Core program','$5,000');
if(S.areas)L+=line('Additional areas × '+S.areas,fmt(2500*S.areas));
if(S.portal)L+=line('Client portal','$3,000');
L+=line('Total fees',fmt(fees),'tot');
$('sLines').innerHTML=L;
$('sP1').textContent=fmt(fees/2);$('sP2').textContent=fmt(fees/2);
$('sP3').textContent=S.partner?'$1,000/mo':'Optional';
$('sP3w').className=S.partner?'on3':'off';
var up=S.billing==='annual'?28:41,pp=PLAN[S.plan].p,m1=S.users*up+pp+100,m2=m1+(S.partner?1000:0);
$('sMonday').innerHTML=line(S.users+' users × $'+up+', '+S.billing+' billing',fmt(S.users*up))+line('Apps plan '+(S.plan==='pro'?'Pro':'Starter'),fmt(pp))+line('AI credits','$100');
$('sM1').textContent=fmt(m1);$('sM2').textContent=fmt(m2);
$('sM2k').textContent=S.partner?'Per month from week 8, incl. $1,000 partnership':'Per month from week 8';
}
document.querySelectorAll('[data-step]').forEach(function(b){b.addEventListener('click',function(){var k=b.dataset.step,d=+b.dataset.d;S[k]=Math.max(k==='users'?1:0,Math.min(k==='users'?500:10,S[k]+d));render();});});
if($('qPortal')){
$('qPortal').addEventListener('click',function(){S.portal=!S.portal;if(!S.portal)S.plan='starter';render();});
$('qPartner').addEventListener('click',function(){S.partner=!S.partner;render();});
document.querySelectorAll('#qBilling button').forEach(function(b){b.addEventListener('click',function(){S.billing=b.dataset.v;render();});});
document.querySelectorAll('#qPlan button').forEach(function(b){b.addEventListener('click',function(){if(!b.disabled){S.plan=b.dataset.v;render();}});});
render();}

// Reviews marquee (auto + drag)
var REV=[
{q:"Alejandro and his team are great! Definitely recommend working with them. They make the whole process very simple and easy to understand.",p:"CRM & Email Automation Setup",cc:"us",loc:"United States"},
{q:"Alejandro was a pleasure to work with; he is incredibly professional and a true expert in all things monday.com.",p:"monday Support & Training",cc:"gb",loc:"United Kingdom"},
{q:"Alejandro provided amazing support and gave us some concrete use cases for what we were discussing. Highly recommended.",p:"Online Training & Setup",cc:"au",loc:"Australia"},
{q:"Everything was super professional, cost effective and timely. Highly recommend.",p:"DR Legal Pros · monday Setup",cc:"do",loc:"Dominican Republic"},
{q:"Alejandro is extremely knowledgeable about monday and how to build effective work processes. He went well beyond expectations to complete our project.",p:"PM & CRM Integration",cc:"de",loc:"Germany"},
{q:"I highly recommend this team of highly capable and confident system development people for any project management system you may need.",p:"PM System Development",cc:"bz",loc:"Belize"},
{q:"Very smart and strategic. Recommend him to anyone needing workflow improvements via monday.com.",p:"Setup & Automations",cc:"za",loc:"South Africa"},
{q:"So glad to have found Alejandro. He was responsive, knew what he was doing, kept to the timeline and delivered within a reasonable period.",p:"Build a Workspace",cc:"us",loc:"United States"},
{q:"Was great to work with Alejandro! Good work, high knowledge and quick turnaround time.",p:"monday CRM Specialist",cc:"gb",loc:"United Kingdom"},
{q:"Alejandro was great in delivering what we needed! Explained everything and assisted us in learning the process. Highly recommended.",p:"monday Automations Expert",cc:"au",loc:"Australia"},
{q:"Alejandro is very knowledgeable, fast and proficient in setting up monday.com!",p:"Ongoing monday Consultation",cc:"us",loc:"United States"},
{q:"Alejandro was great to work with on our project and would recommend him highly.",p:"monday CRM",cc:"nz",loc:"New Zealand"}];
var rt=document.getElementById('revTrack');
if(rt){var card=function(r){return '<div class="rev"><div class="rev-stars">★★★★★</div><q>'+r.q+'</q><div class="rev-meta"><img loading="lazy" src="https://flagcdn.com/w40/'+r.cc+'.png" alt=""><span><b>'+r.loc+'</b> · '+r.p+'</span></div></div>';};var hh=REV.map(card).join('');rt.innerHTML=hh+hh;marquee(document.getElementById('revMarquee'),rt,.45);}
function marquee(vp,tr,speed){
var x=0,drag=false,sx=0,ox=0,paused=false;
function half(){return tr.scrollWidth/2;}
function wrap(){var w=half();if(!w)return;while(x<=-w)x+=w;while(x>0)x-=w;}
function tick(){if(!drag&&!paused)x-=speed;wrap();tr.style.transform='translate3d('+x+'px,0,0)';requestAnimationFrame(tick);}
vp.addEventListener('pointerdown',function(e){drag=true;sx=e.clientX;ox=x;vp.classList.add('drag');vp.setPointerCapture(e.pointerId);});
vp.addEventListener('pointermove',function(e){if(drag){x=ox+(e.clientX-sx);}});
['pointerup','pointercancel'].forEach(function(t){vp.addEventListener(t,function(){drag=false;vp.classList.remove('drag');});});
requestAnimationFrame(tick);
}

// Gallery drag-to-scroll (desktop)
var gl=document.getElementById('gallery');
if(gl){gl.style.scrollSnapType='none';gl.style.scrollBehavior='auto';var orig=[].slice.call(gl.children);for(var k=0;k<2;k++)orig.forEach(function(n){var c=n.cloneNode(true);c.setAttribute('aria-hidden','true');gl.appendChild(c);});var setW=function(){return gl.scrollWidth/3;};var pos=0,gd=false,gx=0,gs=0,gvis=true,gt=null,moved=false;function wrap(){var w=setW();if(pos<w*.5)pos+=w;else if(pos>w*1.5)pos-=w;gl.scrollLeft=pos;}requestAnimationFrame(function(){pos=setW();gl.scrollLeft=pos;});function tick(){if(!gd&&gvis&&!touching){pos+=.45;wrap();}requestAnimationFrame(tick);}var touching=false;gl.addEventListener('touchstart',function(){touching=true;},{passive:true});gl.addEventListener('touchend',function(){setTimeout(function(){touching=false;pos=gl.scrollLeft;},60);},{passive:true});gl.addEventListener('scroll',function(){if(touching){pos=gl.scrollLeft;var w=setW();if(pos<w*.5||pos>w*1.5)wrap();}},{passive:true});gl.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;gd=true;moved=false;gx=e.clientX;gs=pos;e.preventDefault();});addEventListener('pointermove',function(e){if(!gd)return;var dx=e.clientX-gx;if(Math.abs(dx)>3)moved=true;pos=gs-dx*1.6;wrap();});addEventListener('pointerup',function(){gd=false;});gl.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);gl.addEventListener('dragstart',function(e){e.preventDefault();});new IntersectionObserver(function(es){gvis=es[0].isIntersecting;}).observe(gl);requestAnimationFrame(tick);}

// Custom cursor: echo rings always · nebula glow on clickables/drag · brackets + scan
(function(){
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
var dot=mk('cur-dot'),ring=mk('cur-ring'),glow=mk('cur-glow'),frame=mk('cur-frame');
frame.innerHTML='<i></i><i></i><i></i><i></i><span class="scan-line"></span>';
[glow,ring,frame,dot].forEach(function(e){document.body.appendChild(e);});
function mk(c){var d=document.createElement('div');d.className=c;return d;}
var sel='a, button, .app, .ai, .out, .loop-card, .prob, .cmp-col.wt';
var noAll='.nav-links a, .nav-logo, .foot-l a, .case, .up-pill';
var noBr='.soc, .stepper button, .seg button, .tgl';
var dragSel='.marquee, .gallery';
var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,hot=null,lastEcho=0,onRed=false,curC='';
function overDarkText(x,y){var els=document.elementsFromPoint(x,y)||[];for(var i=0;i<els.length&&i<4;i++){var el=els[i];if(el.closest&&el.closest('.cur-dot,.cur-ring,.cur-frame,.cur-glow,.cur-echo'))continue;var c=getComputedStyle(el).color.match(/[\d.]+/g);if(!c)return false;var a=c[3]===undefined?1:+c[3];if(!(a>.5&&Math.max(+c[0],+c[1],+c[2])<90))return false;for(var k=0;k<el.childNodes.length;k++){var n=el.childNodes[k];if(n.nodeType!==3||!n.textContent.trim())continue;var r=document.createRange();r.selectNodeContents(n);var rs=r.getClientRects();for(var q=0;q<rs.length;q++){var b=rs[q];if(x>=b.left&&x<=b.right&&y>=b.top&&y<=b.bottom)return true;}}return false;}return false;}
function pointOnRed(x,y){var els=document.elementsFromPoint(x,y)||[];if(overDarkText(x,y))return false;for(var i=0;i<els.length&&i<10;i++){var el=els[i];if(el.closest&&el.closest('.cur-dot,.cur-ring,.cur-frame,.cur-glow,.cur-echo'))continue;var cs=getComputedStyle(el);if(el.tagName!=='IMG'&&cs.backgroundImage&&cs.backgroundImage.indexOf('gradient')>-1&&!el.classList.contains('neb')&&!el.closest('.neb')){var gm=cs.backgroundImage.match(/rgba?\([^)]+\)/g)||[];var strong=0;gm.forEach(function(c){var q=c.match(/[\d.]+/g);var a=q[3]===undefined?1:+q[3];if(a>.6){var mx=Math.max(+q[0],+q[1],+q[2]),mn=Math.min(+q[0],+q[1],+q[2]);if(mx>120&&(mx-mn)/mx>.4)strong++;}});if(strong>=2)return true;}var m=cs.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);if(m){var r=+m[1],g=+m[2],b=+m[3],a=m[4]===undefined?1:+m[4];if(a>.5&&Math.max(r,g,b)<60)return false;if(a>.55){var M=Math.max(r,g,b),N=Math.min(r,g,b);if((M>120&&(M-N)/M>.45)||(M+N)/2>190)return true;}if(a>.85)return false;}}return false;}
document.addEventListener('pointermove',function(e){
if(e.pointerType&&e.pointerType!=='mouse')return;
mx=e.clientX;my=e.clientY;
dot.style.transform=glow.style.transform='translate('+mx+'px,'+my+'px)';
var t=e.target,prev=hot;
hot=(t.closest&&t.closest(sel))||null;
var quiet=hot&&(hot.closest(noAll)||(hot.classList.contains('faq-q')&&hot.parentElement.classList.contains('open')));
var onDrag=t.closest&&t.closest(dragSel);
if(hot&&!quiet&&hot!==prev){frame.classList.remove('scanning');void frame.offsetWidth;frame.classList.add('scanning');}
if(!hot||quiet)frame.classList.remove('scanning');
ring.classList.toggle('is-hot',!!hot);
frame.style.opacity=(hot&&!quiet)?'1':'0';
frame.classList.toggle('no-br',!!(hot&&hot.closest(noBr)));
glow.style.opacity=(hot||onDrag)?'1':'0';
frame.style.removeProperty('--fc');frame.style.removeProperty('--sc');glow.style.removeProperty('--gc');
if(hot){
if(hot.closest('.cur-black')){frame.style.setProperty('--fc','#0d0d10');frame.style.setProperty('--sc','var(--red)');}
else if(hot.classList.contains('btn-red')){frame.style.setProperty('--fc','var(--red)');frame.style.setProperty('--sc','#0d0d10');}
else{var ac=getComputedStyle(hot).getPropertyValue('--ac').trim();if(ac&&ac.indexOf('gradient')<0){frame.style.setProperty('--fc',ac);glow.style.setProperty('--gc','color-mix(in srgb, '+ac+' 24%, transparent)');}}
}
onRed=pointOnRed(mx,my);
var box=t.closest&&t.closest('.app,.ai,.out,.dm-tab,.gt-bar,.gt-r b,[data-ac]');var cc='';if(box&&!onRed){cc=box.dataset.ac||getComputedStyle(box).getPropertyValue('--ac').trim()||getComputedStyle(box).getPropertyValue('--c').trim();if(cc.indexOf('gradient')>=0||/--red|255,\s*48|#ff3054/i.test(cc))cc='';}
curC=cc;[dot,ring].forEach(function(el){cc?el.style.setProperty('--cc',cc):el.style.removeProperty('--cc');});
dot.classList.toggle('on-red',onRed);ring.classList.toggle('on-red',onRed);
},{passive:true});
function echo(){var ec=document.createElement('div');ec.className='cur-echo';ec.style.cssText='left:'+mx+'px;top:'+my+'px;width:10px;height:10px;margin:-5px 0 0 -5px;opacity:.55;transition:all .9s ease-out'+(onRed?';border-color:#0d0d10':(curC?';border-color:'+curC:''));document.body.appendChild(ec);requestAnimationFrame(function(){ec.style.width=ec.style.height='58px';ec.style.margin='-29px 0 0 -29px';ec.style.opacity='0';});setTimeout(function(){ec.remove();},920);}
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform='translate('+rx+'px,'+ry+'px)';
if(hot){var r=hot.getBoundingClientRect(),p=6;frame.style.width=(r.width+p*2)+'px';frame.style.height=(r.height+p*2)+'px';frame.style.transform='translate('+(r.left-p)+'px,'+(r.top-p)+'px)';}
var n=performance.now();if(n-lastEcho>600){lastEcho=n;echo();}requestAnimationFrame(loop);})();
document.addEventListener('mouseleave',function(){[dot,ring,frame].forEach(function(e){e.classList.add('is-hidden');});frame.style.opacity=glow.style.opacity='0';});
document.addEventListener('mouseenter',function(){[dot,ring,frame].forEach(function(e){e.classList.remove('is-hidden');});});
})();
})();

(function(){var root=document.querySelector('.dm');if(!root)return;var tabs=[].slice.call(root.querySelectorAll('.dm-tab')),i=0,t;
function restart(){clearTimeout(t);tabs.forEach(function(b){var p=b.querySelector('.dm-prog');p.style.animation='none';void p.offsetWidth;p.style.animation='';});t=setTimeout(function(){show((i+1)%tabs.length);},3000);}
function show(n){i=n;tabs.forEach(function(b,k){b.classList.toggle('on',k===n);b.setAttribute('aria-selected',k===n?'true':'false');});root.querySelectorAll('[data-set]').forEach(function(el){el.classList.toggle('on',+el.getAttribute('data-set')===n);});restart();}
tabs.forEach(function(b,k){b.addEventListener('click',function(){show(k);});});
restart();})();

(function(){var scr=document.getElementById('tourScr'),fr=document.getElementById('tourFrame'),dots=document.getElementById('tourDots'),lbl=document.getElementById('tourLbl');if(!scr||!fr)return;
var W=1280,H=720;function fit(){var s=scr.clientWidth/W;fr.style.transform='scale('+s+')';fr.style.height=(scr.clientHeight/s)+'px';}
fit();addEventListener('resize',fit);
var built=0;addEventListener('message',function(e){var d=e.data||{};if(!d.wtTour||e.source!==fr.contentWindow)return;scr.classList.add('live');lbl.textContent=d.label;
if(!built){built=1;[].forEach.call(dots.children,function(b,k){b.addEventListener('click',function(){fr.contentWindow.postMessage({wtTourGo:k},'*');});});}
[].forEach.call(dots.children,function(b,k){var on=k===d.i;b.setAttribute('aria-selected',on?'true':'false');if(on){b.classList.remove('run');void b.offsetWidth;b.classList.add('run');var sl=dots.scrollLeft,bl=b.offsetLeft-dots.offsetLeft;if(dots.scrollWidth>dots.clientWidth)dots.scrollTo({left:bl-(dots.clientWidth-b.offsetWidth)/2,behavior:'smooth'});}else b.classList.remove('run');});});
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){if(!fr.src){fr.src=fr.dataset.src;}else fr.contentWindow.postMessage({wtTourPlay:1},'*');}else if(fr.src&&fr.contentWindow)fr.contentWindow.postMessage({wtTourPause:1},'*');});},{rootMargin:'900px 0px'});io.observe(scr);
})();

// Quote CTA
(function(){var m=document.getElementById('qModal'),b=document.getElementById('qSend');if(!m||!b)return;var f=document.getElementById('qForm'),ok=document.getElementById('qmOk'),err=document.getElementById('qmErr');
function txt(id){var e=document.getElementById(id);return e?e.textContent.trim():'';}
function open(){var lines=[].map.call(document.querySelectorAll('#sLines .qs-line'),function(l){return l.children[0].textContent+': '+l.children[1].textContent;});
var mon='monday: '+txt('sM1')+'/mo during program, '+txt('sM2')+'/mo from week 8';
document.getElementById('qmSum').innerHTML='<div><span>Program fees</span><b>'+txt('sTotal')+' USD</b></div><div><span>Payments</span><b>'+txt('sP1')+' + '+txt('sP2')+'</b></div><div><span>monday, per month</span><b>'+txt('sM1')+'</b></div>'+(txt('sP3')!=='Optional'?'<div><span>Partnership</span><b>'+txt('sP3')+'</b></div>':'');
document.getElementById('qmQuote').value=lines.join(' | ')+' | '+txt('sInc')+' | '+mon+' | Partnership: '+txt('sP3');
f.hidden=false;ok.hidden=true;err.hidden=true;m.hidden=false;document.body.style.overflow='hidden';setTimeout(function(){f.querySelector('input').focus();},50);}
function close(){m.hidden=true;document.body.style.overflow='';}
b.addEventListener('click',open);m.addEventListener('click',function(e){if(e.target.closest('[data-close]'))close();});addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close();});
f.addEventListener('submit',function(e){e.preventDefault();var n=f.name.value.trim(),em=f.email.value.trim(),co=f.company.value.trim();if(!n||!co||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){err.hidden=false;return;}
var data={name:n,email:em,company:co,quote:f.quote.value,source:'AITP landing quoter'};
/* TODO: POST data to n8n/Zapier webhook → monday Active Leads + email quote */
try{localStorage.setItem('wt_aitp_quote',JSON.stringify(data));}catch(_){}
f.hidden=true;ok.hidden=false;});})();

// Difference: field phone tour
(function(){var scr=document.getElementById('phScr'),fr=document.getElementById('phFrame'),dots=document.getElementById('phDots'),win=scr&&scr.parentNode.querySelector('.win');if(!scr||!fr)return;
var ox=435,oy=60,pw=410;
function place(){if(win){var wr=win.getBoundingClientRect(),fr2=scr.parentNode.getBoundingClientRect();scr.style.setProperty('--dph-top',(wr.bottom-fr2.top-scr.offsetHeight*.82)+'px');}var s=scr.clientWidth/pw;fr.style.transform='scale('+s+') translate('+(-ox)+'px,'+(-oy)+'px)';}
place();addEventListener('resize',place);if(window.ResizeObserver)new ResizeObserver(place).observe(win||scr);
fr.addEventListener('load',function(){setTimeout(function(){try{var e=fr.contentDocument.querySelector('.phone');if(e){var r=e.getBoundingClientRect();if(r.width>0&&r.height>0){ox=r.left;oy=r.top;pw=r.width;place();}}}catch(_){}},400);});
[].forEach.call(dots.children,function(b,k){b.addEventListener('click',function(){if(fr.contentWindow)fr.contentWindow.postMessage({wtTourGo:k},'*');});});
addEventListener('message',function(e){var d=e.data||{};if(!d.wtTour||e.source!==fr.contentWindow)return;scr.classList.add('live');
[].forEach.call(dots.children,function(b,k){var on=k===d.i;b.setAttribute('aria-selected',on?'true':'false');b.classList.remove('run');if(on){void b.offsetWidth;b.classList.add('run');}});});
new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){if(!fr.src)fr.src=fr.dataset.src;else fr.contentWindow.postMessage({wtTourPlay:1},'*');}else if(fr.src&&fr.contentWindow)fr.contentWindow.postMessage({wtTourPause:1},'*');});},{rootMargin:'300px'}).observe(scr);
})();

document.querySelectorAll('.faq-q').forEach(function(b){b.addEventListener('click',function(){var f=document.querySelector('.cur-frame');if(f&&b.parentElement.classList.contains('open')){f.style.opacity='0';f.classList.remove('scanning');}});});

/* live data architecture (Volt Electric) */
(function(){var host=document.getElementById('arch');if(!host)return;
var IC={dir:'<path d="M4 15a8 8 0 0116 0"/><path d="M12 15l4-4"/><circle cx="12" cy="15" r="1.2"/>',lider:'<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/>',campo:'<path d="M4 17h16"/><path d="M6 17a6 6 0 0112 0"/><path d="M12 8V6"/>',purch:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',admin:'<rect x="3" y="7" width="18" height="11" rx="2"/><circle cx="12" cy="12.5" r="2.5"/>',cli:'<circle cx="12" cy="9" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',com:'<path d="M4 17l5-5 4 4 7-7"/><path d="M15 9h5v5"/>',gest:'<path d="M7 3h7l4 4v14H7z"/><path d="M10 12h5M10 16h5"/>'};
var R={dir:['Command','Leadership','#5B5BD6'],lider:['Project management','Project manager','#2F6FE4'],campo:['Field reports','Field','#D9730D'],purch:['Purchasing & delivery','Purchasing','#B7791F'],admin:['Admin','Collections & payments','#BE185D'],cli:['Client portal','Client','#4F6FA8',1],com:['Sales','Sales','#0F8A6E',1],gest:['Utility desk','Utility permits','#7C5CD6',1]};
var TB=[['proyectos','Projects & subprojects','14 projects · 10 stores'],['cobros','Billing plan & invoices','78 billings'],['compras','Requisitions, POs & payments','9 requisitions'],['presupuesto','Budgets & expenses','23 budgets · 49 expenses'],['personal','Staff & assignments','8 people · 62 assignments'],['materiales','Materials & suppliers','16 materials · 10 suppliers'],['reportes','Field reports','2 reports'],['documentos','Documents','114 approved'],['oportunidades','Opportunities & proposals','4 opportunities'],['folios','Utility filings','6 filings']];
var A={dir:{proyectos:'w',cobros:'r',compras:'r',presupuesto:'r',personal:'r',reportes:'r',oportunidades:'r'},lider:{proyectos:'w',compras:'w',presupuesto:'w',personal:'w',cobros:'r',documentos:'w',reportes:'r',materiales:'r'},campo:{reportes:'w',proyectos:'w',compras:'w',personal:'r'},purch:{compras:'w',materiales:'w',presupuesto:'r',proyectos:'r'},admin:{cobros:'w',compras:'w',presupuesto:'r',proyectos:'r',documentos:'r'},cli:{proyectos:'r',documentos:'w',cobros:'r',reportes:'r',personal:'r'},com:{oportunidades:'w',proyectos:'w',cobros:'w',presupuesto:'w',materiales:'r'},gest:{folios:'w',documentos:'w',proyectos:'r'}};
var L=['dir','lider','campo','purch'],RR=['admin','cli','com','gest'],ORD=L.concat(RR);
var ty=function(i){return 24+i*50},ay=function(i){return 22+i*124};
var ico=function(k){return '<g stroke="#fff" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+IC[k]+'</g>'};
var lines='';function draw(r,idx,left){Object.keys(A[r]).forEach(function(t){var ti=TB.findIndex(function(x){return x[0]===t});var y1=ay(idx)+50,y2=ty(ti)+21;var p=left?'M226,'+y1+' C305,'+y1+' 305,'+y2+' 384,'+y2:'M774,'+y1+' C695,'+y1+' 695,'+y2+' 616,'+y2;lines+='<path class="ln '+A[r][t]+(R[r][3]?' opt':'')+'" data-r="'+r+'" data-t="'+t+'" d="'+p+'" stroke="'+R[r][2]+'"/>'});}
L.forEach(function(r,i){draw(r,i,1)});RR.forEach(function(r,i){draw(r,i,0)});
function node(r,i,x){var o=R[r];return '<g class="appn'+(o[3]?' optn':'')+'" style="--a:'+o[2]+'" data-f="'+r+'" transform="translate('+x+','+ay(i)+')"><rect class="box" width="200" height="100" rx="10"/><rect x="16" y="18" width="32" height="32" rx="7" fill="'+o[2]+'"/><g transform="translate(23,25) scale(.75)">'+ico(r)+'</g><text class="t1" x="60" y="33">'+o[0].replace('&','&amp;')+'</text><text class="t2" x="60" y="50">'+o[1].replace('&','&amp;')+'</text><text class="t3" x="16" y="82">'+(o[3]?'Add-on module':'Open app')+'</text></g>';}
var svg='<svg viewBox="0 0 1000 530" role="img" aria-label="Role apps connected to one shared database"><rect class="hub" x="366" y="4" width="268" height="518" rx="12"/><text class="hub-t" x="500" y="17" text-anchor="middle">ONE SHARED DATABASE</text>'+lines+TB.map(function(t,i){return '<g class="tb" data-f="'+t[0]+'" transform="translate(384,'+ty(i)+')"><rect class="box" width="232" height="42" rx="8"/><text class="t1" x="14" y="18">'+t[1].replace(/&/g,'&amp;')+'</text><text class="t2" x="14" y="33">'+t[2]+'</text></g>'}).join('')+L.map(function(r,i){return node(r,i,26)}).join('')+RR.map(function(r,i){return node(r,i,774)}).join('')+'</svg>';
var mob='<div class="ax-m"><div class="ax-roles" role="group" aria-label="Role apps">'+ORD.map(function(r){var o=R[r];return '<button type="button" class="ax-role'+(o[3]?' optn':'')+'" style="--a:'+o[2]+'" data-mr="'+r+'" aria-pressed="false"><b><svg viewBox="0 0 24 24">'+ico(r)+'</svg></b>'+o[0].replace('&','&amp;')+'</button>'}).join('')+'</div><div class="ax-dbh">ONE SHARED DATABASE</div><div class="ax-tbl">'+TB.map(function(t){return '<div class="ax-row" data-mt="'+t[0]+'"><div><strong>'+t[1].replace(/&/g,'&amp;')+'</strong><small>'+t[2]+'</small></div><em></em></div>'}).join('')+'</div></div>';
host.insertAdjacentHTML('beforeend',svg+mob+'<div class="ax-leg"><span><i></i>Reads &amp; writes</span><span><i class="r"></i>Read only</span></div>');host.classList.add('on');
var sv=host.querySelector('svg'),cur=null;
function focus(f){cur=f;host.classList.toggle('focus',!!f);
sv.querySelectorAll('.ln').forEach(function(l){l.classList.toggle('hl',f===l.dataset.r||f===l.dataset.t)});
sv.querySelectorAll('.appn').forEach(function(n){var k=n.dataset.f;n.classList.toggle('hl',!!f&&(f===k||!!A[k][f]))});
var col=R[f]?R[f][2]:null;sv.querySelectorAll('.tb').forEach(function(n){var k=n.dataset.f;n.style.setProperty('--tc',col||'#9AA6B8');n.classList.toggle('hl',!!f&&(f===k||!!(A[f]&&A[f][k])))});
var mr=R[f]?f:null;if(!mr)return;host.querySelectorAll('.ax-role').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.mr===mr?'true':'false')});
var tbl=host.querySelector('.ax-tbl');tbl.style.setProperty('--a',R[mr][2]);
host.querySelectorAll('.ax-row').forEach(function(rw){var m=A[mr][rw.dataset.mt];rw.className='ax-row '+(m||'x');rw.querySelector('em').textContent=m==='w'?'Reads & writes':m==='r'?'Read only':''});}
var i=0,t=null,hold=false,vis=false;
function step(){if(hold||!vis)return;focus(ORD[i%ORD.length]);var b=host.querySelector('.ax-role[data-mr="'+ORD[i%ORD.length]+'"]'),rs=host.querySelector('.ax-roles');if(b&&rs&&rs.offsetParent){rs.scrollTo({left:b.offsetLeft-12,behavior:'smooth'})}i++;}
function run(){clearInterval(t);t=setInterval(step,2800);}
sv.addEventListener('pointerover',function(e){var g=e.target.closest('[data-f]');if(!g)return;hold=true;if(cur!==g.dataset.f)focus(g.dataset.f);});
sv.addEventListener('pointerleave',function(){hold=false;focus(null);run();});
host.querySelector('.ax-roles').addEventListener('click',function(e){var b=e.target.closest('.ax-role');if(!b)return;hold=true;clearInterval(t);focus(b.dataset.mr);i=ORD.indexOf(b.dataset.mr)+1;clearTimeout(host._rt);host._rt=setTimeout(function(){hold=false;run();},9000);});
new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis){if(!cur)step();run();}else clearInterval(t);},{threshold:.25}).observe(host);
focus('dir');})();
