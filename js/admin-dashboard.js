// ===============================
// Admin Dashboard JavaScript
// Dummy / Static Data Only
// ===============================


// Notification button

const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", function () {

        alert("You have 8 pending quiz reviews.");

    });

}


// Overview filter

const overviewFilter = document.getElementById("overviewFilter");

if (overviewFilter) {

    overviewFilter.addEventListener("change", function () {

        alert(
            "Overview filter changed to: " +
            this.value
        );

    });

}


// Add User

const addUserBtn = document.getElementById("addUserBtn");

if (addUserBtn) {

    addUserBtn.addEventListener("click", function () {

        window.location.href = "users.html";

    });

}


// Upload Material

const uploadMaterialBtn =
    document.getElementById("uploadMaterialBtn");

if (uploadMaterialBtn) {

    uploadMaterialBtn.addEventListener("click", function () {

        window.location.href = "upload.html";

    });

}


// Review Quiz

const reviewQuizBtn =
    document.getElementById("reviewQuizBtn");

if (reviewQuizBtn) {

    reviewQuizBtn.addEventListener("click", function () {

        window.location.href = "review.html";

    });

}


// Reports

const reportsBtn =
    document.getElementById("reportsBtn");

if (reportsBtn) {

    reportsBtn.addEventListener("click", function () {

        window.location.href = "reports.html";

    });

}


// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href = "../index.html";

        }

    });

}