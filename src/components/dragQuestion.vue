<template>
    <div id="dragging-question">
        <div class="draggable-container">
            <p class="text-drag"> * גרור את התשובה לפי הסדר המתאים.</p>
            <div class="draggable-area" @drop="(e) => {
                e.preventDefault();
                drop(e);
                checkDraggable(e)
            }" @dragover="allowDrop" id='dragArea' @dragstart="onDragging">
            </div>

            <ul v-show="showWordWarehouse" class="word-warehouse" @dragstart="onDragging" @dragover="allowDrop" @drop="(e) => {
                e.preventDefault();
                drop(e);
                checkDrop(e)
            }">
                <li v-for="(item, index) in this.shuffledArr" :key="index" class="list-item" draggable="true" 
                    @dragstart="drag" :id="'listItem' + index">
                    {{ item }} </li>
            </ul>
            <div class="terms-cont">
                <div v-for="(term, index) in terms" :key="index" class="terms">{{ term }}</div>
            </div>

            <button v-show="!showWordWarehouse" class="buttons-drag" @click="$emit('changePractice')">
                ממשיכים
            </button>
        </div>
    </div>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {
            answerArray: [],
            showWordWarehouse: true,
            definitions: ["הכיתה מלוכלכת ואינה מוכנה לקיום שיעור.", "״נכון! בדיוק כמו שאמרת, המנוע צריך להתחמם לפני שמתחילים בנסיעה״", "דנה נרדמה בשיעור", 
            "מתוך 45 דקות שיעור, המדריך העביר פתיחה במשך 25 דקות.", "השיעור הועבר בחוץ ביום של 35 מעלות חום, זה הקשה מאוד על ריכוז התלמידים.", "3 תלמידים ספציפיים תמיד עונים על כל השאלות."],
            terms: ["תיאורים", "ציטוטים", "שמות", "זמנים", "מקומות", "מידע כמותי"],
        };
    },
    methods: {
        onDragging(ev) {
            ev.dataTransfer.setData("text", ev.target.textContent);
            ev.dataTransfer.setData("id", ev.target.id);
        },

        allowDrop(ev) {
            ev.preventDefault();
        },

        drag(ev) {
            ev.dataTransfer.setData("text", ev.target.textContent);
            ev.dataTransfer.setData("id", ev.target.id);
        },

        drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("id");
            // השתמשנו בקורנט טארגא במקום בטראגט בגלל שאנחנו רוצים להתייחס רק על האבא - יש מאזין של דראג שמשפיע על הילדים והמאזין של דרופ שמשפיע רק על האבא לכן נרצה לתפוס את המאזין לחיצה
            ev.currentTarget.appendChild(document.getElementById(data));
            // this.checkDraggable(data);
        },

        checkDraggable(ev) {
            const content = ev.dataTransfer.getData("text");
            const id = ev.dataTransfer.getData("id");
            let indexCorrectAns = 0;
            if (this.answerArray.lastIndexOf(content) !== -1) {
                this.answerArray.splice(this.answerArray.indexOf(content), 1)
            }
            this.answerArray.push(content);

            const rightAns = this.definitions;
            if (!rightAns) {
                 return;
            }
            for (let i = 0; i < this.answerArray.length; i++) {
                let newArrayElement = this.answerArray[i]; 
                let rightAnsElement = rightAns[i];
                if (newArrayElement === rightAnsElement) {
                    indexCorrectAns++;
                    console.log(indexCorrectAns);
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("correct");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("wrong");
                } else {
                    console.log('Wrong');
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("wrong");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("correct");
                }
                // console.log(indexCorrectAns);
                if (indexCorrectAns === rightAns.length) {
                    this.showWordWarehouse = false;
                } 
            }
        },

        checkDrop(ev) {
            const id = ev.dataTransfer.getData("id");
            const content = ev.dataTransfer.getData("text");
            // console.log('el: ' + id);
            
            document.getElementById(id).className = 'list-item';
            if(this.answerArray.lastIndexOf(content) !== -1) { // כלומר אם הוא כן נמצא במערך העליון
                this.answerArray.splice(this.answerArray.indexOf(content), 1);
            }

            const rightAns = this.definitions;
            let indexCorrectAns = 0;
            for (let i = 0; i < this.answerArray.length; i++) {
                let newArrayElement = this.answerArray[i]; 
                let rightAnsElement = rightAns[i];
                if (newArrayElement === rightAnsElement) {
                    indexCorrectAns++;
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("correct");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("wrong");
                } else {
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("wrong");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("correct");
                }
                
            }
        }
    },
    computed: {
        shuffledArr() {
            let returnArray = this.definitions.slice(); // שכפול מערך התשובות הנכונות
            let tmp = this.definitions.slice();
            for (let i = 0; i < returnArray.length; i++) {
                let index = Math.floor(Math.random() * tmp.length);
                returnArray[i] = tmp[index];
                tmp = tmp.slice(0, index).concat(tmp.slice(index + 1)); // removes tmp[index]
            }
            return returnArray;
        }
    }
}
</script>

<style>
#dragging-question {
    font-family: 'heebo';
}

.draggable-area {
    position: absolute;
    width: 18vw;
    height: 55vh;
    margin-right: 19vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 50px;
    box-shadow: 6px 7px 21px -3px rgba(0,0,0,0.57);
    text-align: center;
}

.terms-cont {
    display: flex;
    align-items: center;
    font-size: 2rem;
    flex-direction: column;
    background: #fff;
    border-radius: 50px;
    position: absolute;
    box-shadow: 6px 7px 21px -3px rgba(0,0,0,0.57);
    text-align: center;
    width: 15vw;
    height: 55vh;
}

.terms {
    margin: 2.2vh 0vw;
}

.list-item {
    list-style: none;
    width: 10vw;
    display: inline-block;
    padding: 0.5vh 1.2vw;
    margin: 10px;
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    background: white;
    cursor: grab;
    border-radius: 30px;
    color: rgb(0, 0, 0);
    transition: all 0.3s ease;
    top: 2%;
}

.text-drag {
    /* position: absolute;
    bottom: 85%; */
    font-size: 1.4rem;
    color: #5f5a5a;
    animation: floatAnimation 3s ease-in-out infinite;
}

.text-drag:hover {
    color: #232020;
    cursor: pointer;
}

.buttons-drag {
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
    position: absolute;
    top: 97vh;
    right: 45vw;
    width: 11vw;
}

.buttons-drag:hover,
.buttons-drag:focus {
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

.list-item.dragging {
    transform: scale(0.8);
    /* Reduce the size of the item when dragging */
}

.list-item:hover {
    animation: borderPulse 4000ms infinite ease-out, hoverShine 200ms;
}

.word-warehouse {
    width: 85%;
    height: 10%;
    display: flex;
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #65b891d8;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
    text-align: center;
    justify-content: space-evenly;
}

.correct {
    background-color: #81e69f;
}

.wrong {
    background-color: #e68181;
}

.text-success {
    position: absolute;
    bottom: 20%;
    right: 15%;
    border-radius: 100px;
    text-align: center;
    padding: 3%;
    font-size: 3.5rem;
    width: 15%;
    box-shadow: 0 15px 30px -20px rgba(0, 0, 0, 0.8);
    background-color: #87b635;
    color: #fefefe;
}
</style>