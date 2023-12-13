import { token } from "./token.js";
console.log(token);

window.addEventListener("DOMContentLoaded", () => {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": token,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
    };

    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getrequest(options);
        }
    });

    getrequest(options);
});

const getrequest = (options) => {
    let inputSearch = document.getElementById("input-search").value || JSON.parse(localStorage.getItem("search"));

    localStorage.setItem("search", JSON.stringify(inputSearch));

    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${inputSearch}`;

    fetch(url, options)
        .then((result) => {
            console.log(result);
            if (result.ok) {
                return result.json();
            }
        })
        .then((result) => {
            getNameArtist(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getNameArtist = (result) => {
    console.log(result);

    const infoResult = result.data;
    console.log(infoResult);

    /* info generali artista  */
    let infoGenerali = infoResult[0].artist;
    console.log(infoGenerali);

    populatingImageTitle(infoGenerali);
    populatePopolarSongs(infoResult);
    populateLikedSongs(infoResult);
    populateMonthFollowers(infoResult);
};

const populatingImageTitle = (infoGenerali) => {
    /* nome principale */
    let nomeAutore = infoGenerali.name;
    const titoloPrincipale = document.getElementById("js-h1-artist");
    titoloPrincipale.innerHTML = nomeAutore;

    /* sfondo autore  */
    const divBackground = document.getElementById("js-img-sfondo-autore");
    divBackground.style.backgroundImage = `url(${infoGenerali.picture_xl})`;
    divBackground.style.objectFit = "contain";
    divBackground.style.backgroundPositionY = "20%";
    divBackground.style.backgroundPositionX = "center";
};

const populatePopolarSongs = (infoResult) => {
    console.log(infoResult);

    const divContainer = document.querySelector("#part2 > #js-box-inner-part2");

    const convertSecondsToMinutes = (secondi) => {
        const minuti = Math.floor(secondi / 60);
        const secondiRimanenti = secondi % 60;
        const formatoSecondi = secondiRimanenti < 10 ? `0${secondiRimanenti}` : secondiRimanenti;

        return `${minuti}:${formatoSecondi}`;
    };

    divContainer.innerHTML = `
                                             <div class="col">
                                                <div class="my-4"><h4 class="text-light">Popolari</h4></div>
                                            </div>
    `;

    for (let i = 0; i < infoResult.length; i++) {
        const singleSong = infoResult[i];

        divContainer.innerHTML += `
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex text-light justify-content-between my-2">
                                <div class="d-flex gap-2 align-items-center min-width-1">
                                    <div class="mx-1">${i + 1}</div>
                                    <img
                                        aria-hidden="false"
                                        draggable="false"
                                        loading="eager"
                                        src="${singleSong.album.cover_small}"
                                        alt= "canzone di ${singleSong.artist.name} titolo ${
            singleSong.album.title_short
        }"
                                        class="mMx2LUixlnN_Fu45JpFB rkw8BWQi3miXqtlJhKg0 Yn2Ei5QZn19gria6LjZj"
                                        width="40"
                                        height="40"
                                        style="border-radius: 4px"
                                    />
                                    <p>${singleSong.title}</p>
                                </div>
                                <div class="min-width-2 "><p> ${singleSong.rank.toLocaleString()}</p></div>
                                <div class="min-width-3 ">${convertSecondsToMinutes(singleSong.duration)}</div>
                            </div>
                        </div>
                    </div>
        `;
    }
};

const populateLikedSongs = (infoResult) => {
    console.log(infoResult);

    const likedSongsIcon = document.getElementById("js-img-likedSongs");
    const commento1 = document.getElementById("commento1");
    const commento2 = document.getElementById("commento2");

    let randomNumber = Math.floor(Math.random() * 50);

    for (let singleAlbum of infoResult) {
        likedSongsIcon.src = singleAlbum.artist.picture_small;
        commento1.innerHTML = ` Hai messo mi piace a ${randomNumber} brani`;
        commento2.innerHTML = `Di ${singleAlbum.artist.name}`;
    }
};

const populateMonthFollowers = (infoResult) => {
    console.group(infoResult);
    let sommaAscoltatori = 0;
    const ascoltatoriTotali = document.getElementById("monthListeners");

    for (let ascoltatoriSIngleAlbum of infoResult) {
        ascoltatoriSIngleAlbum = ascoltatoriSIngleAlbum.rank;
        console.log(ascoltatoriSIngleAlbum);

        sommaAscoltatori += ascoltatoriSIngleAlbum;
    }

    ascoltatoriTotali.innerHTML = `ascoltatori mensili: ${sommaAscoltatori.toLocaleString()}`;
};
