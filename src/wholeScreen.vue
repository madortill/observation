<script>
  import BasicPrinciples from './components/basicPrinciples.vue';
  import OpeningScreen from './components/openingScreen.vue';
  import Preperation from './components/preperation.vue';
  import GoodWatching from './components/goodWatching.vue';
  
  export default {
    data() {
      return {
        chapters: [ "פתיחה", "עקרונות יסוד", "הכנה עצמית לביצוע תצפית", "לצורך תצפית מיטבית", "סיום"],
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
      <OpeningScreen v-if="chapters[pageCounter]==='פתיחה'"  @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <BasicPrinciples v-else-if="chapters[pageCounter]==='עקרונות יסוד'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <Preperation v-else-if="chapters[pageCounter]==='הכנה עצמית לביצוע תצפית'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen" @change-shrink-background="changeShrinkBackground"/>
      <GoodWatching v-else-if="chapters[pageCounter]==='לצורך תצפית מיטבית'" :chapter="chapters[pageCounter]" @change-current-screen="changeCurrentScreen"/>
    </div>

</template>


<style scoped>
.wrapperNew {
  background-image: url("src/assets/glasses.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
}

.backgroundAni {
  animation: biggerBackground 2s forwards;
  -webkit-animation: biggerBackground 2s forwards;
}

.backgroundAniShrink {
  animation: smallerBackground 1.5s forwards;
  -webkit-animation: smallerBackground 1.5s forwards;
}

.backgroundAniScale {
  animation: scaleBackground 1.5s forwards;
  -webkit-animation: scaleBackground 1.5s forwards;
}

@keyframes biggerBackground {
    0% {
      background-size: 100% 100%;
    }
    100% {
      background-size: 140% 140%;
    }
}

@-webkit-keyframes biggerBackground {
    0% {
      background-size: 100% 100%;
    }
    100% {
      background-size: 140% 140%;
    }
}

@keyframes scaleBackground {
    0% {
      background-size: 0% 0%;
    }
    100% {
      background-size: 140% 140%;
    }
}

@-webkit-keyframes scaleBackground {
    0% {
      background-size: 0% 0%;
    }
    100% {
      background-size: 140% 140%;
    }
}

@keyframes smallerBackground {
    0% {
      background-size: 140% 140%;
    }
    100% {
      background-size: 0% 0%;
    }
}

@-webkit-keyframes smallerBackground {
    0% {
      background-size: 140% 140%;
    }
    100% {
      background-size: 0% 0%;
    }
}

</style>
