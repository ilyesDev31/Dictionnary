const toggleDarkBtn = document.querySelector('.toggle-dark');
const playPause = document.querySelector('.play-pause');
const btns = playPause.querySelectorAll('i');
const audio = document.querySelector('audio');
toggleDarkBtn.addEventListener('click', toggleDark);

function toggleDark(){
    this.classList.toggle('active');
    document.body.classList.toggle('dark')
}

playPause.addEventListener('click', playPauseAudio);

function playPauseAudio(){
   console.log();
if(audio.getAttribute('src') === "no-audio"){
    alert('there is no audio for this word');
    return;
}
    removeActive(btns)
    if(this.classList.contains('play')){
       this.classList.remove('play');
       this.classList.add('pause');
       btns[1].classList.add('active');
       audio.play();
    }else{
        this.classList.remove('pause');
        this.classList.add('play');
        btns[0].classList.add('active');
        audio.pause()
    }
}
audio.addEventListener('ended', checkEnd);

function checkEnd(){
    playPause.classList.remove('pause');
    playPause.classList.add('play');
    btns[0].classList.add('active');
    btns[1].classList.remove('active');
}

function removeActive(ele){
    ele.forEach(el => el.classList.remove('active'));
}
// getting word with api 

const input = document.querySelector('input');
const search = document.querySelector('.search-btn');
const word = document.querySelector('.word-p');
const phoenetic  = document.querySelector('.phoenetic');

const lineContainer = document.querySelectorAll('.line-container');
const definitionCont = document.querySelectorAll('.definition-container');
const definitionContUl = document.querySelectorAll('.definition-container ul');
const synonym = document.querySelectorAll('.synonym');
const syno = document.querySelectorAll('.syno');
search.addEventListener('click', getWord);

async function getWord(){
    let val  = input.value;

    if(val.trim() === "") {
        alert('please enter a valid word');
        return;
    }
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`);
    let final = await data.json();
    let obj = final[0];
    if(obj === undefined){
        alert(`Oops there is no such word as ${val} in official English vocabulary`);
        return;
    }
    // showing hidden element in html
playPause.classList.remove('notDisplayed')
    // filtering and adding audio
    let audioUrl = final[0].phonetics.filter(a => a.audio !="");
    audioUrl = audioUrl.length > 0 ? audioUrl[audioUrl.length-1].audio   : "no-audio";
    audio.src = audioUrl;
    
    // adding word and phoenitic
    word.innerHTML = obj.word;
    phoenetic.innerHTML = obj.phonetic
    // adding word meaning
    definitionContUl.forEach(a => a.innerHTML = "")
    for(let i = 0; i  <Math.min(4,obj.meanings.length); i++){
 lineContainer[i].classList.remove('notDisplayed');
 definitionCont[i].classList.remove('notDisplayed');
 synonym[i].classList.remove('notDisplayed');
 if(obj.meanings[i].synonyms.length === 0){
    syno[i].innerHTML = "no synoyme"
 }else{
    syno[i].innerHTML = obj.meanings[i].synonyms.join('-')
 }
 
for(let j = 0; j < obj.meanings[i].definitions.length; j++){
    let li = document.createElement('li');
    li.innerHTML = obj.meanings[i].definitions[j].definition;
    definitionContUl[i].appendChild(li);
}


}
let lengt = Math.min(4,obj.meanings.length);

if(Math.abs(4-lengt) === 0) {
    console.log(lengt)
    console.log(Math.abs(4-lengt))
    return;
};
console.log()
let k = 0;
let track = 3;
while(k < Math.abs(4-lengt)){
    console.log(synonym[track])
    lineContainer[track].classList.add('notDisplayed');
    definitionCont[track].classList.add('notDisplayed');
    synonym[track].classList.add('notDisplayed');
    k++;
    track--;
}


   console.log(obj.meanings)
}

// https://api.dictionaryapi.dev/api/v2/entries/en/