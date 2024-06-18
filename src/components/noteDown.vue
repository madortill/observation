<script>
// import ConnectTwo from './connectTwo.vue'
import DragQuestion from './dragQuestion.vue'

  export default {
    props: ["chapter", "colorCode"],
    data() {
      return {
        showBackButton: false,
        showNextButton: false,
        showPart: 0,
        finishedLevel: false,
        changeAni: false,
        correctCounter: 0,
        messageForButton: 'בדיקה',
        showButton: false,
        practiceCount: 1,
        select1: undefined,
        select2: undefined,
        select3: undefined,
        select4: undefined,
        option1: 
            {
                option: ["בחר", "חניכים", "מידע", "תיאורים"],
                correctAnswer: "מידע",
                isCorrect: '',
                disabled: false
            },
        option2:
            {
                option: ["בחר", "זמנים חשובים", "זמנים טובים", "זמנים מתים"],
                correctAnswer: "זמנים מתים",
                isCorrect: '',
                disabled: false
            }, 
        option3:
            {
                option: ["בחר", "שכחה", "זיכרון", "פגיעה"],
                correctAnswer: "שכחה",
                isCorrect: '',
                disabled: false
            }, 
        option4:
            {
                option: ["בחר", "אחרי ההתנסות", "בסמוך להתנסות", "לפני ההתנסות"],
                correctAnswer: "בסמוך להתנסות",
                isCorrect: '',
                disabled: false
            }
        ,
        howQuestion: [
            {
                title: "בצורה אובייקטבית",
                options: [{
                    opt: '"לדעתי הדרך בה המגיב הייתה שגויה."',
                    id: 0,
                    clickedCorrect: ''
                }, 
                {
                    opt: '"המדריך הגיב באופן פוגעני והחיילת יצאה בוכה מהשיעור."',
                    id: 1,
                    clickedCorrect: ''
                } ],
                correct: '"המדריך הגיב באופן פוגעני והחיילת יצאה בוכה מהשיעור."',
                checked: '',
            },
            {
                title: "בצורה מפורטת",
                options: [{
                    opt: '"המדריך עשה סיכום שיעור לא טוב"',
                    id: 0,
                    clickedCorrect: ''
                },
                {
                    opt: '"סיכום השיעור היה קצר (3 דקות במקום 10), המדריך לא עבר על התכנים שלימד ולא וידא הבנה."',
                    id: 1,
                    clickedCorrect: ''
                } ],
                correct: '"סיכום השיעור היה קצר (3 דקות במקום 10), המדריך לא עבר על התכנים שלימד ולא וידא הבנה."',
                checked: '',
            }
        ],
        connectArr: {
            "type": "connect-two",
            "question": "התאימו בין המושג להגדרה- לחצו על מושג והגדרה",
            "term": ["תיאורים", "ציטוטים", "שמות", "זמנים", "מקומות", "מידע כמותי"],
            "definition": ["הכיתה מלוכלכת ואינה מוכנה לקיום שיעור.", "״נכון! בדיוק כמו שאמרת, המנוע צריך להתחמם לפני שמתחילים בנסיעה״", "דנה נרדמה בשיעור", 
            "מתוך 45 דקות שיעור, המדריך העביר פתיחה במשך 25 דקות.", "השיעור הועבר בחוץ ביום של 35 מעלות חום, זה הקשה מאוד על ריכוז התלמידים.", "3 תלמידים ספציפיים תמיד עונים על כל השאלות."],
            "correct": {"תיאורים": "הכיתה מלוכלכת ואינה מוכנה לקיום שיעור.", "ציטוטים": "״נכון! בדיוק כמו שאמרת, המנוע צריך להתחמם לפני שמתחילים בנסיעה״", "שמות": "דנה נרדמה בשיעור", "זמנים" : "מתוך 45 דקות שיעור, המדריך העביר פתיחה במשך 25 דקות.", "מקומות" : "השיעור הועבר בחוץ ביום של 35 מעלות חום, זה הקשה מאוד על ריכוז התלמידים.", "מידע כמותי" :  "3 תלמידים ספציפיים תמיד עונים על כל השאלות."}
        }
      }
    },
    components: {
    //  ConnectTwo,
        DragQuestion
    },
    methods: {
        clickedOnOption(event) {
            for (let i = 0; i < this.howQuestion.length; i++) {
                if (event.currentTarget.id === this.howQuestion[i].title) {
                    this.howQuestion[i].checked = event.currentTarget.innerText;

                    for (let j = 0; j < this.howQuestion[i]["options"].length; j++) {
                        this.howQuestion[i]["options"][j]["clickedCorrect"] = '';
                        if (this.howQuestion[i]["options"][j]["opt"] === event.currentTarget.innerText) {
                            this.howQuestion[i]["options"][j]["clickedCorrect"] = 'checked';
                        }
                    }
                }
            }
        },
        checkHowPractice() {
            this.messageForButton = 'ממשיכים';
            for (let i = 0; i < this.howQuestion.length; i++) {
                for (let j = 0; j < this.howQuestion[i]["options"].length; j++) {
                    if (this.howQuestion[i]["options"][j]["opt"] === this.howQuestion[i].checked) {
                        if (this.howQuestion[i].checked === this.howQuestion[i].correct) {
                            this.howQuestion[i]["options"][j]["clickedCorrect"] = 'correctBox';
                        } else {
                            this.howQuestion[i]["options"][j]["clickedCorrect"] = 'incorrectBox';
                        }
                    } else {
                        this.howQuestion[i]["options"][j]["clickedCorrect"] = 'disabled';
                    }
                }
            }
        },
        checkWhenPractice(event) {
            let numberOfArray = event.currentTarget.id.slice(-1);

            if (this[`option${numberOfArray}`].correctAnswer === event.currentTarget.value) {
                this[`option${numberOfArray}`].isCorrect = 'require(`@/assets/check.png`)';
                this.correctCounter++;
                this[`option${numberOfArray}`].disabled = true;
            } else {
                this[`option${numberOfArray}`].isCorrect = 'require(`@/assets/cancel.png`)';
            }

            if (this.correctCounter === 4) {
                this.showButton = true;
                this.messageForButton = 'ממשיכים';
            }
        },
        checkingFunction() {
            if (this.showButton === true) {
                    this.messageForButton = 'בדיקה';
                    this.showButton = false;
                    this.changePractice();
            } else {
                if (this.messageForButton === 'בדיקה') {
                    this.checkHowPractice();
                } else {
                    this.finished();
                }
            }
        },
        changePractice() {
            this.practiceCount++;
        },
        nextPart() {
            this.showPart++;

            if (this.showPart === 1) {
                this.showNextButton = false;
                this.showBackButton = true;
            } else if (this.showPart === 2) {
                this.showBackButton = false;
            }
        },
        prevPart() {
            this.showPart--;

            if (this.showPart === 0) {
                this.showNextButton = true;
                this.showBackButton = false;
            }
        },
        finished() {
            this.finishedLevel = true;

            setTimeout(() => {
                this.$emit('backToHomePage', 'רישום ותיעוד');
            }, 1200);
        }
    },
    mounted() {
        setTimeout(() => {
            this.changeAni = true;
            this.showNextButton = true;
        }, 1250);
    }
  }
