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
        showInfo: false,
        showNav: true
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
      }
    }
  }
</script>

<template>
    <div class="wrapperNew" :class="`${animationType}`" >
      <img src="./assets/madortill.png" alt="mador" class="logo" />
      <img src="./assets/information.png" alt="info" v-show="chapters[pageCounter] === 'פתיחה'" class="info" @click="showInfo = !showInfo"/>
      <div class="infoContainer" v-show="showInfo">
        מפתחת ראשית: <br>
        סמל שירה כהן <br> <br>
        UX / UI: <br>
        סמל שירה כהן <br> <br>
        גרפיקה: <br>
        טור' אדוה אבא<br> <br>
        מומחה תוכן: <br>
        רס"ל אביב אואנונו<br><br>
        רת"ח מו"פ: <br> 
        רס"ל אביב אואנונו<br><br>
        רמ"ד טי"ל:<br>
        רס"מ שלומי אוגרן
        <img src="./assets/mifkada-logo.png" alt="mifkada" class="logo-2" />
      </div>
      <Navbar v-if="chapters[pageCounter]!=='פתיחה' && showNav && chapters[pageCounter]!=='סיום'" :pageCounter="pageCounter" />
      <OpeningScreen v-if="chapters[pageCounter]==='פתיחה'"  @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <BasicPrinciples v-else-if="chapters[pageCounter]==='הגדרת יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <Targets  v-else-if="chapters[pageCounter]==='מאפייני יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @prev-current-screen="prevCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <Preperation v-else-if="chapters[pageCounter]==='הכנה עצמית לביצוע תצפית'" :chapter="chapters[pageCounter]" @prev-current-screen="prevCurrentScreen" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <GoodWatching v-else-if="chapters[pageCounter]==='לצורך תצפית מיטבית'" :chapter="chapters[pageCounter]" @setNavShown="setNavShown" @hideNav="hideNav" @change-current-screen="changeCurrentScreen"/>
      <EndingScreen v-else-if="chapters[pageCounter]==='סיום'"/>
    </div>

</template>


<style scoped>
.wrapperNew {
  background-image: url("./assets/goggles.png");
  background-size: 55% 70%;
  background-repeat: no-repeat;
  background-position: center;
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
  left: 5%;
  top: 5%;
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

</style>
