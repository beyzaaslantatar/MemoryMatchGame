
let card = document.getElementsByClassName('card');
let cards = [...card];
let deck = document.querySelector('.deck');
let openedCards = [];
let changeMovesNumber = document.getElementById('moves');
let matchCount =0;
const button = document.getElementById('play-again');
let starN=0;
let time = '00:00'
let seconds = 0;
let minutes = 0;
let timeTiger= 0;
let t;
const timer = document.getElementById('timer');
const modal = document.getElementById('myModal');
const modalHeading = document.querySelector('#modal-heading');
let modalMessage=''; 

window.onload = function() {
 newGame();
};

/* oyunun tekrar başlatmak için*/
let restartClick = document.getElementById('restartClick'); 
restartClick.addEventListener('click', newGame); 
/* Kartların listesini "shuffle" metoduyla karıştırın */
// let shuffledCards = shuffle(cards);
// newGame();

/*

Oyun için kartları ayarlama:
Karıştırma fonksiyonu http://stackoverflow.com/a/2450976 adresinden alınmıştır.
*/

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    
   // console.log(randomIndex);
   // debugger;
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    
  }

  return array;
}

/*
* Sayfada kartları göster
* Her kartı döngüyle geç ve HTML'ini oluştur
* Her kartın HTML'ini sayfaya ekle
*/

function newCards(){
    let shuffleCards = shuffle(cards);
 
    for (let i = 0; i < shuffleCards.length; i++) {
    shuffleCards[i].classList.remove('show', 'open', 'match', 'trick');
      
    deck.appendChild(shuffleCards[i]);
    }
  for (let shuffleCard of shuffleCards) {
  shuffleCard.addEventListener('click', clickedCards);
  }
}

function newGame() { 
    resetMovesCount();
    resetStarRating();
    matchCount = 0;
    timeTiger= 0;
    resetTimer();
    openedCards = [];
    modalMessage.innerHTML = '';  
    newCards();
} 

/* Bu işlev, kartları göstermek ve eşleştirmek için farklı işlevleri başlatır */

/* Karta tıklandığında zamanı ve karşılaştırmayı başlatır*/
function clickedCards (){
  showCard();
  addToOpenCards();
  timeTiger++
  if(timeTiger === 1){
    startTimer();
  }
  if (openedCards.length === 2){
    addMoves(); 
    if (openedCards[0].innerHTML === openedCards[1].innerHTML){
      matchCount++;
      console.log(matchCount);
      stopClock();
      match(); 
    } else {
        notMatch();
      }
  }
  

/* kartın sembolünü gösterir */
function showCard (){  
 // console.log(event.target.tagName);
  debugger;
  const cardTagName = event.target 
  if (cardTagName.tagName === 'LI'){
     if (openedCards.length < 2){  
  event.target.classList.add('open', 'show');
    console.log(event.target);
     }
  }
}


function addToOpenCards () { 
  openedCards.push(event.target);
    // if (openedCards.length < 2);
}

/* iki kartın eşleşip eşleşmediğini kontrol et*/
function match(){
  openedCards[0].classList.add('match', 'trick');
  event.target.classList.add('match', 'trick');
  openedCards[0].classList.remove('show', 'open'); 
  event.target.classList.remove('show', 'open'); 
  openedCards = [];  
 }
             
function notMatch (){
    setTimeout(function(){ 
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
       }, 500);
}
};

/* Eşleşmezse kartları kaybolmadan önce görüntüleyebilmek için açılan kartları geciktirir */

/* Hamle sayacını artır ve sayfada görüntüle */
function addMoves(){
  moves++;
  console.log(moves);
  changeMovesNumber.textContent =  moves;
  starRating();
}

function resetMovesCount(){
  moves = 0; 
  changeMovesNumber.textContent =  moves; 
}

/* deduct stars */
function starRating (){
  if (moves > 8 && moves < 21){
    starN = 3;
  }
  if (moves > 20 && moves < 30 ) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 2;
  } if (moves > 30) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    document.getElementById('two').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 1;
  }
}

/* yıldızları sıfırla */
function resetStarRating (){ 
  document.getElementById('one').innerHTML ='<i class="fa fa-star"></i>';
  document.getElementById('two').innerHTML ='<i class="fa fa-star"></i>';
}

function startTimer() {
       clearInterval(t);
      t = setInterval(buildTimer,1000);
  }

timer.textContent = time;
function buildTimer () {
    seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                seconds = 0;
            }
        }
timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
}

function stopClock () {
   if (matchCount === 8){
     clearInterval(t);
   gameEnds();
   }
}

function resetTimer () {
  clearInterval(t);
  seconds = 0;
  minutes = 0;
  timer.textContent = time;
 }


/* MODAL - Sonuç puanıyla bir mesaj göster */
/* Kullanıcı son kartı tıklattığında modal açılır */
function gameEnds () {
  modalMessage = document.createElement('p');
  modalMessage.innerHTML = '<p>Geçen Süre '+ timer.textContent + ', '+ moves + ' Hareket ve ' + starN + ' Yıldız !</br> BAŞARDINIZ!</p>';
  modalMessage.classList.add('modal-text');
  modalHeading.appendChild(modalMessage); 
  modal.style.display = 'block';
}
  
// Kullanıcı "Tekrar Oyna" düğmesine tıkladığında, kapatır
button.onclick = function() {
    modal.style.display = 'none';
    scoreRepository();
    newGame();  
};

// Kullanıcı modalın dışına herhangi bir yere tıkladığında, onu kapat
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    newGame();
    resetTimer();
  }
};


 function scoreRepository() {   
   localStorage.setItem('moves', moves);
   localStorage.setItem('star_number', starN);
   localStorage.setItem('timer', timer.textContent);

   const addResults = document.getElementById('Sonuç');
   let resultTextToAdd = 'Geçen Süre'+ timer.textContent + ', '+ moves + ' Hareket ve ' + starN + ' Yıldız</ br></p>';
  addResults.insertAdjacentHTML('afterend', resultTextToAdd); 
  }

