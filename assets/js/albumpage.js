import { token } from "./token.js";
console.log(token);

const params = new URLSearchParams(window.location.search);
console.log("params", params);

const id = params.get("idAlbum");
console.log(" id ", id);

window.addEventListener("DOMContentLoaded", () => {
    getAlbumData();
});

async function getAlbumData() {
    const url = "https://deezerdevs-deezer.p.rapidapi.com/album/" + id;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "bde0ca7a00msh3ab1dec316b8a6bp18dc62jsn449fcf0e2690",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        buildPage(result);
        createPlaylist(result);
    } catch (error) {
        console.error(error);
    }
}

function convertiSecondiInMinuti(durataAlbum) {
    // Calcola il numero di minuti
    var minuti = Math.floor(durataAlbum / 60);

    // Calcola i secondi rimanenti dopo la conversione in minuti
    var restanti = durataAlbum % 60;

    // Restituisce una stringa che rappresenta il tempo in formato "minuti:secondi"
    return minuti + ":" + (restanti < 10 ? "0" : "") + restanti;
}

const buildPage = (result) => {
    //   ----seleziono tutti gli spazi da riempire
    let fotoAlbum = document.querySelector(".fotoAlbum");
    let nomeAlbum = document.querySelector(".nome-album");
    let artistImage = document.querySelector(".artistImage");
    let artistName = document.querySelector(".artistName");
    let releaseYear = document.querySelector(".releaseYear");
    let songsNum = document.querySelector(".songsNum");
    let duration = document.querySelector(".duration");

    let durataAlbum = result.duration;

    convertiSecondiInMinuti(durataAlbum);

    // -------riempio gli spazi con il contenuto dell'aggetto Album
    //   ---foto Album
    fotoAlbum.innerHTML = `                           
<img
src=${result.cover_medium}
class="figure-img img-fluid"
alt="A generic square placeholder image."
/>`;

    // --- Nome Album
    nomeAlbum.innerText = result.title;

    //   ---immagine Artista
    let imageSmall = result.artist.picture_small;

    artistImage.innerHTML = `
  <img
  src=${imageSmall}
  class="rounded-circle"
  alt="A generic square placeholder image."
/>`;
    // --- Nome Artista
    artistName.innerText = result.artist.name;

    // --- Anno Uscita
    releaseYear.innerText = " - " + result.release_date.slice(0, 4) + " - ";

    // ---Num Brani
    songsNum.innerText = result.tracks.data.length.toString();

    //   ---durata
    duration.innerText = convertiSecondiInMinuti(durataAlbum) + " min";
};

const createPlaylist = (result) => {
    let count = 1;
    let songsArray = result.tracks.data;

    let songsContainer = document.querySelector(".songsContainer");

    songsArray.forEach((i) => {
        let songCont = document.createElement("div");
        songCont.classList.add("row");
        songCont.innerHTML = `

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6">
                      <ul class="list-group d.flex">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex">
                            <div class="p-2 m-l-auto h6">
                              <p class="text-right">${count}</p>
                            </div>
                            <div class="ml-2 text-secondary">
                              <h2 class="text-white fw-bold h6">${i.title_short}</h2>
                              <h3 class="text-muted h6">${i.title}</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="col-3">
                      <ul class="list-group">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex justify-content-end">
                            <div class="ml-2 text-secondary">
                              <h3 class="text-muted h6">${Math.floor(Math.random() * 100000)}</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="col-3">
                      <ul class="list-group">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex justify-content-end">
                            <div class="ml-2 text-secondary">
                              <h3 class="text-muted h6">${convertiSecondiInMinuti(i.duration)}</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

  `;
        songsContainer.appendChild(songCont);
        count++;
    });
};

/*                <div class="row">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-6">
                      <ul class="list-group d.flex">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex">
                            <div class="p-2 m-l-auto h6">
                              <p class="text-right">1</p>
                            </div>
                            <div class="ml-2 text-secondary">
                              <h2 class="text-white fw-bold h6">Montanelli-Intro</h2>
                              <h3 class="text-muted h6">Sottotitolo</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="col-3">
                      <ul class="list-group">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex justify-content-end">
                            <div class="ml-2 text-secondary">
                              <h3 class="text-muted h6">3547876969</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="col-3">
                      <ul class="list-group">
                        <li class="text-white bg-transparent border-0 list-group-item">
                          <div class="d-flex justify-content-end">
                            <div class="ml-2 text-secondary">
                              <h3 class="text-muted h6">3:00</h3>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>*/
