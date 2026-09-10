// ===============================
// Quiz Review JavaScript
// Dummy / Static Data Only
// ===============================


// Elements

const searchInput =
    document.getElementById("searchInput");

const difficultyFilter =
    document.getElementById("difficultyFilter");

const quizList =
    document.getElementById("quizList");

const noResults =
    document.getElementById("noResults");


// ===============================
// Filter Quizzes
// ===============================

function filterQuizzes() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedDifficulty =
        difficultyFilter.value;


    const quizzes =
        quizList.querySelectorAll(".quiz-item");

    let visibleCount = 0;


    quizzes.forEach(function (quiz) {

        const name =
            quiz.dataset.name.toLowerCase();

        const difficulty =
            quiz.dataset.difficulty;


        const matchesSearch =
            name.includes(searchValue);

        const matchesDifficulty =
            selectedDifficulty === "all" ||
            difficulty === selectedDifficulty;


        if (
            matchesSearch &&
            matchesDifficulty
        ) {

            quiz.style.display = "grid";

            visibleCount++;

        } else {

            quiz.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// Search

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterQuizzes
    );

}


// Difficulty Filter

if (difficultyFilter) {

    difficultyFilter.addEventListener(
        "change",
        filterQuizzes
    );

}


// ===============================
// Review Modal
// ===============================

const reviewModal =
    document.getElementById("reviewModal");

const modalClose =
    document.getElementById("modalClose");

const modalQuizTitle =
    document.getElementById("modalQuizTitle");

const reviewButtons =
    document.querySelectorAll(".review-btn");


reviewButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const quizName =
                this.dataset.quiz;


            modalQuizTitle.textContent =
                quizName;


            reviewModal.classList.add("show");

        }
    );

});


// Close Modal

if (modalClose) {

    modalClose.addEventListener(
        "click",
        function () {

            reviewModal.classList.remove("show");

        }
    );

}


// Close by clicking outside

if (reviewModal) {

    reviewModal.addEventListener(
        "click",
        function (event) {

            if (event.target === reviewModal) {

                reviewModal.classList.remove("show");

            }

        }
    );

}


// ===============================
// Approve Quiz
// ===============================

const approveBtn =
    document.getElementById("approveBtn");

const pendingCount =
    document.getElementById("pendingCount");


if (approveBtn) {

    approveBtn.addEventListener(
        "click",
        function () {

            const quizName =
                modalQuizTitle.textContent;


            const confirmApprove =
                confirm(
                    "Approve \"" +
                    quizName +
                    "\" for publishing?"
                );


            if (confirmApprove) {

                alert(
                    "Quiz approved successfully!"
                );


                reviewModal.classList.remove(
                    "show"
                );


                if (pendingCount) {

                    let count =
                        parseInt(
                            pendingCount.textContent
                        );

                    if (count > 0) {

                        count--;

                        pendingCount.textContent =
                            count;

                    }

                }

            }

        }
    );

}


// ===============================
// Reject Quiz
// ===============================

const rejectBtn =
    document.getElementById("rejectBtn");


if (rejectBtn) {

    rejectBtn.addEventListener(
        "click",
        function () {

            const quizName =
                modalQuizTitle.textContent;


            const confirmReject =
                confirm(
                    "Reject \"" +
                    quizName +
                    "\"? Changes will be required."
                );


            if (confirmReject) {

                alert(
                    "Quiz rejected successfully."
                );


                reviewModal.classList.remove(
                    "show"
                );


                if (pendingCount) {

                    let count =
                        parseInt(
                            pendingCount.textContent
                        );

                    if (count > 0) {

                        count--;

                        pendingCount.textContent =
                            count;

                    }

                }

            }

        }
    );

}


// ===============================
// Notification
// ===============================

const notificationBtn =
    document.getElementById("notificationBtn");


if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function () {

            alert(
                "You have 8 quizzes waiting for review."
            );

        }
    );

}


// ===============================
// Logout
// ===============================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                window.location.href =
                    "../index.html";

            }

        }
    );

}