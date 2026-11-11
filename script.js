'use strict';
const $=id=>document.getElementById(id);
const sections=['welcome','slides','question','choice','feedback','confidence','results'];
let data=null, slide=0;
function show(id){sections.forEach(s=>$(s).classList.toggle('hidden',s!==id));}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// Original stimulus always has a STOP sign; comparison image changes only that sign.
function scene(sign,frame){
 const x=[65,245,425][frame-1];
 const signArt=sign==='yield'
 ? '<path d="M555 88 L593 157 L517 157 Z" fill="#f6d6ad" stroke="#a84432" stroke-width="7"/><text x="555" y="143" text-anchor="middle" font-size="13" font-weight="bold" fill="#853325">YIELD</text>'
 : '<rect x="526" y="94" width="62" height="62" rx="3" fill="#d6423b" stroke="white" stroke-width="4"/><text x="557" y="132" text-anchor="middle" font-size="16" font-weight="bold" fill="white">STOP</text>';
 return `<svg viewBox="0 0 680 300" role="img" aria-label="Blue car at intersection with ${sign} sign"><rect width="680" height="300" fill="#dcecf4"/><circle cx="82" cy="54" r="23" fill="#fff1c5"/><path d="M0 130 Q120 105 240 130 T480 126 T680 130 V165 H0Z" fill="#9fbd9a"/><rect y="164" width="680" height="136" fill="#646e78"/><path d="M0 231 H680" stroke="#f5f0d8" stroke-width="4" stroke-dasharray="30 22"/><path d="M495 164 V300" stroke="white" stroke-width="5"/><rect x="552" y="150" width="8" height="82" fill="#5b6268"/>${signArt}<path d="M${x} 214 h105 l24 25 v38 h-148 v-38z" fill="#347caf" stroke="#173e5c" stroke-width="4"/><path d="M${x+28} 214 l18 -24 h40 l18 24z" fill="#b9d8e8" stroke="#173e5c" stroke-width="3"/><rect x="${x+35}" y="194" width="27" height="18" fill="#d9edf5"/><rect x="${x+67}" y="194" width="27" height="18" fill="#d9edf5"/><circle cx="${x+25}" cy="301" r="14" fill="#202a32" stroke="#cbd3d9" stroke-width="5"/><circle cx="${x+116}" cy="301" r="14" fill="#202a32" stroke="#cbd3d9" stroke-width="5"/></svg>`;
}
const captions=['A blue car approaches an intersection.','The car reaches the intersection, where a stop sign is visible.','The car continues through the intersection.'];
function start(){
 const q=Math.random()<.5?'misleading':'accurate', f=Math.random()<.5?'confirming':'neutral';
 const positions=shuffle(['A','B']), correct=positions[0];
 data={session_id:'CAR-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),started_at:new Date().toISOString(),
 question_condition:q,question_group:q==='misleading'?'Misleading information':'Accurate information',
 feedback_condition:f,feedback_group:f==='confirming'?'Confirming post-identification feedback':'Neutral post-identification feedback',
 feedback_shown:f==='confirming'?'Correct!':'Okay.',correct_picture_position:correct,
 picture_A_sign:correct==='A'?'stop':'yield',picture_B_sign:correct==='B'?'stop':'yield',
 selected_picture:'',selected_sign:'',accuracy:0,confidence:null,completed_at:''};
 slide=0;renderSlide();show('slides');
}
function renderSlide(){
 $('counter').textContent=`Slide ${slide+1} of 3`;
 $('slideArt').innerHTML=scene('stop',slide+1);$('caption').textContent=captions[slide];
 $('progress').style.width=`${(slide+1)/3*100}%`;
 $('next').textContent=slide===2?'Continue to question':'Next slide';
}
function nextSlide(){
 slide++;if(slide<3){renderSlide();return;}
 $('questionText').textContent=data.question_condition==='misleading'
 ?'How fast was the car traveling when it passed the yield sign?'
 :'How fast was the car traveling when it passed the stop sign?';show('question');
}
function choices(){
 $('picA').innerHTML=scene(data.picture_A_sign,2);$('picB').innerHTML=scene(data.picture_B_sign,2);show('choice');
}
function choose(pos){
 data.selected_picture=pos;data.selected_sign=pos==='A'?data.picture_A_sign:data.picture_B_sign;
 data.accuracy=data.selected_sign==='stop'?1:0;$('feedbackText').textContent=data.feedback_shown;show('feedback');
}
function submit(){
 data.confidence=Number($('confidence').value);data.completed_at=new Date().toISOString();
 $('choiceResult').textContent='Picture '+data.selected_picture;$('accuracyResult').textContent=data.accuracy?'Correct':'Incorrect';
 $('confidenceResult').textContent=data.confidence+'/10';
 $('groups').textContent='Assigned groups: '+data.question_group+'; '+data.feedback_group+'.';show('results');
}
function download(){
 const keys=['session_id','started_at','completed_at','question_condition','question_group','feedback_condition','feedback_group','feedback_shown','selected_picture','selected_sign','correct_picture_position','accuracy','confidence'];
 const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
 const csv=[keys.map(esc).join(','),keys.map(k=>esc(data[k])).join(',')].join('\r\n');
 const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));
 const a=document.createElement('a');a.href=url;a.download='car_accident_memory_session.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}
function restart(){data=null;$('confidence').value=5;$('confidenceValue').textContent='5';show('welcome');}
$('start').addEventListener('click',start);$('next').addEventListener('click',nextSlide);
$('toChoice').addEventListener('click',choices);
document.querySelectorAll('.pick').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.pick)));
$('toConfidence').addEventListener('click',()=>show('confidence'));
$('confidence').addEventListener('input',()=>$('confidenceValue').textContent=$('confidence').value);
$('submit').addEventListener('click',submit);$('download').addEventListener('click',download);$('restart').addEventListener('click',restart);
