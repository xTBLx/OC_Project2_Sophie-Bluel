const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData)

    const reponseLogIn = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });

    const responseBody = await reponseLogIn.json();
    console.log(responseBody)

    const idToken = responseBody.token
    window.localStorage.setItem("idTokenStorage", idToken);
    const storedIdToken = window.localStorage.getItem("idTokenStorage");

    console.log(storedIdToken)

    if (idToken != null) {
        /** Création du message en cas d'échec de connexion **/
        window.location.href = "index.html";
    } else {
        /** Création du message en cas d'échec de connexion **/
        document.querySelector("#error-message").innerHTML = "";

        const form = document.querySelector('#login-form');
        form.style.marginTop = '0';

        const errorMessageSection = document.querySelector("#error-message")
        
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe"
        errorMessage.id = `error-text`

        errorMessageSection.appendChild(errorMessage);
    }
})