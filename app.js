'use strict';

product.firstImgEl = document.getElementById('first-pic');
product.secondImgEl = document.getElementById('second-pic');
product.thirdImgEl = document.getElementById('third-pic');
product.ulElement = document.getElementById('results-list');
product.chartContext = document.getElementById('results-chart');


product.displayed = [];
product.totalVotes = [];
product.totalClicks = 0;
product.altTextLabels = [];
product.priorproduct = JSON.parse(localStorage.getItem('priorResults'));

//stores productandise images in array using constructor function
function product(filepath, description) {
  this.path = filepath;
  this.altText = description;
  this.numClicked = 0;
  this.numDisplayed = 0;
}

//short-circuits creation of these instances if they already exist in local storage
product.allproduct = product.priorproduct || [
  new product('img/bag.jpg', 'rolling suitcase resembling R2D2'),
  new product('img/banana.jpg', 'banana slicer'),
  new product('img/bathroom.jpg', 'bathroom stand that holds a tablet and toilet paper'),
  new product('img/boots.jpg', 'pair of toe-less yellow rubber boots'),
  new product('img/breakfast.jpg', 'mini toaster over/pan/coffee maker combo'),
  new product('img/bubblegum.jpg', 'box of meatball bubblegum'),
  new product('img/chair.jpg', 'red plastic chair with an upward-curving seat'),
  new product('img/cthulhu.jpg', 'cthulhu action figure'),
  new product('img/dog-duck.jpg', 'dog with a duck bill strapped to its face'),
  new product('img/dragon.jpg', 'can of dragon meat'),
  new product('img/pen.jpg', 'set of pens with plastic eating utensils as caps'),
  new product('img/pet-sweep.jpg', 'box of dog shoes that sweep the floor'),
  new product('img/scissors.jpg', 'pizza-cutter scissors'),
  new product('img/shark.jpg', 'sleeping bag shaped like a shark'),
  new product('img/sweep.png', 'baby onesie that sweeps the floor'),
  new product('img/tauntaun.jpg', 'sleeping bag shaped like a tauntaun'),
  new product('img/unicorn.jpg', 'can of unicorn meat'),
  new product('img/usb.gif', 'USB drive shaped like a tentacle'),
  new product('img/water-can.jpg', 'watering can with the spout pointing backward'),
  new product('img/wine-glass.jpg', 'wine glass with the opening on the side')
];

//creates random number generator
product.randomNum = function() {
  var ranNum = Math.floor(Math.random() * product.allproduct.length);
  return ranNum;
};

//creates array of random index numbers while avoiding repetition
product.uniqueArray = function() {
  var ranIndex = product.randomNum();
  while(product.displayed.length < 6) {
    if(!product.displayed.includes(ranIndex)){
      product.displayed.unshift(ranIndex);
    } else {
      ranIndex = product.randomNum();
    }
  }
};

//renders 3 images at once
product.renderproduct = function() {
  product.uniqueArray();

  product.firstImgEl.src = product.allproduct[product.displayed[0]].path;
  product.firstImgEl.alt = product.allproduct[product.displayed[0]].altText;
  product.allproduct[product.displayed[0]].numDisplayed++;

  product.secondImgEl.src = product.allproduct[product.displayed[1]].path;
  product.secondImgEl.alt = product.allproduct[product.displayed[1]].altText;
  product.allproduct[product.displayed[1]].numDisplayed++;

  product.thirdImgEl.src = product.allproduct[product.displayed[2]].path;
  product.thirdImgEl.alt = product.allproduct[product.displayed[2]].altText;
  product.allproduct[product.displayed[2]].numDisplayed++;

  product.displayed.splice(2);
};

//tracks clicks, determines when to stop image selections and displays/stores results
product.handleClick = function(event) {
  product.totalClicks++;

  for (var i = 0; i < product.allproduct.length; i++) {

    if(event.target.alt === product.allproduct[i].altText) {
      product.allproduct[i].numClicked++;
    }
  }

  if(product.totalClicks > 24) {
    product.firstImgEl.removeEventListener('click', product.handleClick);
    product.secondImgEl.removeEventListener('click', product.handleClick);
    product.thirdImgEl.removeEventListener('click', product.handleClick);
    alert('This concludes the survey. Thank you.');
    product.getVotes();
    product.generateList();
    product.displayChart();
  } else {
    product.renderproduct();
  }
};

//creates arrays to store results and use in displaying results
product.getVotes = function() {
  for(var i = 0; i < product.allproduct.length; i++) {
    product.totalVotes[i] = product.allproduct[i].numClicked;
    product.altTextLabels[i] = product.allproduct[i].altText;
  }
};

product.generateList = function() {
  for(var i = 0; i < product.totalVotes.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${product.totalVotes[i]} votes for the ${product.allproduct[i].altText}`;
    product.ulElement.appendChild(liElement);
  }
};

product.renderproduct();

product.firstImgEl.addEventListener('click', product.handleClick);
product.secondImgEl.addEventListener('click', product.handleClick);
product.thirdImgEl.addEventListener('click', product.handleClick);

