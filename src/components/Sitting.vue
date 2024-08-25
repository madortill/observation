<script>
  export default {
    props: ["chapter", "colorCode"],
    data() {
      return {
        subjectCounter: 0,
        showBackButton: false,
        correctCounter: 0,
        changeAni: false,
        showNextButton: false,
        subjectsInfo: [
            {
                subSubjectTitle: "שמירה על בטיחות",
                subjectText: `שימו <img src="./icons/heart.png" class='heartIcon' /> כי הינכם צריכים להיות נוכחים במקום שמאפשר לכם לטפל באירועי בטיחות. <br> `
            },
            {
                subSubjectTitle: "התחשבו בנחנך",
                subjectText: `השתדלו להתחשב בבקשות הנחנך בנוגע למיקומנו בשיעור והפעילו שיקול דעת על מנת למנוע משיכת תשומת לב.`
            },
            {
                subSubjectTitle: "רואה ולא נראה",
                subjectText: `המתצפת צריך למקם את עצמו במקום בו רואה את כל הכיתה אך לא מתבלט בה.`
            }
        ],
        sittingArr: [
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 0
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 1
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 2
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 3
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 4
            },
            {
                answer: false,
                showAnswer: '',
                checked: false, 
                id: 5
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 6
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 7
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 8
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 9
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 10
            },
            {
                answer: false,
                showAnswer: '',  
                checked: false,
                id: 11
            },
            {
                answer: true,
                showAnswer: '', 
                checked: false,
                id: 12
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 13
            },
            {
                answer: false,
                showAnswer: '', 
                checked: false,
                id: 14
            },
            {
                answer: true,
                showAnswer: '', 
                checked: false,
                id: 15
            }
        ],
      }
    },
    methods: {
        nextSubject() {
            this.subjectCounter++; 

            if (this.subjectCounter === 1) {
                this.showBackButton = true;
            }
        },
        prevSubject() {
            this.subjectCounter--;

            if (this.subjectCounter === 0) {
                this.showBackButton = false;
            }
        },
        checkSeating(event) {
            for (let i = 0; i < this.sittingArr.length; i++) {
                if (Number(event.currentTarget.id) === this.sittingArr[i]["id"]) {
                    this.sittingArr[i].showAnswer = true;

                    if (this.sittingArr[i]["answer"] === true) {

                        this.correctCounter++;

                        if (this.correctCounter === 2) {
                            setTimeout(() => {
                                this.$emit('backToHomePage', 'בחירת מיקום');
                            }, 2000);
                        }
                    }
                }
            }
        }
    },
    mounted() {
      setTimeout(() => {
        this.showNextButton = true;
      }, 1300);
    }
  }
</script>

<template>
    <div class="placement">
        <div class="titleCircle" v-show="subjectCounter < 3" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 20 + 130}deg`">{{ chapter }}</div>
        <div v-if="subjectCounter < 3" class="firstPart">
            <div :class="changeAni ? 'explanation float' : 'explanation scale'">
                <div class="basicTitle" v-if="subjectCounter < 3">
                    {{ subjectsInfo[subjectCounter]["subSubjectTitle"] }}
                </div>
                <div v-html="subjectsInfo[subjectCounter]['subjectText']"></div>
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
        <div class="secondPart" v-else>
            <div class="instructions">בזמן שיעור תצפית - <br> באיזה 2 מיקומים בכיתה כדאי למתצפת לשבת לצורך קבלת תצפית מיטבית?</div>
            <div class="message" v-show="correctCounter === 2">כל הכבוד! סיימתם את השלב<img src="../assets/muscle.png" class="muscle" /></div>
            <div class="sitting">
                <img src="../assets/seatMain.png" alt="class" class="table2" />
                <div class="board-text">לוח</div>
                <div>
                    <img v-for="(seat, index) in sittingArr" :key="index" :id="seat.id" src="../assets/seat2.png" alt="seats" :class="['seats', !seat.showAnswer ? '' : seat.answer ? 'correctSeating' : 'incorrectSeating']" @click="checkSeating" />
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>
.placement {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    font-family: 'heebo';
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
    top: 17rem;
    right: 25vw;
    z-index: 2;
    cursor: pointer;
 }

.float {
    animation: floatAnimation 3s ease-in-out infinite;
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
    font-size: 2.7rem;
    text-align: center;
    left: 50%;
    z-index: 2;
}

.muscle {
    width: 2.5vw;
    margin-right: 0.5vw;
}

.buttons {
    margin: 1rem;
    border: none;
    cursor: pointer;  
    font-family: 'heebo'; 
    height: 3rem;
    font-size: 1.9rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    width: 11rem;
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

.explanation {
    width: 32vw;
    margin-top: 21rem;
    transform-origin: top right;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 2rem;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    padding: 8.5vh 5vw;
    border-radius: 2rem;
    line-height: 1.5;
}

.instructions {
    width: 32vw;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.5;
}

.explanation ::v-deep .heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
}

.scale {
    animation: scaleScreen 1.25s linear forwards;
}

.firstPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}

.secondPart {
    display: flex;
    height: 85vh;
    align-items: center;
    justify-content: space-between;
    direction: rtl;
}

.sitting {
    transform: scale(0.6);
    display: flex;
    width: 56vw;
    margin-top: 8vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.table2 {
    width: 40vw;
}

.seats {
    height: 19vh;
    cursor: pointer;
    width: 8vw;
    margin: 4vh 3vw 2vh 3vw;
}

.correctSeating {
    -webkit-box-shadow:0px 0px 48px 5px #81e69f;
    -moz-box-shadow: 0px 0px 48px 5px #81e69f;
    box-shadow: 0px 0px 48px 5px #81e69f;
    height: 19vh;
    pointer-events: none;
    width: 8vw;
    margin: 4vh 3vw 2vh 3vw;
}

.incorrectSeating {
    -webkit-box-shadow:0px 0px 48px 5px #e68181;
    -moz-box-shadow: 0px 0px 48px 5px #e68181;
    box-shadow: 0px 0px 48px 5px #e68181;
    height: 19vh;
    pointer-events: none;
    width: 8vw;
    margin: 4vh 3vw 2vh 3vw;
}

.seats:hover {
    transform: scale(1.05);
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

.board-text {
    position: absolute;
    color: rgb(0, 0, 0);
    font-size: 3rem;
    left: 3.7rem;
    top: -1.3rem;
}

</style>
