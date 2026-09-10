const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;


    if (email === "" || password === "") {

        loginMessage.textContent = "Please enter email and password.";

        loginMessage.style.color = "red";

        return;
    }


    loginMessage.textContent = "Login UI is working!";

    loginMessage.style.color = "green";

});