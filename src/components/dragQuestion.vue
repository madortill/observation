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

            <ul v-show = "showWordWarehouse" class="word-warehouse" @dragstart="onDragging" @dragover="allowDrop" @drop="(e) => {
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

            <p v-show = "showTextSuccess" class = "text-success">כל הכבוד!</p>
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
            showTextSuccess: false,
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
                console.log("rightAns is not defined or empty");
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
                    // console.log(rightAns.correctArray.length);
                    // console.log(indexCorrectAns + 'right ans')
                    // if(indexCorrectAns === rightAns.correctArray.length){
                    //     this.showWordWarehouse = true;
                    // }
                    this.showTextSuccess = true;
                    setTimeout(() => {
                        this.$emit('next-question');
                    }, 2000)
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
                    console.log('Correct');
                    indexCorrectAns++;
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("correct");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("wrong");
                } else {
                    console.log('Wrong');
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.add("wrong");
                    document.querySelector(`.draggable-area .list-item:nth-of-type(${i + 1})`).classList.remove("correct");
                }
                // console.log(indexCorrectAns);
                if (indexCorrectAns === rightAns.length) {
                    setTimeout(() => {
                        this.$emit('next-question');
                    }, 1500)
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

.draggable-area {
    position: absolute;
    width: 18vw;
    height: 50vh;
    margin-right: 19vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
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
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
    text-align: center;
    width: 15vw;
    height: 50vh;
}

.terms {
    margin-top: 3.5vh;
}

.list-item {
    list-style: none;
    width: 10vw;
    display: inline-block;
    padding: 8px 30px;
    margin: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    position: relative;
    background: #11a8e3;
    cursor: grab;
    border-radius: 30px;
    color: white;
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
    position: absolute;
    width: 88%;
    /* height: 10%; */
    left: 5%;
    bottom: 8%;
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
    text-align: center;
}

.correct {
    background-color: green;
}

.wrong {
    background-color: rgb(176, 6, 6);
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