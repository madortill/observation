<script>
  export default {
    props: ["chapter", "colorCode"],
    data() {
      return {
        subjectCounter: 0,
        showBackButton: false,
        correctCounter: 0,
        subjectsInfo: [
            {
                subSubjectTitle: "הוראות בטיחות",
                subjectText: ` לשים <img src="src/assets/heart.png" class='heartIcon' /> כי הינך צריך להיות נוכח במקום שמאפשר לך לטפל באירועי בטיחות. <br> <br> 
                כגון: תצפית על חניך שטווח בנשק.`
            },
            {
                subSubjectTitle: "מאפיינים אישיים של המדריך",
                subjectText: `נשתדל להתחשב בבקשות המדריך בנוגע למיקומנו בשיעור ונפעיל שיקול דעת כדי למנוע משיכת תשומת לב.`
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
                id: 0
            },
            {
                answer: false,
                showAnswer: '', 
                id: 1
            },
            {
                answer: false,
                showAnswer: '', 
                id: 2
            },
            {
                answer: false,
                showAnswer: '', 
                id: 3
            },
            {
                answer: false,
                showAnswer: '', 
                id: 4
            },
            {
                answer: false,
                showAnswer: '', 
                id: 5
            },
            {
                answer: false,
                showAnswer: '', 
                id: 6
            },
            {
                answer: false,
                showAnswer: '', 
                id: 7
            },
            {
                answer: false,
                showAnswer: '', 
                id: 8
            },
            {
                answer: false,
                showAnswer: '', 
                id: 9
            },
            {
                answer: false,
                showAnswer: '', 
                id: 10
            },
            {
                answer: false,
                showAnswer: '',  
                id: 11
            },
            {
                answer: true,
                showAnswer: '', 
                id: 12
            },
            {
                answer: false,
                showAnswer: '', 
                id: 13
            },
            {
                answer: false,
                showAnswer: '', 
                id: 14
            },
            {
                answer: true,
                showAnswer: '', 
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
    }
  }
</script>

<template>
    <div class="placement">
        <div class="titleCircle" v-show="subjectCounter < 3" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 15 + 130}deg`">{{ chapter }}</div>
        <div v-if="subjectCounter < 3" class="firstPart">
            <div class="explanation scale">
                <div class="basicTitle" v-if="subjectCounter < 3">
                    {{ subjectsInfo[subjectCounter]["subSubjectTitle"] }}
                </div>
                <div v-html="subjectsInfo[subjectCounter]['subjectText']"></div>
            </div>
            <div class="buttonCont">
                <button class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" @click="prevSubject">
                    חוזרים
                </button>
            </div>
        </div>
        <div class="secondPart" v-else>
            <div class="instructions">בזמן שיעור תצפית - <br> באיזה 2 מיקומים בכיתה כדאי למתצפת לשבת לצורך קבלת תצפית מיטבית?</div>
            <div class="message" v-show="correctCounter === 2">כל הכבוד!<img src="../assets/muscle.png" class="muscle" /></div>
            <div class="sitting">
                <img src="../assets/table2.png" alt="class" class="table2" />
                <div>
                    <img v-for="(seat, index) in sittingArr" :key="index" :id="seat.id" src="../assets/table.png" alt="seats" :class="['seats', !seat.showAnswer ? '' : seat.answer ? 'correct' : 'incorrect']" @click="checkSeating" />
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
}

.basicTitle {
   padding-bottom: 3vh;
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

.explanation {
    width: 32vw;
    margin-top: 24vh;
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
    font-size: 2rem;
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
    width: 61vw;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.table2 {
    width: 40vw;
}

.seats {
    height: 18vh;
    cursor: pointer;
    width: 9vw;
    margin: 4vh 3vw 2vh 3vw;
}

.correct {
    -webkit-box-shadow:0px 0px 48px 5px rgba(46,255,70,0.9);
    -moz-box-shadow: 0px 0px 48px 5px rgba(46,255,70,0.9);
    box-shadow: 0px 0px 48px 5px rgba(46,255,70,0.9);
    height: 18vh;
    cursor: pointer;
    width: 9vw;
    margin: 4vh 3vw 2vh 3vw;
}

.incorrect {
    -webkit-box-shadow:0px 0px 48px 5px rgba(255,46,46,0.6);
    -moz-box-shadow: 0px 0px 48px 5px rgba(255,46,46,0.6);
    box-shadow: 0px 0px 48px 5px rgba(255,46,46,0.6);
    height: 18vh;
    cursor: pointer;
    width: 9vw;
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

</style>
