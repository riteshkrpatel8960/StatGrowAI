const continueLearningButton =
document.querySelector(".continue-learning-btn");

const improveButtons =
document.querySelectorAll(".skill-gap button");

const startButtons =
document.querySelectorAll(".recommendation button");

/* Continue Learning */

continueLearningButton.addEventListener("click", function () {

```
window.location.href = "materials.html";
```

});

/* Improve Skill */

improveButtons.forEach(function (button) {

```
button.addEventListener("click", function () {

    window.location.href = "recommendations.html";

});
```

});

/* Start Recommendation */

startButtons.forEach(function (button) {

```
button.addEventListener("click", function () {

    window.location.href = "materials.html";

});
```

});
