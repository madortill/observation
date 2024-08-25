<template>
    <div id="container">
      <div class="buttonCont">
        <button v-show="beenInAll && notInside" class="buttons" @click="changeText">
          ממשיכים
        </button>
        <button v-show="notInside" class="buttons beLeft" @click="changeText">
          חוזרים
        </button>
      </div>
      <div class="goodWatch" v-if="currentSubSubject === ''">
        <div class="basicTitle">תצפית</div>
        <div class="instruc">לחצו על העיגולים על מנת לעבור את השלבים</div>
        <div class="mainText">
          <div v-for="(sub, index) in subjectsArr" :key="index" class="subjectCont">
            <div :class="sub.beenThere ? 'beenThere' : 'subjectCicle'"
                 :style="`--hue: ${(index) * 20 + 130}deg`"
                 @click="changeSubject($event, index)">
              {{ sub.title }}
            </div>
            <div :class="sub.beenThere ? 'beenThere1' : 'subjectExplain'">
              <div v-if="sub.subtitle" class="subtitle">{{ sub.subtitle }}</div>
              <ul>
                <li v-for="(item, index) in sub.text" :key="index"
                    :class="sub.beenThere ? 'item-text-disabled' : 'item-text'">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <DivideHearing v-else-if="currentSubSubject === 'חלוקת קשב'" :chapter="currentSubSubject" :colorCode="colorCode" @backToHomePage="backToHomePage"/>
      <SittingPlacement v-else-if="currentSubSubject === 'בחירת מיקום'" :chapter="currentSubSubject" :colorCode="colorCode" @backToHomePage="backToHomePage"/>
      <NoteDown v-else-if="currentSubSubject === 'רישום ותיעוד'" :chapter="currentSubSubject" :colorCode="colorCode" @backToHomePage="backToHomePage"/>
      <Involved v-else-if="currentSubSubject === 'התערבות'" :chapter="currentSubSubject" :colorCode="colorCode" @backToHomePage="backToHomePage"/>
    </div>
  </template>
  
  <script>
  import DivideHearing from '../DivideHearing.vue';
  import SittingPlacement from '../SittingPlacement.vue';
  import NoteDown from '../NoteDown.vue';
  import Involved from '../Involved.vue';
  
  export default {
    props: ["chapter"],
    emits: ["hideNav", "setNavShown"],
    data() {
      return {
        beenInAll: false,
        notInside: true,
        subjectsArr: [
          { title: "חלוקת קשב", subtitle: "חלוקת קשב", text: ["הפרדה בין סיטואציות המתרחשות בו זמנית", "הפרדה בין עיקר ותפל", "הפרדה בין ביצועים מורכבים לפשוטים"], beenThere: false },
          { title: "בחירת מיקום", subtitle: "בחירת מיקום המתצפת", text: ["על מנת לבחור מיקום למתצפת יש להתחשב במספר פרמטרים"], beenThere: false },
          { title: "רישום ותיעוד", subtitle: "רישום ותיעוד", text: ["מיקוד בהכנת השיעור והעברתו"], beenThere: false },
          { title: "התערבות", subtitle: "ישנם שני סוגים", text: ["התערבות עקיפה", "התערבות ישירה"], beenThere: false }
        ],
        currentSubSubject: "",
        colorCode: 0
      }
    },
    components: {
      DivideHearing,
      SittingPlacement,
      NoteDown,
      Involved
    },
    methods: {
      changeSubject(event, index) {
        const title = this.subjectsArr[index].title;
        this.currentSubSubject = title;
        this.$emit('hideNav');
        this.colorCode = index;
        this.notInside = false;
  
        // Update the `beenThere` status
        this.subjectsArr[index].beenThere = true;
        
        // Update the URL history state
        history.pushState({ currentSubSubject: title }, '', `#${title}`);
      },
      changeText(event) {
        if (event.currentTarget.innerText === "ממשיכים") {
          this.$emit('switch-screen');
        } else {
          this.$emit('go-back');
        }
      },
      backToHomePage(newSub) {
        this.currentSubSubject = "";
        this.$emit('setNavShown');
        this.notInside = true;
        
        // Update `beenThere` status
        for (let i = 0; i < this.subjectsArr.length; i++) {
          if (this.subjectsArr[i]["title"] === newSub) {
            this.subjectsArr[i]["beenThere"] = true;
            break;
          }
        }
  
        if (!this.subjectsArr.some(e => e.beenThere === false)) {
          this.$emit('switch-screen');
        }
      },
      handlePopState(event) {
        if (event.state && event.state.currentSubSubject) {
          this.currentSubSubject = event.state.currentSubSubject;
          this.notInside = false;
        } else {
          this.currentSubSubject = "";
          this.notInside = true;
        }
      }
    },
    mounted() {
      window.addEventListener('popstate', this.handlePopState);
    },
    beforeDestroy() {
      window.removeEventListener('popstate', this.handlePopState);
    }
  }
  </script>
  
  
  <style scoped>
  .goodWatch {
    height: 100vh;
      direction: rtl;
      font-family: 'heebo';
      text-align: center;
      position: relative; /* Changed from absolute to relative */
      overflow: hidden;
  }
  
  .instruc {
    position: absolute;
    top: 15rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.8rem;
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
  
  .mainText {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 equal-width columns */
    grid-template-rows: repeat(2, auto); /* 2 rows with automatic height */
    gap: 3rem; /* Adds spacing between the grid items */
    align-items: stretch;
    height: 60vh;
    width: 80vw;
    justify-items: stretch; /* Centers items horizontally within each grid cell */
  }
  
  
  .subjectCont {
    text-align: right;
    align-items: center;
    justify-content: flex-start;
  }
  
  .subjectExplain {
    background-color: #ffffff7f;
    border-radius: 2vh;
    padding: 2rem 3rem;
    box-shadow: 0 5px 7px #0003;
    margin-right: 9vw;
  }
  
  .subtitle {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .item-text {
    font-size: 1.3rem;
  }
  
  .item-text-disabled {
    font-size: 1.2rem;
    color: rgb(142, 142, 142);
  }
  
  .beenThere {
    width: 6rem;
    height: 6.5rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.5rem;
    cursor: pointer;
    font-weight: 550;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 7px #0003;
    transition: all .3s ease;
    position: fixed;
    padding: 3.5%;
    background-color: #a0a0a0;
  }
  
  .beenThere1 {
    background-color: #cacaca7f;
    border-radius: 2vh;
    padding: 3vh 4vw;
    margin-right: 9vw;
    color:#5352527f;
  }
  
  .subjectCicle {
    width: 6rem;
    height: 6.5rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.5rem;
    font-weight: 550;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 7px #0003;
    transition: all .3s ease;
    background-color: hsl(var(--hue),50%,75%);
    position: fixed;
    padding: 3.5%;
    cursor: pointer;
  }
  
  .subjectCicle:hover {
    transform: scale(1.1);
  }
  
  #container {
    font-family: 'heebo';
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
  
  .beLeft {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
  
  </style>
  