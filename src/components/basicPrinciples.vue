<template>
    <div class="basic">
        <div class="basicTitle">
            {{ chapter }}
        </div>
        <div>
            <div class="container" v-if="textCounter === 0">
                <div class="explanationTitle">מהו שלב התצפית?</div>
                <div class="explanationText">מופע אשר מבצע הנחנך באופן עצמאי, בשלב זה החונך ׳זז הצידה׳ ונותן לנחנך את הבמה.</div>
            </div>
            <div v-else class="flip-card-container" >
            <div v-for="( item, index) in arrayFront" :key="index" :class="['flip-card', this.onStart]">
                <div class="flip-card-inner" :style="`--hue: ${(index + 2) * 15 + 130}deg`">
                    <div class="flip-card-front">
                        <img :src="src(item)" class="imgFront">
                        <div class="font-card-text">{{ arrayFrontText[index] }}</div>
                    </div>
                    <div class="flip-card-back">
                        <h1 class="textBack">{{ arrayBack[index] }}</h1>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="buttonCont">
            <button class="buttons" @click="changeText">
                ממשיכים
            </button>
            <button v-if="textCounter !== 0" class="buttons" @click="changeText">
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
            textCounter: 0, 
            arrayFrontText: ['בקרה', 'שיפור ושימור יכולות', 'איסוף מידע'],
            arrayFront: ['lightbulb.png', 'chat.png', 'work.png'],
            onStart: '',
            arrayBack: ["יצירת תמונת מצב לגבי רמת הדרכה במסגרת.", "שיקוף יכולות הדרכתיות של סגל ופעילות לשיפורן ושימורן.", "איסוף מקסימום מידע כבסיס לעיבוד משוב."],
        }
    },
  methods: {
    changeText(event) {
        if (event.currentTarget.innerText === "ממשיכים") {
            this.textCounter++;
        } else{
            this.textCounter--;
        }

        if (this.textCounter === 1) {
            setTimeout(() => {
                this.onStart = 'start';
            }, 100)
            setTimeout(() => {
                this.onStart = 'off';
            }, 500);
        } else if (this.textCounter === 2) {
            this.$emit('changeCurrentScreen')
        }       
    },
    src(name) {
        return new URL(`../assets/${name}`, import.meta.url).href
    }
  }
}
</script>

<style scoped>
.basic {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}

.basicTitle {
    margin-top: 3vh;
    font-size: 4rem;
    font-weight: 600;
}

.container {
    background-color: rgba(255, 255, 255, 0.677);
    padding: 10vh;
    border-radius: 5rem;
    animation: floatAnimation 3s ease-in-out infinite;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
}

.explanationText {
    direction: rtl;
    text-align: center;
    font-size: 1.7rem;
}

.explanationTitle {
    direction: rtl;
    margin-bottom: 2.5vh;
    text-align: center;
    font-size: 2rem;
    font-weight: 550;
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

.flip-card-container {
    display: flex;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 0.677);
    padding: 10vh;
    border-radius: 5rem;
}

.flip-card {
    background-color: transparent;
    width: 300px;
    height: 350px;
    perspective: 1000px;
    margin: 10px;
    box-sizing: border-box;
}

.font-card-text {
    font-size: 1.3rem;
    font-weight: 600;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
}

.flip-card:hover .flip-card-front, .flip-card.start .flip-card-front{
    transform: rotateY(180deg);
}

.flip-card:hover .flip-card-back, .flip-card.start .flip-card-back {
    transform: rotateY(360deg)
}

.flip-card-front,
.flip-card-back {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-front {
    background-color: #f0a06a;
    background-color: hsl(var(--hue), 50%, 58%);
    border-radius: 30px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.flip-card-back {
    background-color: #f5c381;
    background-color: hsl(var(--hue), 50%, 78%);
    border-radius: 30px;
    color: rgb(84, 82, 82);
    transform: rotateY(180deg);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.imgFront {
    width: 60%;
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
</style>
