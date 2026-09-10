document.addEventListener("DOMContentLoaded", function () {

    const categoryFilter =
        document.getElementById("categoryFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const materialCards =
        document.querySelectorAll(".material-card");


    // Filter Materials

    function filterMaterials() {

        const selectedCategory =
            categoryFilter.value;

        const selectedStatus =
            statusFilter.value;


        materialCards.forEach(function (card) {

            const cardCategory =
                card.dataset.category;

            const cardStatus =
                card.dataset.status;


            const categoryMatch =
                selectedCategory === "all" ||
                selectedCategory === cardCategory;


            const statusMatch =
                selectedStatus === "all" ||
                selectedStatus === cardStatus;


            if (categoryMatch && statusMatch) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }


    categoryFilter.addEventListener(
        "change",
        filterMaterials
    );

    statusFilter.addEventListener(
        "change",
        filterMaterials
    );


    // Learning Buttons

    const learningButtons =
        document.querySelectorAll(".continue-btn");


    learningButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Learning material will open here.\n\n" +
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

            window.location.href = "../index.html";

        }

    });

});