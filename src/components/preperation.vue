<template>
    <div class="prepare">
        <div class="prepareTitle">
            {{ chapter }}
        </div>
        <div>
            <div class="prevText">
                <br>
                טרם תחילת התצפית, עלייך להערך מראש על מנת שתוכל לאסוף את הנתונים בצורה מדויקת וברורה.
                <br><br>
                <div v-for="(item, index) in preperationTitleList" :key="index" v-show="index <= lineText" :class="index === lineText ? 'typed' : 'stopTyped' " class="checkList typewriter"><img src="../assets/check-mark.png" class="check"/><b>{{item}} -</b> {{ preperationItemList[index] }}</div><br>
                <br>
                <div><img src="../assets/pin.png" alt="pin" class="pin" />זכור - הכנה עצמית תקבע את אופן המוכנות שלך לביצוע תצפית.</div>
            </div>
        </div>
        <!-- <div v-else class="flexCont">
            <div :class="startAnimation ? 'storyTextCont introAni': 'storyTextCont'"><div class="storyText">הנך ניגש לתצפית. מה תביא?</div></div>
            <div class="instructions">
                תגררו את הכלים המתאימים להכנה עצמית לביצוע תצפית.
            </div>
    
            <div id="draggable-container" @dragstart="onDragging" @dragover="allowDrop" @drop="(e) => {
                e.preventDefault();
                drop(e);
            }"> 
                <div v-for="(item, index) in this.shuffledArr" :key="index" class="dragItem" :draggable="item.setDraggable" @dragstart="drag" :id="'listItem' + index">
                    {{item.optionName}} 
                    <img v-show="item.chosenOption" :src="`src/assets/${item.correct}.png`" class="checkIcon" />
                </div>
            </div>
            
            <div class="box-droppable"  @drop="(e) => {
                e.preventDefault();
                drop(e);
                checkDrop(e)
            }" @dragover="allowDrop" id='dragArea' @dragstart="onDragging" >
            </div>
        </div> -->
        <div class="buttonCont">
            <button v-show="showNextButton || correctCounter === 4" class="buttons" @click="nextText">
                ממשיכים
            </button>
            <button v-show="showBackButton" class="buttons" @click="prevText">
                חוזרים
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: ["chapter"],
    data() {
        return {
            // textCounter: 0,
            showNextButton: true,
        //     dropOptionArray: [{
        //         optionName: "תיאום זמן ומקום",
        //         correct: "check",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "הכנת אמצעים",
        //         correct: "check",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "איסוף רקע ומידע חסר",
        //         correct: "check",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "חזרה על קרטריונים",
        //         correct: "check",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "כללים לתדריך במהלך התצפית",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "אוכל",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "קפה",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "תופעות למשוב",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "כללים להתמודדויות עם התנגדויות",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        //     {
        //         optionName: "הכנת ציון מראש",
        //         correct: "cancel",
        //         chosenOption: false,
        //         setDraggable: true
        //     },
        // ], 
        lineText : 0,
        preperationItemList: ["שבו קורת התצפית", "דף תצפית, עט, כל פריט נוסף שנדרש.", "כדי להגיע מוכנים להגיע ברמה הגבוהה ביותר.", "לחזור על קריטריונים של דף התצפית."],
        preperationTitleList: ["תיאום הזמן והמקום", "הכנת אמצעים", "איסוף רקע ומידע חסר", "חזרה על קריטריונים"],
        correctCounter: 0,
        showBackButton: false,
        // startAnimation: false
    };        
    },
    mounted() {
        // this.initialize();
        this.textAni();
    },
    methods: {
        // initialize() {
        //     setTimeout(() => {
        //         this.startAnimation = true;
        //     }, 1000);
        // },
        textAni() {
            setInterval(() => {
                if (this.lineText < 4) {
                    this.lineText++;
                    
                }
            }, 3700);
        },
        // onDragging(ev){
        //     ev.dataTransfer.setData("text",ev.target.textContent.slice(0, -1));
        //     ev.dataTransfer.setData("id",ev.target.id);
        
        // },
        // allowDrop(ev) {
        //     ev.preventDefault();
        // },
        // drag(ev) {
        //     ev.dataTransfer.setData("text",ev.target.textContent.slice(0, -1));
        //     ev.dataTransfer.setData("id",ev.target.id);
        // },
        // drop(ev) {
        //     ev.preventDefault();
        //     const data = ev.dataTransfer.getData("id");
        //     ev.currentTarget.appendChild(document.getElementById(data));
        // },
        // checkDrop(ev) {
        //     const dragtext = ev.dataTransfer.getData("text");
        //     const ID = ev.dataTransfer.getData("id");

        //     for (let i = 0; i < this.dropOptionArray.length; i++) {
        //         if (dragtext === this.dropOptionArray[i]["optionName"]) {

        //             if (this.dropOptionArray[i]["correct"] === "check") {
        //                 this.dropOptionArray[i]["chosenOption"] = true;
        //                 this.dropOptionArray[i]["setDraggable"] = false;
        //                 this.correctCounter++;
        //                 break;
        //             } else {
        //                 this.dropOptionArray[i]["chosenOption"] = true;
        //                 setTimeout(() => {
        //                     this.dropOptionArray[i]["chosenOption"] = false; 
        //                     this.$el.querySelector("#draggable-container").appendChild(this.$el.querySelector(`#${ID}`))
        //                 }, 1200)
        //             }
        //         }
        //     }
        // },
        nextText() {
            // this.textCounter++;

            // if (this.textCounter === 1) {
            //     this.showBackButton = true;
            // } else if (this.textCounter === 2) {
            //     this.showNextButton = false;
            //     this.showBackButton = false;
            // }

            // if (this.textCounter === 1) {
                this.$emit('changeCurrentScreen');
            // }

            // if (this.correctCounter === 1) {
            //     this.$emit('changeCurrentScreen');
            // }
        },
        // prevText() {
        //     this.textCounter--;

        //     if (this.textCounter === 0) {
        //         this.showBackButton = false;
        //     }
        // }
    },
    // computed: {
    //     shuffledArr() {
    //         let returnArray = this.dropOptionArray.slice(); // שכפול מערך התשובות הנכונות
    //         let tmp = this.dropOptionArray.slice();
    //         for (let i = 0; i < returnArray.length; i++) {
    //             let index = Math.floor(Math.random() * tmp.length);
    //             returnArray[i]= tmp[index];
    //             tmp = tmp.slice(0, index).concat(tmp.slice(index + 1)); // removes tmp[index]
    //         }
    //         return returnArray;
    //     }
    // }
}
</script>

