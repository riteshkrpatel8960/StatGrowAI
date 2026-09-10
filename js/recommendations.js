document.addEventListener("DOMContentLoaded", function () {

    const filter =
        document.getElementById("recommendationFilter");

    const cards =
        document.querySelectorAll(".recommendation-card");


    // Filter Recommendations

    filter.addEventListener("change", function () {

        const selectedType =
            filter.value;

        cards.forEach(function (card) {

            const cardType =
                card.dataset.type;

            if (
                selectedType === "all" ||
                selectedType === cardType
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });


    // Learning Buttons

    const learningButtons =
        document.querySelectorAll(".learn-btn");


    learningButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Recommended learning resource will open here.\n\n" +
                "Backend integration will be added later."
            );

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

            window.location.href =
                "../index.html";

        }

    });

});