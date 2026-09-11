document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("access_token");

    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    const quizId =
        localStorage.getItem("selected_quiz_id") || "1";

    let questions = [];
    let currentQuestion = 0;
    let userAnswers = {};


    const questionCounter =
        document.getElementById("questionCounter");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const quizProgress =
        document.getElementById("quizProgress");

    const questionLabel =
        document.querySelector(".question-label");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.querySelector(".options-container");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");

    const questionNumbers =
        document.getElementById("questionNumbers");

    const exitBtn =
        document.getElementById("exitBtn");


    // Load quiz information

    async function loadQuiz() {

        try {

            const data = await apiRequest(
                `/quizzes/${quizId}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log("Quiz data:", data);

            if (data.quiz) {

                const title =
                    document.querySelector(
                        ".quiz-title strong"
                    );

                const difficulty =
                    document.querySelector(
                        ".quiz-title span"
                    );

                if (title) {
                    title.textContent =
                        data.quiz.title;
                }

                if (difficulty) {
                    difficulty.textContent =
                        `${data.quiz.difficulty} difficulty`;
                }
            }

        } catch (error) {

            console.error(
                "Quiz loading failed:",
                error
            );
        }
    }


    // Load questions from backend

    async function loadQuestions() {

        try {

            const data = await apiRequest(
                `/quizzes/${quizId}/questions`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log(
                "Quiz questions data:",
                data
            );

            questions =
                data.questions || [];

            if (questions.length === 0) {

                questionText.textContent =
                    "No questions available.";

                return;
            }

            createQuestionNumbers();

            showQuestion(0);

        } catch (error) {

            console.error(
                "Questions loading failed:",
                error
            );

            questionText.textContent =
                "Unable to load quiz questions.";
        }
    }


    // Show question

    function showQuestion(index) {

        const question =
            questions[index];

        if (!question) {
            return;
        }

        currentQuestion = index;


        questionCounter.textContent =
            `Question ${index + 1} of ${questions.length}`;


        questionLabel.textContent =
            `Question ${index + 1}`;


        questionText.textContent =
            question.question;


        const percentage =
            Math.round(
                ((index + 1) / questions.length) * 100
            );


        progressPercentage.textContent =
            `${percentage}%`;


        quizProgress.style.width =
            `${percentage}%`;


        optionsContainer.innerHTML = "";


        question.options.forEach(
            function (option) {

                const label =
                    document.createElement("label");

                label.className =
                    "option";


                const input =
                    document.createElement("input");

                input.type =
                    "radio";

                input.name =
                    "answer";

                input.value =
                    option.label;


                if (
                    userAnswers[question.id] ===
                    option.label
                ) {

                    input.checked = true;
                }


                const letter =
                    document.createElement("span");

                letter.className =
                    "option-letter";

                letter.textContent =
                    option.label;


                const text =
                    document.createElement("span");

                text.className =
                    "option-text";

                text.textContent =
                    option.text;


                label.appendChild(input);
                label.appendChild(letter);
                label.appendChild(text);

                optionsContainer.appendChild(label);


                input.addEventListener(
                    "change",
                    function () {

                        userAnswers[question.id] =
                            input.value;

                        updateQuestionNumbers();
                    }
                );
            }
        );


        previousBtn.disabled =
            index === 0;


        if (index === questions.length - 1) {

            nextBtn.style.display =
                "none";

            submitBtn.style.display =
                "inline-block";

        } else {

            nextBtn.style.display =
                "inline-block";

            submitBtn.style.display =
                "none";
        }


        updateQuestionNumbers();
    }


    // Question numbers

    function createQuestionNumbers() {

        questionNumbers.innerHTML = "";


        questions.forEach(
            function (question, index) {

                const button =
                    document.createElement("button");

                button.className =
                    "question-number";

                button.textContent =
                    index + 1;


                button.addEventListener(
                    "click",
                    function () {

                        saveCurrentAnswer();

                        showQuestion(index);
                    }
                );


                questionNumbers.appendChild(button);
            }
        );

        updateQuestionNumbers();
    }


    function updateQuestionNumbers() {

        const buttons =
            questionNumbers.querySelectorAll(
                ".question-number"
            );


        buttons.forEach(
            function (button, index) {

                button.classList.remove("current");
                button.classList.remove("answered");


                if (index === currentQuestion) {

                    button.classList.add(
                        "current"
                    );
                }


                const question =
                    questions[index];


                if (userAnswers[question.id]) {

                    button.classList.add(
                        "answered"
                    );
                }
            }
        );
    }


    function saveCurrentAnswer() {

        const selected =
            document.querySelector(
                'input[name="answer"]:checked'
            );


        if (selected && questions[currentQuestion]) {

            userAnswers[
                questions[currentQuestion].id
            ] = selected.value;
        }
    }


    // Next

    nextBtn.addEventListener(
        "click",
        function () {

            saveCurrentAnswer();

            if (
                currentQuestion <
                questions.length - 1
            ) {

                showQuestion(
                    currentQuestion + 1
                );
            }
        }
    );


    // Previous

    previousBtn.addEventListener(
        "click",
        function () {

            saveCurrentAnswer();

            if (currentQuestion > 0) {

                showQuestion(
                    currentQuestion - 1
                );
            }
        }
    );


    // Submit

    submitBtn.addEventListener(
        "click",
        async function () {

            saveCurrentAnswer();


            const answers =
                questions.map(
                    function (question) {

                        return {
                            question_id:
                                question.id,

                            answer:
                                userAnswers[
                                    question.id
                                ] || ""
                        };
                    }
                );


            const unanswered =
                answers.filter(
                    function (answer) {
                        return answer.answer === "";
                    }
                ).length;


            if (unanswered > 0) {

                const confirmSubmit =
                    confirm(
                        `You have ${unanswered} unanswered question(s). Do you want to submit?`
                    );

                if (!confirmSubmit) {
                    return;
                }
            }


            submitBtn.disabled = true;

            submitBtn.textContent =
                "Submitting...";


            try {

                const data =
                    await apiRequest(
                        `/quizzes/${quizId}/submit`,
                        {
                            method: "POST",

                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify({
                                answers: answers
                            })
                        }
                    );


                console.log(
                    "Quiz submission result:",
                    data
                );


                localStorage.setItem(
                    "quiz_result",
                    JSON.stringify(data)
                );


                window.location.href =
                    "result.html";


            } catch (error) {

                console.error(
                    "Quiz submission failed:",
                    error
                );


                alert(
                    "Quiz submission failed. Please try again."
                );


                submitBtn.disabled = false;

                submitBtn.textContent =
                    "Submit Quiz";
            }
        }
    );


    // Exit

    exitBtn.addEventListener(
        "click",
        function () {

            if (
                confirm(
                    "Are you sure you want to exit the quiz?"
                )
            ) {

                localStorage.removeItem(
                    "selected_quiz_id"
                );

                window.location.href =
                    "quizzes.html";
            }
        }
    );


    // Start

    loadQuiz();
    loadQuestions();

});