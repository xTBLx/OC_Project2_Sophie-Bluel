// import { genererWorks } from './works.js';

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
export function genererWorksDelete(works){
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
        buttonElement.setAttribute("data-id", article.id)
        
        // On rattache la balise article a la section
        sectionWorksDelete.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonElement)
    
        // Ajouts de l'évèment d'écoute pour supprimer les projets
        buttonElement.addEventListener("click", async (e) => {
            e.preventDefault();
            const accessToken = window.localStorage.getItem("idTokenStorage");

            const reponseDelete = await fetch(`http://localhost:5678/api/works/${article.id}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    id: article.id ,
                  }),
            });
            sectionWorksDelete.innerHTML = "";

            const reponseWorkUpdated = await fetch('http://localhost:5678/api/works');
            let updatedWorks = await reponseWorkUpdated.json();
            genererWorksDelete(updatedWorks)
        })
        
    }
}

// Fonction de génération des catégories pour l'ajout de projet
export function genererWorksAddCategories(filters){
        for (let i = 0; i < filters.length; i++) {
            const article = filters[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const datalistCategories = document.getElementById("work-categorie");

        // Création des balises 
        const optionElement = document.createElement("option");
        optionElement.value = article.id;
        optionElement.innerText = article.name;
        
        // On rattache la balise article a la section
        datalistCategories.appendChild(optionElement);
    }
}




// Ajout d'un objet 

// Ecoute du bouton pour ajouter l'image au formulaire
const shownButton = document.getElementById("add-image");
const hiddenButton = document.getElementById("work-image-input");

shownButton.addEventListener("click", (e) => {
    e.preventDefault();
    hiddenButton.click();
})

const file = document.getElementById("work-image-input").files[0];
const preview = document.getElementById("preview-image");

// Preview de l'image choisit
function previewImage() {
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            console.log("Bonjour")       
            // on convertit l'image en une chaîne de caractères base64
            preview.src = reader.result;

        },
        false,
    );
          
    if (file) {
        reader.readAsDataURL(file);
    }
}

hiddenButton.addEventListener("change", previewImage)


const addForm = document.getElementById("form-add");
const imageInput = document.getElementById("work-image-input");
const nameInput = document.getElementById("work-title");
const categoryInput = document.getElementById("work-categorie");
const buttonAdd = document.getElementById("form-add-submit");

let imageFilled, nameFilled, categoryFilled = false;

// Verification des champs
imageInput.addEventListener("change", (e) => {
    imageFilled = e.currentTarget?.value != null;
    buttonAdd.disabled = !(imageFilled && nameFilled && categoryFilled);
})
nameInput.addEventListener("change", (e) => {
    nameFilled = e.currentTarget.value !== "";
    buttonAdd.disabled = !(imageFilled && nameFilled && categoryFilled);
})
categoryInput.addEventListener("change", (e) => {
    categoryFilled = e.currentTarget.value !== "";
    buttonAdd.disabled = !(imageFilled && nameFilled && categoryFilled);
})

// Requete d'ajout 
buttonAdd.addEventListener("click", async (e) => {
    e.preventDefault();
    const accessToken = window.localStorage.getItem("idTokenStorage");

    const body = new FormData();
    body.set("image", document.getElementById("work-image-input").files[0]);
    body.set("title", document.getElementById("work-title").value);
    body.set("category", document.getElementById("work-categorie").value);

    const reponseWorkAdd = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: body,
        headers: { 
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = "";

    let reponseWorkUpdatedAdd = await fetch('http://localhost:5678/api/works');
    let updatedWorksAdd = await reponseWorkUpdatedAdd.json();
    genererWorks(updatedWorksAdd)

    addForm.reset();

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

// Ouverture de la deuxieme pop-up
const popup2 = document.getElementById("popup-2")

const popupButton2 = document.getElementById("open-button")
popupButton2.addEventListener("click", () => {
    popup2.style.display = "block"
    popup1.style.display = "none"
})

// Fermeture de la deuxieme pop-up
const closeMark2 = document.getElementById("close-mark-2");

closeMark2.addEventListener("click", (e) => {
    popup2.style.display = "none"
    popup1.style.display = "block"
})