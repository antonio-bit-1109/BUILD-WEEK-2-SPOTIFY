import { token } from "./token.js";
console.log(token);

/* inserire un input dal quale cercare l'artista */

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
    let inputSearch = document.getElementById("input-search").value;

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
    let infoGenerali = infoResult[0].artist || null;
    console.log(infoGenerali);

    populatingImageTitle(infoGenerali);
    populatePopolarSongs(infoResult);
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
    divContainer.innerHTML = "";

    /*  PERCHE SPARISCE SCRITTA POPOLARI , 
    RENDERE CONTAINER CON SCROOL VERTICALE ,
     MINOR PADDING PLAYER E FOLLOWING BUTTON  */

    for (let i = 0; i < infoResult.length; i++) {
        const singleSong = infoResult[i];

        divContainer.innerHTML += `
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex text-light justify-content-between my-2">
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="mx-1">${i + 1}</div>
                                    <img
                                        aria-hidden="false"
                                        draggable="false"
                                        loading="eager"
                                        src="https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4"
                                        alt= "canzone di ${singleSong.artist.name} titolo ${singleSong.album.title}"
                                        class="mMx2LUixlnN_Fu45JpFB rkw8BWQi3miXqtlJhKg0 Yn2Ei5QZn19gria6LjZj"
                                        width="40"
                                        height="40"
                                        style="border-radius: 4px"
                                    />
                                    <p>${singleSong.title}</p>
                                </div>
                                <div><p> ${singleSong.rank}</p></div>
                                <div>${convertSecondsToMinutes(singleSong.duration)}</div>
                            </div>
                        </div>
                    </div>
        `;
    }
};
