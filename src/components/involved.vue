<script>
  export default {
    props: ["chapter", "colorCode"],
    data() {
      return {
        subArr: [
          {
            title: "התערבות עקיפה",
            pics: 'advice.png',
            explain: 'התערבות זו מגיעה ישירות לאחר ביצוע התצפית, עוד <b>לפני </b> שלב המשוב.<br><br> שימושה בעיקר בעת הסבר של פערים מקצועיים קריטיים שהיו בהדרכה.'
          },
          {
            title: "התערבות ישירה",
            pics: 'stop.png',
            explain: 'בהתערבות זו המתצפת חודל את השיעור ומתקן את הנחנך במידת הצורך. <br><br>בהתערבות זו נשתמש רק למקרים של בטיחות או עברה על הפקודות.'
          }
        ],
        practice: [{
          question: 'מפקדת בטירונות מעבירה שיעור נשק לצוות שלה. במהלך השיעור היא מסבירה על מבנה הנשק וחלקיו השונים. לצורך הדגמה מוחשית, המפקדת מחליטה לטעון את הנשק ולכוון אותו לכיוון הלוח כדי לא לסכן את החניכים.',
          correctAnswer: '2',
          explain: ' התערבות ישירה. <br> טעינת הנשק והסטת קנה הן פעולות אסורות בהחלט ומסכנות את חייהם של כל הנוכחים. נתערב מייד כדי לחדול את הסכנה.'
        },
        {
          question: 'במהלך שיעור בקורס טבחים, החיילים קיבלו משימה לבשל מנה בשרית. אחד החיילים מגיע עם רקע עשיר בעולם הבישול. כתוצאה מכך, החליט שהוא מוסיף קצת עניין למנה. החייל הוסיף גבינת פרמז׳ן כתיבול סופי למנה.',
          correctAnswer: '2',
          explain: 'התערבות ישירה. <br> מדובר בהפרת פקודות וחוקי המטבח וכתוצאה מכך, מחללת את כשרותו של המטבח כולו. לכן, נתערב מייד כדי למנוע את המתרחש.'
        },{
          question: 'במהלך שיעור נשק בטירונות, מפקדת הצוות מפרטת על חלקי הנשק השונים. בהסברתה על החלק ״פין פציל״, המפקדת מדגישה כי חלק זה לא קריטי במבנה הנשק לצורך הפעלתו ובמקרה שאינו נמצא הנשק יתופעל כרגיל.',
          correctAnswer: '1',
          explain: 'התערבות עקיפה. <br> המפקדת טעתה בחומר הלימוד, לכן במקום להביך אותה בתיקון מול הכיתה, ניגש אליה מייד לאחר השיעור ונסביר לה את הטעות. היא תתקן את עצמה מול החניכים.'
        },
      ],
        showNextButton: true,
        chosen: '',
        showOtherSubject: false,
        textCounter: 0,
        showBackButton: false,
        onStart: 'start',
        isDisabled: '',
        sideNote: '',
        answered: false,
        questionCounter: 0
      }
    },
    methods: {
      nextSubject() {
        this.textCounter++;

        if (this.textCounter === 2) {
          this.showNextButton = false;
          this.showBackButton = false;
        } else if (this.textCounter === 1) {
          this.showBackButton = true;
        }
      },
      prevSubject() {
        this.textCounter--;

        if (this.textCounter === 0) {
          this.showBackButton = false;
        }
      },
      checkAnswer(key) {

        this.isDisabled = 'disabled';
        this.answered = true;
        
        if (key === Number(this.practice[this.questionCounter]['correctAnswer'])) {
          this.chosen = `true${key}`;
          this.sideNote = 'תשובה נכונה. כל הכבוד!';
        } else {
          this.chosen = `false${key}`;
          this.sideNote = this.practice[this.questionCounter]['explain'];
        }

        setTimeout(() => {
          this.questionCounter++;
          this.chosen = '';
          this.answered = false;

          setTimeout(() => {
            this.isDisabled = 'abled';
          }, 1000);

          if (this.questionCounter === 3) {
            this.$emit('backToHomePage', 'התערבות');
          }
        }, 4000);
      },
      src(name) {
        return new URL(`../assets/${name}`, import.meta.url).href
      }
    },
    mounted() {
      setTimeout(() => {
          this.onStart = 'off';
      }, 100);
    },
  }
</script>

