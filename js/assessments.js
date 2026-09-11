document.addEventListener("DOMContentLoaded", function () {

    const filter =
        document.getElementById("statusFilter");

    const assessmentList =
        document.querySelector(".assessment-list");


    /* =========================
       Load Assessments
    ========================= */

    async function loadAssessments() {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            window.location.href = "../index.html";
            return;
        }

        try {

            const data = await apiRequest("/assessments/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("Assessments data:", data);

            const assessments =
                data.assessments || [];


            /* =========================
               Calculate Statistics
            ========================= */

            const totalAssessments =
                assessments.length;

            const completedAssessments =
                assessments.filter(function (assessment) {
                    return assessment.percentage !== undefined;
                }).length;

            const pendingAssessments =
                totalAssessments - completedAssessments;

            let totalPercentage = 0;

            assessments.forEach(function (assessment) {
                totalPercentage +=
                    Number(assessment.percentage || 0);
            });

            const averageScore =
                completedAssessments > 0
                    ? Math.round(
                        totalPercentage /
                        completedAssessments
                    )
                    : 0;


            /* =========================
               Update Statistics
            ========================= */

            const statCards =
                document.querySelectorAll(".stat-card");

            if (statCards.length >= 4) {

                statCards[0]
                    .querySelector("strong")
                    .textContent = totalAssessments;

                statCards[1]
                    .querySelector("strong")
                    .textContent = completedAssessments;

                statCards[2]
                    .querySelector("strong")
                    .textContent = pendingAssessments;

                statCards[3]
                    .querySelector("strong")
                    .textContent =
                    `${averageScore}%`;
            }


            /* =========================
               Display Assessments
            ========================= */

            if (assessmentList) {

                assessmentList.innerHTML = "";

                assessments.forEach(function (assessment) {

                    const percentage =
                        Number(
                            assessment.percentage || 0
                        );

                    const status =
                        percentage > 0
                            ? "completed"
                            : "pending";

                    const statusText =
                        status === "completed"
                            ? "Completed"
                            : "Pending";

                    const scoreText =
                        status === "completed"
                            ? `${percentage}%`
                            : "";

                    const buttonText =
                        status === "completed"
                            ? "View Result"
                            : "Start Assessment";

                    const buttonClass =
                        status === "completed"
                            ? "view-btn"
                            : "start-btn";


                    assessmentList.innerHTML += `
                        <div
                            class="assessment-card"
                            data-status="${status}"
                        >

                            <div class="assessment-main">

                                <div class="assessment-icon">
                                    Q${assessment.quiz_id}
                                </div>

                                <div class="assessment-info">

                                    <h3>
                                        Assessment ${assessment.id}
                                    </h3>

                                    <p>
                                        Assessment based on Quiz
                                        ${assessment.quiz_id}.
                                    </p>

                                    <div class="assessment-meta">

                                        <span>
                                            📋
                                            ${assessment.total}
                                            Questions
                                        </span>

                                        <span>
                                            Score:
                                            ${assessment.score}/${assessment.total}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div class="assessment-right">

                                <span class="status ${status}">
                                    ${statusText}
                                </span>

                                ${
                                    scoreText
                                        ? `<strong class="score">
                                            ${scoreText}
                                           </strong>`
                                        : ""
                                }

                                <button
                                    class="${buttonClass}"
                                    data-quiz-id="${assessment.quiz_id}"
                                >
                                    ${buttonText}
                                </button>

                            </div>

                        </div>
                    `;
                });


                attachAssessmentButtons();
            }

        } catch (error) {

            console.error(
                "Assessments loading failed:",
                error
            );
        }
    }


    /* =========================
       Filter Assessments
    ========================= */

    if (filter) {

        filter.addEventListener(
            "change",
            function () {

                const selectedStatus =
                    filter.value;

                const assessmentCards =
                    document.querySelectorAll(
                        ".assessment-card"
                    );

                assessmentCards.forEach(
                    function (card) {

                        const cardStatus =
                            card.dataset.status;

                        if (
                            selectedStatus === "all" ||
                            selectedStatus === cardStatus
                        ) {

                            card.style.display =
                                "flex";

                        } else {

                            card.style.display =
                                "none";
                        }
                    }
                );
            }
        );
    }


    /* =========================
       Assessment Buttons
    ========================= */

    function attachAssessmentButtons() {

        const startButtons =
            document.querySelectorAll(".start-btn");

        startButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const quizId =
                        button.dataset.quizId;

                    localStorage.setItem(
                        "selected_quiz_id",
                        quizId
                    );

                    window.location.href =
                        "quiz-attempt.html";
                }
            );
        });


        const viewButtons =
            document.querySelectorAll(".view-btn");

        viewButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const quizId =
                        button.dataset.quizId;

                    localStorage.setItem(
                        "selected_quiz_id",
                        quizId
                    );

                    window.location.href =
                        "result.html";
                }
            );
        });
    }


    /* =========================
       Logout
    ========================= */

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


    /* =========================
       Start
    ========================= */

    loadAssessments();

});