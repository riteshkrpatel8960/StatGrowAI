const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validate input
    if (email === "" || password === "") {
        loginMessage.textContent = "Please enter email and password.";
        loginMessage.style.color = "red";
        return;
    }

    // Show loading message
    loginMessage.textContent = "Logging in...";
    loginMessage.style.color = "blue";

    try {
        // Send login request to FastAPI
        const data = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        console.log("Login response:", data);

        // Save JWT token
        if (data.access_token) {
            localStorage.setItem(
                "access_token",
                data.access_token
            );
        }

        // Save real logged-in user information
        if (data.user) {
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
        }

        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";

        // Go to employee dashboard
        setTimeout(() => {
            window.location.href = "employee/dashboard.html";
        }, 500);

    } catch (error) {
        console.error("Login failed:", error);

        loginMessage.textContent =
            error.message || "Invalid email or password.";

        loginMessage.style.color = "red";
    }
});