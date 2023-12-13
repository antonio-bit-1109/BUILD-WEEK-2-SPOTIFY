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
        getrequest(options);
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

const getNameArtist = (result) => {};
