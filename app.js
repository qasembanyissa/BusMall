//Make an object
'use strict';

//Array of products
Product.allProducts = [];
Product.activeSet = [];
Product.lastDisplayed = [];
Product.totalVotes = 25;

var votes = [];
var names = [];
// product section
Product.section = document.getElementById('productsSection');

Product.resultsList = document.getElementById('productStats');

var productOne = document.getElementById('productOne');
var productTwo = document.getElementById('productTwo');
var productThree = document.getElementById('productThree');

function Product(name, filepath, altText) {
  this.name = name;
  this.filepath = filepath;
  this.altText = altText;
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//Make new Products instances

new Product('Bag', 'images/bag.jpg','Bag');
new Product('Banana Slicer', 'images/banana.jpg','Banana Slicer');
new Product('Bathroom', 'images/bathroom.jpg','Bathroom');
new Product('Boots', 'images/boots.jpg','Boots');
new Product('Breakfast', 'images/breakfast.jpg','Breakfast');
new Product('Bubblegum', 'images/bubblegum.jpg', 'Bubblegum');
new Product('Chair', 'images/chair.jpg', 'Chair');
new Product('Cthulhu', 'images/cthulhu.jpg', 'Cthulhu');
new Product('Dog Duck', 'images/dog-duck.jpg', 'Dog Duck');
new Product('Dragon Meat', 'images/dragon.jpg', 'Dragon Meat');
new Product('Pen', 'images/pen.jpg', 'Pen');
new Product('Pet Broom', 'images/pet-sweep.jpg', 'Pet Broom');
new Product('Scissors', 'images/scissors.jpg', 'Scissors');
new Product('Shark', 'images/shark.jpg', 'Shark');
new Product('Sweep', 'images/sweep.png', 'Sweep');
new Product('Tauntaun', 'images/tauntaun.jpg', 'Tauntaun');
new Product('Unicorn Meat', 'images/unicorn.jpg', 'Unicorn Meat');
new Product('Tentacle USB', 'images/usb.gif', 'Tentacle USB');
new Product('Watering Can', 'images/water-can.jpg', 'Watering Can');
new Product('Wine Glass', 'images/wine-glass.jpg', 'Wine Glass');


//Randomly display products

function randomProduct() {
  var randomOne = Math.floor(Math.random() * Product.allProducts.length);
  var randomTwo = Math.floor(Math.random() * Product.allProducts.length);
  var randomThree = Math.floor(Math.random() * Product.allProducts.length);

  //Confirm there are no duplicate images, and if there are, reroll
  while(Product.lastDisplayed.includes(randomOne) || Product.lastDisplayed.includes(randomTwo) || Product.lastDisplayed.includes(randomThree) || randomOne === randomTwo || randomTwo == randomThree || randomThree == randomOne) {
    randomOne = Math.floor(Math.random() * Product.allProducts.length);
    randomTwo = Math.floor(Math.random() * Product.allProducts.length);
    randomThree = Math.floor(Math.random() * Product.allProducts.length);
  }

  // Update images
  productOne.src = Product.allProducts[randomOne].filepath;
  productTwo.src = Product.allProducts[randomTwo].filepath;
  productThree.src = Product.allProducts[randomThree].filepath;
  productOne.altText = Product.allProducts[randomOne].altText;
  productTwo.altText = Product.allProducts[randomTwo].altText;
  productThree.altText = Product.allProducts[randomThree].altText;

  // Increments views for all images
  Product.allProducts[randomOne].views++;
  Product.allProducts[randomTwo].views++;
  Product.allProducts[randomThree].views++;

  Product.lastDisplayed[0] = randomOne;
  Product.lastDisplayed[1] = randomTwo;
  Product.lastDisplayed[2] = randomThree;
}

//Event Handler function
function newSet (event) {

  if (event.target.id === 'productsSection') {
    return alert('Please click on an image.');

  }
//Decrement total available votes
  Product.totalVotes--;

//Count individual product votes
  console.log('event.target', event.target.altText);
  for(var i = 0; i < Product.allProducts.length; i++) {
    if(event.target.altText === Product.allProducts[i].altText) {
      Product.allProducts[i].votes++;
      updateChartArrays();
    }
  }

  if (Product.totalVotes < 1) {
    Product.section.removeEventListener('click', newSet);
    productsSection.innerHTML = '';
    drawChart();
  }
  randomProduct();
}


//Update data arrays for chart
function updateChartArrays() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    names[i] = Product.allProducts[i].name;
    votes[i] = Product.allProducts[i].votes;
  }
}

//Chart Stuff
var data = {
  labels: names,
  datasets: [
    {
      data: votes,
      backgroundColor: [
        'darkred',
        'crimson',
        'orangered',
        'orange',
        'coral',
        'gold',
        'yellow',
        'chartreuse',
        'turquoise',
        'teal',
        'paleturquoise',
        'skyblue',
        'cornflowerblue',
        'royalblue',
        'slateblue',
        'mediumorchid',
        'darkviolet',
        'indigo',
        'darkmagenta',
        'deeppink'

      ],
      hoverBackgroundColor: [
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon'
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('productStats').getContext('2d');
  songChart = new Chart(ctx,{
    // type: 'doughnut',
    type: 'bar',

    data: data,
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 20,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}


//Event Listener
Product.section.addEventListener('click', newSet);

randomProduct();
