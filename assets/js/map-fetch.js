/* const nums = [13, 50, 32, 53];

const promises = nums.map((n) =>
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + n).then((resp) => resp.json())
);

Promise.all(promises)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
 */

import { token } from "./token.js";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": token,
    },
};

window.addEventListener("load", () => {
    sayHiProperly();
    callApiArtists();
});

const callApiArtists = () => {
    const arrRandomIds = [];

    for (let i = 0; i < 5; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 400);
        } while (arrRandomIds.includes(randomNumber));

        arrRandomIds.push(randomNumber);
    }
    return arrRandomIds;
};

/* DEFINIZ FUNZIONI  */
const sayHiProperly = () => {
    const h2 = document.getElementById("sayHello");
    let timeOfTheDay = new Date();
    let currentHour = timeOfTheDay.getHours();

    if (currentHour > 24 && currentHour < 6) {
        h2.innerHTML = "Buonanotte!";
    } else if (currentHour >= 6 && currentHour < 12) {
        h2.innerHTML = "Buongiorno!";
    } else if (currentHour >= 12 && currentHour < 18) {
        h2.innerHTML = "Buon Pomeriggio!";
    } else {
        h2.innerHTML = "Buonasera!";
    }
};
