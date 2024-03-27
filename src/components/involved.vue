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
        showBackButton: false
      }
    },
    methods: {
        
    }
  }
</script>

<template>
    <div class="involved">
        <div class="basicTitle">
          {{ chapter }}
        </div>
        <div class="circleCont" >
            <div class="subjectCicle" v-for="(sub,index) in subArr" :key="index" :style="`--hue: ${(index + 3) * 15 + 130}deg`" @click="changeSubject">{{ sub.title }}</div>
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

.circleCont {
  display: flex;
  width: 100vw;
  height: 40vh;
  margin-right: 2vw;
  margin-left: 2vw;
  align-items: center;
  justify-content: space-around;
}

.subjectCicle {
  width: 16rem;
  height: 16.5rem;
  border-radius: 50%;
  text-align: center;
  color: #413f3f;
  font-size: 3.5rem;
  font-weight: 550;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 50px 50px rgb(255, 255, 255);
  transition: all .3s ease;
  background-color: hsl(var(--hue),50%,75%);
  padding: 3.5%;
  cursor: pointer;
}

.subjectCicle:hover {
  transform: scale(1.1);
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
</style>
