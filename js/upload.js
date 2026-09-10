// ===============================
// Upload Materials JavaScript
// Dummy / Static Data Only
// ===============================


// Elements

const uploadForm =
    document.getElementById("uploadForm");

const fileInput =
    document.getElementById("fileInput");

const dropZone =
    document.getElementById("dropZone");

const selectedFile =
    document.getElementById("selectedFile");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeFile =
    document.getElementById("removeFile");

const uploadMessage =
    document.getElementById("uploadMessage");


// Maximum file size: 20 MB

const maxFileSize =
    20 * 1024 * 1024;


// Allowed extensions

const allowedExtensions = [
    "pdf",
    "ppt",
    "pptx",
    "doc",
    "docx"
];


// ===============================
// Open File Browser
// ===============================

if (dropZone) {

    dropZone.addEventListener(
        "click",
        function () {

            fileInput.click();

        }
    );

}


// ===============================
// File Selected
// ===============================

if (fileInput) {

    fileInput.addEventListener(
        "change",
        function () {

            if (this.files.length > 0) {

                handleFile(this.files[0]);

            }

        }
    );

}


// ===============================
// Handle File
// ===============================

function handleFile(file) {

    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();


    // Check extension

    if (!allowedExtensions.includes(extension)) {

        alert(
            "Invalid file type. Please upload PDF, PPT, PPTX, DOC or DOCX."
        );

        fileInput.value = "";

        return;

    }


    // Check file size

    if (file.size > maxFileSize) {

        alert(
            "File size must be less than 20 MB."
        );

        fileInput.value = "";

        return;

    }


    // Show file

    fileName.textContent =
        file.name;

    fileSize.textContent =
        formatFileSize(file.size);

    selectedFile.classList.add("show");

}


// ===============================
// Format File Size
// ===============================

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " Bytes";

    }

    if (bytes < 1024 * 1024) {

        return (
            (bytes / 1024).toFixed(1) +
            " KB"
        );

    }

    return (
        (bytes / (1024 * 1024)).toFixed(1) +
        " MB"
    );

}


// ===============================
// Remove File
// ===============================

if (removeFile) {

    removeFile.addEventListener(
        "click",
        function () {

            fileInput.value = "";

            selectedFile.classList.remove("show");

            fileName.textContent = "File name";

            fileSize.textContent = "File size";

        }
    );

}


// ===============================
// Drag Over
// ===============================

if (dropZone) {

    dropZone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();

            dropZone.classList.add("drag-over");

        }
    );


    dropZone.addEventListener(
        "dragleave",
        function () {

            dropZone.classList.remove("drag-over");

        }
    );


    dropZone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();

            dropZone.classList.remove("drag-over");


            const files =
                event.dataTransfer.files;


            if (files.length > 0) {

                const file = files[0];

                handleFile(file);

                fileInput.files = files;

            }

        }
    );

}


// ===============================
// Upload Form
// ===============================

if (uploadForm) {

    uploadForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "materialTitle"
                ).value.trim();


            const category =
                document.getElementById(
                    "category"
                ).value;


            const difficulty =
                document.getElementById(
                    "difficulty"
                ).value;


            const description =
                document.getElementById(
                    "description"
                ).value.trim();


            const aiProcessing =
                document.getElementById(
                    "aiProcessing"
                ).checked;


            // Check file

            if (!fileInput.files.length) {

                uploadMessage.textContent =
                    "Please select a learning material file.";

                uploadMessage.style.color =
                    "#dc2626";

                return;

            }


            // Basic validation

            if (
                !title ||
                !category ||
                !difficulty ||
                !description
            ) {

                uploadMessage.textContent =
                    "Please complete all required fields.";

                uploadMessage.style.color =
                    "#dc2626";

                return;

            }


            // Dummy upload

            uploadMessage.textContent =
                "Material uploaded successfully!";

            uploadMessage.style.color =
                "#059669";


            // Show information

            setTimeout(function () {

                if (aiProcessing) {

                    alert(
                        "Material uploaded successfully.\n\nAI processing has been started."
                    );

                } else {

                    alert(
                        "Material uploaded successfully."
                    );

                }

            }, 300);


        }
    );

}


// ===============================
// Cancel Button
// ===============================

const cancelBtn =
    document.getElementById("cancelBtn");

if (cancelBtn) {

    cancelBtn.addEventListener(
        "click",
        function () {

            const confirmCancel =
                confirm(
                    "Are you sure you want to clear the form?"
                );


            if (confirmCancel) {

                uploadForm.reset();

                selectedFile.classList.remove(
                    "show"
                );

                uploadMessage.textContent = "";

            }

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