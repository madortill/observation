<script>
import DivideHearing from './divideHearing.vue';
import SittingPlacement from './sittingPlacement.vue';
import NoteDown from './noteDown.vue';
import Involved from './involved.vue';

  export default {
    props: ["chapter"],
    emits: ["hideNav", "setNavShown"],
    data() {
      return {
        subjectsArr: [{
            title: "חלוקת קשב",
            subtitle: "חלוקת קשב",
            text: ["דברים קורים בנפרד", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים"], 
            beenThere: false
          },
          {
            title: "בחירת מיקום",
            subtitle: "בחירת מיקום המתצפת",
            text: ["בחירת מיקום המתצפת תלויה במספר פרמטרים"], 
            beenThere: false
          },
          {
            title: "רישום ותיעוד",
            subtitle: "דף תצפית ״טוב״",
            text: ["התייחסות הכנת שיעור והגשתו", "תקף, מהימן ופרקטי - בר הכללה"], 
            beenThere: false
          },
          {
            title: "התערבות",
            subtitle: "2 סוגי התערבות",
            text: ["עקיפה", "ישירה"], 
            beenThere: false
          }
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
      changeSubject(event, color) {
        this.currentSubSubject = event.currentTarget.innerText;
        this.$emit('hideNav');
        this.colorCode = color;
      }, 
      backToHomePage(newSub) {
        this.currentSubSubject = "";
        this.$emit('setNavShown');

        for (let i = 0; i < this.subjectsArr.length; i++) {
          if (this.subjectsArr[i]["title"] === newSub) {
            this.subjectsArr[i]["beenThere"] = true;
          
              if (!this.subjectsArr.some(e => e.beenThere === false)) {
                this.$emit('change-current-screen');
              }
            break;
          }
        }
      }
    }
  }
</script>

<template>
    <div>
      <div class="goodWatch" v-if="currentSubSubject === ''">
        <div class="basicTitle">
          {{ chapter }}
        </div>
        <div class="instruc">לחצו על העיגולים על מנת לעבור את השלבים</div>
          <div class="mainText">
            <div v-for="(sub, index) in subjectsArr" :key="index" class="subjectCont">
              <div :class="sub.beenThere ? 'beenThere' : 'subjectCicle'" :style="`--hue: ${(index) * 20 + 130}deg`" @click="changeSubject($event, index)">{{ sub.title }}</div>
              <div :class="sub.beenThere ? 'beenThere1' : 'subjectExplain'">
                <div v-if="sub.subtitle" class="subtitle">{{ sub.subtitle }}</div>
                <ul><li v-for="(item, index) in sub.text" :key="index" :class="sub.beenThere ? 'item-text-disabled' : 'item-text'">{{ item }}</li></ul>
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


<style scoped>
.goodWatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
}

.instruc {
  position: absolute;
  top: 19vh;
  font-size: 1.8rem;
}

.basicTitle {
  margin-top: 13vh;
  font-size: 3rem;
  font-weight: 600;
}

.mainText {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.subjectCont {
  display: flex;
  margin-right: 2vw;
  margin-left: 2vw;
  align-items: center;
  justify-content: flex-start;
}

.subjectExplain {
  background-color: #ffffff7f;
  border-radius: 2vh;
  padding: 2.5vh 4vw;
  height: 12vh;
  box-shadow: 0 5px 7px #0003;
  width: 15vw;
  margin-right: 9vw;
}

.subtitle {
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 0.6vh;
}

.item-text {
  font-size: 1.2rem;
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
  height: 12vh;
  padding: 2.5vh 4vw;
  width: 15vw;
  margin-right: 9vw;
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
</style>
