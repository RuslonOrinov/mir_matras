'use strict';

// Leaflet library map
const success = function(position) {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude];

  const map = L.map('map', {
    scrollWheelZoom: false
  }).setView(coords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coords).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
}

const error = function(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
}

// Selecting elements
// header elements
const header =document.getElementById('header'),
      headerTitle = document.querySelector('.header__title'),
      headerVoting = document.querySelector('.header__voting'),
      headerOptions = document.querySelector('.header__options'),
      headerBtn = document.querySelector('.header__btn'),
      headerGallery = document.querySelector('.header__gallery'),
      headerService = document.querySelector('.header__service');
      
// call
const call = document.querySelector('.call'); 
      
// Catalogs block
const catalogsBlock = document.querySelector('.catalogs__block');

// Number popup
const numberPopupCard = document.querySelector('.number-popup__card');
const numberPopupBackdrop = document.querySelector('.number-popup__backdrop');
const numberPopupCardClose = document.querySelector('.number-popup__card .close');
const numberPopupCardForm = document.querySelector('form');


// function open popup
function openPopup(card, backdrop) {
  card.classList.remove('fade-up');
  backdrop.classList.remove('hidden');
}
// function hide popup
function hidePopup(card, backdrop, e) {
  e.preventDefault();
  card.classList.add('fade-up');
  backdrop.classList.add('hidden');
}

//////////////////////////////////////////////////
// Catalogs open and hide features
catalogsBlock.addEventListener('click',function(e){
  const el = e.target;
  if(el.nodeName === 'BUTTON'){
    openPopup(numberPopupCard, numberPopupBackdrop);
  } 
});

numberPopupCardForm.addEventListener('submit', hidePopup.bind(null, numberPopupCard, numberPopupBackdrop));

[numberPopupBackdrop, numberPopupCardClose].forEach(el => el.addEventListener('click',
hidePopup.bind(null, numberPopupCard, numberPopupBackdrop)));

////////////////////////////////////////////////////////////////////////////////////
// Window loaded element features
const classMoveRight = 'to-right',
      classMoveLeft = 'to-left',
      classMoveTop = 'to-top',
      countTime = 500;

function moveToward(el, className){
  el.classList.remove(className);
}     

function movingElement(moveElement, moveClass, timer){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(moveToward(moveElement, moveClass))
    }, timer);
  }); 
}

window.addEventListener('load', async function(){
  await movingElement(headerTitle, classMoveRight, countTime);
  await movingElement(headerVoting, classMoveRight, countTime);
  await movingElement(headerOptions, classMoveRight, countTime);
  await movingElement(headerBtn, classMoveRight, countTime);
  await movingElement(headerGallery, classMoveLeft, countTime);  
  await movingElement(call, classMoveLeft, countTime);
  await movingElement(headerService, classMoveTop, countTime);  
});                

///////////////////////////////////////////////////////////////////////////////////

// // apply, call, bind method
// var hello = 'Hi'

// var message = {
//   hello: 'Good Morning'
// }

// console.log(window == this);

// function showMessage(name) {
//   console.log(this);
//   console.log(`${this.hello} ${name}`);
// }


// // call
// showMessage.call(window, 'John');
// showMessage.call(message, 'Ashley');

// // apply
// showMessage.apply(window, ['John', 'Doe']);
// showMessage.apply(message, ['Mike', 'Collins']);

// // bind
// const boundedFunc = showMessage.bind