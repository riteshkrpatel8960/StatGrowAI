async function loadCompetencies() {

    const token = localStorage.getItem("access_token");

    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    try {

        const data = await apiRequest("/competencies/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("Competencies data:", data);

        const competencies = data.competencies || [];

        if (competencies.length === 0) {
            return;
        }


        /* =========================
           Calculate Overall Score
        ========================= */

        let totalScore = 0;

        competencies.forEach(function (competency) {
            totalScore += competency.score;
        });

        const overallScore =
            Math.round(totalScore / competencies.length);


        /* =========================
           Overall Score
        ========================= */

        const overallScoreElement =
            document.getElementById("overallScore");

        if (overallScoreElement) {
            overallScoreElement.textContent =
                `${overallScore}%`;
        }


        /* =========================
           Strong Areas
        ========================= */

        const strongAreas =
            competencies
                .filter(function (competency) {
                    return competency.score >= 70;
                })
                .sort(function (a, b) {
                    return b.score - a.score;
                });

        const strongAreasContainer =
            document.getElementById("strongAreas");

        if (strongAreasContainer) {

            strongAreasContainer.innerHTML = "";

            strongAreas.slice(0, 2).forEach(function (competency) {

                strongAreasContainer.innerHTML += `
                    <div class="summary-item">

                        <div class="item-info">
                            <span>${competency.name}</span>
                            <strong>${competency.score}%</strong>
                        </div>

                        <div class="mini-progress">
                            <div style="width: ${competency.score}%;"></div>
                        </div>

                    </div>
                `;
            });
        }


        /* =========================
           Needs Improvement
        ========================= */

        const improvementAreas =
            competencies
                .filter(function (competency) {
                    return competency.score < 70;
                })
                .sort(function (a, b) {
                    return a.score - b.score;
                });

        const improvementContainer =
            document.getElementById("improvementAreas");

        if (improvementContainer) {

            improvementContainer.innerHTML = "";

            improvementAreas.slice(0, 2).forEach(function (competency) {

                improvementContainer.innerHTML += `
                    <div class="summary-item">

                        <div class="item-info">
                            <span>${competency.name}</span>
                            <strong>${competency.score}%</strong>
                        </div>

                        <div class="mini-progress">
                            <div style="width: ${competency.score}%;"></div>
                        </div>

                    </div>
                `;
            });
        }


        /* =========================
           Competency Performance
        ========================= */

        const competencyList =
            document.getElementById("competencyList");

        if (competencyList) {

            competencyList.innerHTML = "";

            competencies.forEach(function (competency) {

                let level = "Beginner";
                let levelClass = "low-text";
                let progressClass = "low";

                if (competency.score >= 80) {
                    level = "Advanced";
                    levelClass = "high-text";
                    progressClass = "high";
                }
                else if (competency.score >= 60) {
                    level = "Intermediate";
                    levelClass = "medium-text";
                    progressClass = "medium";
                }

                const initials =
                    competency.name
                        .split(" ")
                        .map(function (word) {
                            return word.charAt(0);
                        })
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();

                competencyList.innerHTML += `
                    <div class="competency-card">

                        <div class="competency-top">

                            <div class="competency-name">

                                <div class="competency-icon">
                                    ${initials}
                                </div>

                                <div>
                                    <h3>${competency.name}</h3>
                                    <p>Current competency level.</p>
                                </div>

                            </div>

                            <div class="percentage">
                                ${competency.score}%
                            </div>

                        </div>


                        <div class="progress-container">

                            <div class="progress-bar">

                                <div
                                    class="progress-fill ${progressClass}"
                                    style="width: ${competency.score}%;">
                                </div>

                            </div>

                        </div>


                        <div class="competency-footer">

                            <span class="level ${levelClass}">
                                ${level}
                            </span>

                            <span>
                                Target: 75%
                            </span>

                        </div>

                    </div>
                `;
            });
        }


    } catch (error) {

        console.error(
            "Competencies loading failed:",
            error
        );
    }
}


/* =========================
   Recommendation Button
========================= */

const recommendButton =
    document.getElementById("recommendBtn");

if (recommendButton) {

    recommendButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "recommendations.html";

        }
    );
}


/* =========================
   Start Page
========================= */

loadCompetencies();