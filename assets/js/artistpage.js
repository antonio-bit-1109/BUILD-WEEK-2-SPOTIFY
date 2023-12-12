import { token } from "./token.js";
console.log(token);

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=caparezza";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
};

const manageObjs = (result) => {
    console.log(result);

    const infoResult = result.data;
    console.log(infoResult);

    /* info generali artista  */
    let nomeArtista = infoResult[0].artist;
    console.log(nomeArtista);
};

try {
    const response = await fetch(url, options);
    const result = await response.json();

    manageObjs(result);
} catch (error) {
    console.error(error);
}
