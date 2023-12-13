import { token } from "./token.js";
console.log(token);

const params = new URLSearchParams(window.location.search);
console.log("params", params);

const id = params.get("idAlbum");
console.log(" id ", id);

window.addEventListener("DOMContentLoaded", () => {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": token,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
    };

    /*     window.addEventListener("keydown", (event) => {
        getrequest(options);
    }); */

    getrequest(options);
});

const getrequest = (options) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;

    fetch(url, options)
        .then((result) => {
            console.log(result);
            if (result.ok) {
                return result.json();
            }
        })
        .then((result) => {
            populatealbumPage(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const populatealbumPage = (result) => {
    console.log(result);

    const allGeneralInfo = result.data;

    populateUpperSection(allGeneralInfo);
};

const populateUpperSection = (allGeneralInfo) => {
    console.log(allGeneralInfo);

    const titleAlbum = allGeneralInfo.album.title;
    console.log(titleAlbum);
};
