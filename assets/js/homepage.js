import { token } from "./token.js";
console.log(token);

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
};

try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
} catch (error) {
    console.error(error);
}
