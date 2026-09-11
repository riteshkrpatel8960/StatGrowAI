document.addEventListener("DOMContentLoaded", async function () {

    const token =
        localStorage.getItem("access_token");

    if (!token) {
        window.location.href = "../index.html";
        return;
    }


    // Get result returned by backend

    const storedResult =
        localStorage.getItem("quiz_result");


    if (!storedResult) {

        alert(
            "Quiz result not found."
        );

        window.location.href =
            "quizzes.html";

        return;
    }


    const result =
        JSON.parse(storedResult);


    console.log(
        "Quiz result data:",
        result
    );


    // Backend result

    const score =
        Math.round(
            Number(result.percentage || 0)
        );

    const correct =
        Number(result.score || 0);

    const total =
        Number(result.total || 0);

    const unanswered = 0;

    const wrong =
        Math.max(
            total - correct - unanswered,
            0
        );


    // Elements

    const scorePercentage =
        document.getElementById(
            "scorePercentage"
        );

    const correctAnswers =
        document.getElementById(
            "correctAnswers"
        );

    const wrongAnswers =
        document.getElementById(
            "wrongAnswers"
        );

    const unansweredAnswers =
        document.getElementById(
            "unansweredAnswers"
        );

    const totalQuestions =
        document.getElementById(
            "totalQuestions"
        );

    const analysisScore =
        document.getElementById(
            "analysisScore"
        );

    const analysisProgress =
        document.getElementById(
            "analysisProgress"
        );

    const resultTitle =
        document.getElementById(
            "resultTitle"
        );

    const resultMessage =
        document.getElementById(
            "resultMessage"
        );

    const analysisMessage =
        document.getElementById(
            "analysisMessage"
        );

    const resultIcon =
        document.getElementById(
            "resultIcon"
        );


    // Update result

    if (scorePercentage) {
        scorePercentage.textContent =
            `${score}%`;
    }


    if (correctAnswers) {
        correctAnswers.textContent =
            correct;
    }


    if (wrongAnswers) {
        wrongAnswers.textContent =
            wrong;
    }


    if (unansweredAnswers) {
        unansweredAnswers.textContent =
            unanswered;
    }


    if (totalQuestions) {
        totalQuestions.textContent =
            total;
    }


    if (analysisScore) {
        analysisScore.textContent =
            `${score}%`;
    }


    if (analysisProgress) {
        analysisProgress.style.width =
            `${score}%`;
    }


    // Result message

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


    // Load quiz title from backend

    const quizId =
        result.quiz_id ||
        localStorage.getItem(
            "selected_quiz_id"
        );


    if (quizId) {

        try {

            const quizData =
                await apiRequest(
                    `/quizzes/${quizId}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            console.log(
                "Result quiz data:",
                quizData
            );


            if (quizData.quiz) {

                const quizTitle =
                    document.querySelector(
                        ".result-card h2, .result-card h3"
                    );


                // Update known quiz title elements

                const possibleTitles =
                    document.querySelectorAll(
                        "h2, h3"
                    );


                possibleTitles.forEach(
                    function (element) {

                        if (
                            element.textContent.trim() ===
                            "Data Quality Fundamentals"
                        ) {

                            element.textContent =
                                quizData.quiz.title;
                        }

                    }
                );
            }


        } catch (error) {

            console.error(
                "Quiz title loading failed:",
                error
            );
        }
    }


    // Dashboard button

    const dashboardBtn =
        document.getElementById(
            "dashboardBtn"
        );


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );
    }


    // Quizzes button

    const quizzesBtn =
        document.getElementById(
            "quizzesBtn"
        );


    if (quizzesBtn) {

        quizzesBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "quizzes.html";

            }
        );
    }


    // Retake button

    const retakeBtn =
        document.getElementById(
            "retakeBtn"
        );


    if (retakeBtn) {

        retakeBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "quiz-attempt.html";

            }
        );
    }


    // Logout

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


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

                    localStorage.clear();

                    window.location.href =
                        "../index.html";
                }

            }
        );
    }

});