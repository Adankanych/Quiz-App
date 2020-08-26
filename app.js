//question and answers

const STORE = {
    questions: [
        {
            question: 'When was coffee discovered?',
            answers: [
                'In 800 A.D. by a monk.',
                'In 1971 by Starbucks.',
                'In 1955 by McDonalds.',
                'In the 15th century by Turks',
            ],
            correctAnswer: 'In 800 A.D. by a monk'
        },
        {
            question: 'What does coffee come from?',
            answers: [
                'Coffee comes from a seed from a cherry like berry',
                'Coffee comes from a bean from a bush',
                'Coffee come from a nut in a tree',
                'Coffee comes from coffee',
            ],
            correctAnswer: 'Coffee comes from a seed from a cherry like berry'
        },
        {
            question: 'What else were coffee cherries turned into?',
            answers: [
                'Coffee cherries were fermented into a wine-like drink.',
                'Only coffee.',
                'Coffee cherries are not ediable.',
                'Coffee cherries were used in pies.',
            ],
            correctAnswer: 'Coffee cherries were fermented into a wine-like drink'
        },
        {
            question: 'What country grows the most coffee in the world?',
            answers: [
                'Brazil grows the most coffee',
                'America grows the most coffee',
                'Cuba grows the most coffee',
                'China grows the most coffee',
            ],
            correctAnswer: 'Brazil grows the most coffee'
        },
        {
            question: 'Which only two states grow coffee in the U.S.?',
            answers: [
                'Hawaii and California',
                'Hawaii and Alaska',
                'California and Alaksa',
                'Alaska and Florida',
            ],
            correctAnswer: 'Hawaii and California'
        },
        {
            question: 'How much does the worlds most expensive coffee cost?',
            answers: [
                'It costs $600 a pound.',
                'It costs $1000 a pound',
                'It costs $30 a pound',
                'It costs $5 a pound',
            ],
            correctAnswer: 'It costs $600 a pound.'
        },
        {
            question: 'What is the worlds most expensive coffee made of?',
            answers: [
                'It comes from the feces of an Asian palm civet',
                'A coffee bean',
                'A gold covered coffee bean',
                'It does not come from a coffee bean',
            ],
            correctAnswer: 'It comes from the feces of an Asian palm civet'
        },
        {
            question: 'Which country is home to the biggest coffee lovers?',
            answers: [
                'Finland is home to the worlds biggest coffee lovers',
                'America is home to the worlds biggest coffee lovers.',
                'Cuba is home to the worlds biggest coffee lovers',
                'Spain is home to the worlds biggest coffee lovers',
            ],
            correctAnswer: 'Finland is home to the worlds biggest coffee lovers'
        },
        {
            question: 'What event helped popularize coffee in America?',
            answers: [
                'The Boston Tea Party',
                'Starbucks was made',
                'The Civil War',
                'It was always popular',
            ],
            correctAnswer: 'The Boston Tea Party'
        },
        {
            question: 'Where does the word coffee come from?',
            answers: [
                'The Arabic word for wine "Qahwah"',
                'It has always been coffee',
                'From the Turkish word',
                'From the Dutch word',
            ],
            correctAnswer: 'The Arabic word for wine "Qahwah"'
        }

    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
};
    

//variable for the quiz score and question number


//initial Intro
function renderIntro(){
    console.log("submit button clicked")
    $(".quiz-form").hide();
    $(".js-quiz").on('click', '.js-quiz-submit', function (event){
        $('.js-question-number').text(1);
        $('.js-question').show
        $('.js-question').prepend(renderQuestion());
    });
}

//update count
function increaseScore(){
    score++;
    $(".js-quesiton-number").text(score);
}

//question function
function renderQuestion(){
    if (questionNumber < STORE.length) {
        return renderQuestionForm(questionNumber);
    } else {
        $(".js-question").hide();
        finalScore();
        $(".js-quesiton-number").text(10);
    }
}

function submitAnswer(){
    $(".coffee-quiz").on("submit", function (event){
        event.preventDefault();
        $(".quiz.form").hide();
        $(".js-response").show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}
//create html for question form
function renderQuestionForm(questionIndex) {
    let formMaker=$(`<form>
        <fieldset>
            <legend class="questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`).appendTo();

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach (function (answerValue, answerIndex) {
        $(`<label class="question-score" for ="${answerIndex}">
            <input class ="radio" type ="radio" id="${answerIndex}" value = "${answerValue}" name="answer" required>
            <span> ${answerValue}</span>
            </label>`).appendTo(fieldSelector);
    });
    $(`<button type="button" class="button js-quiz-submit">Let's get Sippin!</button>`).appendTo(fieldSelector);
    return formMaker;
}

function nextQuestion() {
    $(".coffee-quiz").on('click', '.nextButton', function (event) {
        $('.js-question').show();
        $('.js-question form').replaceWith(renderQuestion());
    });
}

function startApp(){
    renderIntro();
    renderQuestion();
    submitAnswer();
    nextQuestion();
    reloadQuiz();
}
$(startApp);