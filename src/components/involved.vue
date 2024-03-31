<script>
  export default {
    props: ["chapter"],
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
          question: 'שאלה שאלתית עם סיטואציה עגכעגכ ע סופר מסובכת',
          correctAnswer: '1'
        },
        {
          question: 'שאלה שאלתית עם סיטואצכע גכעיה סופר מסובכת',
          correctAnswer: '1'
        },{
          question: 'שאלה שאלתית עם סיטואציה עגכ גכ עסופר מסובכת',
          correctAnswer: '1'
        },
      ],
        showNextButton: true,
        chosen: '',
        showOtherSubject: false,
        textCounter: 0,
        showBackButton: false,
        onStart: 'start',
        isDisabled: '',
        questionCounter: 0
      }
    },
    methods: {
      nextSubject() {
        this.textCounter++;

        if(this.textCounter === 1) {
          this.showNextButton = false;
        }
      },
      checkAnswer(key) {

        this.isDisabled = 'disabled';

        if (key === Number(this.practice[this.questionCounter]['correctAnswer'])) {
          this.chosen = `true${key}`;
        } else {
          this.chosen = `false${key}`;
        }

        setTimeout(() => {
          this.questionCounter++;
          this.isDisabled = 'abled';
          this.chosen = '';

          if (this.questionCounter === 3) {
            this.$emit('backToHomePage', 'התערבות');
          }
        }, 1300);
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
        <div class="basicTitle">
          {{ chapter }}
        </div>
        <div v-if="textCounter === 0" class="explainCont">
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
        <div v-else class="practiceContainer">
          <div class="question">
            {{ practice[questionCounter].question }}
          </div>
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
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
  overflow: hidden;
}

.disabled {
  pointer-events: none;
}

.abled {
  pointer-events: all;
}

.explainCont {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.practiceContainer {
  border-color: #da9146;
  color: rgba(234, 234, 234, 0.901);
  background-color: #31432d;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 2vh;
  align-items: center;
  height: 60vh;
  justify-content: space-around;
}

.basicTitle-2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 4vh;
}

.question {
  width: 38vw;
  font-size: 2rem;
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
  width: 350px;
  height: 700px;
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
  font-size: 2.25rem;
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

@keyframes pickSubject {
  0% {
    box-shadow: 0px 0px 25px 20px #fff
  }
  50% {
    box-shadow: 0px 0px 25px 0px #fff;
  }
   100% {
    box-shadow: 0px 0px 25px 20px #fff;
   }
}

@-webkit-keyframes pickSubject {
  0% {
    box-shadow: 0px 0px 25px 20px #fff;
  }
  50% {
    box-shadow: 0px 0px 25px 0px #fff;
  }
   100% {
    box-shadow: 0px 0px 25px 20px #fff;
   }
} 
</style>
