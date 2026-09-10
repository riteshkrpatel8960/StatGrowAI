// ===============================
// Reports JavaScript
// Dummy / Static Data Only
// ===============================


// ===============================
// Period Filter
// ===============================

const periodFilter =
    document.getElementById("periodFilter");


if (periodFilter) {

    periodFilter.addEventListener(
        "change",
        function () {

            const period =
                this.options[this.selectedIndex].text;

            alert(
                "Report period changed to: " +
                period
            );

        }
    );

}


// ===============================
// Export Report
// ===============================

const exportBtn =
    document.getElementById("exportBtn");


if (exportBtn) {

    exportBtn.addEventListener(
        "click",
        function () {

            alert(
                "Report export started.\n\n" +
                "In the backend version, " +
                "this button will generate and download the report."
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