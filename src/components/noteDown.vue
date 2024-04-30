<script>
import ConnectTwo from './connectTwo.vue'
  export default {
    props: ["chapter", "colorCode"],
    data() {
      return {
        showBackButton: false,
        checkIcons: '',
        showNextButton: false,
        showPart: 0,
        changeAni: false,
        correctCounter: 0,
        messageForButton: 'בדיקה',
        practiceCount: 1,
        select1: undefined,
        select2: undefined,
        select3: undefined,
        select4: undefined,
        option1: 
            {
                option: ["חניכים", "מידע", "תיאורים"],
                correctAnswer: "מידע",
                isCorrect: '',
                disabled: false
            },
        option2:
            {
                option: ["זמנים חשובים", "זמנים טובים", "זמנים מתים"],
                correctAnswer: "זמנים מתים",
                isCorrect: '',
                disabled: false
            }, 
        option3:
            {
                option: ["שכחה", "זיכרון", "פגיעה"],
                correctAnswer: "שכחה",
                isCorrect: '',
                disabled: false
            }, 
        option4:
            {
                option: ["אחרי ההתנסות", "בסמוך להתנסות", "לפני ההתנסות"],
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
                    id: 0
                }, 
                {
                    opt: '"המדריך הגיב באופן פוגעני והחיילת יצאה בוכה מהשיעור."',
                    id: 1
                } ],
                correct: '"המדריך הגיב באופן פוגעני והחיילת יצאה בוכה מהשיעור."',
                checked: ''
            },
            {
                title: "בצורה מפורטת",
                options: [{
                    opt: '"המדריך עשה סיכום שיעור לא טוב."',
                    id: 2
                },
                {
                    opt: '"סיכום השיעור היה קצר (3 דקות במקום 10), המדריך לא עבר על התכנים שלימד ולא וידא הבנה."',
                    id: 3
                } ],
                correct: '"סיכום השיעור היה קצר (3 דקות במקום 10), המדריך לא עבר על התכנים שלימד ולא וידא הבנה."',
                checked: ''
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
     ConnectTwo
    },
    methods: {
        checkHowPractice() {
            for (let i = 0; i < this.howQuestion.length; i++) {
                console.log(i)
                for (let j = 0; j < this.howQuestion[i]["options"]; j++) {
                    console.log(j)
                }
            }
        },
        checkWhenPractice(event) {
            let numberOfArray = event.currentTarget.id.slice(-1);

            if (this[`option${numberOfArray}`].correctAnswer === event.currentTarget.value) {
                this[`option${numberOfArray}`].isCorrect = 'src/assets/check.png';
                this.correctCounter++;
                this[`option${numberOfArray}`].disabled = true;
            } else {
                this[`option${numberOfArray}`].isCorrect = 'src/assets/cancel.png';
            }

            if (this.correctCounter === 4) {
                setTimeout(() => {
                    this.changePractice();
                }, 1200)
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
            }
        },
        toPractice() {
            this.showPart = 2; 
            this.showBackButton = false;
        },
        prevPart() {
            this.showPart--;

            if (this.showPart === 0) {
                this.showNextButton = true;
                this.showBackButton = false;
            }
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
        <div class="titleCircle" v-show="showPart !== 2" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 15 + 130}deg`">{{ chapter }}</div>
        <div class="firstPart" v-if="showPart === 0">     
            <div :class="changeAni ? 'explanation float' : 'explanation scale'">
                <div class="basicTitle">הגדרה</div>
                רישום ותיעוד הינו רכיב חשוב במהלך התצפית. <br>
                כלל הדברים שתכתוב ישמשו עבורך בשלב העיבוד. <br><br> 
                שים לב, ההפך מלרשום הוא לשכוח.
                <br> <br>
                במהלך התצפית, נתייחס להכנת השיעור והעברתו - תקף, מהימן, ופרקטי, כולל את כל החומר הנדרש.
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
                <button class="toPractice" type="button" @click="toPractice">לתרגול</button>
            </div>
        </div>
        <div class="thirdPart" v-else>
            <div class="basicTitle">תרגול</div>
            <div class="test-page">
                <div class="everythinCont">
                    <!-- <div class="whatWriting" v-show="practiceCount === 0">
                        <div class="title-practice">
                            מה נרשום? 
                        </div>
                        <div class="connectTwo">
                            <ConnectTwo @change-practice="changePractice" :ques="connectArr"/>
                        </div>
                    </div> -->
                    <div class="whenWriting" v-show="practiceCount === 1">
                        <div class="title-practice">
                            מתי נרשום? 
                        </div>
                        <div class="questionContainer">
                            <div class="questionFilling">
                                בזמנים ״מתים״ - <br> כדי לקלוט כמה שיותר <select id="option1" class="options" @change="checkWhenPractice" v-model="select1" :disabled="option1.disabled"><option v-for="(option, index) in option1.option" :key="index">{{ option }}</option></select>
                                <img v-if="option1.isCorrect !== '' && select1 !== undefined" :src="option1.isCorrect" alt="icon" class="checkIcon"/> ולהספיק לכתוב כל מה שאנחנו צריכים, נכתוב בזמנים מסויימים הנקראים <select @change="checkWhenPractice" v-model="select2" id="option2" class="options" :disabled="option2.disabled"><option v-for="(option, index) in option2.option" :key="index">{{ option }}</option></select><img v-if="option2.isCorrect !== '' && select2 !== undefined" :src="option2.isCorrect" alt="icon" class="checkIcon"/>.
                            </div>
                            <div class="questionFilling">
                                רישום בסמוך להתנסות - <br> על מנת למנוע <select  @change="checkWhenPractice" :disabled="option3.disabled" v-model="select3" id="option3" class="options"><option v-for="(option, index) in option3.option" :key="index">{{ option }}</option></select>
                                <img v-if="option3.isCorrect !== '' && select3 !== undefined" :src="option3.isCorrect" alt="icon" class="checkIcon"/>
                                של פרטים חשובים וקריטיים, ניישם סוג רישום נוסף שלפיו יש לרשום <select :disabled="option4.disabled" class="options"  @change="checkWhenPractice" v-model="select4" id="option4"><option v-for="(option, index) in option4.option" :key="index">{{ option }}</option></select><img v-if="option4.isCorrect !== '' && select4 !== undefined" :src="option4.isCorrect" alt="icon" class="checkIcon"/>.
                            </div>
                        </div>
                    </div>
                    <div class="howWriting" v-show="practiceCount === 2">
                        <div class="title-practice">
                            איך נרשום? 
                        </div>
                        <div class="subtitle-practice">
                            נכון / לא נכון
                        </div>
                        <div>
                            <div v-for="(question, index) in howQuestion" :key="index" class="container-howPractice">
                                <div class="question-howPractice">
                                    {{ question.title }}
                                </div>
                                <div v-for="(options, id) in question.options" :key="id" class="option-howPractice">
                                    <input type="radio" class="radioButton" :name="question" :id="options.id" :value="options.opt">
                                    <label>{{ options.opt }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" v-show="practiceCount === 2" @click="checkHowPractice" class="buttons">{{ messageForButton }}</button>
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
    font-size: 1.2rem;
    width: 15vw;
    border-style: solid;
    border-color: black;
    border-width: 0.2vh;
    border-radius: 2vh;
    padding: 3vh 1.5vw;
    text-align: center;
}

.title {
    font-size: 3.3rem;
    font-weight: 700;
    margin-bottom: 3vh;
    color: #0e6003;
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
    background-color: #6f9cb8;
    text-align: center;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
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
    width: 60rem;
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

.question-howPractice {
    font-size: 1.4rem;
    margin-bottom: 0.5vh;
    font-weight: 600;
}

.option-howPractice {
    font-size: 1.2rem;
    cursor: pointer;
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
   margin-top: 3vh;
   font-size: 3.3rem;
   font-weight: 600;
   color: #00241B;
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
    background-color: #6f9cb8;
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
    background-color: #426991;
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
