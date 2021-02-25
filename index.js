/* Database Promise + API Key*/
const medieurl = "https://music-15e1.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602e6d4d5ad3610fb5bb6329"
}

/* Kører funktionen "start" når DOM er loadet */
document.addEventListener("DOMContentLoaded", start)
let kunstnere;
let filtrer = "alle";

/*loader JSON | kører funktion til at filtere kunstnere*/
function start() {
    console.log("start");
    const filtrerKnapper = document.querySelectorAll("nav button");
    filtrerKnapper.forEach(knap => knap.addEventListener("click", filtrerKunstnere))
    loadJSON();
}

/* Henter JSON */
async function loadJSON() {
    console.log("loadJSON");
    const JSONData = await fetch("https://music-15e1.restdb.io/rest/music", {
        headers: myHeaders
    });
    kunstnere = await JSONData.json();
    console.log("Kunstnere", kunstnere)
    visKunstnere();
}

/* filtrer kunstnere efter genre */
function filtrerKunstnere() {
    console.log("filtrerKunstnere");
    filtrer = this.dataset.genre;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visKunstnere();
}

/* kloner data ud på siden */
function visKunstnere() {
    console.log("visKunstnere");
    const destination = document.querySelector("#liste");
    const skabelon = document.querySelector("template").content;
    destination.innerHTML = "";
    kunstnere.forEach(kunstner => {
        console.log("klon");

        if (filtrer == kunstner.genre || filtrer == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + kunstner.img;
            klon.querySelector(".navn").textContent = kunstner.navn;
            klon.querySelector(".beskrivelse-kort").textContent = kunstner.beskrivelsekort;
            klon.querySelector(".loop").addEventListener("click", () => visDetaljer(kunstner));

            destination.appendChild(klon);
        }
    })

}

/* Sender brugeren til detalje.html ved klik på content */
function visDetaljer(hvad) {
    console.log("visDetaljer");
    location.href = `detalje.html?id=${hvad._id}`;
}
