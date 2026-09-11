document.addEventListener("DOMContentLoaded", function () {

    const token =
        localStorage.getItem("access_token");


    if (!token) {

        window.location.href =
            "../index.html";

        return;
    }



    // Elements

    const userName =
        document.getElementById(
            "userName"
        );

    const userRole =
        document.getElementById(
            "userRole"
        );

    const welcomeMessage =
        document.getElementById(
            "welcomeMessage"
        );

    const overallCompetency =
        document.getElementById(
            "overallCompetency"
        );

    const learningProgress =
        document.getElementById(
            "learningProgress"
        );

    const progressCircleValue =
        document.getElementById(
            "progressCircleValue"
        );

    const quizzesCompleted =
        document.getElementById(
            "quizzesCompleted"
        );

    const totalQuizzes =
        document.getElementById(
            "totalQuizzes"
        );

    const skillGaps =
        document.getElementById(
            "skillGaps"
        );

    const competencyList =
        document.getElementById(
            "competencyList"
        );

    const skillGapList =
        document.getElementById(
            "skillGapList"
        );

    const recommendationList =
        document.getElementById(
            "recommendationList"
        );



    // Load Dashboard

    async function loadDashboard() {

        try {

            const data =
                await apiRequest(
                    "/dashboard/",
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            console.log(
                "Dashboard data:",
                data
            );


            const user =
                data.user || {};

            const competencies =
                data.competencies || [];

            const assessments =
                data.assessments || [];

            const recommendations =
                data.recommendations || [];



            // -------------------------
            // User Information
            // -------------------------

            const name =
    user.name ||
    (user.email
        ? user.email.split("@")[0]
        : "Employee");


            const role =
                user.role ||
                "Employee";


            if (userName) {

                userName.textContent =
                    name;

            }


            if (userRole) {

                userRole.textContent =
                    role;

            }


            if (welcomeMessage) {

                const firstName =
                    name.split(" ")[0];

                welcomeMessage.textContent =
                    `Welcome back, ${firstName}! 👋`;

            }



            // -------------------------
            // Overall Competency
            // -------------------------

            if (competencies.length > 0) {

                let totalScore = 0;


                competencies.forEach(
                    function (competency) {

                        totalScore +=
                            Number(
                                competency.score || 0
                            );

                    }
                );


                const averageScore =
                    Math.round(
                        totalScore /
                        competencies.length
                    );


                if (overallCompetency) {

                    overallCompetency.textContent =
                        `${averageScore}%`;

                }

            }



            // -------------------------
            // Competency List
            // -------------------------

            if (competencyList) {

                competencyList.innerHTML = "";


                competencies
                    .slice(0, 3)
                    .forEach(
                        function (competency) {

                            const score =
                                Number(
                                    competency.score || 0
                                );


                            const item =
                                document.createElement(
                                    "div"
                                );


                            item.className =
                                "competency-item";


                            item.innerHTML = `

                                <div class="competency-info">

                                    <strong>
                                        ${competency.name}
                                    </strong>

                                    <span>
                                        ${score}%
                                    </span>

                                </div>

                                <div class="progress-bar">

                                    <div
                                        class="progress-fill"
                                        style="width: ${score}%;">
                                    </div>

                                </div>

                            `;


                            competencyList.appendChild(
                                item
                            );

                        }
                    );

            }



            // -------------------------
            // Quiz Statistics
            // -------------------------

            const completedQuizCount =
                assessments.length;


            if (quizzesCompleted) {

                quizzesCompleted.textContent =
                    completedQuizCount;

            }


            if (totalQuizzes) {

                totalQuizzes.textContent =
                    `${completedQuizCount} completed assessments`;

            }



            // -------------------------
            // Skill Gaps
            // -------------------------

            const gapCompetencies =
                competencies
                    .filter(
                        function (competency) {

                            return Number(
                                competency.score || 0
                            ) < 70;

                        }
                    )
                    .sort(
                        function (a, b) {

                            return (
                                Number(a.score || 0) -
                                Number(b.score || 0)
                            );

                        }
                    );


            if (skillGaps) {

                skillGaps.textContent =
                    gapCompetencies.length;

            }


            if (skillGapList) {

                skillGapList.innerHTML = "";


                if (
                    gapCompetencies.length === 0
                ) {

                    skillGapList.innerHTML = `

                        <div class="skill-gap">

                            <div class="gap-content">

                                <strong>
                                    No major skill gaps
                                </strong>

                                <span>
                                    Your competency scores are
                                    currently on track.
                                </span>

                            </div>

                        </div>

                    `;

                }


                gapCompetencies
                    .slice(0, 3)
                    .forEach(
                        function (competency) {

                            const item =
                                document.createElement(
                                    "div"
                                );


                            item.className =
                                "skill-gap";


                            item.innerHTML = `

                                <div class="gap-content">

                                    <strong>
                                        ${competency.name}
                                    </strong>

                                    <span>
                                        Current score:
                                        ${competency.score}%
                                    </span>

                                </div>

                                <button
                                    class="improve-btn"
                                    data-id="${competency.id}">
                                    Improve
                                </button>

                            `;


                            skillGapList.appendChild(
                                item
                            );

                        }
                    );

            }



            // -------------------------
            // Recommendations
            // -------------------------

            if (recommendationList) {

                recommendationList.innerHTML = "";


                if (
                    recommendations.length === 0
                ) {

                    recommendationList.innerHTML = `

                        <div class="recommendation">

                            <div class="recommendation-content">

                                <strong>
                                    No recommendations available
                                </strong>

                                <span>
                                    Check again later.
                                </span>

                            </div>

                        </div>

                    `;

                }


                recommendations
                    .slice(0, 2)
                    .forEach(
                        function (recommendation) {

                            const item =
                                document.createElement(
                                    "div"
                                );


                            item.className =
                                "recommendation";


                            item.innerHTML = `

                                <div class="recommendation-icon">
                                    AI
                                </div>

                                <div class="recommendation-content">

                                    <strong>
                                        ${recommendation.resource_title}
                                    </strong>

                                   <span>
    ${recommendation.reason || "Recommended based on your competency needs."}
</span>

                                </div>

                                <button
                                    class="dashboard-learn-btn"
                                    data-id="${recommendation.id}">
                                    Start
                                </button>

                            `;


                            recommendationList.appendChild(
                                item
                            );

                        }
                    );

            }



            // -------------------------
            // Learning Progress
            // -------------------------

            /*
                Current dashboard API does not provide
                learning progress data.

                Therefore we do not invent a progress
                percentage here.
            */

            if (learningProgress) {

                learningProgress.textContent =
                    "N/A";

            }


            if (progressCircleValue) {

                progressCircleValue.textContent =
                    "N/A";

            }


            document.getElementById(
                "completedCourses"
            ).textContent = "N/A";


            document.getElementById(
                "inProgressCourses"
            ).textContent = "N/A";


            document.getElementById(
                "remainingCourses"
            ).textContent = "N/A";



            // -------------------------
            // Improve Buttons
            // -------------------------

            const improveButtons =
                document.querySelectorAll(
                    ".improve-btn"
                );


            improveButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            window.location.href =
                                "recommendations.html";

                        }
                    );

                }
            );



            // -------------------------
            // Recommendation Buttons
            // -------------------------

            const learningButtons =
                document.querySelectorAll(
                    ".dashboard-learn-btn"
                );


            learningButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;


                            localStorage.setItem(
                                "selected_recommendation_id",
                                id
                            );


                            window.location.href =
                                "recommendations.html";

                        }
                    );

                }
            );

        }


        catch (error) {

            console.error(
                "Dashboard loading failed:",
                error
            );

        }

    }



    // Continue Learning

    const continueLearningBtn =
        document.getElementById(
            "continueLearningBtn"
        );


    if (continueLearningBtn) {

        continueLearningBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "materials.html";

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

                    localStorage.removeItem(
                        "access_token"
                    );


                    localStorage.removeItem(
                        "selected_quiz_id"
                    );


                    localStorage.removeItem(
                        "quiz_result"
                    );


                    window.location.href =
                        "../index.html";

                }

            }
        );

    }



    // Start

    loadDashboard();

});