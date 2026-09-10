document.addEventListener("DOMContentLoaded", function () {

    const quizFilter =
        document.getElementById("quizFilter");

    const quizCards =
        document.querySelectorAll(".quiz-card");


    // Filter Quizzes

    quizFilter.addEventListener("change", function () {

        const selectedStatus =
            quizFilter.value;

        quizCards.forEach(function (card) {

            const cardStatus =
                card.dataset.status;

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


    // Start Quiz

    const startButtons =
        document.querySelectorAll(".start-quiz-btn");

    startButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "quiz-attempt.html";

        });

    });


    // View Result

    const resultButtons =
        document.querySelectorAll(".result-btn");

    resultButtons.forEach(function (button) {

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