<template>
    <div class="basic">
        <div class="basicTitle">
            {{ chapter }}
        </div>
        <div class="containerOfAll">
            <div class="flip-card-container">
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
            <button class="buttons" @click="changeText">
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
            arrayBack: ["יצירת תמונת מצב לגבי רמת ההדרכה במסגרת", "שיקוף יכולות הדרכתיות של הסגל ושאיפה לשיפורן ושימורן", "איסוף מידע מירבי כבסיס לעיבוד משוב"],
        }
    },
  methods: {
    changeText(event) {
        if (event.currentTarget.innerText === "ממשיכים") {
            this.$emit('CheckIfremoveShow');
            // this.$emit('switch-screen');
        } else {
            this.$emit('prevCurrentScreen');
        }
    },
    src(name) {
        return new URL(`../assets/${name}`, import.meta.url).href
    }
  },
  mounted() {
    setTimeout(() => {
        this.onStart = 'start';
    }, 100)
    setTimeout(() => {
        this.onStart = 'off';
    }, 500);
  }
}
</script>

<style scoped>
.basic {
    height: 100vh;
    direction: rtl;
    font-family: 'heebo';
    text-align: center;
    position: relative; /* Changed from absolute to relative */
    overflow: hidden;
}

.basicTitle {
    position: absolute;
    top: 9rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    color: #083b2e;
    font-weight: bold;
    margin: 1rem;
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

.containerOfAll {
    margin: 1rem;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80rem;
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

.textBack {
    padding: 1vh;
}

.buttonCont {
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    position: absolute;
    z-index: 10;
    bottom: -1rem; /* Center buttons at the bottom */
    left: 50%;
    transform: translateX(-50%);
}

.flip-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: floatAnimation 3s ease-in-out infinite;
    flex-wrap: wrap;
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
    font-size: 1.75rem;
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