</script>

<template>
    <div class="noting">
        <div class="titleCircle" v-show="showPart !== 2" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 20 + 130}deg`">{{ chapter }}</div>
        <div class="firstPart" v-if="showPart === 0">     
            <div :class="changeAni ? 'explanation float' : 'explanation scale'">
                <div class="basicTitle">הגדרה</div>
                רישום ותיעוד הינו רכיב חשוב במהלך התצפית. <br>
                כלל הדברים שתכתבו ישמשו עבורכם בשלב העיבוד. <br><br> 
                שימו <img src="../assets/heart.png" class="heartIcon" />, ההפך מלרשום הוא לשכוח.
                <br> <br>
                במהלך התצפית, התייחסו להכנת השיעור והעברתו - תקף, מהימן ופרקטי, כולל את כל החומר הנדרש.
            </div>
        </div>
        <div class="secondPart" v-else-if="showPart === 1">
            <div class="instructions float">
                <div class="title">שימוש בדף תצפית</div>
                <div class="sections">
                    <div class="subTitle">מה נרשום?</div>
                    <div>
                        ציטוטים, שמות, זמנים, מקומות, מידע כמותי
                    </div>
                </div>
                <div class="sections">
                    <div class="subTitle">מתי נרשום?</div>
                    <div>
                        זמנים מתים, בסמוך להתנסות
                    </div>
                </div>
                <div class="sections">
                    <div class="subTitle">איך נרשום?</div>
                    <div>
                        באופן אובייקטיבי, בצורה מפורטת
                    </div>
                </div>
                <button class="toPractice" type="button" @click="nextPart">לתרגול</button>
            </div>
        </div>
        <div class="thirdPart" v-else>
            <div class="basicTitle-3">תרגול</div>
            <div class="test-page">
                <div class="everythinCont">
                    <div class="whatWriting" v-show="practiceCount === 0">
                        <div class="title-practice">
                            מה נרשום? 
                        </div>
                        <div class="connectTwo">
                            <!-- <DragQuestion @change-practice="changePractice"/> -->
                            <!-- <ConnectTwo @change-practice="changePractice" :ques="connectArr"/> -->
                        </div>
                    </div>
                    <div class="whenWriting" v-show="practiceCount === 1">
                        <div class="title-practice">
                            מתי נרשום? 
                        </div>
                        <div class="questionContainer">
                            <div class="questionFilling">
                                כדי לקלוט כמה שיותר <select id="option1" class="options" @change="checkWhenPractice" v-model="select1" :disabled="option1.disabled"><option v-for="(option, index) in option1.option" :key="index">{{ option }}</option></select>
                                <img v-if="option1.isCorrect !== '' && select1 !== undefined" :src="option1.isCorrect" alt="icon" class="checkIcon"/> ולהספיק לכתוב כל מה שאנחנו צריכים, נכתוב בזמנים מסויימים הנקראים <select @change="checkWhenPractice" v-model="select2" id="option2" class="options" :disabled="option2.disabled"><option v-for="(option, index) in option2.option" :key="index">{{ option }}</option></select><img v-if="option2.isCorrect !== '' && select2 !== undefined" :src="option2.isCorrect" alt="icon" class="checkIcon"/>.
                            </div>
                            <div class="questionFilling">
                                על מנת למנוע <select  @change="checkWhenPractice" :disabled="option3.disabled" v-model="select3" id="option3" class="options"><option v-for="(option, index) in option3.option" :key="index">{{ option }}</option></select>
                                <img v-if="option3.isCorrect !== '' && select3 !== undefined" :src="option3.isCorrect" alt="icon" class="checkIcon"/>
                                של פרטים חשובים וקריטיים, ניישם סוג רישום נוסף שלפיו יש לרשום <select :disabled="option4.disabled" class="options"  @change="checkWhenPractice" v-model="select4" id="option4"><option v-for="(option, index) in option4.option" :key="index">{{ option }}</option></select><img v-if="option4.isCorrect !== '' && select4 !== undefined" :src="option4.isCorrect" alt="icon" class="checkIcon"/>.
                            </div>
                        </div>
                    </div>
                    <div class="howWriting" v-show="practiceCount === 2 ">
                        <div class="title-practice">
                            איך נרשום? 
                        </div>
                        <div class="subtitle-practice">
                            בחרו בתשובה הנכונה
                        </div>
                        <div>
                            <div v-for="(question, index) in howQuestion" :key="index" class="container-howPractice">
                                <div class="question-howPractice">
                                    {{ question.title }}
                                </div>
                                <div class="optionsContainer">
                                    <div v-for="(options, id) in question.options" :key="id" :id="question.title" class="option-howPractice" @click="clickedOnOption" :class="options.clickedCorrect">
                                        {{ options.opt }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message" v-show="finishedLevel">כל הכבוד! סיימתם את השלב<img src="../assets/muscle.png" class="muscle" /></div>
                <button type="button" v-show="practiceCount === 2 || showButton === true" @click="checkingFunction" class="buttons">{{ messageForButton }}</button>
            </div>
        </div>
        <div class="buttonCont">
            <button :class="showNextButton ? '' : 'invisible'"  class="buttons" @click="nextPart">
                ממשיכים
            </button>
            <button :class="showBackButton ? '' : 'invisible'" class="buttons" @click="prevPart">
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
    justify-content: space-around;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
}

.invisible {
    visibility: hidden;
}

.heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
}

.float {
    animation: floatAnimation 3s ease-in-out infinite;
}

.scale {
    animation: scaleScreen 1.25s linear forwards;
}

.title-practice {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.8vh;
    color: #0c5341;
}

.basicTitle-3 {
    margin-top: 2vh;
    font-size: 3rem;
    font-weight: 600;
}

.checkIcon {
    width: 1vw;
    margin-right: 0.2vw
} 

.connectTwo {
    width: 60rem;
}

.questionContainer {
    display: flex;
    flex-direction: column;
    height: 55vh;
    justify-content: space-evenly;
}

select:disabled {
    color: black;
    border-color: black;
    border-radius: 2px;
}

.container-howPractice {
    margin: 3vh;
}

.options {
    font-size: 1.2rem;
}

.whatWriting, .howWriting, .whenWriting {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.subtitle-practice {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5vh;
}

.questionFilling {
    font-size: 1.3rem;
    width: 15vw;
    border-style: solid;
    border-color: black;
    border-width: 0.2vh;
    border-radius: 2vh;
    padding: 3vh 1.5vw;
    text-align: center;
}

.title {
    margin-bottom: 2vh;
    font-size: 3rem;
    font-weight: 600;
}

.subTitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.25vh;
    animation: floatAnimation 3s ease-in-out infinite;
    color: #5e9057;
    text-decoration: none;
    position: relative;

    &:hover {
        color: #5e9057;

        &:before {
            visibility: visible;
            transform: scaleX(0.25);
        }
    }

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: #5e9057;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out 0s;
    }

}

.sections {
    margin: 1.75vh;
}

.toPractice {
    margin-top: 4vh;
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #0c5341;
    text-align: center;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
}

.toPractice:hover {
    background-color: #116d56;
}

.side-note {
    color: rgba(128, 128, 128);
    font-size: 1.02rem;
    margin: 0.2vh;
}

.thirdPart {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}

.test-page {
    height: 72vh;
    padding: 1vh 0vw;
    width: 64rem;
    background-color: rgba(255, 255, 255, 0.795);
    display: flex;
    margin-top: 4vh;
    flex-direction: column;
    align-items: center;
}

.everythinCont {
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: fit-content;
    flex-wrap: wrap;
    align-items: flex-start;
}

.disabled {
    pointer-events: none;
}

.checked {
    background-color: #c5c5c5;
}

.correctBox {
    background-color: rgb(27, 150, 29);
    -webkit-box-shadow: 0px 0px 5px 4px rgb(27, 150, 29);
    -moz-box-shadow: 0px 0px 5px 4px rgb(27, 150, 29);
    box-shadow: 0px 0px 5px 4px rgb(27, 150, 29);
    pointer-events: none;
}

.incorrectBox {
    background-color: rgb(175, 15, 15);
    -webkit-box-shadow: 0px 0px 5px 4px rgb(175, 15, 15);
    -moz-box-shadow: 0px 0px 5px 4px rgb(175, 15, 15);
    box-shadow: 0px 0px 5px 4px rgb(175, 15, 15);
    pointer-events: none;
}

.message {
    width: 25vw;
    height: 10vh;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5); 
    transform: translate(-50%,-50%);
    position: absolute;
    top: 50%;
    direction: rtl;
    padding: 3vw;
    font-size: 2.7rem;
    text-align: center;
    left: 50%;
    z-index: 2;
}

.muscle {
    width: 2.5vw;
    margin-right: 0.5vw;
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

.question-howPractice {
    font-size: 1.4rem;
    margin-bottom: 0.5vh;
    font-weight: 600;
}

.option-howPractice {
    cursor: pointer;
    font-size: 1.3rem;
    width: 10vw;
    border-style: solid;
    border-color: black;
    border-width: 0.2vh;
    margin: 1vh;
    border-radius: 2vh;
    padding: 2.5vh 1.5vw;
    text-align: center;
}

.option-howPractice:hover {
    background-color: #d0d0d090;
}

.optionsContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 35vw;
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
    margin-bottom: 2vh;
   font-size: 3.3rem;
   font-weight: 600;
 }

 .titleCircle {
    width: 5rem;
    height: 5.5rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.75rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 7px #0003;
    transition: all .3s ease;
    background-color: hsl(var(--hue),50%,75%);
    position: fixed;
    padding: 3.5%;
    position: absolute;
    top: 14vh;
    right: 25vw;
    z-index: 2;
    cursor: pointer;
 }

.buttons {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #0c5341;
    text-align: center;
    margin-bottom: 5vh;
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
    background-color: #116d56;
}

.instructions, .explanation {
    width: 32vw;
    margin-top: 24vh;
    transform-origin: top right;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 2rem;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    padding: 6vh 5vw;
    border-radius: 2rem;
    line-height: 1.5;
}

.firstPart, .secondPart  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}

.scale {
    animation: scaleScreen 1.25s linear forwards;
}

/* .secondPart  {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    height: 45vh;
    padding: 8vh 5vw;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.671);
    direction: rtl;
} */

@-moz-keyframes floatAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes floatAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }

    100% {
        transform: translateY(0);
    }
}

@-webkit-keyframes scaleScreen {
   0% {
       transform: scale(0);
   }
   100% {
       transform: scale(1);
   }
}

@keyframes scaleScreen {
   0% {
       transform: scale(0);
   }
   100% {
       transform: scale(1);
   }
}

</style>
