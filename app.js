//Make an object
'use strict';

//Array of products
Product.allProducts = [];
Product.activeSet = [];
Product.lastDisplayed = [];
Product.totalVotes = 25;

//Arrays to hold data for the chart
var votes = [];
var names = [];
//Products Section
Product.section = document.getElementById('productsSection');
//Results Element
Product.resultsList = document.getElementById('resultsList');
//Referring to specific images
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
new Product('Luggage', 'img/bag.jpg','Bag');
new Product('Banana Slicer', 'img/banana.jpg','Banana Slicer');
new Product('Bathroom Buddy', 'img/bathroom.jpg','Bathroom');
new Product('Fashion Wellies', 'img/boots.jpg','Boots');
new Product('Breakfast Machine', 'img/breakfast.jpg','Breakfast');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg', 'Bubblegum');
new Product('Chair', 'img/chair.jpg', 'Chair');
new Product('Cthulhu', 'img/cthulhu.jpg', 'Cthulhu');
new Product('Duck Muzzle', 'img/dog-duck.jpg', 'Dog Duck');
new Product('Dragon Meat', 'img/dragon.jpg', 'Dragon Meat');
new Product('Practical Cutlery', 'img/pen.jpg', 'Pen');
new Product('Pet Broom', 'img/pet-sweep.jpg', 'Pet Broom');
new Product('Pizza Scissors', 'img/scissors.jpg', 'Scissors');
new Product('Shark Attack', 'img/shark.jpg', 'Shark');
new Product('Baby Broom', 'img/sweep.png', 'Sweep');
new Product('Tauntaun', 'img/tauntaun.jpg', 'Tauntaun');
new Product('Unicorn Meat', 'img/unicorn.jpg', 'Unicorn Meat');
new Product('Tentacle USB', 'img/usb.gif', 'Tentacle USB');
new Product('Watering Can', 'img/water-can.jpg', 'Watering Can');
new Product('Wine Glass', 'img/wine-glass.jpg', 'Wine Glass');

//Retrieving data from local storage, if it exists
if (localStorage.getItem('storedProducts') !== null) {
  console.log('Data found');
  Product.allProducts = JSON.parse(localStorage.getItem('storedProducts'));
} else {
  console.log('Not found');
  localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
}

//Retrieving data from local storage and updating arrays, the complicated way
// if (localStorage.getItem('storedProducts') !== null) {
//   console.log('Data found');
//   var staging = JSON.parse(localStorage.getItem('storedProducts'));
//   for (var i = 0; i < Product.allProducts.length; i++) {
//     if (Product.allProducts[i].name == staging[i].name) {
//       console.log('Match found');
//       Product.allProducts[i].votes = staging[i].votes;
//     }
//   }
// } else {
//   console.log('Not found');
//   localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
// }

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
  for(var i = 0; i < Product.allProducts.length; i++) {
    if(event.target.altText === Product.allProducts[i].altText) {
      Product.allProducts[i].votes++;
      updateChartArrays();
    }
  }
  if (Product.totalVotes < 1) {
    Product.section.removeEventListener('click', newSet);
    productsSection.innerHTML = '';
    localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
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
      label: 'Votes per Product',
      data: votes,
      
    }]
};

function drawChart() {
  var ctx = document.getElementById('productStats')
  ctx.textContent=`${Product.allProducts} ${views} ${votes}`
  
   
}


//Event Listener
Product.section.addEventListener('click', newSet);

randomProduct();
