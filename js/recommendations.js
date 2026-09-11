document.addEventListener("DOMContentLoaded", function () {

    const filter =
        document.getElementById(
            "recommendationFilter"
        );

    const recommendationGrid =
        document.getElementById(
            "recommendationGrid"
        );

    const skillGapGrid =
        document.getElementById(
            "skillGapGrid"
        );

    const explanation =
        document.getElementById(
            "recommendationExplanation"
        );


    // Load Recommendations

    async function loadRecommendations() {

        const token =
            localStorage.getItem(
                "access_token"
            );


        if (!token) {

            window.location.href =
                "../index.html";

            return;
        }


        try {

            const data =
                await apiRequest(
                    "/recommendations/",
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            console.log(
                "Recommendations data:",
                data
            );


            const recommendations =
                data.recommendations || [];


            // Clear old content

            recommendationGrid.innerHTML = "";

            skillGapGrid.innerHTML = "";


            if (
                recommendations.length === 0
            ) {

                recommendationGrid.innerHTML = `

                    <div class="recommendation-card">

                        <div class="recommendation-content">

                            <h3>
                                No recommendations available
                            </h3>

                            <p>
                                No learning recommendations
                                are available at the moment.
                            </p>

                        </div>

                    </div>

                `;

                return;
            }


            // Create skill gaps from recommendations

            createSkillGaps(
                recommendations
            );


            // Create recommendation cards

            recommendations.forEach(
                function (recommendation) {

                    createRecommendationCard(
                        recommendation
                    );

                }
            );


            // Add button events

            addLearningButtonEvents();


            // Update explanation

            updateExplanation(
                recommendations
            );


        } catch (error) {

            console.error(
                "Recommendations loading failed:",
                error
            );


            recommendationGrid.innerHTML = `

                <div class="recommendation-card">

                    <div class="recommendation-content">

                        <h3>
                            Unable to load recommendations
                        </h3>

                        <p>
                            Please try again later.
                        </p>

                    </div>

                </div>

            `;
        }

    }



    // Create Skill Gaps

    function createSkillGaps(
        recommendations
    ) {

        const competencies =
            [
                ...new Set(
                    recommendations.map(
                        function (item) {
                            return item.competency;
                        }
                    )
                )
            ];


        competencies.forEach(
            function (competency, index) {

                let priority =
                    "Medium Priority";

                let priorityClass =
                    "medium";


                if (index === 0) {

                    priority =
                        "High Priority";

                    priorityClass =
                        "high";

                }


                const initials =
                    competency
                        .split(" ")
                        .map(
                            function (word) {
                                return word
                                    .charAt(0);
                            }
                        )
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "skill-gap-card";


                card.innerHTML = `

                    <div class="gap-top">

                        <div class="gap-icon">
                            ${initials}
                        </div>

                        <span
                            class="priority ${priorityClass}">
                            ${priority}
                        </span>

                    </div>


                    <h3>
                        ${competency}
                    </h3>


                    <div class="gap-score">

                        <span>
                            Recommended Area
                        </span>

                        <strong>
                            Focus
                        </strong>

                    </div>


                    <div class="gap-progress">

                        <div style="width: 60%;"></div>

                    </div>


                    <p>
                        Recommended learning resources are
                        available for this competency.
                    </p>

                `;


                skillGapGrid.appendChild(
                    card
                );

            }
        );

    }



    // Create Recommendation Card

    function createRecommendationCard(
        recommendation
    ) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "recommendation-card";


        card.dataset.type =
            recommendation.resource_type;


        const type =
            recommendation.resource_type ||
            "Resource";


        const title =
            recommendation.resource_title ||
            "Learning Resource";


        const reason =
            recommendation.reason ||
            "Recommended for your learning."


        const competency =
            recommendation.competency ||
            "General";


        const initials =
            title
                .split(" ")
                .map(
                    function (word) {
                        return word.charAt(0);
                    }
                )
                .join("")
                .substring(0, 2)
                .toUpperCase();


        let buttonText =
            "Start Learning";


        if (
            type.toLowerCase() ===
            "pdf"
        ) {

            buttonText =
                "Open Material";

        }

        else if (
            type.toLowerCase() ===
            "ppt"
        ) {

            buttonText =
                "Open Presentation";

        }

        else if (
            type.toLowerCase() ===
            "video"
        ) {

            buttonText =
                "Watch Video";

        }


        card.innerHTML = `

            <div class="recommendation-image">
                ${initials}
            </div>


            <div class="recommendation-content">

                <div class="recommendation-top">

                    <span class="resource-type">
                        ${type}
                    </span>

                    <span class="match">
                        Recommended
                    </span>

                </div>


                <h3>
                    ${title}
                </h3>


                <p>
                    ${reason}
                </p>


                <div class="resource-meta">

                    <span>
                        🎯 ${competency}
                    </span>

                    <span>
                        📚 Learning Resource
                    </span>

                </div>


                <button
                    class="learn-btn"
                    data-id="${recommendation.id}">

                    ${buttonText}

                </button>

            </div>

        `;


        recommendationGrid.appendChild(
            card
        );

    }



    // Learning Buttons

    function addLearningButtonEvents() {

        const learningButtons =
            document.querySelectorAll(
                ".learn-btn"
            );


        learningButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const recommendationId =
                            button.dataset.id;


                        localStorage.setItem(
                            "selected_recommendation_id",
                            recommendationId
                        );


                        alert(
                            `Opening recommendation ${recommendationId}`
                        );

                    }
                );

            }
        );

    }



    // Filter

    if (filter) {

        filter.addEventListener(
            "change",
            function () {

                const selectedType =
                    filter.value;


                const cards =
                    document.querySelectorAll(
                        ".recommendation-card"
                    );


                cards.forEach(
                    function (card) {

                        const cardType =
                            card.dataset.type;


                        if (
                            selectedType ===
                            "all" ||
                            cardType ===
                            selectedType
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



    // Explanation

    function updateExplanation(
        recommendations
    ) {

        const competencies =
            [
                ...new Set(
                    recommendations.map(
                        function (item) {
                            return item.competency;
                        }
                    )
                )
            ];


        if (
            competencies.length === 0
        ) {

            return;
        }


        if (explanation) {

            explanation.textContent =
                `These resources are recommended based on your current learning needs in ${competencies.join(", ")}.`;

        }

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


                    window.location.href =
                        "../index.html";

                }

            }
        );

    }



    // Start

    loadRecommendations();

});