<template>
    <div class="involved">
        <div v-show="textCounter === 0" class="titleCircle" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 15 + 130}deg`">
          {{ chapter }}
        </div>
        <div v-if="textCounter === 0" class="explainCont scale">
          <div class="basicTitle-2">קיימים 2 סוגים:</div>
          <div class="flip-card-container">
            <div v-for="( item, index) in subArr" :key="index" :class="['flip-card', this.onStart]">
                  <div class="flip-card-inner" :style="`--hue: ${(index + 2) * 15 + 130}deg`">
                      <div class="flip-card-front">
                          <img :src="src(item.pics)" class="imgFront">
                      </div>
                      <div class="flip-card-back">
                        <div class="font-card-text">{{ item.title }}</div>
                          <h1 class="textBack" v-html="item.explain"></h1>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div v-else-if="textCounter === 1" class="practiceContainer-instructions">
          לפניכם משחק שימחיש סיטואציות בהן תצטרכו להבחין בין התערבות עקיפה להתערבות ישירה. <br> <br>
          ענו על התשובה המתאימה ביותר לאחר קריאת הסיטואציה.
        </div>
        <div v-else class="practiceContainer">
          <div class="question">
            {{ practice[questionCounter].question }}
          </div>
          <div class="explain" v-show="answered" v-html="sideNote"></div>
          <div class="answerCont">
            <div :class="[chosen == 'true1' ? 'correct' : chosen === 'true2' || chosen === '' || chosen === 'false2' ? 'answers' : 'incorrect', isDisabled]" @click="checkAnswer(1)">התערבות עקיפה</div>
            <div :class="[chosen == 'true2' ? 'correct' : chosen === 'true1' || chosen === '' || chosen === 'false1' ? 'answers' : 'incorrect']" @click="checkAnswer(2)">התערבות ישירה</div>
          </div>
        </div>
        <div class="buttonCont">
                <button v-show="showNextButton" class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" @click="prevSubject">
                    חוזרים
                </button>
            </div>
    </div>
</template>


<style scoped>
.involved {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  direction: rtl;
  overflow: hidden;
}

.disabled {
  pointer-events: none;
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
  top: 9vh;
  right: 19vw;
  z-index: 2;
  cursor: pointer;
 }

.abled {
  pointer-events: all;
}

.explainCont {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  transform-origin: top right;
  background-color: rgba(255, 255, 255, 0.671);
  box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
  padding: 8vh 7vw;
  border-radius: 2rem;
}

.correct {
  background-color: #75d33ed2;
  border-radius: 2vh;
  cursor: pointer;
  box-shadow: 2px 5px 8px 1px rgba(0,0,0,0.5);
  text-align: center;
  padding: 2vh 2vw;
  font-size: 1.25rem;
}

.incorrect {
  background-color: #d33e3ed2;
  border-radius: 2vh;
  cursor: pointer;
  box-shadow: 2px 5px 8px 1px rgba(0,0,0,0.5);
  text-align: center;
  padding: 2vh 2vw;
  font-size: 1.25rem;
}

.basicTitle {
  margin-top: 3vh;
  font-size: 4rem;
  font-weight: 600;
}

.practiceContainer-instructions {
  padding: 6vh;
  color: rgba(234, 234, 234, 0.901); 
  background-image: url('../assets/board.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 38vw;
  font-size: 2.5rem;
  text-align: center;
  justify-content: space-around;
}

.explain {
  text-align: center;
  font-size: 1.3rem;
}

.practiceContainer {
  padding: 6vh;
  color: rgba(234, 234, 234, 0.901); 
  background-image: url('../assets/board.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  justify-content: space-around;
}


.basicTitle-2 {
  font-size: 1.9rem;
  font-weight: 600;
  margin-bottom: 4vh;
}

.question {
  width: 38vw;
  font-size: 2.75rem;
  text-align: center;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.answerCont {
  display: flex;
  width: 45vw;
  color: black;
  height: 6vh;
  flex-direction: row;
  justify-content: space-evenly;
}

.answers {
  background-color: #ffffffd2;
  border-radius: 2vh;
  cursor: pointer;
  box-shadow: 2px 5px 8px 1px rgba(0,0,0,0.5);
  text-align: center;
  padding: 2vh 2vw;
  font-size: 1.25rem;
}

.answers:hover {
  background-color: #ffffffa3;
}

.flip-card-container {
  display: flex;  
  justify-content: center;
  align-items: center;
}

.flip-card {
  background-color: transparent;
  width: 200px;
  height: 525px;
  perspective: 1000px;
  flex: 0 0 calc(50% - 20px);
  margin: 0px 150px 0px;
  box-sizing: border-box;
}

.font-card-text {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3vh;
  color: black;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

.textBack {
  font-size: 2rem;
  padding: 0.5vh;
}

.flip-card:hover .flip-card-front, .flip-card.start .flip-card-front{
  transform: rotateY(180deg);
}

.flip-card:hover .flip-card-back, .flip-card.start .flip-card-back {
  transform: rotateY(360deg)
}

.flip-card-front,
.flip-card-back {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #f0a06a;
  background-color: hsl(var(--hue), 50%, 58%);
  border-radius: 30px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.flip-card-back {
  background-color: #f5c381;
  background-color: hsl(var(--hue), 50%, 78%);
  border-radius: 30px;
  color: rgb(84, 82, 82);
  transform: rotateY(180deg);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imgFront {
  width: 60%;
}

.scale {
  animation: scaleScreen 1.25s linear forwards;
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
