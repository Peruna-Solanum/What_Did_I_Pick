const pickAmt = document.getElementById('picAmt');
const songRange = document.getElementById('songRange');
const pickOne = document.getElementById('pickOne');
const showAll = document.getElementById('showAll');
const songList = document.getElementById('songList');
const ul = document.getElementById('ul')

let currentSong = 'currentData.json';

async function loadSongs() {
    const request = new Request('currentData.json');
    const response = await fetch(request);
    const responseData = await response.json();
    return responseData
}

const loadedData = loadSongs();
async function properConsole() {
    const data = await loadedData;
}

properConsole();
let date = new Date();
//let date = new Date((currentDate.getFullYear, currentDate.getMonth, currentDate.getDay());
function daysApart(x) {
    let result = Math.round((date.getTime() - (new Date(x).getTime())) / 86400000);
    if (isNaN(result)) {
        return 1000
    } else {
        return result
    }
}
function howPicked(data, order) {
    const songNameList = []
    for (x = 0; x < data.songs.length; x++) {
            songNameList.push([data.songs[x].name, daysApart(data.songs[x].date4), daysApart(data.songs[x].date3), daysApart(data.songs[x].date2), daysApart(data.songs[x].date1)])
        }
    if (order > 0) {
        songNameList.sort((a, b) => {
            return a[1] - b[1];
        }) 

    } else if (order < 0) {
        songNameList.sort((a, b) => {
            return b[1] - a[1];
        })
    } else {
    }
    return songNameList;
}
function songOrder(data, num1, num2) {
    songNameList = []
    for (x = 0; x < data.songs.length; x++) {
        if (data.songs[x].songOrder >= num1 && data.songs[x].songOrder < num2 || data.songs[x].songOrder === "") {
            songNameList.push(data.songs[x].name)
        } else {}
    }
    return songNameList
}
function negNames(source) {
    if (source === 1000 || source === undefined) {
        return "Not Used Yet"
    } else { 
        return (source + " days ago")
    }
}
async function populateAll() {
    ul.innerHTML = "";
    const data = await loadedData;
    numRange = songRange.options[songRange.selectedIndex].value;
    let songNameList =  howPicked(data, pickAmt.options[pickAmt.selectedIndex].value);
    let songOrderList = songOrder(data, numRange[0], numRange[2]);
    for (x = 0; x < songNameList.length; x++) {
        if (songOrderList.includes(songNameList[x][0])) {
        let newLi = document.createElement('li');
        ul.appendChild(newLi);
        if (data.songs[x].issues !== "") {
            newLi.innerHTML = ("<div class='Warning'><div class='ErrorMessage'>" + data.songs[x].issues + "</div></div><strong>" + songNameList[x][0] + "</strong>: " + negNames() + ' ,  ' + data.songs[x].songOrder + ' song');
        } else {
            newLi.innerHTML = ("<div ></div><strong>" + songNameList[x][0] + "</strong>: " + negNames(songNameList[x][1]) + ' ,  ' + data.songs[x].songOrder + ' song');
        }
    //    newLi.textContent = (songNameList[x][0] + " : " + negNames() + ' ,  ' + data.songs[x].songOrder + ' song');
        if (songNameList[x][1] > 30 || songNameList[x][1] === "Not Used Yet")    {
            newLi.style.color = 'rgb(3, 92, 3)';
        } else {}

    } else {}}
}
showAll.addEventListener('click', populateAll)
populateAll();
async function pickingOne() {
    ul.innerHTML = "";
    const data = await loadedData;
    let numRange = songRange.options[songRange.selectedIndex].value;
    let songNameList =  howPicked(data, pickAmt.options[pickAmt.selectedIndex].value);
    let songOrderList = songOrder(data, numRange[0], numRange[2]);

    let truePool = []
 async function favoriteList() {
        return new Promise((resolve) => {
        for (x = 0; x < songNameList.length; x++) {
            if (songOrderList.includes(songNameList[x][0]) && songNameList[x][1] > 30 ){
            truePool.push([songNameList[x][0], songNameList[x][1], songNameList[x][2]])
        } else {} 
        
        }
        resolve(truePool);
    })};
function randomNum(lengthAmt) {
        return Math.round(Math.random() * (lengthAmt - 1))
}
async function showFavorite() {
        let pickedIndex = randomNum(truePool.length);
        const newLi = document.createElement('li');
        ul.appendChild(newLi);
        newLi.innerHTML = "<strong>" + truePool[pickedIndex][0] + "</strong>: " + negNames(truePool[pickedIndex][1]);
    }
favoriteList().then(showFavorite(truePool))
}
pickOne.addEventListener('click', pickingOne);
