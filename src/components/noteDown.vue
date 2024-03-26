<script>
  export default {
    props: ["chapter"],
    data() {
      return {
        showBackButton: false,
        showFirstPart: true,
        whatInfo: {
            question: 'מה נרשום?',
            sideNote: 'תבחרו 6 אפשרויות',
            answers: [{
                option: 'תיאורים',
                correct: true,
                chosen: false
            },
            {
                option: 'ציטוטים',
                correct: true,
                chosen: false
            },
            {
                option: 'שמות',
                correct: true,
                chosen: false
            },
            {
                option: 'זמנים',
                correct: true,
                chosen: false
            },
            {
                option: 'מקומות',
                correct: true,
                chosen: false
            },
            {
                option: 'מידע כמותי',
                correct: true,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            }]
        },
        whenInfo: {
            question: 'מתי נרשום?',
            sideNote: 'תבחרו 2 אפשרויות',
            answers: [{
                option: 'בזמנים ״מתים״',
                correct: true,
                chosen: false
            },
            {
                option: 'רישום סמוך להתנסות',
                correct: true,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            }]
        },
        howInfo: {
            question: 'איך נרשום?',
            sideNote: 'תבחרו 2 אפשרויות',
            answers: [{
                option: 'בצורה אובייקטיבית',
                correct: true,
                chosen: false
            },
            {
                option: 'בצורה מפורטת',
                correct: true,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            },
            {
                option: 'שטות',
                correct: false,
                chosen: false
            }]
        },
        // notePageInfo: [{
        //     question: 'מה נרשום?',
        //     sideNote: 'תבחרו 6 אפשרויות',
        //     answers: [{
        //         option: 'תיאורים',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'ציטוטים',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'שמות',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'זמנים',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'מקומות',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'מידע כמותי',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     }]
        // },
        // {
        //     question: 'מתי נרשום?',
        //     sideNote: 'תבחרו 2 אפשרויות',
        //     answers: [{
        //         option: 'בזמנים ״מתים״',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'רישום סמוך להתנסות',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     }]
        // },
        // {
        //     question: 'איך נרשום?',
        //     sideNote: 'תבחרו 2 אפשרויות',
        //     answers: [{
        //         option: 'בצורה אובייקטיבית',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'בצורה מפורטת',
        //         correct: true,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     },
        //     {
        //         option: 'שטות',
        //         correct: false,
        //         chosen: false
        //     }]
        // }]
      }
    },
    methods: {
        checkAnswers() {
            
        },
        shuffledArr(currentArr) {
            let returnArray = currentArr.answers; // שכפול מערך התשובות הנכונות
            let tmp = currentArr.answers;

            for (let i = 0; i < returnArray.length; i++) {
                let index = Math.floor(Math.random() * tmp.length);
                returnArray[i]= tmp[index];
                tmp = tmp.slice(0, index).concat(tmp.slice(index + 1)); // removes tmp[index]
            }
            return returnArray;
        }
    },
    computed: {
        
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
                דף תצפית ״טוב״<br>
                התייחסות הכנת שיעור והגשתו
                תקף, מהימן ופרקטי - בר הכללה
            </div>
            <button class="buttons" type="button" @click="showFirstPart = false">לדף תצפית</button>
        </div>
        <div class="secondPart" v-else>
            <div class="everythinCont">
                <div class="questionCont">
                    <div class="question">
                        {{ whatInfo.question }}
                    </div>
                    <div class="answers" v-for="(answer, key) in shuffledArr(whatInfo)" :key="key">
                        <input type="checkbox" :id="answer.key" />
                        <label :for="answer.key">{{ answer.option }}</label>
                    </div>
                </div>
                <div class="questionCont">
                    <div class="question">
                        {{ whenInfo.question }}
                    </div>
                    <div class="answers" v-for="(answer, key) in shuffledArr(whenInfo)" :key="key">
                        <input type="checkbox" :id="answer.key" />
                        <label :for="answer.key">{{ answer.option }}</label>
                    </div>
                </div>
                <div class="questionCont">
                    <div class="question">
                        {{ howInfo.question }}
                    </div>
                    <div class="answers" v-for="(answer, key) in shuffledArr(howInfo)" :key="key">
                        <input type="checkbox" :id="answer.key" />
                        <label :for="answer.key">{{ answer.option }}</label>
                    </div>
                </div>
            </div>
            <button type="button" @click="checkAnswers" class="buttons">בדיקה</button>
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

input[type=checkbox] {
  cursor: pointer;
  margin-left: 0.5vw;
  width: 1.5vw;
  height: 1.5vh
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
  font-size: 3rem;
  margin-top: 3vh;
  font-weight: 600;
}

.buttons {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #6f9cb8;
    text-align: center;
    /* margin-bottom: 5vh; */
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
    height: 40vh;
    padding: 8vh 5vw;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.671);
    direction: rtl;
}

</style>
