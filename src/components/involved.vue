<script>
  export default {
    props: ["chapter"],
    data() {
      return {
        subArr: [
            {
                title: "התערבות עקיפה",
                explain: 'התערבות זו מגיעה ישירות לאחר ביצוע התצפית, עוד <b>לפני </b> שלב המשוב. שימושה בעיקר בעת הסבר של פערים מקצועיים קריטיים שהיו בהדרכה.'
            },
            {
                title: "התערבות ישירה",
                explain: 'בהתערבות זו המתצפת חודל את השיעור ומתקן את הנחנך במידת הצורך. בהתערבות זו נשתמש רק למקרים של בטיחות או עברה על הפקודות.'
            }
        ],
        showBackButton: false,
        showOtherSubject: false,
        onStart: 'start'
      }
    },
    methods: {
      showInfo() {

      }
    }
  }
</script>

<template>
    <div class="involved">
        <div class="basicTitle">
          {{ chapter }}
        </div>
        <div class="flip-card-container" >
          <div v-for="( item, index) in subArr" :key="index" :class="['flip-card', this.onStart]">
                <div class="flip-card-inner" :style="`--hue: ${(index + 2) * 15 + 130}deg`">
                    <div class="flip-card-front">
                        <img :src="src(item)" class="imgFront">
                        <div class="font-card-text">{{  }}</div>
                    </div>
                    <div class="flip-card-back">
                        <h1 class="textBack">{{  }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttonCont">
                <button v-show="showBackButton" class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" @click="prevSubject">
                    חוזרים
                </button>
            </div>
    </div>
</template>


<style scoped>
.involved {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
}

.basicTitle {
  margin-top: 3vh;
  font-size: 3rem;
  font-weight: 600;
}

.flip-card-container {
    display: flex;
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
    /* flex: 0 0 calc(50% - 20px); */
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

@keyframes pickSubject {
  0% {
    box-shadow: 0px 0px 25px 20px #fff
  }
  50% {
    box-shadow: 0px 0px 25px 0px #fff;
  }
   100% {
    box-shadow: 0px 0px 25px 20px #fff;
   }
}

@-webkit-keyframes pickSubject {
  0% {
    box-shadow: 0px 0px 25px 20px #fff;
  }
  50% {
    box-shadow: 0px 0px 25px 0px #fff;
  }
   100% {
    box-shadow: 0px 0px 25px 20px #fff;
   }
} 
</style>
