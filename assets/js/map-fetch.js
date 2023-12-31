/* REFACTOR CHIAMATE ARTIST FETCH() */

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
    const arrNumRandom = callApiArtists();

    const promises = arrNumRandom.map((num) => {
        const URL = `https://deezerdevs-deezer.p.rapidapi.com/artist/${num}`;

        return fetch(URL, options).then((response) => {
            /* condizioni di guardia */
            if (!response.ok) {
                if (response.status > 400 && response.status < 500) {
                    if (response.status === 429) {
                        throw new Error("ME STAI A CHIAMA TROPPO ZII, NUN T'ACCOLLA", response.status);
                    } else {
                        throw new Error("errore bad request, MEA CULPA", response.status);
                    }
                }
                if (response.status > 500 && response.status < 600) {
                    throw new Error("FORSE FORSE QUALQUADRA NON COSA DELLà", response.status);
                }
            } else {
                /* risposta positiva */
                return response.json();
            }
        });
    });

    Promise.all(promises)
        .then((datas) => {
            /* objects from 6 fetch from API artists */
            console.log(datas);
            const nomiArtisti = getAutorsNames(datas);
            PushNamesIntoLists(nomiArtisti, datas);
        })
        .catch((err) => {
            console.log(err);
        });
});

/* DEFINIZ FUNZIONI */

const getAutorsNames = (datas) => {
    /* data è il nome che io do ad ogni elemento dentro datas */
    const arrNamesArtists = datas.map((data) => data.name);
    return arrNamesArtists;
};

const PushNamesIntoLists = (nomiArtisti, datas) => {
    console.log(nomiArtisti);
    let randomNumber = Math.floor(Math.random() * 99);
    for (let i = 0; i < nomiArtisti.length; i++) {
        let singleName = nomiArtisti[i];

        /*  getPlaylists(nomiArtisti[i], "buonPomeriggio", "small"); */
        getPlaylists(singleName, "buonPomeriggio", "small");
        getPlaylists(nomiArtisti[1 % nomiArtisti.length], "ascoltatiDiRecente", "large");
        getPlaylists(nomiArtisti[2 % nomiArtisti.length], "iTuoiMix", "large");
        getPlaylists(nomiArtisti[3 % nomiArtisti.length], "tendenze", "large");
        getPlaylists(nomiArtisti[4 % nomiArtisti.length], "popolare", "large");
        KeepListening(datas[i]);
    }
};
const callApiArtists = () => {
    const arrRandomIds = [];

    for (let i = 0; i < 6; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 400);
        } while (arrRandomIds.includes(randomNumber));

        arrRandomIds.push(randomNumber);
        console.log(arrRandomIds);
    }
    return arrRandomIds;
};

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

function getPlaylists(value, container, cardType) {
    const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + value;

    fetch(apiUrl, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            generateCardList(data, container, cardType);
            console.log("Lista di playlist:", data);
        })
        .catch((error) => {
            console.error("Si è verificato un errore:", error);
        });
}

const generateCardList = (arrayObj, container, cardType) => {
    const cardContainer = document.getElementById(container);
    cardContainer.innerHTML = "";

    // Use Math.min to get the smaller of the two values
    for (let i = 0; i < 6; i++) {
        let card = createCard(arrayObj.data[i], cardType);
        cardContainer.appendChild(card);
    }
};

const createCard = (obj, cardType) => {
    if (cardType == "small") {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "col-xl-4");
        card.innerHTML = `

        <a href="./albumpage.html?idAlbum=${obj.album.id}"><div class="card m-2 bg-dark text-white">
    <div class="row g-0">
      <div class="col-2">
        <img
          src="${obj.album.cover}"
          class="small-card"
          alt="card"
        />
        

      </div>
      <div class="col-10">
        <div class="card-body d-flex justify-content-center align-items-center h-100 w-80">
          <h6 class="card-title m-0">${obj.album.title}</h6>
        </div>
      </div>
    </div>
  </div></a>
    `;
        return card;
    } else if (cardType == "large") {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "col-xl-4", "col-xxl-3");
        card.innerHTML = `
        
        <a href="./albumpage.html?idAlbum=${obj.album.id}">
        <div class="card customCard bg-black border-0 bg-opacity-50 m-2">
            <div class="d-flex justify-content-center align-item-center position-relative">
                <img
                    src="${obj.album.cover}"
                    class="card-img-top max-h-180 max-w-180 object-fit-cover mx-2 mt-2 rounded"
                    alt="Album cover"
                />
                <img src="./assets/imgs/play-fill.svg" class="position-absolute positionCustom" />
            </div>
            <div class="card-body fix-h-100">
                <h6 class="card-title overflowCustom max-h-50 fs-5">
                    <a class="customColorA" href="./albumpage.html?idAlbum=${obj.album.id}">${obj.album.title}</a>
                </h6>
                <p class="card-text fs-6">
                    <a class="customColorA" href="./artistpage.html?idArtist=${obj.artist.id}&idAlbum=${obj.album.id}"
                        >${obj.artist.name}</a
                    >
                </p>
            </div>
        </div></a
    >

  `;
        return card;
    }
};

const KeepListening = (informations) => {
    console.log(informations);
    let artistId = informations.id;
    const continuaAdAscoltareDiv = document.getElementById("continuaAdAscoltare");
    continuaAdAscoltareDiv.classList.add("gap-3");
    continuaAdAscoltareDiv.innerHTML = `
    <a class="d-flex justify-content-center" href="./artistpage.html?idArtist=${artistId}">
    <div class="row d-lg-none">
        <div class="col-12">

            <div class="d-flex justify-content-center w-100"><img class="img-fluid" src=${informations.picture_big} alt="foto di ${informations.name}"></div>
        </div>
    </div> </a>
    <a class="d-flex gap-4" href="./artistpage.html?idArtist=${artistId}">
                                <div class="col-lg-3 col-md-4 mt-3 d-none d-lg-block">
                                         <img
                                            src="${informations.picture_big}"
                                            class="figure-img img-fluid"
                                            alt="A generic square placeholder image."
                                        />
                                    </div>
                                    <!-----Dettagli album----->
                                    <div class="col-lg-9 col-md-8 d-flex align-items-center">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">

                                                <p>
                                                    <button type="button" class="btn btn-dark btn-sm rounded-pill lead">
                                                        Nascondi annunci
                                                    </button>
                                                </p>
                                            </div>
                                            <h5 class="nome-album display-4 fw-bold text-white">${informations.name}</h5>

                                            <p class="text-white">Ascolta canzoni di ${informations.name}</p>

                                            <div>
                                                <button type="button" class="btn btn-success rounded-pill text-white">
                                                    Trova Canzoni
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-outline-secondary rounded-pill text-white"
                                                >
                                                    save
                                                </button>
                                            </div>
                                        </div>
                                </div>
    </a>
    `;
};
