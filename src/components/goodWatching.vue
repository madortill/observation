<script>
  import DivideHearing from './divideHearing.vue'
  export default {
    props: ["chapter"],
    data() {
      return {
        subjectsArr: [{
            title: "חלוקת קשב",
            subtitle: "",
            text: ["דברים קורים בנפרד", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים"]
          },
          {
            title: "בחירת מיקום",
            subtitle: "בחירת מיקום המתצפת",
            text: ["הוראות בטיחות", "מאפיינים אישיים של המדריך", "רואה ולא נראה"]
          },
          {
            title: "רישום ותיעוד",
            subtitle: "דף תצפית ״טוב״",
            text: ["התייחסות הכנת שיעור והגשתו", "תקף, מהימן ופרקטי - בר הכללה"]
          },
          {
            title: "התערבות",
            subtitle: "2 סוגי התערבות",
            text: ["עקיפה", "ישירה"]
          }],
          currentSubSubject: ""
    }
    },
    components: {
      DivideHearing
    },
    methods: {
      changeSubject(event) {
        this.currentSubSubject = event.currentTarget.innerText;
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
          <div class="mainText">
            <div v-for="(sub, index) in subjectsArr" :key="index" class="subjectCont">
              <div class="subjectCicle" :style="`--hue: ${(index + 3) * 15 + 130}deg`" @click="changeSubject">{{ sub.title }}</div>
              <div class="subjectExplain">
                <div v-if="sub.subtitle" class="subtitle">{{ sub.subtitle }}</div>
                <div v-for="(item, index) in sub.text" class="item-text">{{ item }}</div>
              </div>
            </div>
          </div>
      </div>
        <DivideHearing v-else-if="currentSubSubject === 'חלוקת קשב'" :chapter="currentSubSubject" />
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
.basicTitle {
  margin-top: 3vh;
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
  background-color: #7d7d7d7f;
  border-radius: 2vh;
  padding: 2.5vh 4vw;
  width: 15vw;
  margin-right: 9vw;
}

.subtitle {
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 0.6vh;
}

.item-text {
  font-size: 1.15rem;
}

.subjectCicle {
  width: 5rem;
  height: 6rem;
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
