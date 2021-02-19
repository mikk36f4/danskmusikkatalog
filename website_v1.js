 const header = document.querySelector("h1");
 const medieurl = "music-15e1.restdb.io/media/";
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
    const destination = document.querySelector("main");
    const skabelon = document.querySelector("template").content;
    destination.textContent = "";
    kunstnere.forEach(kunstner => {
        console.log("genre", kunstner.genre);

        if (filtrer == kunstner.genre || filtrer == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".navn").textContent = kunstner.navn;
            klon.querySelector(".type").textContent = kunstner.type;
            klon.querySelector(".face").textContent = kunstner.face;
            klon.querySelector(".aktiv").textContent = kunstner.aktiv;

           destination.appendChild(klon);
        }
    })

}

