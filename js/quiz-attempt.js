document.addEventListener("DOMContentLoaded", function () {

    /* Quiz Questions */

    const questions = [

        {
            question: "What is data quality?",
            options: [
                "The accuracy, completeness and reliability of data.",
                "The amount of data stored in a database.",
                "The size of a dataset.",
                "The number of users accessing the data."
            ],
            answer: 0
        },

        {
            question: "Which characteristic means that data contains all required information?",
            options: [
                "Accuracy",
                "Completeness",
                "Timeliness",
                "Uniqueness"
            ],
            answer: 1
        },

        {
            question: "What does data accuracy mean?",
            options: [
                "Data is available quickly.",
                "Data contains no duplicate records.",
                "Data correctly represents the real-world value.",
                "Data is stored in a large database."
            ],
            answer: 2
        },

        {
            question: "Which practice helps identify incorrect data?",
            options: [
                "Data validation",
                "Data deletion",
                "Data duplication",
                "Data hiding"
            ],
            answer: 0
        },

        {
            question: "What is duplicate data?",
            options: [
                "Missing data.",
                "Repeated records representing the same information.",
                "Encrypted data.",
                "Archived data."
            ],
            answer: 1
        },

        {
            question: "Which factor describes whether data is available when needed?",
            options: [
                "Timeliness",
                "Accuracy",
                "Uniqueness",
                "Completeness"
            ],
            answer: 0
        },

        {
            question: "Why is data quality important?",
            options: [
                "It increases unnecessary storage.",
                "It supports reliable analysis and decision-making.",
                "It makes databases larger.",
                "It removes the need for analysis."
            ],
            answer: 1
        },

        {
            question: "Which process checks whether data follows predefined rules?",
            options: [
                "Data validation",
                "Data visualization",
                "Data compression",
                "Data backup"
            ],
            answer: 0
        },

        {
            question: "What is data consistency?",
            options: [
                "Data has different values everywhere.",
                "Data follows the same meaning and format across systems.",
                "Data is always deleted.",
                "Data is stored without structure."
            ],
            answer: 1
        },

        {
            question: "Which is an example of poor data quality?",
            options: [
                "Correct employee ID",
                "Complete customer record",
                "Duplicate employee records",
                "Validated statistical data"
            ],
            answer: 2
        }

    ];


    let currentQuestion = 0;

    let userAnswers =
        new Array(questions.length).fill(null);


    /* Elements */

    const questionText =
        document.getElementById("questionText");

    const questionCounter =
        document.getElementById("questionCounter");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const quizProgress =
        document.getElementById("quizProgress");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const questionNumbers =
        document.querySelectorAll(".question-number");

    const timer =
        document.getElementById("timer");


    /* Load Question */

    function loadQuestion() {

        const question =
            questions[currentQuestion];


        questionText.textContent =
            question.question;


        questionCounter.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;


        const percentage =
            Math.round(
                ((currentQuestion + 1) / questions.length) * 100
            );


        progressPercentage.textContent =
            `${percentage}%`;

        quizProgress.style.width =
            `${percentage}%`;


        updateOptions(question);


        previousBtn.disabled =
            currentQuestion === 0;


        if (currentQuestion === questions.length - 1) {

            nextBtn.style.display = "none";

            submitBtn.style.display = "block";

        } else {

            nextBtn.style.display = "block";

            submitBtn.style.display = "none";

        }


        updateQuestionNumbers();

    }


    /* Update Options */

    function updateOptions(question) {

        const optionsContainer =
            document.querySelector(".options-container");


        optionsContainer.innerHTML = "";


        question.options.forEach(function (optionText, index) {

            const label =
                document.createElement("label");

            label.className = "option";


            if (userAnswers[currentQuestion] === index) {

                label.classList.add("selected");

            }


            label.innerHTML = `

                <input
                    type="radio"
                    name="answer"
                    value="${index}">

                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="option-text">
                    ${optionText}
                </span>

            `;


            optionsContainer.appendChild(label);


            const radio =
                label.querySelector("input");


            radio.addEventListener("change", function () {

                userAnswers[currentQuestion] =
                    Number(this.value);


                document
                    .querySelectorAll(".option")
                    .forEach(function (item) {

                        item.classList.remove("selected");

                    });


                label.classList.add("selected");


                updateQuestionNumbers();

            });

        });

    }


    /* Question Numbers */

    function updateQuestionNumbers() {

        questionNumbers.forEach(function (button, index) {

            button.classList.remove("current");

            button.classList.remove("answered");


            if (index === currentQuestion) {

                button.classList.add("current");

            }


            if (userAnswers[index] !== null) {

                button.classList.add("answered");

            }

        });

    }


    /* Next */

    nextBtn.addEventListener("click", function () {

        if (userAnswers[currentQuestion] === null) {

            alert("Please select an answer before continuing.");

            return;

        }


        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            loadQuestion();

        }

    });


    /* Previous */

    previousBtn.addEventListener("click", function () {

        if (currentQuestion > 0) {

            currentQuestion--;

            loadQuestion();

        }

    });


    /* Question Number Click */

    questionNumbers.forEach(function (button, index) {

        button.addEventListener("click", function () {

            currentQuestion = index;

            loadQuestion();

        });

    });


    /* Submit */

    submitBtn.addEventListener("click", function () {

        if (userAnswers[currentQuestion] === null) {

            alert("Please select an answer before submitting.");

            return;

        }


        const unanswered =
            userAnswers.filter(function (answer) {

                return answer === null;

            }).length;


        if (unanswered > 0) {

            const proceed =
                confirm(
                    `You have ${unanswered} unanswered question(s).\n\nDo you want to submit anyway?`
                );


            if (!proceed) {

                return;

            }

        }


        let score = 0;


        questions.forEach(function (question, index) {

            if (userAnswers[index] === question.answer) {

                score++;

            }

        });


        const percentage =
            Math.round(
                (score / questions.length) * 100
            );


        // Save result temporarily

        localStorage.setItem(
            "quizScore",
            percentage
        );

        localStorage.setItem(
            "quizCorrect",
            score
        );

        localStorage.setItem(
            "quizTotal",
            questions.length
        );


        window.location.href =
            "result.html";

    });


    /* Timer */

    let timeLeft = 14 * 60 + 32;


    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;


        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is up! Your quiz will be submitted.");

            submitBtn.click();

            return;

        }


        timeLeft--;

    }


    const timerInterval =
        setInterval(updateTimer, 1000);


    /* Exit */

    const exitBtn =
        document.getElementById("exitBtn");


    exitBtn.addEventListener("click", function () {

        const confirmExit =
            confirm(
                "Are you sure you want to exit the quiz?\n\nYour progress may be lost."
            );


        if (confirmExit) {

            window.location.href =
                "quizzes.html";

        }

    });


    /* Initial Load */

    loadQuestion();

});