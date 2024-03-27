<script>
  import BasicPrinciples from './components/basicPrinciples.vue';
  import OpeningScreen from './components/openingScreen.vue';
  import Preperation from './components/preperation.vue';
  import GoodWatching from './components/goodWatching.vue';
  
  export default {
    data() {
      return {
        chapters: ["פתיחה", "עקרונות יסוד", "הכנה עצמית לביצוע תצפית", "לצורך תצפית מיטבית", "סיום"],
        pageCounter: 0,
        animationType: ""
      }
    },
    components: {
      OpeningScreen,
      BasicPrinciples,
      Preperation,
      GoodWatching
    },
    methods: {
      changeCurrentScreen() {
        this.pageCounter++;
      },
      changeShrinkBackground(type) {
        this.animationType = type;
      }
    }
  }
</script>

<template>
    <div class="wrapperNew" :class="`${animationType}`" >
      <img src="./assets/madortill.png" alt="mador" class="logo" />
      <OpeningScreen v-if="chapters[pageCounter]==='פתיחה'"  @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <BasicPrinciples v-else-if="chapters[pageCounter]==='עקרונות יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <Preperation v-else-if="chapters[pageCounter]==='הכנה עצמית לביצוע תצפית'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <GoodWatching v-else-if="chapters[pageCounter]==='לצורך תצפית מיטבית'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen"/>
    </div>

</template>


<style scoped>
.wrapperNew {
  background-image: url("src/assets/goggles.png");
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
