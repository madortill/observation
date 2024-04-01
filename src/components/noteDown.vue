<script>
  export default {
    props: ["chapter"],
    data() {
      return {
        showBackButton: false,
        pressedCheck: false,
        showFirstPart: true,
        correctAnswersInTotal: 10,
        correctCounter: 0,
        incorrectCounter: 0,
        messageForScreen: '',
        messageForButton: 'בדיקה',
        showMessage: false,
        notePageInfo: [{
            question: 'מה נרשום?',
            sideNote: 'תבחרו 6 אפשרויות',
            answers: [{
                option: 'תיאורים',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'שמות',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'מחשבות',
                correct: false,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'זמנים',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'מקומות',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'מידע כמותי',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'ציטוטים',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'תחושות',
                correct: false,
                chosen: false,
                userCorrect: ''
            }]
        },
        {
            question: 'מתי נרשום?',
            sideNote: 'תבחרו 2 אפשרויות',
            answers: [
            {
                option: 'כל הזמן',
                correct: false,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'רישום סמוך להתנסות',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'ביצירת קשר עין אישי',
                correct: false,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'מאחורי החניך',
                correct: false,
                chosen: false,
                userCorrect: ''
            },{
                option: 'בזמנים ״מתים״',
                correct: true,
                chosen: false,
                userCorrect: ''
            },]
        },
        {
            question: 'איך נרשום?',
            sideNote: 'תבחרו 2 אפשרויות',
            answers: [
            {
                option: 'בצורה שיפוטית',
                correct: false,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'בצורה מפורטת',
                correct: true,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'בצורה אישית',
                correct: false,
                chosen: false,
                userCorrect: ''
            },
            {
                option: 'באופן מרגש',
                correct: false,
                chosen: false,
                userCorrect: ''
            },{
                option: 'בצורה אובייקטיבית',
                correct: true,
                chosen: false,
                userCorrect: ''
            }]
        }]
      }
    },
    methods: {
        checkAnswers() {
            this.pressedCheck = true;
            this.correctCounter = 0;
            this.incorrectCounter = 0;

            for (let i = 0; i < this.notePageInfo.length; i++) {
                for (let j = 0; j < this.notePageInfo[i].answers.length; j ++) {

                    if (this.notePageInfo[i].answers[j].chosen) {
                        this.showMessage = true;
                        if (this.notePageInfo[i].answers[j].chosen === this.notePageInfo[i].answers[j].correct) {
                            
                            this.notePageInfo[i].answers[j].userCorrect = 'true';
                            this.correctCounter++;

                            if (this.correctCounter === this.correctAnswersInTotal && this.incorrectCounter === 0) {
                                this.messageForScreen = 'עניתם על הכל בהצלחה!';
                                
                                setTimeout(() => {
                                    this.showMessage = false;
                                    this.$emit('backToHomePage', 'רישום ותיעוד');
                                }, 1500);
                            } else if (this.correctCounter === this.correctAnswersInTotal && this.incorrectCounter !== 0) {
                                this.messageForScreen = 'תשימו לב למספר התשובות שבחרת...';

                                setTimeout(() => {
                                    this.messageForScreen = '';
                                    this.showMessage = false;
                                    this.messageForButton = 'המשך';
                                }, 2000);
                            }
                        } else {
                            this.incorrectCounter++;
                            this.notePageInfo[i].answers[j].userCorrect = 'false';
                            this.messageForScreen = 'נראה שלא עניתם על הכל... תנסו שוב';

                                setTimeout(() => {
                                    this.messageForScreen = '';
                                    this.showMessage = false;
                                }, 2000);

                            setTimeout(() => {
                                this.notePageInfo[i].answers[j].userCorrect = '';
                                this.notePageInfo[i].answers[j].chosen = false;
                            }, 2000);
                        }
                    } else {
                        this.notePageInfo[i].answers[j].userCorrect = '';
                    }
                }
            }
        }
    }
  }
</script>

