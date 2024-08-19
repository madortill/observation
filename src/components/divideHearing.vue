<template>
    <div class="hearingContainer">
        <!-- <div class="titleCircle" v-show="subjectCounter !== 2 && subjectCounter !== 5" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 20 + 130}deg`">{{ chapter }}</div>
        <div v-if="subjectCounter !== 2" class="textPart">
            <div :class="[changeAni ? 'float': 'scale', subjectCounter < 2 ? 'instructions' : 'explanation']">
                <div class="basicTitle">
                        {{ subSubjectTitle[subjectCounter] }}
                </div>
                <div v-html="subSubjectText[subjectCounter]"></div> 
            </div>
        </div>
        <div class="gameCont" v-else>
            <div class="basicTitle-2">
                {{ subSubjectTitle[subjectCounter] }}
            </div>
            <div class="gameInfo">
                <div class="timer" :style="warning ? 'color: red' : 'color: black'">00:{{ countDown }}</div>
                <div class="rounds">Round: {{ rounds }}</div>
                <div class="game-points">Score: {{ score }}</div>
            </div>
            <div class="circleCont">
                <CircleGame @setInScore="setInScore" @callingTimer="callingTimer" />
            </div>
        </div>
        <div class="message" v-show="showEndMessage"><div v-if="showEndingGame">התוצאה הסופית שלכם היא: {{ score }} <br><br></div> {{ endMessage }}<img src="../assets/muscle.png" class="muscle" v-show="this.score > 1200" /></div>
       -->
      
        <div class="buttonCont">
            <button v-show="showNextButton" class="buttons" @click="gilisMethod">
                ממשיכים
            </button>
            <!-- <button v-show="showBackButton" class="buttons" @click="prevSubject">
                חוזרים
            </button> -->
        </div>
    </div>
</template>


 <script>
 import CircleGame from './circleGame.vue';

 export default {
     props: ["chapter", "colorCode"],
     data() {
        return {
            subSubjectTitle: ["דברים קורים בנפרד", "הוראות", "תרגול", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים", "ביצועים מורכבים / פשוטים"],
            subSubjectText: ["בכתיבה בדף התצפית, <br> הקפידו להפריד בין עיקר ותפל, <br> בין ביצועים מורכבים לפשוטים ובין דבר המפקד לחניכים.", "לפניכם משחק שיעזור לכם לתרגל חלוקת קשב נכונה. <br> יופיעו סיטואציות מגוונות שמתחלפות כל 12 שניות.<br> כדי להצליח בתרגול עליכם לבחור במיקודים הנכונים ביותר של חלוקת קשב.<br><br> שימו לב, המשחק מוגבל בזמן. <br> על כל מענה שגוי, ירדו לכם נקודות מהציון הכולל. על מנת להצליח עליכם לזכות בלפחות 1200 נקודות.", "", 'עליכם לשים <img src="../assets/heart.png" class="heartIcon" /> במה אתם בוחרים להתמקד ובעת בחירתכם מהו הדבר שאתם מפספסים. <br> <br> לדוגמא - אם הינכם מתמקדים רק בתגובת החניכים, אתם יכולים לפספס את טכניקות המסירה של המדריך.', 'שימו <img src="../assets/heart.png" class="heartIcon" /> כי בתצפית ישנם ביצועים שעליכם להשקיע קשב מירבי. <br> <br> כגון: גילוי מודרך, התנגדויות הלומדים, שאלות החניכים וכו׳.', 'שימו <img src="../assets/heart.png" class="heartIcon" /> כי בתצפית ישנם ביצועים שעליכם להשקיע קשב מירבי. <br> <br> כגון: גילוי מודרך, התנגדויות הלומדים, שאלות החניכים וכו׳.'],
            warning: false,
            // showBackButton: false,
            // showNextButton: false,
            showBackButton: true,
            showNextButton: true,
            subjectCounter: 0,
            showEndMessage: false,
            endMessage: '',
            totalTime: 0,
            rounds: 0,
            changeAni: false,
            countDown: 0,
            score: 0,
            showEndingGame: true,
            timer: null,
            disappearTimer: null
        };        
    },
    components: {
        CircleGame
    },
    methods: {
         nextSubject() {
             this.subjectCounter++;
             console.log(this.subjectCounter);

             console.log(this.subjectCounter)
            if (this.subjectCounter === 2) {
                this.showBackButton = false;
                this.showNextButton = false;
            } else if (this.subjectCounter === 1) {
                this.showBackButton = true;
            } else if (this.subjectCounter === 3) {
                this.showNextButton = true;
                this.showBackButton = false;
            } else if (this.subjectCounter === 4) {
                this.showBackButton = true;
            } else if (this.subjectCounter === 5) {
                debugger
                this.showEndMessage = true;
                this.showEndingGame = false;
                this.showNextButton = false;
                this.showBackButton = false;
                this.score = 1500;
                this.endMessage = "כל הכבוד! סיימתם את השלב";
                debugger

                setTimeout(() => {
                    this.showEndMessage = false;
                    this.$emit('backToHomePage', 'חלוקת קשב');
                }, 1000)
            }
         },
        prevSubject() {
            this.subjectCounter--;

            if (this.subjectCounter === 0) {
                    this.showBackButton = false;
            } else if (this.subjectCounter === 3) {
                this.showBackButton = false;
            }
        },
        callingTimer(timer, counter) {
            if (counter !== 5) {
                this.rounds = counter + 1;
                this.countDown = timer;
                clearTimeout(this.timer);
                this.countDownTimer();
            } else {
                this.endingGame();
            }
        },
        countDownTimer() {
            if (this.countDown > 0) {
                this.timer = setTimeout(() => {
                    this.countDown -= 1
                    if (this.countDown < 10) {
                        this.countDown = `0${this.countDown}`;
                        if (this.countDown < 5) {
                            if (this.countDown % 2 === 0) {
                                this.warning = true;
                            } else {
                                this.warning = false;
                            }
                        }
                    }
                    this.countDownTimer();
                }, 1000)
            }
        },
        setInScore(correctClick) {            
            if (correctClick) {
                this.score += 250;
            } else {
                this.score -= 100;
            }
        },
        endingGame() {
            this.showEndMessage = true;
            if (this.score < 1200) {
                this.endMessage = 'כל הכבוד על ניסיון';
            } else {
                this.endMessage = 'כל הכבוד! הצלחתם בגדול!';
            }
            setTimeout(() => {
                this.showEndMessage = false;
                this.nextSubject();
            }, 2500)
        },
        gilisMethod() {
            this.$emit('backToHomePage', 'חלוקת קשב');
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
 
 <style scoped>
 .hearingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    font-family: 'heebo';
 }

 .muscle {
    width: 2.5vw;
    margin-right: 0.5vw;
 }

 .message {
    width: 23vw;
    height: contain;
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

 .gameCont {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
 }

 .circleCont {
    margin-top: 30vh;
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

 .basicTitle {
    padding-bottom: 3vh;
   font-size: 3.3rem;
   font-weight: 600;
 }

 .basicTitle-2 {
    margin-top: 3vh;
   font-size: 3.3rem;
   font-weight: 600;
 }
 
 @import url(https://fonts.googleapis.com/css?family=Indie+Flower);
 body {
   margin: 0;
   padding: 0;
 }

.gameInfo {
    display: flex;
    height: 10vh;
    flex-direction: row;
    position: absolute;
    font-size: 3rem;
    bottom: 80vh; 
    width: 100vw;
    align-items: center;
    justify-content: space-around;
}

.explanation {
    animation: biggerAnimation 1.5s ease-in-out forwards;
}

.float {
    animation: floatAnimation 3s ease-in-out infinite;
}

.scale {
    animation: scaleScreen 1.25s linear forwards;
}
 
.instructions {
    transform-origin: top right;
}

.instructions, .explanation {
    width: 32vw;
    margin-top: 24vh;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 1.5rem;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    padding: 8.5vh 5vw;
    border-radius: 2rem;
    line-height: 1.5;
}

.explanation ::v-deep .heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
}

.buttons {
    border: none;
    cursor: pointer;   
    height: 6vh;
    /* left: 10%; */
    /* bottom: 30%; */
    font-size: 1.9rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    /* min-width: 12%; */
    width: 11vw;
}

.buttons:hover,
.buttons:focus {
	animation: borderPulse 4000ms infinite ease-out,  hoverShine 200ms;
}

@keyframes borderPulse {
  0% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  }
  35% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255,255,255,0);
  }
  50% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  } 
  75% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255,255,255,0);
  }
  100% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  }
}

@keyframes hoverShine {
	0%{
		background-image: linear-gradient(135deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);
	}
	50%{
		background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.4) 50%, rgba(255,255,255,0) 100%);
	}
	100%{
		background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,.4) 100%);
	}
}

.buttonCont {
    width: 85vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
}

.textPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
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

@-moz-keyframes biggerAnimation {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.15);
    }
}

   @keyframes biggerAnimation {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.15);
    }
}
 </style>
 