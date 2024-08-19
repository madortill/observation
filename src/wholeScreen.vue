<template>
  <div class="wrapperNew" :class="`${animationType}`" >
    <img src="./assets/madortill.png" alt="mador" class="logo" />
    <button v-show="chapters[pageCounter] === 'פתיחה'" class = "aboutBtn" @click = "showInfo">i</button>
    <Transition >
          <div v-show = "showAbout && chapters[pageCounter] === 'פתיחה'" class="div-about">
          <h3 class = "list-text-about">מפתחת ראשית:</h3>
            <p class = "list-text-about">סמל שירה כהן</p>
            <h3 class = "list-text-about">UX/UY</h3>
            <p class = "list-text-about">סמל שירה כהן</p>
            <h3 class = "list-text-about">גרפיקה:</h3>
            <p class = "list-text-about">רב"ט אדוה אבא</p>
            <h3 class = "list-text-about">מומחית תוכן:</h3>
            <p class = "list-text-about">רב"ט אלה טייטלר</p>
            <h3 class = "list-text-about">רת"ח מו"פ:</h3>
            <p class = "list-text-about">רס"ל אביב אואנונו</p>
            <h3 class = "list-text-about">רמ"ד טי"ל:</h3>
            <p class = "list-text-about">רס"מ שלומי אוגרן</p>
            <h3 class = "list-text-about">גרסה:</h3>
            <p class = "list-text-about">אוגוסט 2024</p>
        </div>
      </Transition>
   

    <Navbar v-if="chapters[pageCounter]!=='פתיחה' && showNav && chapters[pageCounter]!=='סיום'" :pageCounter="pageCounter" />
    <OpeningScreen v-if="chapters[pageCounter]==='פתיחה'"  @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
    <BasicPrinciples v-else-if="chapters[pageCounter]==='הגדרת יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
    <Targets  v-else-if="chapters[pageCounter]==='מאפייני יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @prev-current-screen="prevCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
    <Preperation v-else-if="chapters[pageCounter]==='הכנה עצמית לביצוע תצפית'" :chapter="chapters[pageCounter]" @prev-current-screen="prevCurrentScreen" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
    <GoodWatching v-else-if="chapters[pageCounter]==='לצורך תצפית מיטבית'" :chapter="chapters[pageCounter]" @setNavShown="setNavShown" @hideNav="hideNav" @change-current-screen="changeCurrentScreen"/>
    <EndingScreen v-else-if="chapters[pageCounter]==='סיום'"/>
  </div>

</template>


<script>
  import BasicPrinciples from './components/basicPrinciples.vue';
  import OpeningScreen from './components/openingScreen.vue';
  import Preperation from './components/preperation.vue';
  import GoodWatching from './components/goodWatching.vue';
  import EndingScreen from './components/endingScreen.vue';
  import Targets from './components/targets.vue';
  import Navbar from './components/navbar.vue';
  
  export default {
    data() {
      return {
        chapters: ["פתיחה", "הגדרת יסוד", "מאפייני יסוד", "הכנה עצמית לביצוע תצפית", "לצורך תצפית מיטבית", "סיום"],
        pageCounter: 0,
        animationType: "",
        showAbout: false,
        showNav: true,
        clickBtn: 0,
      }
    },
    components: {
      OpeningScreen,
      BasicPrinciples,
      Preperation,
      GoodWatching,
      EndingScreen,
      Targets,
      Navbar
    },
    methods: {
      changeCurrentScreen() {
        this.pageCounter++;
      },
      changeShrinkBackground(type) {
        this.animationType = type;
      },
      prevCurrentScreen() {
        this.pageCounter--;
      },
      hideNav() {
        this.showNav = false;
      },
      setNavShown() {
        this.showNav = true;
      },
      showInfo() {
        if (this.clickBtn % 2 === 0) {
                this.showAbout = true;
            } else {
                this.showAbout = false
            }
            this.clickBtn++;
      }
    }
  }
</script>


<style scoped>
.wrapperNew {
  background-image: url("./assets/goggles.png");
  background-size: 50% 70%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  bottom: 6vh;
  height: 100vh;
}

.logo {
  width: 4vw;
  position: fixed;
  bottom: 1vh;
  right: 1vw;
}

.info {
  width: 2vw;
  height: 3.75vh;
  cursor: pointer;
  position: fixed;
  top: 1vh;
  left: 1vw;
}

.logo-2 {
  width: 1.75vw;
  position: absolute;
  bottom: 1vh;
  left: 1vw;
}

.infoContainer {
  position: absolute;
  width: 12%;
  height: contain;
  padding: 2vh;
  direction: rtl;
  left: 4%;
  top: 10%;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 15px 20px -20px #0006;
  text-align: center;
}

.backgroundAniShrink {
  animation: smallerBackground 1s forwards;
  -webkit-animation: smallerBackground 1s forwards;
}


@keyframes smallerBackground {
    0% {
      background-size: 55% 70%;
    }
    100% {
      background-size: 0% 0%;
    }
}

@-webkit-keyframes smallerBackground {
    0% {
      background-size: 55% 70%;
    }
    100% {
      background-size: 0% 0%;
    }
}


.aboutBtn {
  position: absolute;
  border: none;
  font-size: 1.6rem;
  transition: background-color 0.3s ease;
  background-color: #e2e1e1;
  color: black;
  border: 2px solid black;
  border-radius: 150px;
  width: 2%;
  height: 4%;
  cursor: pointer;
  left: 2.5%;
  top: 10%;

}

.aboutBtn:hover{
  background-color: #b1b7b9;
}
.div-about {
  position: absolute;
  width: 12%;
  left: 6%;
  top: 9%;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
  text-align: center;
  z-index: 3;
}

.list-text-about {
  transition: background-color 0.5s ease;
  margin: 5%;
}
.list-text-about:hover {
  background-color: #dbdbdb;
}

</style>