<style scoped>
.prepare {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
}

.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /*  Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  direction: rtl;
  margin: 0 auto;
  letter-spacing: .05em; 
  /* animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite; */
} 

.typed {
    border-left: .1em solid black;
    animation: 
    typing 4.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

.stopTyped {
    border-left: .1em solid transparent;
    /* animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite; */
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black; }
}

.pin {
    width: 1.7vw;
    margin-left: 0.5vw;
}

.check {
    width: 2vw;
}

p {
    margin: 0;
}

.subTitle {
    font-weight: 800;
}

.textt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    direction: rtl;
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

.buttons-continue {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #6f9cb8;
    text-align: center;
    position: relative;
    bottom : 20vh;
    right: 80.7vw;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
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

.buttons:hover, .buttons-continue:hover {
    background-color: #426991;
}

/* .storyTextCont {
    position: fixed; 
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    border-style: none;
    color: white;
    width: 100vw;
    height: 110vh;
    transform: scale(1.45);
    top: 0vh;
    right: 0vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.storyText {
    margin-bottom: 14vh;
    font-weight: 600;
    font-size: 5rem;
} */

.prepareTitle {
    margin-top: 3vh;
    font-size: 4rem;
    font-weight: 600;
}

.prevText {
    width: 43vw;
    text-align: center;
    display: flex;
    background-color: rgba(255, 255, 255, 0.671);
    /* height: 40vh; */
    font-size: 2rem;
    padding: 1vw;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    border-radius: 2rem;
    line-height: 1.5;
    animation: floatAnimation 3s ease-in-out infinite;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.flexCont {
    display: flex;
    width: 100vw;
    height: 90vh;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10vh;
}

/* #draggable-container {
    width: 38vw;
    padding: 3vw 2vw 4vh 0;
    margin-right: 15vw;
    height: 40vh;
    /* border-style: solid;
    border-width: 2vh;
    border-color: #da9146;
    color: rgba(234, 234, 234, 0.901); */
    /* background-color: #31432d; 
    background-image: url('../assets/board.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: stretch;
}

.box-droppable {
    border-style: solid;
    width: 35vw;
    height: 20vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: rgba(56, 55, 55, 0.645);
    margin: 0vh 10vw;
}

.dragItem {
    margin-bottom: 4vh;
    font-size: 1.4rem;
    cursor: grab;
    color: rgba(255, 255, 255, 0.821);
    padding-right: 1.5vw;
}

.dragItem:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}

.instructions {
    font-size: 2rem;
    width: 17vw;
    padding: 0vh 10vw;
}

.checkIcon {
    width: 1vw;
} */

.introAni {
    animation: introText 2.25s 0.75s ease-in forwards;
}

@keyframes introText {
    0% {
        transform: scale(1.45);
    }
    25% {
        transform: scale(1.75);
    }
    40% {
        transform: scale(1.75);
    }
    100% {
        transform: scale(0);
    }
}

</style>

