window.addEventListener('load', init);
let answerDiv;
let form;
let long;
let lat;
async function init () {
    form = document.querySelector('#form');
    answerDiv = document.querySelector('#answer');
    form.addEventListener('submit', sendQuery);
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.error('No geolocation available');
    }
}

async function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

async function sendQuery (e) {
    e.preventDefault();

    form.classList.add('disabled');
    const input = document.querySelector('#query').value;
    const inputP = document.createElement('p');
    inputP.innerHTML = 'You: ' + input;
    answerDiv.append(inputP);
    const character = document.querySelector('#character').value;
    const response = await fetch(`http://localhost:3000/chat`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "query": input,
            "character": character,
            "lat": lat,
            "long": long
        })
    });

    const answer = await response.json();
    console.log(answer);
    const answerP = document.createElement('p');
    if (character === '1') {
        answerP.innerHTML = 'Harry Potter: ' + answer;
    }
    if (character === '2') {
        answerP.innerHTML = 'Percy Jackson: ' + answer;
    }
    if (character === '3') {
        answerP.innerHTML = 'Zeus: ' + answer;
    }
    answerDiv.append(answerP);
    document.querySelector('#query').value = '';
    form.classList.remove('disabled');
}