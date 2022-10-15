window.onload = function() {
    quiz.init();
};


class Quiz {

    questions = [
        {
            q: "Who invented the dynamite?",
            answers: ["Max Planck", "James Clerk Maxwell", "Alfred Nobel"],
            correctAnswerIndex: 2
        },
        {
            q: "What is the color of light?",
            answers: ["White", "Yellow", "Blue"],
            correctAnswerIndex: 0
        },
        {
            q: "Why metal surfaces shine while being illuminated?",
            answers: ["Because they are composed of heavy elements", "Because of electron oscillations", "Because of atomic nucleus oscillations"],
            correctAnswerIndex: 1
        }
    ];

    currentQuestionIndex = -1;
    heading = null;
    questionParagraph = null;
    answer0 = null;
    answer1 = null;
    answer2 = null;
    correctAnswerIndex = null;

    userSelectedInput = null;
    userCorrectAnswersNum = 0;
    userBadAnswersNum = 0;

    saveAnswerBtn = null;
    nxtQuestionBtn = null;

    modalWindow = null;

    init() {
        this.heading = document.querySelector(".alert-heading");
        this.answer0 = document.querySelector("#answer0");
        this.answer1 = document.querySelector("#answer1");
        this.answer2 = document.querySelector("#answer2");
        this.questionParagraph = document.querySelector("#questionParagraph");
        this.saveAnswerBtn = document.querySelector("#saveAnswerBtn");
        this.nxtQuestionBtn = document.querySelector("#nxtQuestionBtn");
        this.correctAnswers = document.querySelector("#correctAnswers");
        this.badAnswers = document.querySelector("#badAnswers");

        this.startQuiz = document.getElementById("startQuizDiv");
        this.showQuizQuestions = document.getElementById("container");

        this.showStartScreen();

        // this.displayQuestion();
        // this.saveAnswerBtn.addEventListener('click', this.saveAnswer);
        // this.nxtQuestionBtn.addEventListener('click', this.displayQuestion);

        this.initModal();
    };

    showStartScreen = () => {
        document.getElementById("startQuiz").addEventListener('click', this.displayQuestion);
        this.saveAnswerBtn.addEventListener('click', this.saveAnswer);
        this.nxtQuestionBtn.addEventListener('click', this.displayQuestion);
    }

    initModal = () => {
        this.modalWindow = new bootstrap.Modal(document.getElementById("modalWindow"));

        document.getElementById("closeModal").addEventListener('click', this.restartQuiz);
    }

    saveAnswer = () => {
        this.userSelectedInput = document.querySelector("input[type='radio']:checked");

        if (!this.userSelectedInput) return;

        const selectedAnswerIndex = this.userSelectedInput.getAttribute("data-index");

        if(selectedAnswerIndex == this.correctAnswerIndex) {
            console.log("Correct answer");
            this.userCorrectAnswersNum++;
            this.userSelectedInput.classList.add("is-valid");
        } else {
            console.log("Incorrect answer");
            this.userBadAnswersNum++;
            this.userSelectedInput.classList.add("is-invalid");
        };
        this.setUserStats();

        this.saveAnswerBtn.classList.add("disabled");
        this.nxtQuestionBtn.classList.remove("disabled");
    };

    setUserStats = () => {
        this.correctAnswers.innerText = this.userCorrectAnswersNum;
        this.badAnswers.innerText = this.userBadAnswersNum;
    }

    displayQuestion = () => {
        this.startQuiz.classList.add("showOnScreen");
        this.showQuizQuestions.classList.remove("showOnScreen");

        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length) {
            console.log("End of quiz");
            // this.initModal();
            this.showModalResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        const qStr = `Question ${this.currentQuestionIndex+1}/${this.questions.length}: `;
        this.heading.innerText = qStr + question.q;
        this.answer0.innerText = question.answers[0];
        this.answer1.innerText = question.answers[1];
        this.answer2.innerText = question.answers[2];
        this.correctAnswerIndex = question.correctAnswerIndex;

        document.querySelectorAll("input[type='radio']").forEach( el => {
            el.classList.remove("is-valid");
            el.classList.remove("is-invalid");
            el.checked = false;
        });

        this.saveAnswerBtn.classList.remove("disabled");
        this.nxtQuestionBtn.classList.add("disabled");
    };

    showModalResults = () => {
        const modalParagraph = document.getElementById("modalResults");

        let info;
        if(this.userCorrectAnswersNum >= this.userBadAnswersNum) {
            info = `Bravo! You are a genius! You got ${this.userCorrectAnswersNum} correct answers out of ${this.questions.length} questions.`;
        } else {
            info = `It seems you have to study more. Only ${this.userCorrectAnswersNum} out of ${this.questions.length} were correct answers.`
        }

        modalParagraph.innerText = info;

        this.modalWindow.toggle();
    };

    restartQuiz = () => {
        this.currentQuestionIndex = -1;
        this.userCorrectAnswersNum = 0;
        this.userBadAnswersNum = 0;
        this.setUserStats();
        // this.displayQuestion();
        // this.showStartScreen();
        this.startQuiz.classList.remove("showOnScreen");
        this.showQuizQuestions.classList.add("showOnScreen");
    }
}

const quiz = new Quiz();

