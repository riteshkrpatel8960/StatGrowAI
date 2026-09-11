document.addEventListener("DOMContentLoaded", function () {

    const categoryFilter =
        document.getElementById("categoryFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const materialsGrid =
        document.getElementById("materialsGrid");


    async function loadMaterials() {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            window.location.href = "../index.html";
            return;
        }


        try {

            const data = await apiRequest("/materials/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            console.log("Materials data:", data);


            const materials =
                data.materials || [];


            materialsGrid.innerHTML = "";


            materials.forEach(function (material) {

                const initials =
                    material.title
                        .split(" ")
                        .map(function (word) {
                            return word.charAt(0);
                        })
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();


                const card =
                    document.createElement("div");

                card.className =
                    "material-card";


                card.innerHTML = `

                    <div class="material-image">
                        ${initials}
                    </div>

                    <div class="material-content">

                        <div class="material-top">

                            <span class="category">
                                ${material.material_type}
                            </span>

                            <span class="status new-status">
                                Available
                            </span>

                        </div>

                        <h3>
                            ${material.title}
                        </h3>

                        <p>
                            ${material.description}
                        </p>

                        <div class="material-meta">

                            <span>
                                📚 Learning Material
                            </span>

                            <span>
                                ${material.material_type}
                            </span>

                        </div>

                        <button
                            class="continue-btn"
                            data-id="${material.id}">
                            Start Learning
                        </button>

                    </div>

                `;


                materialsGrid.appendChild(card);

            });


            // Learning Buttons

            const learningButtons =
                document.querySelectorAll(".continue-btn");


            learningButtons.forEach(function (button) {

                button.addEventListener("click", function () {

                    const materialId =
                        button.dataset.id;


                    localStorage.setItem(
                        "selected_material_id",
                        materialId
                    );


                    alert(
                        `Opening material ${materialId}`
                    );

                });

            });


        } catch (error) {

            console.error(
                "Materials loading failed:",
                error
            );

        }

    }


    // Filters

    categoryFilter.addEventListener(
        "change",
        function () {
            console.log(
                "Category selected:",
                categoryFilter.value
            );
        }
    );


    statusFilter.addEventListener(
        "change",
        function () {
            console.log(
                "Status selected:",
                statusFilter.value
            );
        }
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


    loadMaterials();

});