<template>
    <div class="noting">
        <div class="basicTitle">
            {{ chapter }}
        </div>
        <div class="firstPart" v-if="showFirstPart">
            <div class="instructions">
                רישום ותיעוד הינו רכיב חשוב במהלך התצפית. <br>
                כלל הדברים שתכתוב ישמשו עבורך בשלב העיבוד. <br><br> 
                שים לב, ההפך מלרשום הוא לשכוח.
            </div>
            <button class="buttons" type="button" @click="showFirstPart = false">לדף תצפית</button>
        </div>
        <div class="secondPart" v-else>
            <div class="everythinCont">
                <div v-for="(part, index) in notePageInfo" :key="index" class="questionCont">
                    <div class="question">
                        {{ part.question }} <p class="side-note">{{ part.sideNote }}</p>
                    </div>
                    <div class="answers" v-for="(answer, key) in part.answers" :key="key">
                        <input type="checkbox" :id="key" :ref="key" v-model="answer.chosen" @change="!answer.chosen" :class="[answer.userCorrect === 'true' && pressedCheck === true ? 'correct' : answer.userCorrect === 'false' ? 'incorrect' : '', answer.userCorrect === 'true' ? 'disabled': '']"/>
                        <label :for="key">{{ answer.option }}</label>
                    </div>
                </div>
                <div class="message" v-show="showMessage">{{ messageForScreen }}</div>
            </div>
            <button type="button" @click="checkAnswers()" class="buttons">{{ messageForButton }}</button>
        </div>
        <div class="buttonCont">
            <button v-show="showBackButton" class="buttons">
                ממשיכים
            </button>
            <button v-show="showBackButton" class="buttons">
                חוזרים
            </button>
        </div>
        
    </div>
</template>


<style scoped>
.noting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
}

.secondPart {
    height: 80vh;
    width: 40vw;
    background-color: rgba(255, 255, 255, 0.795);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.side-note {
    color: rgba(128, 128, 128);
    font-size: 1.02rem;
    margin: 0.2vh;
}

.everythinCont {
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 40vw;
    flex-wrap: wrap;
    align-items: flex-start;
}

.disabled {
    pointer-events: none;
}

.message {
    width: 23vw;
    height: 10vh;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5); 
    transform: translate(-50%,-50%);
    position: absolute;
    top: 50%;
    direction: rtl;
    padding: 3vw;
    font-size: 1.7rem;
    text-align: center;
    left: 50%;
}

input[type=checkbox] {
    cursor: pointer;
    margin-left: 0.5vw;
    width: 1.25vw;
    height: 1.25vw;
}

.correct {
    -webkit-box-shadow: 0px 0px 5px 3px rgb(27, 150, 29);
    -moz-box-shadow: 0px 0px 5px 3px rgb(27, 150, 29);
    box-shadow: 0px 0px 5px 3px rgb(27, 150, 29);
}

.incorrect {
    -webkit-box-shadow: 0px 0px 5px 3px rgb(175, 15, 15);
    -moz-box-shadow: 0px 0px 5px 3px rgb(175, 15, 15);
    box-shadow: 0px 0px 5px 3px rgb(175, 15, 15);
}

.question {
    font-size: 1.4rem;
    margin-bottom: 0.75vh;
}

.answers {
    font-size: 1.15rem;
    margin-top: 0.65vh;
    margin-right: 1vw;
}

.answers:hover {
    font-size: 1.2rem;
}

.questionCont {
    margin: 2.5vh 1.25vw;
    width: 15vw;
}

.basicTitle {
  font-size: 4rem;
  margin-top: 3vh;
  font-weight: 600;
}

.buttons {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #6f9cb8;
    text-align: center;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
}

.buttonCont {
    width: 85vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
}

.buttons:hover {
    background-color: #426991;
}

.instructions {
    width: 32vw;
    font-size: 2rem;
    line-height: 1.5;
}

.firstPart  {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    height: 32vh;
    padding: 8vh 5vw;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.671);
    direction: rtl;
}

</style>
