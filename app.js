'use strict'

var imageArray = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];

var arrayClick = [];
//  images
var leftImage = document.querySelector('#leftImage');
var centerImage = document.querySelector('#centerImage');
var rightImage = document.querySelector('#rightImage');
var images = document.querySelector('#allImages');

leftImage.src = `img/${imageArray[0].jpg}`;
leftImage.alt = imageArray[0];
leftImage.title = imageArray[0];

centerImage.src = `img/${imageArray[1].jpg}`;
centerImage.alt = imageArray[1];
centerImage.title = imageArray[1];

rightImage.src = `img/${imageArray[2].jpg}`;
rightImage.alt = imageArray[2];
rightImage.title = imageArray[2];


//create constructor function for the goats
function Img(name) {
    this.name = name;
    this.votes = 0;
    this.views = 0;
    this.imgPath = `img/${this.name}.jpg`;
    Img.all.push(this);

}

Img.all = [];


function Update() {
    var finalyString = JSON.stringify(Img.all);
    localStorage.setItem('myChart', finalyString);
}
function getFinally() {
    var getString = localStorage.getItem('myChart');
    if (getString) {
        Img.all = JSON.parse(getString);
        thirdRender();
    }
}

//instantiate objects for all the goats one shot
for (var i = 0; i < imageArray.length; i++) {
    new Img(imageArray[i]);
}

var leftImg, centerImg, rightImg;

function firstRender() {


    leftImg = Img.all[randomNumber(0, Img.all.length - 1)];
    centerImg = Img.all[randomNumber(0, Img.all.length - 1)];
    rightImg = Img.all[randomNumber(0, Img.all.length - 1)];


    while (leftImg === centerImg || leftImg === rightImg || centerImg === rightImg || arrayClick.includes(centerImg.imgPath) || arrayClick.includes(leftImg.imgPath) || arrayClick.includes(rightImg.imgPath)) {
        leftImg = Img.all[randomNumber(0, Img.all.length - 1)];
        centerImg = Img.all[randomNumber(0, Img.all.length - 1)];
        rightImg = Img.all[randomNumber(0, Img.all.length - 1)];
    }

    leftImage.setAttribute('src', leftImg.imgPath);
    leftImage.setAttribute('alt', leftImg.name);
    leftImage.setAttribute('title', leftImg.name);

    centerImage.setAttribute('src', centerImg.imgPath);
    centerImage.setAttribute('alt', centerImg.name);
    centerImage.setAttribute('title', centerImg.name);

    rightImage.setAttribute('src', rightImg.imgPath);
    rightImage.setAttribute('alt', rightImg.name);
    rightImage.setAttribute('title', rightImg.name);

    arrayClick[0] = leftImg.imgPath;
    arrayClick[1] = rightImg.imgPath;
    arrayClick[2] = centerImg.imgPath;
}
firstRender();


function secondRender() {
    var ulE1 = document.getElementById('finally');
    for (var i = 0; i < Img.all.length; i++) {
        var liE1 = document.createElement('li');
        liE1.textContent = ` ${Img.all[i].name} had ${Img.all[i].votes} Votes and was shown ${Img.all[i].views} times`;
        ulE1.appendChild(liE1);
    }
}
var names = [];
var vote = [];
var view = [];
function Vote_click() {



    for (var i = 0; i < Img.all.length; i++) {
        names.push(Img.all[i].name);
        vote.push(Img.all[i].votes);
        view.push(Img.all[i].views);


    }

}

//////////////////////////////////
var ctx = document.getElementById('myChart').getContext('2d');
function thirdRender() {
    Vote_click();

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imageArray,
            datasets: [{
                label: `# of Votes `,
                data: vote,
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
                borderColor: [
                  'slateblue',
                  'mediumorchid',
                  'darkviolet',
                  'indigo',
                  'darkmagenta',
                  'deeppink'
          
                ],
                borderWidth: 4
            }, {
                label: `# of Views `,
                data: view,///view
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
                borderColor: [
                  'orange',
                  'coral',
                  'gold',
                  'yellow',
                  'chartreuse',
                  'turquoise'
                ],
                borderWidth: 4
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}




images.addEventListener('click', handleClickOnImg);
var totalClicks = 0;
function handleClickOnImg(event) {
    if (totalClicks < 25) {
        if (event.target.id !== 'allImages') {
            if (event.target.id === 'leftImage') {
                leftImg.votes++;
            } else if (event.target.id === 'centerImage') {
                centerImg.votes++;
            } else if (event.target.id === 'rightImage') {
                rightImg.votes++;
            }
            totalClicks++;

            leftImg.views++;
            centerImg.views++;
            rightImg.views++;


            firstRender();
        }
    } else {
        console.log('more than 25 clicks');
        images.removeEventListener('click', handleClickOnImg);

        secondRender();
        Update();
        thirdRender();

    }


}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


getFinally();

