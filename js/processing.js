// ===============================
// Material Processing JavaScript
// Dummy / Static Data Only
// ===============================


// Elements

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const materialList =
    document.getElementById("materialList");

const noResults =
    document.getElementById("noResults");


// ===============================
// Filter Materials
// ===============================

function filterMaterials() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedStatus =
        statusFilter.value;


    const materials =
        materialList.querySelectorAll(".material-item");

    let visibleCount = 0;


    materials.forEach(function (material) {

        const name =
            material.dataset.name.toLowerCase();

        const status =
            material.dataset.status;


        const matchesSearch =
            name.includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesStatus
        ) {

            material.style.display = "grid";

            visibleCount++;

        } else {

            material.style.display = "none";

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
        filterMaterials
    );

}


// Status filter

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterMaterials
    );

}


// ===============================
// Details Modal
// ===============================

const detailsModal =
    document.getElementById("detailsModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalMaterial =
    document.getElementById("modalMaterial");

const modalPercent =
    document.getElementById("modalPercent");

const modalProgress =
    document.getElementById("modalProgress");

const modalStatus =
    document.getElementById("modalStatus");

const modalButton =
    document.getElementById("modalButton");


const detailsButtons =
    document.querySelectorAll(".details-btn");


detailsButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const materialName =
                this.dataset.material;


            modalTitle.textContent =
                "Material Details";

            modalMaterial.textContent =
                materialName;


            const material =
                this.closest(".material-item");


            const status =
                material.dataset.status;


            const progress =
                material.querySelector(
                    ".progress-label strong"
                ).textContent;


            modalPercent.textContent =
                progress;

            modalProgress.style.width =
                progress;


            if (status === "completed") {

                modalStatus.textContent =
                    "Completed";

                modalProgress.style.background =
                    "#059669";

            } else if (status === "processing") {

                modalStatus.textContent =
                    "Processing";

                modalProgress.style.background =
                    "#2563eb";

            } else if (status === "pending") {

                modalStatus.textContent =
                    "Pending";

                modalProgress.style.background =
                    "#9ca3af";

            } else {

                modalStatus.textContent =
                    "Failed";

                modalProgress.style.background =
                    "#dc2626";

            }


            detailsModal.classList.add("show");

        }
    );

});


// Close modal

if (modalClose) {

    modalClose.addEventListener(
        "click",
        function () {

            detailsModal.classList.remove("show");

        }
    );

}


// Close using button

if (modalButton) {

    modalButton.addEventListener(
        "click",
        function () {

            detailsModal.classList.remove("show");

        }
    );

}


// Close outside modal

if (detailsModal) {

    detailsModal.addEventListener(
        "click",
        function (event) {

            if (event.target === detailsModal) {

                detailsModal.classList.remove("show");

            }

        }
    );

}


// ===============================
// Retry state persistence
// (so a fixed item doesn't revert to "Failed" on reload)
// ===============================

function getRetryOverrides() {

    try {

        return (
            JSON.parse(
                localStorage.getItem("materialRetryStatus")
            ) || {}
        );

    } catch (e) {

        return {};

    }

}

function setRetryOverride(materialName, status) {

    const overrides = getRetryOverrides();

    overrides[materialName] = status;

    localStorage.setItem(
        "materialRetryStatus",
        JSON.stringify(overrides)
    );

}


function applyStatusToCard(materialItem, status) {

    materialItem.dataset.status = status;

    const statusBadge =
        materialItem.querySelector(".status");

    const progressFill =
        materialItem.querySelector(".progress-fill");

    const progressLabelText =
        materialItem.querySelector(".progress-label span");

    const progressPercent =
        materialItem.querySelector(".progress-label strong");

    const retryBtn =
        materialItem.querySelector(".retry-btn");

    statusBadge.classList.remove(
        "completed", "processing", "pending", "failed"
    );

    progressFill.classList.remove(
        "completed", "pending", "failed"
    );

    if (status === "processing") {

        statusBadge.classList.add("processing");
        statusBadge.textContent = "Processing";

        progressLabelText.textContent = "Processing";
        progressFill.style.width = "60%";
        progressPercent.textContent = "60%";

    } else if (status === "completed") {

        statusBadge.classList.add("completed");
        progressFill.classList.add("completed");

        statusBadge.textContent = "Completed";
        progressLabelText.textContent = "Completed";
        progressFill.style.width = "100%";
        progressPercent.textContent = "100%";

        if (retryBtn) {
            retryBtn.remove();
        }

    }

}


// Re-apply any previously fixed items when the page loads,
// so refreshing doesn't put a retried material back to "Failed".
document.addEventListener("DOMContentLoaded", function () {

    const overrides = getRetryOverrides();

    Object.keys(overrides).forEach(function (materialName) {

        const materialItem = Array.from(
            document.querySelectorAll(".material-item")
        ).find(function (item) {
            return item.dataset.name === materialName;
        });

        if (materialItem) {
            applyStatusToCard(materialItem, overrides[materialName]);
        }

    });

});


// ===============================
// Retry Processing
// ===============================

const retryButtons =
    document.querySelectorAll(".retry-btn");


retryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const materialName =
                this.dataset.material;

            const materialItem =
                this.closest(".material-item");


            const retry =
                confirm(
                    "Retry AI processing for " +
                    materialName +
                    "?"
                );


            if (!retry) {
                return;
            }

            // Move the card to "Processing" immediately
            applyStatusToCard(materialItem, "processing");
            setRetryOverride(materialName, "processing");

            // Simulate the reprocessing completing successfully,
            // and this time it sticks — no more "Failed" for this item.
            setTimeout(function () {
                applyStatusToCard(materialItem, "completed");
                setRetryOverride(materialName, "completed");
            }, 2500);

        }
    );

});


// ===============================
// Refresh
// ===============================

const refreshBtn =
    document.getElementById("refreshBtn");

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        function () {

            alert(
                "Processing status refreshed."
            );

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
                "You have 8 pending quiz reviews."
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
