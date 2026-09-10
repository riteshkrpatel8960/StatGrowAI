// ===============================
// Admin Users JavaScript
// Dummy / Static Data Only
// ===============================


// Elements

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");

const usersTableBody =
    document.getElementById("usersTableBody");

const noResults =
    document.getElementById("noResults");


// ===============================
// Filter Users
// ===============================

function filterUsers() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedRole =
        roleFilter.value;

    const selectedStatus =
        statusFilter.value;


    const rows =
        usersTableBody.querySelectorAll("tr");

    let visibleCount = 0;


    rows.forEach(function (row) {

        const name =
            row.dataset.name.toLowerCase();

        const email =
            row.dataset.email.toLowerCase();

        const role =
            row.dataset.role;

        const status =
            row.dataset.status;


        const matchesSearch =
            name.includes(searchValue) ||
            email.includes(searchValue);

        const matchesRole =
            selectedRole === "all" ||
            role === selectedRole;

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        ) {

            row.style.display = "";

            visibleCount++;

        } else {

            row.style.display = "none";

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
        filterUsers
    );

}


// Role Filter

if (roleFilter) {

    roleFilter.addEventListener(
        "change",
        filterUsers
    );

}


// Status Filter

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterUsers
    );

}


// ===============================
// View User Modal
// ===============================

const userModal =
    document.getElementById("userModal");

const modalClose =
    document.getElementById("modalClose");

const modalName =
    document.getElementById("modalName");

const modalEmail =
    document.getElementById("modalEmail");

const modalRole =
    document.getElementById("modalRole");

const modalStatus =
    document.getElementById("modalStatus");

const modalDepartment =
    document.getElementById("modalDepartment");

const modalAvatar =
    document.getElementById("modalAvatar");


// Department data

const departmentData = {

    "Prabhat Raj": "Statistics",

    "Anjali Sharma": "Data & Analytics",

    "Rahul Kumar": "Research",

    "Neha Verma": "Administration",

    "Amit Singh": "Administration",

    "Pooja Mehta": "Statistics"

};


// View buttons

const viewButtons =
    document.querySelectorAll(".view-btn");


viewButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const row =
                this.closest("tr");

            const name =
                row.dataset.name;

            const email =
                row.dataset.email;

            const role =
                row.dataset.role;

            const status =
                row.dataset.status;


            modalName.textContent = name;

            modalEmail.textContent = email;

            modalRole.textContent =
                role === "admin"
                    ? "Administrator"
                    : "Employee";

            modalStatus.textContent =
                status === "active"
                    ? "Active"
                    : "Inactive";

            modalDepartment.textContent =
                departmentData[name] || "Statistics";

            modalAvatar.textContent =
                name.charAt(0).toUpperCase();


            userModal.classList.add("show");

        }
    );

});


// Close Modal

if (modalClose) {

    modalClose.addEventListener(
        "click",
        function () {

            userModal.classList.remove("show");

        }
    );

}


// Close when clicking outside

if (userModal) {

    userModal.addEventListener(
        "click",
        function (event) {

            if (event.target === userModal) {

                userModal.classList.remove("show");

            }

        }
    );

}


// ===============================
// Add New User
// ===============================

const addUserBtn =
    document.getElementById("addUserBtn");

if (addUserBtn) {

    addUserBtn.addEventListener(
        "click",
        function () {

            alert(
                "Add New User form will be connected to the backend later."
            );

        }
    );

}


// ===============================
// Edit User
// ===============================

const editUserBtn =
    document.getElementById("editUserBtn");

if (editUserBtn) {

    editUserBtn.addEventListener(
        "click",
        function () {

            alert(
                "User editing will be connected to the backend later."
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