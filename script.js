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
        console.log('unused to popular');
        songNameList.sort((a, b) => {
            return a[1] - b[1];
        }) 
        console.log('HI ', songNameList)

    } else if (order < 0) {
        console.log('most popular first')
        songNameList.sort((a, b) => {
            return b[1] - a[1];
        })
    } else {
        console.log('even')
    }
    for (x = 0; x < songNameList.length; x++) {
        function negNames() {
            if (songNameList[x][1] === 1000) {
                songNameList[x][1] = "Not Used Yet"
                return "Not Used Yet"
            } else { 
                return (songNameList[x][1] + " days")
            }
        }
        let newLi = document.createElement('li');
        newLi.id = x;
        ul.appendChild(newLi);
        newLi.innerHTML = (songNameList[x][0] + " : " + negNames());
    }
}
function songOrder(data, num1, num2) {
    console.log(num1)
    console.log(num2)
    songNameList = []
    for (x = 0; x < data.songs.length; x++) {
        if (data.songs[x].songOrder >= num1 && data.songs[x].songOrder < num2) {
            songNameList.push(data.songs[x].name)
        } else {}
    }
    return songNameList
}
showAll.addEventListener('click', async function populateAll() {
    const data = await loadedData;
    numRange = songRange.options[songRange.selectedIndex].value;
    console.log(songOrder(data, numRange[0], numRange[2]));
    console.log(howPicked(data, pickAmt.options[pickAmt.selectedIndex].value))
})