document.addEventListener("DOMContentLoaded", function () {

    const filter = document.getElementById("statusFilter");

    const assessmentCards =
        document.querySelectorAll(".assessment-card");


    // Filter Assessments

    filter.addEventListener("change", function () {

        const selectedStatus = filter.value;

        assessmentCards.forEach(function (card) {

            const cardStatus = card.dataset.status;

            if (
                selectedStatus === "all" ||
                selectedStatus === cardStatus
            ) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });


    // Start Assessment

    const startButtons =
        document.querySelectorAll(".start-btn");

    startButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Assessment will start here.\n\n" +
                "Backend integration will be added later."
            );

        });

    });


    // View Result

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "result.html";

        });

    });


    // Logout

    const logoutBtn =
        document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href = "../index.html";

        }

    });

});