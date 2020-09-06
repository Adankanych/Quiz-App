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
            correctAnswer: 'In 800 A.D. by a monk.'
        },
        {
            question: 'What does coffee come from?',
            answers: [
                'Coffee comes from a bean from a bush',
                'Coffee come from a nut in a tree',
                'Coffee comes from a seed from a cherry like berry',
                'Coffee comes from coffee',
            ],
            correctAnswer: 'Coffee comes from a seed from a cherry like berry'
        },
        {
            question: 'What else were coffee cherries turned into?',
            answers: [
                'Only coffee.',
                'Coffee cherries were fermented into a wine-like drink.',
                'Coffee cherries are not ediable.',
                'Coffee cherries were used in pies.',
            ],
            correctAnswer: 'Coffee cherries were fermented into a wine-like drink.'
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
                'Hawaii and Alaska',
                'California and Alaksa',
                'Alaska and Florida',
                'Hawaii and California',
            ],
            correctAnswer: 'Hawaii and California'
        },
        {
            question: 'How much does the worlds most expensive coffee cost?',
            answers: [
                'It costs $600 a pound.',
                'It costs $1000 a pound.',
                'It costs $30 a pound.',
                'It costs $5 a pound.',
            ],
            correctAnswer: 'It costs $600 a pound.'
        },
        {
            question: 'What is the worlds most expensive coffee made of?',
            answers: [
                'A coffee bean',
                'A gold covered coffee bean',
                'It does not come from a coffee bean',
                'It comes from the feces of an Asian palm civet',
            ],
            correctAnswer: 'It comes from the feces of an Asian palm civet'
        },
        {
            question: 'Which country is home to the biggest coffee lovers?',
            answers: [
                'America is home to the worlds biggest coffee lovers',
                'Cuba is home to the worlds biggest coffee lovers',
                'Finland is home to the worlds biggest coffee lovers',
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
                'It has always been coffee',
                'The Arabic word for wine Qahwah',
                'From the Turkish word',
                'From the Dutch word',
            ],
            correctAnswer: 'The Arabic word for wine Qahwah'
        }

    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
};
    

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//Generates HTML for start screen
function generateStartScreen(){
    return`
      <div class="start-screen">
          <p>How well do you know your coffee?</p>
          <button type="button" id="start">Let's Get Sippin!</button>
      </div>`;
}

//Generates the HTML for number and score
function generateQuestionNumberAndScore(){
    return`
    <ul class="question-and-score">
    <li id="question-number">
    Question Number: ${STORE.questionNumber + 1}/${STORE.questions.length}
    </li>
    <li id="score">
        SCORE: ${STORE.score}/${STORE.questions.length}
    </li>
    </ul>`;
}
// Generates multiple answers for one question
function generateAnswers(){
    const answersArray = STORE.questions[STORE.questionNumber].answers
    let answersHTML = " ";
    let i = 0;

    answersArray.forEach(answers => {
        answersHTML += 
        `<div id="choice-container-${i}">
            <input type="radio" name="choice" id="choice${i + 1}" value="${answers}" tabindex="${i + 1}" required>
            <label for="choice${i + 1}"> ${answers}</label>
            </div>`;
            i++;
    });
    return answersHTML;
}

//Generates one question to display
function generateQuestion(){
    let questionNumber = STORE.questions[STORE.questionNumber];
    return`
    <form id="question-form" class="question-form">
       <fieldset>
          <div class="question">
                <legend> ${questionNumber.question}</legend>
          </div>
          <div class="choice">
            <div class="answers">
              ${generateAnswers()}
            </div>
          </div>
          <button type="submit" id="submit-answer-button" tabindex="5">Check</button>
          <button type="button" id="next-question-button" tabindex="6"> Next</button>
        </.fieldset>
    </form>`;
}

//Generates the results screen
function generateResultsScreen(){
    return`
    <div class="results">
        <form id="js-restart-quiz">
            <fieldset>
                <div class="row">
                    <div class="col-12">
                        <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                     <button type="button" id="restart">Restart Quiz</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>`;
}

//Generates feedback if the answer was correct or incorrect
function generateFeedback(answerStatus){
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
      html = `
      <div class="right-answer"> That is correct!</div>`;
  }
  else if (answerStatus === 'incorrect') {
      html = 
      `<div class = "wrong-answer"> That is incorrect. The correct answer is ${correctAnswer}.</div>`;
  }
  return html;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(){
    let html ='';

    if (STORE.quizStarted === false) {
        $('main').html(generateStartScreen());
        return;
    }
    else if (STORE.questionNumber >= 0 && STORE.questionNumber < STORE.questions.length) {
        html = generateQuestionNumberAndScore();
        html += generateQuestion();
        $('main').html(html);
    }
    else {
        $('main').html(generateResultsScreen());
    }

}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//Handles a clickon the quiz's start button
function handleStartClick() {
    $('main').on('click', '#start', function(event){
        STORE.quizStarted = true;
        render();
    });

}

//Handles the click on the next button
function handleNextQuestionClick(){
    $('body').on('click', '#next-question-button', (event) => {
        render();
    });
}


//Handles submission of the question form
function handleQuestionFormSubmission(){
    $('body').on('submit', '#question-form', function (event){
        event.preventDefault();
        const questionNumber = STORE.questions[STORE.questionNumber];

        //get value from radio button checked
        let selectedChoice = $('input[name=choice]:checked').val();

        //Creates id '#choice-container' and the index of the current question in the answers array.
        let choiceContainerID = `#choice-container-${questionNumber.answers.findIndex(i => i === selectedChoice)}`;
        console.log('Choice Container ID', choiceContainerID);
        if (selectedChoice === questionNumber.correctAnswer) {
            STORE.score++;
            $(choiceContainerID).append(generateFeedback('correct'));
        } else {
            $(choiceContainerID).append(generateFeedback('incorrect'));
        }
        STORE.questionNumber++;
        //hide the submit button
        $('#submit-answer-button').hide();
        //disable all inputs
        $('input[type="radio]').each(() => {
            $('input[type=radio]').attr('disabled', true);
        });
        //show the next button
        $('#next-question-button').show();
    });
}

//Resets all values to prepare to restart the quiz

function restartQuiz(){
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
}

function handleRestartButtonClick() {
    $('body').on('click', '#restart', () => {
        restartQuiz();
        render();
    });
}

function handleQuizApp(){
    render();
    handleStartClick();
    handleNextQuestionClick();
    handleQuestionFormSubmission();
    handleRestartButtonClick();
}
$(handleQuizApp);