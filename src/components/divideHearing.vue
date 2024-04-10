<template>
    <div class="hearingContainer">
        <div class="titleCircle" v-show="subjectCounter !== 2" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 15 + 130}deg`">{{ chapter }}</div>
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
                <div class="timer">00:{{ countDown }}</div>
                <div class="game-points">Score: {{ circleClicked }}</div>
            </div>
            <div id="circle" v-show="circleVisible" @click="disappear" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, { top: `${top}vh`, left: `${left}vw`}]">לחצו עליי</div>
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


 <script>
 export default {
     props: ["chapter", "colorCode"],
     data() {
        return {
            subSubjectTitle: ["דברים קורים בנפרד", "הוראות", "תרגול", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים"],
            subSubjectText: ["בכתיבה בדף התצפית, <br> נקפיד להפריד בין עיקר ותפל, <br> בין ביצועים מורכבים לפשוטים ובין דבר המפקד לחניכים.", "לפניכם משחק שיעזור לכם לתרגל ליקויי חלוקת קשב. <br> עליכם לבחור בליקויים בלבד. <br><br> שימו לב, המשחק מוגבל בזמן. <br>  על כל מענה לא נכון, ירדו לכם נקודות מהניקוד הכולל.", "", 'עלייך לשים <img src="src/assets/heart.png" class="heartIcon" /> במה אתה בוחר להתמקד ובעת בחירתך מהו הדבר שאתה מפספס. <br> <br> לדוגמא - אם הינך מתמקד רק בתגובת החניכים, אתה יכול לפספס את טכניקות המסירה של המדריך.', 'שים <img src="src/assets/heart.png" class="heartIcon" /> כי בתצפית ישנם ביצועים שעלייך להשקיע קשב מירבי. <br> <br> כגון, גילוי מודרך, התנגדויות הלומדים, שאלות החניכים וכו׳.'],
            circleVisible: false,
            showBackButton: false,
            showNextButton: false,
            changeColor: 0, 
            subjectCounter: 0,
            totalTime: 0,
            changeAni: false,
            countDown: 30,
            circleClicked: 0,
            top: 0,
            left: 0,
            timer: null,
            disappearTimer: null
        };        
    },
    methods: {
         nextSubject() {
             this.subjectCounter++;

            if (this.subjectCounter === 2) {
                this.showBackButton = false;
                this.showNextButton = false;

                this.countDownTimer();

            } else if (this.subjectCounter === 1) {
                this.showBackButton = true;
            } else if (this.subjectCounter === 3) {
                this.showNextButton = true;
                this.showBackButton = false;
            } else if (this.subjectCounter === 4) {
                this.showBackButton = true;
            } else if (this.subjectCounter === 5) {
                this.$emit('backToHomePage', 'חלוקת קשב');
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
        appeared() {
            this.top = Math.floor(Math.random() * (70 - 2) + 2);
            this.left = Math.floor(Math.random() * (70 - 2) + 2);

            this.changeColor+= 3;
            this.circleVisible = true;

            this.disappearTimer = setTimeout(this.disappear, 3000);
        },
        disappear(event) {
            let randomTime = Math.random() * (7 - 1) + 1;
            this.totalTime = randomTime * 1000;

            if (event !== undefined) {
                this.circleClicked++;

                if (this.circleClicked === 3) {
                    setTimeout(this.nextSubject, 1000);
                }
            }

            clearTimeout(this.disappearTimer);
            this.disappearTimer = null;
            this.circleVisible = false;

            setTimeout(this.appeared, this.totalTime);
        },
        countDownTimer () {
            if (this.countDown == 0o0) {
                this.nextSubject();
            } else if (this.countDown > 0) {
                this.timer = setTimeout(() => {
                    this.countDown -= 1
                    if (this.countDown < 10) {
                        this.countDown = `0${this.countDown}`;
                    }
                    this.countDownTimer()
                }, 1000)
            }
        }
    },
    mounted() {
        setTimeout(this.appeared, 2000);
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
 }

 .gameCont {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
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
    font-size: 2rem;
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

#circle {
    width: 5.75rem;
    height: 6rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.5rem;
    font-weight: 550;
    padding: 3.5%;
    color: white;
    z-index: 2;
    display: block;
    position: absolute;
    cursor: pointer;
    box-shadow: 0 5px 7px #0003;
    animation: animationColors 2s ease-in-out;
    animation-iteration-count: infinite;
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
 
@keyframes animationColors {
    0% {
        background-color: hsl(var(--hue),50%,75%);
    } 
    50% {
        background-color: hsl(var(--hue),40%,40%);
    }
    100% {
        background-color: hsl(var(--hue),50%,75%);
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
 