import { token } from "./token.js";

// Funzione per ottenere la lista di playlist
async function getPlaylists(value, container, cardType) {
    const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + value;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
                "X-RapidAPI-Key": token,
            },
        });

        if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }

        const data = await response.json();
        generateCardList(data, container, cardType);
        console.log("Lista di playlist:", data);

        
    } catch (error) {
        console.error("Si è verificato un errore:", error.message);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    let timer;

    searchBar.addEventListener("input", () => {
        /*         const valueSearched = searchBar.value;

        clearTimeout(timer); */
    });
    getPlaylists("metaliica", "iTuoiMix", "large");
    getPlaylists("linkin park", "ascoltatiDiRecente", "large");
    getPlaylists("fallen in reverse", "buonPomeriggio", "small");
    getPlaylists("prodigy", "tendenze", "large");
    getPlaylists("caparezza", "popolare", "large");
});

const generateCardList = (arrayObj, container, cardType) => {
  const cardContainer = document.getElementById(container);
  cardContainer.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    let card = createCard(arrayObj.data[i], cardType);
    cardContainer.appendChild(card);
  }
};

const createCard = (obj, cardType) => {
  if (cardType == "small") {
    const card = document.createElement("div");
    card.classList.add("col-12", "col-sm-6", "col-md-4");
    card.innerHTML = `

  <div class="card m-2 bg-dark text-white">
    <div class="row g-0">
      <div class="col-2 ">
        <img
          src="${obj.album.cover}"
          class="small-card rounded"
          alt="card"
        />
        

      </div>
      <div class="col-10">
        <div class="card-body d-flex justify-content-center align-items-center h-100 w-80">
          <h6 class="card-title m-0">${obj.album.title}</h6>
        </div>
      </div>
    </div>
  </div>
    `;
    return card;
  } else if (cardType == "large") {
    const card = document.createElement("div");
    card.classList.add("pd-2", "col-12", "col-md-6", "col-lg-4", "col-xl-2");
    card.innerHTML = `
        
    <div class="card customCard bg-black bg-opacity-75 border-0 overflow:hidden " style="width:10.5rem; min-height: 15.6rem;">
    <div class="d-flex justify-content-center align-item-center position-relative ">
    <img src="${obj.album.cover}" class="card-img-top max-h-180 max-w-180 object-fit-cover mx-2 mt-2 rounded" alt="Album cover">
    <img src="./assets/imgs/play-fill.svg"  class="position-absolute positionCustom">
    </div>
    <div class="card-body fix-h-100 "'>
      <h6 class="card-title overflowCustom max-h-50 fs-6"><a class="customColorA" href="./albumpage.html?idAlbum=${obj.album.id}">${obj.album.title}</a></h6>
      <p class="card-text fs-8"><a class="customColorA" href="./artistpage.html?idArtist=${obj.artist.id}&idAlbum=${obj.album.id}">${obj.artist.name}</a></p>
    </div>
  </div>

  `;
    return card;
  }
};
