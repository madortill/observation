<template>
    <div id="dragging-question">
        <p class="text-drag">* גרור את התשובה לפי הסדר המתאים.</p>
        <div class="container">
            <div class="terms-cont">
                <div v-for="(term, index) in terms" :key="index" class="terms">{{ term }}</div>
            </div>
            <div class="draggable-area" @drop="(e) => {
                e.preventDefault();
                drop(e);
                checkDraggable(e);
            }" @dragover="allowDrop" id='dragArea' @dragstart="onDragging">
            </div>
            
            <ul v-show="showWordWarehouse" class="word-warehouse" @dragstart="onDragging" @dragover="allowDrop" @drop="(e) => {
                e.preventDefault();
                drop(e);
                checkDrop(e);
            }">
                <li v-for="(item, index) in this.shuffledArr" :key="index" class="list-item" draggable="true" 
                    @dragstart="drag" :id="'listItem' + index">
                    {{ item }}
                </li>
            </ul>
            <button v-show="!showWordWarehouse" class="buttons-drag" @click="changePractice">
            ממשיכים
        </button>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            answerArray: [],
            showWordWarehouse: true,
            definitions: [
                "הלוח לא מחוק, יש לכלוך על הרצפה, השולחנות לא מסודרים",
                "נכון! בדיוק כמו שאמרת, המנוע צריך להתחמם לפני שמתחילים בנסיעה",
                "דנה נרדמה בשיעור, ליאור לא השתתף", 
                "מתוך 45 דקות שיעור, המדריך העביר פתיחה במשך 25 דקות",
                "השיעור הועבר בחוץ באיזור שאינו מוצל לכן היה קושי להתרכז",
                "שלושה תלמידים ספציפיים תמיד עונים ומשתתפים בשיעור"],
            terms: ["תיאורים", "ציטוטים", "שמות", "זמנים", "מקומות", "מידע כמותי"],
        };
    },
    methods: {
        changePractice() {
            this.$emit('changePractice');    
        },
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
            const droppedElement = document.getElementById(data);
            ev.currentTarget.appendChild(droppedElement);
            droppedElement.classList.add('dropped');
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
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("correct");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("wrong");
                } else {
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("wrong");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("correct");
                }
                if (indexCorrectAns === rightAns.length) {
                    this.showWordWarehouse = false;
                } 
            }
        },
        checkDrop(ev) {
            const id = ev.dataTransfer.getData("id");
            const content = ev.dataTransfer.getData("text");
            document.getElementById(id).className = 'list-item';
            if(this.answerArray.lastIndexOf(content) !== -1) { 
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
            let returnArray = this.definitions.slice(); 
            let tmp = this.definitions.slice();
            for (let i = 0; i < returnArray.length; i++) {
                let index = Math.floor(Math.random() * tmp.length);
                returnArray[i] = tmp[index];
                tmp = tmp.slice(0, index).concat(tmp.slice(index + 1)); 
            }
            return returnArray;
        }
    }
}
</script>

<style>
#dragging-question {
    font-family: 'heebo';
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.text-drag {
    font-size: 1.4rem;
    color: #5f5a5a;
    text-align: center;
    margin-bottom: 1rem;
    width: 100%;
}

.buttons-drag {
    margin-top: 12rem;
    border: none;
    cursor: pointer;  
    font-family: 'heebo'; 
    height: 3rem;
    font-size: 1.9rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    width: 11rem;
    /* position: absolute; */ 

}

.container {
    display: flex;
    justify-content: space-between;
    width: 100%; /* Take full width */
    margin-top: 0rem;
}

.draggable-area {
    height: 33rem;
    background: #fff;
    border-radius: 50px;
    box-shadow: 6px 7px 21px -3px rgba(0,0,0,0.57);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-evenly; */
    width: 40%;
}

.word-warehouse {
    background: #90ceb1d7;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
    text-align: center;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%; /* Adjust width as needed */
    /* height: 30rem; */
}

.terms-cont {
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
    text-align: center;
    padding: 1rem;
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 20%; /* Adjust width as needed */
    height: 31rem;
}

.list-item {
    position: relative;
    padding: 0.5vh 1.2vw;
    margin: 0.25rem auto; /* Center list items */
    font-size: 1rem;
    display: flex;
    /* max-width: 12rem; */
    justify-content: center;
    align-items: center;
    background: white;
    cursor: grab;
    border-radius: 30px;
    color: rgb(0, 0, 0);
    transition: all 0.3s ease;
}
.list-item.dragging {
    transform: scale(0.8);
}

.list-item:hover {
    animation: borderPulse 4000ms infinite ease-out, hoverShine 200ms;
}
.dropped {
    margin-top: 1.6rem;
    width: 18rem;
    font-size: 1.1rem;
}

.text-drag {
    font-size: 1.4rem;
    color: #5f5a5a;
    animation: floatAnimation 3s ease-in-out infinite;
}

.text-drag:hover {
    color: #232020;
    cursor: pointer;
}

.buttons-drag:hover,
.buttons-drag:focus {
    animation: borderPulse 4000ms infinite ease-out, hoverShine 200ms;
}


@keyframes borderPulse {
  0% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255, 255, 255,.6);
  }
  35% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255, 255, 255,0);
  }
  50% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255, 255, 255,.6);
  }
  75% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255, 255, 255,0);
  }
  100% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255, 255, 255,.6);
  }
}

@keyframes hoverShine {
  0% {
    background-image: linear-gradient(135deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);
  }
  50% {
    background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.4) 50%, rgba(255,255,255,0) 100%);
  }
  100% {
    background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,.4) 100%);
  }
}

.correct {
    background: lightgreen;
}

.wrong {
    background: salmon;
}

.hide {
    opacity: 0;
}
</style>
