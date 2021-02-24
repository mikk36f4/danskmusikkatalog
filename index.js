/* Database + API */
const header = document.querySelector(".genre_tag");
const medieurl = "https://music-15e1.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602e6d4d5ad3610fb5bb6329"
}

document.addEventListener("DOMContentLoaded", start)
let kunstnere;
let filtrer = "alle";

function start() {
    console.log("start");
    const filtrerKnapper = document.querySelectorAll("nav button");
    filtrerKnapper.forEach(knap => knap.addEventListener("click", filtrerKunstnere))
    loadJSON();
}

function filtrerKunstnere() {
    console.log("filtrerKunstnere");

    filtrer = this.dataset.genre;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visKunstnere();
    header.textContent = this.textContent;
}

async function loadJSON() {
    console.log("loadJSON");
    const JSONData = await fetch("https://music-15e1.restdb.io/rest/music", {
        headers: myHeaders
    });
    kunstnere = await JSONData.json();
    console.log("Kunstnere", kunstnere)
    visKunstnere();
}

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
            //            klon.querySelector(".type").textContent = kunstner.type;
            //            klon.querySelector(".face").textContent = kunstner.face;
            //            klon.querySelector(".aktiv").textContent = kunstner.aktiv;
            klon.querySelector(".loop").addEventListener("click", () => visDetaljer(kunstner));

            destination.appendChild(klon);
        }
    })

}

function visDetaljer(hvad) {
    console.log("visDetaljer");
    location.href = `detalje.html?id=${hvad._id}`;
}
