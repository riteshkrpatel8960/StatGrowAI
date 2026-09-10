const profileForm = document.getElementById("profileForm");

const profileMessage = document.getElementById("profileMessage");

profileForm.addEventListener("submit", function (event) {

```
event.preventDefault();


const fullName = document.getElementById("fullName").value.trim();

const email = document.getElementById("email").value.trim();

const role = document.getElementById("role").value;

const department = document.getElementById("department").value;

const experience = document.getElementById("experience").value;


if (
    fullName === "" ||
    email === "" ||
    role === "" ||
    department === "" ||
    experience === ""
) {

    profileMessage.textContent =
        "Please complete all fields.";

    profileMessage.style.color = "red";

    return;
}


profileMessage.textContent =
    "Profile completed successfully!";

profileMessage.style.color = "green";


console.log({
    fullName,
    email,
    role,
    department,
    experience
});
```

});
