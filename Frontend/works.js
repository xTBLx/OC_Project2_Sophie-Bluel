const reponseWork = await fetch('http://localhost:5678/api/works');
let works = await reponseWork.json();

const reponseFilter = await fetch('http://localhost:5678/api/categories');
let filters = await reponseFilter.json();



// Fonction de génération des boutons de filtre
function genererFiltre(filters){
    for (let i = 0; i < filters.length; i++) {
        const article = filters[i];

        // Récupération de l'élément du DOM qui accueillera les filtres
        const sectionFilters = document.querySelector(".filters");

        // Création du bouton dédié à un filtre
        const filterButton = document.createElement("button");
        filterButton.innerText = article.name;
        filterButton.id = `filter${article.id}`;
        
        // On rattache la balise button a la section Filtres
        sectionFilters.appendChild(filterButton);

    }
}



// Fonction de génération des travaux
function genererWorks(works){
    for (let i = 0; i < works.length; i++) {
        const article = works[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionWorks = document.querySelector(".gallery");

        // Création d’une balise dédiée à un travail
        const workElement = document.createElement("figure");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;
        
        // On rattache la balise article a la section Gallery
        sectionWorks.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(nomElement);
    
    }
}

// Fonction de génération des travaux pour la modale de suppression
function genererWorksDelete(works){
    for (let i = 0; i < works.length; i++) {
        const article = works[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionWorksDelete = document.querySelector(".work-delete-gallery");

        // Création d’une balise dédiée à un travail
        const workElement = document.createElement("figure");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const buttonElement = document.createElement("i")
        buttonElement.classList.add("fa-solid")
        buttonElement.classList.add("fa-trash-can")
        
        // On rattache la balise article a la section
        sectionWorksDelete.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonElement)
    
    }
}






// Génération de la page en fonction de si un utilisateur est connecté
const storedIdToken = window.localStorage.getItem("idTokenStorage");
if (storedIdToken === null) {
    genererFiltre(filters);
    genererWorks(works);

    // Gestion des boutons de filtres
    // Bouton Tous
    const boutonFiltreAll = document.querySelector("#all");
 
    boutonFiltreAll.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    // Bouton Filtre des Objets
    const boutonFiltreObjets = document.querySelector("#filter1");
 
    boutonFiltreObjets.addEventListener("click", function () {
        const filteredWorks = works.filter(function (works) {
            return works.categoryId === 1;
        })
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(filteredWorks);
    });

    // Bouton Filtre des Objets
    const boutonFiltreApparts = document.querySelector("#filter2");
 
    boutonFiltreApparts.addEventListener("click", function () {
        const filteredWorks = works.filter(function (works) {
            return works.categoryId === 2;
        })
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(filteredWorks);
    });

    // Bouton Filtre des Objets
    const boutonFiltreHotels = document.querySelector("#filter3");
 
    boutonFiltreHotels.addEventListener("click", function () {
        const filteredWorks = works.filter(function (works) {
            return works.categoryId === 3;
        })
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(filteredWorks);
    });

} else {

    // Apparition et disparition des différents éléments
    const logIn = document.getElementById("log-in");
    logIn.style.display = "none"
    const logOut = document.getElementById("log-out");
    logOut.style.display = "inline"
    const barEdition = document.getElementById("edition");
    barEdition.style.display = "flex"
    const modifEdition = document.getElementById("modif");
    modifEdition.style.display = "flex"
    const filterAll = document.getElementById("all");
    filterAll.style.display = "none"

    genererWorks(works)
    genererWorksDelete(works)
}


// Bouton de déconnexion
const logOutButton = document.querySelector("#log-out");

logOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.removeItem("idTokenStorage");
    location.reload();
})


// Ouverture de la première pop-up
const popup1 = document.getElementById("popup-1")

const popupButton1 = document.getElementById("modif")
popupButton1.addEventListener("click", () => {
    popup1.style.display = "block"
})

// Fermeture de la première pop-up
const closeMark1 = document.getElementById("close-mark-1");

closeMark1.addEventListener("click", (e) => {
    popup1.style.display = "none"
})