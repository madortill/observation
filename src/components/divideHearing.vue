<template>
    <div class="hearingContainer">
        <div class="basicTitle">
            {{ chapter }} - {{ subSubjectTitle[subjectCounter] }}
        </div>
        <div v-if="subjectCounter === 0" class="firstPart">
            <div v-if="!continued" class="instructions-cont">
                <div class="instructions">
                    לפניכם משחקון שיתרגל התרחשויות של דברים שקורים בנפרד אך באותו הזמן. <br><br>
                    בחלק הבא יהיה מולכם מטלת כתיבה שעליכם להשלים ב30 שניות. 
                    תוך כדי יופיע כדור שיופיע על המסך באופן רנדומלי. יהיה עליכם ללחוץ על הכדור 3 פעמים כדי לעבור לשלב הבא.
                </div>
                <div class="buttonCont">
                    <button class="buttons" @click="changeText">
                        ממשיכים
                    </button>
                    <button v-show="showBackButton" class="buttons">
                        חוזרים
                    </button>
                </div>
            </div>
            <div v-else class="notes-area">
                <div class="gameInfo">
                    <div class="timer">00:{{ countDown }}</div>
                    <div class="game-points">Score: {{ circleClicked }}</div>
                </div>
                <!-- <div class="paper">
                    <div class="lines">
                        <div class="text" spellcheck="false">
                            משימתכם עכשיו לתאר את החופשה הכי חלומית שלכם על הדף.<br /><br />
                            <div class="text-2" contenteditable spellcheck="false">
                                תערכו את הטקסט כאן...
                            </div>
                        </div>
                    </div>
                    <div class="holes hole-top"></div>
                    <div class="holes hole-middle"></div>
                    <div class="holes hole-bottom"></div>
                </div> -->
                <div id="circle" v-show="circleVisible" @click="disappear" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, { top: `${top}vh`, left: `${left}vw`}]">לחצו עליי</div>
            </div>
        </div>
        <div v-else-if="subjectCounter === 1" class="secondPart">
            <div class="explanation">
                עלייך לשים <img src="../assets/heart.png" class="heartIcon" /> במה אתה בוחר להתמקד ובעת בחירתך מהו הדבר שאתה מפספס. <br> <br>
                לדוגמא - אם הינך מתמקד רק בתגובת החניכים, אתה יכול לפספס את טכניקות המסירה של המדריך.
            </div>
            <div class="buttonCont">
                <button class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons">
                    חוזרים
                </button>
            </div>
        </div>
        <div v-else class="thirdPart">
            <div class="explanation-2">
                שים לב כי בתצפית ישנם ביצועים שעלייך להשקיע קשב מירבי. <br> <br>
                כגון, גילוי מודרך, התנגדויות הלומדים, שאלות החניכים וכו׳.
            </div>
            <div class="buttonCont">
                <button class="buttons" @click="$emit('backToHomePage', 'חלוקת קשב')">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" @click="prevSubject">
                    חוזרים
                </button>
            </div>
        </div>
    </div>
        
 </template>
 
 <script>
 export default {
     props: ["chapter"],
     data() {
        return {
            subSubjectTitle: ["דברים קורים בנפרד", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים"],
            circleVisible: false,
            showBackButton: false,
            changeColor: 0, 
            subjectCounter: 0,
            totalTime: 0,
            countDown: 30,
            circleClicked: 0,
            continued: false,
            top: 0,
            left: 0,
            interval: null,
            timer: null,
            disappearTimer: null
        };        
     },
     methods: {
        changeText() {
            this.continued = true;
            this.countDownTimer()
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
        nextSubject() {
            clearInterval(this.timer);
            this.subjectCounter++;
            if (this.subjectCounter === 2) {
                this.showBackButton = true;
            }
        },
        prevSubject() {
            this.subjectCounter--;
            if (this.subjectCounter === 1) {
                this.showBackButton = false;
            }
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
    }
 }
 </script>
 
 <style scoped>
 .hearingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
 }

 .basicTitle {
   margin-top: 3vh;
   font-size: 4rem;
   font-weight: 600;
 }
 
 @import url(https://fonts.googleapis.com/css?family=Indie+Flower);
 body {
   margin: 0;
   padding: 0;
 }

 .instructions-cont {
    margin-top: 17.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    direction: rtl;
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

 .explanation-2 {
    width: 30vw;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 2rem;
    padding: 8vh 6vw;
    border-radius: 2rem;
    transform: scale(1.15);
    line-height: 1.5;
 }

 .explanation {
    animation: biggerAnimation 1.5s ease-in-out forwards;
 }

 .instructions {
    animation: floatAnimation 3s ease-in-out infinite;
 }

 .instructions, .explanation {
    width: 32vw;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 2rem;
    padding: 8vh 5vw;
    border-radius: 2rem;
    line-height: 1.5;
 }

 .heartIcon {
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

 .paper {
   position: absolute;
   height: 55vh;
   width: 27vw;
   background: rgba(255,255,255,0.9);
   margin: -275px -225px;
   box-shadow: 0px 0px 5px 0px #888;
 }

 .paper::before {
   content: '';
   position: absolute;
   left: 45px;
   height: 100%;
   width: 2px;
   background: rgba(255,0,0,0.4);
 }

 .lines {
   margin-top: 40px;
   height: calc(100% - 40px);
   width: 100%;
   background-image: repeating-linear-gradient(white 0px, white 24px, steelblue 25px);
 }

 .text {
   position: absolute;
   top: 65px;
   left: 55px;
   bottom: 10px;
   right: 10px;
   line-height: 25px;
   font-family: 'Indie Flower';
   overflow: hidden;
   outline: none;
 }
 
 .text-2 {
    position: absolute;
    top: 4.75vh;
    left: 10vw;
    bottom: 10px;
    right: 10px;
    width: 95%;
    color: rgb(134, 134, 134);
    line-height: 25px;
    font-family: 'Indie Flower';
    overflow: hidden;
    outline: none;
 }

 .holes {
   position: absolute;
   left: 10px;
   height: 25px;
   width: 25px;
   background: transparent;
   border-radius: 50%;
   box-shadow: inset 0px 0px 2px 0px #888;
 }
 .hole-top {
   top: 10%;
 }
 .hole-middle {
   top: 50%;
 }
 .hole-bottom {
   bottom: 10%;
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

 .notes-area {
    height: 90vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
 }

 .secondPart ,.thirdPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    direction: rtl;
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
 