<template>
    <div class="prepare" id="prepare">
        <div class="prepareTitle">
            {{ chapter }}
        </div>
        <div>
            <div class="textt" v-show="this.textContent === 0">
                <div class="prevText">
                    <div>
                        <br>
                        טרם תחילת התצפית, עלייך להערך מראש על מנת שתוכל לאסוף את הנתונים בצורה מדויקת וברורה.
                    </div>
                    <br><br>
                    <div>
                        זכור - הכנה עצמית תקבע את אופן ההכנה שלך לביצוע תצפית.
                    </div>
                </div>
                <div class="buttonCont">
                    <button class="buttons" @click="changeText">
                        ממשיכים
                    </button>
                    <button v-if="showBackButton" class="buttons">
                        חוזרים
                    </button>
                </div>
            </div>
            <div v-show="this.textContent === 1" class="flexCont">
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
            </div>
            
            <button v-show="this.correctCounter === 4" class="buttons-continue" @click="$emit('changeCurrentScreen')">
                ממשיכים
            </button>
        </div>
    </div>
</template>

<script>

export default {
    el: '#prepare',
    props: ["chapter"],
    data() {
        return {
            dropOptionArray: [{
                optionName: "תיאום זמן ומקום",
                correct: "check",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "הכנת אמצעים",
                correct: "check",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "איסוף רקע ומידע חסר",
                correct: "check",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "חזרה על קרטריונים",
                correct: "check",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "כללים לתדריך במהלך התצפית",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "אוכל",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "קפה",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "תופעות למשוב",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "כללים להתמודדויות עם התנגדויות",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
            {
                optionName: "הכנת ציון מראש",
                correct: "cancel",
                chosenOption: false,
                setDraggable: true
            },
        ], 
        correctCounter: 0,
        textContent: 0,
        showBackButton: false,
        startAnimation: false
        };        
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize() {
            setTimeout(() => {
                this.startAnimation = true;
            }, 1000);
        },
        onDragging(ev){
            ev.dataTransfer.setData("text",ev.target.textContent.slice(0, -1));
            ev.dataTransfer.setData("id",ev.target.id);
        
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        drag(ev) {
            ev.dataTransfer.setData("text",ev.target.textContent.slice(0, -1));
            ev.dataTransfer.setData("id",ev.target.id);
        },
        drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("id");
            ev.currentTarget.appendChild(document.getElementById(data));
        },
        checkDrop(ev) {
            const dragtext = ev.dataTransfer.getData("text");
            const ID = ev.dataTransfer.getData("id");

            for (let i = 0; i < this.dropOptionArray.length; i++) {
                if (dragtext === this.dropOptionArray[i]["optionName"]) {

                    if (this.dropOptionArray[i]["correct"] === "check") {
                        this.dropOptionArray[i]["chosenOption"] = true;
                        this.dropOptionArray[i]["setDraggable"] = false;
                        this.correctCounter++;
                        break;
                    } else {
                        this.dropOptionArray[i]["chosenOption"] = true;
                        setTimeout(() => {
                            this.dropOptionArray[i]["chosenOption"] = false; 
                            this.$el.querySelector("#draggable-container").appendChild(this.$el.querySelector(`#${ID}`))
                        }, 1200)
                    }
                }
            }
        },
        changeText() {
            this.textContent++;
        }
    },
    computed: {
        shuffledArr() {
            let returnArray = this.dropOptionArray.slice(); // שכפול מערך התשובות הנכונות
            let tmp = this.dropOptionArray.slice();
            for (let i = 0; i < returnArray.length; i++) {
                let index = Math.floor(Math.random() * tmp.length);
                returnArray[i]= tmp[index];
                tmp = tmp.slice(0, index).concat(tmp.slice(index + 1)); // removes tmp[index]
            }
            return returnArray;
        }
    }
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

.storyTextCont {
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
}

.prepareTitle {
    margin-top: 3vh;
    font-size: 3rem;
    font-weight: 600;
}

.prevText {
    width: 40vw;
    text-align: center;
    display: flex;
    background-color: rgba(255, 255, 255, 0.671);
    height: 40vh;
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

#draggable-container {
    width: 38vw;
    padding: 1.75vw 1vw 0 0;
    margin-right: 15vw;
    height: 40vh;
    border-style: solid;
    border-width: 2vh;
    border-color: #da9146;
    color: rgba(234, 234, 234, 0.901);
    background-color: #31432d;
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
}

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

