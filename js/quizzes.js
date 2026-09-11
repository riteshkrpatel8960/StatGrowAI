document.addEventListener("DOMContentLoaded", function () {

    const quizFilter =
        document.getElementById("quizFilter");

    const quizList =
        document.getElementById("quizList");


    async function loadQuizzes() {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            window.location.href = "../index.html";
            return;
        }


        try {

            const data = await apiRequest("/quizzes/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            console.log("Quizzes data:", data);


            const quizzes =
                data.quizzes || [];


            // Update statistics

            const total =
                quizzes.length;

            const completed =
                0;

            const pending =
                total;


            document.getElementById(
                "totalQuizzes"
            ).textContent = total;


            document.getElementById(
                "completedQuizzes"
            ).textContent = completed;


            document.getElementById(
                "pendingQuizzes"
            ).textContent = pending;


            document.getElementById(
                "averageQuizScore"
            ).textContent = "0%";


            // Clear old cards

            quizList.innerHTML = "";


            if (quizzes.length === 0) {

                quizList.innerHTML = `
                    <div class="quiz-card">

                        <div class="quiz-content">

                            <h3>
                                No quizzes available
                            </h3>

                            <p>
                                There are no quizzes available
                                at the moment.
                            </p>

                        </div>

                    </div>
                `;

                return;
            }


            // Create quiz cards

            quizzes.forEach(function (quiz) {

                const initials =
                    quiz.title
                        .split(" ")
                        .map(function (word) {
                            return word.charAt(0);
                        })
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();


                let difficultyClass =
                    "medium";


                if (quiz.difficulty === "easy") {
                    difficultyClass = "easy";
                }

                else if (quiz.difficulty === "hard") {
                    difficultyClass = "hard";
                }


                const difficultyText =
                    quiz.difficulty
                        .charAt(0)
                        .toUpperCase() +
                    quiz.difficulty.slice(1);


                const card =
                    document.createElement("div");


                card.className =
                    "quiz-card";


                card.dataset.status =
                    "pending";


                card.innerHTML = `

                    <div class="quiz-icon">
                        ${initials}
                    </div>


                    <div class="quiz-content">

                        <div class="quiz-title-row">

                            <h3>
                                ${quiz.title}
                            </h3>

                            <span
                                class="difficulty ${difficultyClass}">
                                ${difficultyText}
                            </span>

                        </div>


                        <p>
                            ${quiz.description}
                        </p>


                        <div class="quiz-meta">

                            <span>
                                📋 Quiz
                            </span>

                            <span>
                                🎯 ${difficultyText}
                            </span>

                        </div>

                    </div>


                    <div class="quiz-action">

                        <span class="status pending">
                            Pending
                        </span>


                        <button
                            class="start-quiz-btn"
                            data-id="${quiz.id}">
                            Start Quiz
                        </button>

                    </div>

                `;


                quizList.appendChild(card);

            });


            // Start Quiz buttons

            const startButtons =
                document.querySelectorAll(
                    ".start-quiz-btn"
                );


            startButtons.forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const quizId =
                            button.dataset.id;


                        localStorage.setItem(
                            "selected_quiz_id",
                            quizId
                        );


                        window.location.href =
                            "quiz-attempt.html";

                    }
                );

            });


            applyFilter();

        }


        catch (error) {

            console.error(
                "Quizzes loading failed:",
                error
            );

        }

    }


    // Filter Quizzes

    function applyFilter() {

        const selectedStatus =
            quizFilter.value;


        const quizCards =
            document.querySelectorAll(
                ".quiz-card"
            );


        quizCards.forEach(function (card) {

            const cardStatus =
                card.dataset.status;


            if (
                selectedStatus === "all" ||
                selectedStatus === cardStatus
            ) {

                card.style.display =
                    "flex";

            }

            else {

                card.style.display =
                    "none";

            }

        });

    }


    quizFilter.addEventListener(
        "change",
        applyFilter
    );


    // Logout

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    localStorage.removeItem(
                        "access_token"
                    );


                    window.location.href =
                        "../index.html";

                }

            }
        );

    }


    loadQuizzes();

});