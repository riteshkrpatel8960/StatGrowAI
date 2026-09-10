document.addEventListener("DOMContentLoaded", function () {

    /* Get Quiz Result */

    let score =
        Number(localStorage.getItem("quizScore"));

    let correct =
        Number(localStorage.getItem("quizCorrect"));

    let total =
        Number(localStorage.getItem("quizTotal"));


    /* Default Dummy Data */

    if (!score) {
        score = 80;
    }

    if (!total) {
        total = 10;
    }

    if (!correct) {
        correct = Math.round(
            (score / 100) * total
        );
    }


    const unanswered = 0;

    const wrong =
        total - correct - unanswered;


    /* Elements */

    const scorePercentage =
        document.getElementById("scorePercentage");

    const correctAnswers =
        document.getElementById("correctAnswers");

    const wrongAnswers =
        document.getElementById("wrongAnswers");

    const unansweredAnswers =
        document.getElementById("unansweredAnswers");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const analysisScore =
        document.getElementById("analysisScore");

    const analysisProgress =
        document.getElementById("analysisProgress");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultMessage =
        document.getElementById("resultMessage");

    const analysisMessage =
        document.getElementById("analysisMessage");

    const resultIcon =
        document.getElementById("resultIcon");


    /* Update Score */

    scorePercentage.textContent =
        `${score}%`;

    correctAnswers.textContent =
        correct;

    wrongAnswers.textContent =
        wrong;

    unansweredAnswers.textContent =
        unanswered;

    totalQuestions.textContent =
        total;

    analysisScore.textContent =
        `${score}%`;

    analysisProgress.style.width =
        `${score}%`;


    /* Result Message */

    if (score >= 80) {

        resultTitle.textContent =
            "Excellent Work!";

        resultMessage.textContent =
            "You have demonstrated a strong understanding of this topic.";

        resultIcon.textContent =
            "✓";

        analysisMessage.innerHTML = `
            <strong>Excellent performance!</strong>

            <p>
                Your score shows that you have a strong understanding
                of the concepts covered in this quiz.
            </p>
        `;

    }

    else if (score >= 60) {

        resultTitle.textContent =
            "Good Job!";

        resultMessage.textContent =
            "You have a good understanding of this topic.";

        resultIcon.textContent =
            "✓";

        analysisMessage.innerHTML = `
            <strong>Good performance!</strong>

            <p>
                You have a good understanding of this topic.
                Continue learning to improve your competency.
            </p>
        `;

    }

    else {

        resultTitle.textContent =
            "Keep Learning!";

        resultMessage.textContent =
            "There is an opportunity to improve your understanding.";

        resultIcon.textContent =
            "!";

        analysisMessage.innerHTML = `
            <strong>More practice recommended.</strong>

            <p>
                Review the learning materials and try the quiz
                again to improve your score.
            </p>
        `;

    }


    /* Dashboard */

    document
        .getElementById("dashboardBtn")
        .addEventListener("click", function () {

            window.location.href =
                "dashboard.html";

        });


    /* Quizzes */

    document
        .getElementById("quizzesBtn")
        .addEventListener("click", function () {

            window.location.href =
                "quizzes.html";

        });


    /* Retake */

    document
        .getElementById("retakeBtn")
        .addEventListener("click", function () {

            window.location.href =
                "quiz-attempt.html";

        });


    /* Logout */

    document
        .getElementById("logoutBtn")
        .addEventListener("click", function (event) {

            event.preventDefault();

            const confirmLogout =
                confirm("Are you sure you want to logout?");

            if (confirmLogout) {

                localStorage.clear();

                window.location.href =
                    "../index.html";

            }

        });

});