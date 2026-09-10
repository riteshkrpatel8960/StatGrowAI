// Competencies Page

document.addEventListener("DOMContentLoaded", function () {

    const recommendBtn = document.getElementById("recommendBtn");

    if (recommendBtn) {

        recommendBtn.addEventListener("click", function () {

            window.location.href = "recommendations.html";

        });

    }


    // Logout

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            const confirmLogout = confirm("Are you sure you want to logout?");

            if (confirmLogout) {

                window.location.href = "../index.html";

            }

        });

    }

});