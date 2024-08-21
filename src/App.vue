<template>
  <div id="app">
    <div class="wrapperNew" :class="{ backgroundAniShrink: page > 0 }">
    <img src="./assets/madortill.png" alt="mador" class="logo" />
    <button v-show="page === 0" class = "aboutBtn" @click = "showInfo">i</button>
    <Transition  v-show = "page === 0">
          <div v-show = "showAbout" class="div-about">
          <h3 class = "list-text-about">מפתחת ראשית:</h3>
            <p class = "list-text-about">סמל שירה כהן</p>
            <h3 class = "list-text-about">מפתחת משנית:</h3>
            <p class = "list-text-about">טור' גילי גורדון</p>
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

      <Navbar
        v-if="page > 0"
        :componentName="componentOrder[page]"
        @go-to-page="goToPage"
        :whereBeen="whereBeen"
        :showGoodWatching = "showGoodWatching"
        :isHamburgerStyle="isBurgerStyle"
      />

    <KeepAlive>
        <component
         :is="componentOrder[page]" 
         @switch-screen="switchPage" 
         @prevCurrentScreen="prevCurrentScreen" 
         :chapter="titles[componentOrder[page]]"
          @sendShow="makeBurger"
          @removeShow="removeShow"
          @CheckIfremoveShow="CheckIfremoveShow">
        </component>
    </KeepAlive>
   
  </div>

  </div>
</template>


<script>
  import BasicPrinciples from '@/components/BasicPrinciples.vue';
  import OpeningScreen from './components/OpeningScreen.vue';
  import Preperation from './components/Preperation.vue';
  import Summery from './components/Summery.vue';
  import Targets from './components/Targets.vue';
  import Navbar from './components/Navbar.vue';
  import { KeepAlive } from 'vue';

  export default {
    data() {
      return {
        showGoodWatching: false,
        componentOrder: [
          "OpeningScreen",
          "BasicPrinciples",
          "Targets",
          "Preperation",
          "Summery"
      ],
      titles: {
                "BasicPrinciples": "הגדרת יסוד",
                "Targets": "מאפייני יסוד",
                "Preperation":"הכנה עצמית לביצוע תצפית",
                "Summery": "סיכום",
            },
        page: 0,
        animationType: "",
        showAbout: false,
        whereBeen: ["OpeningScreen"],
        showNav: true,
        clickBtn: 0,
        lastBeenIn: false,
      }
    },
    components: {
      OpeningScreen,
      BasicPrinciples,
      Preperation,
      Summery,
      Targets,
      Navbar
    },
    methods: {
      switchPage() {
            this.page++;  
            if (!this.whereBeen.includes(this.componentOrder[this.page])) {
                this.whereBeen.push(this.componentOrder[this.page]);
            }
        },
        removeShow() {
          this.showGoodWatching = false;
        },
        CheckIfremoveShow() {
          this.switchPage();
          if (this.whereBeen.includes('Preperation')) {
            this.removeShow()
          }
          if (this.lastBeenIn) {
            this.makeBurger();
          }
            
        },
        goToPage (name, isMyPage) {
            this.lastBeenIn = isMyPage;
            if (name === 'Preperation' && this.showGoodWatching){
              this.makeBurger();
            } else {
              this.removeShow()
            }
            this.page = this.componentOrder.indexOf(name);
        },
        prevCurrentScreen() {
          this.page--;
        },
        hideNav() {
          this.showNav = false;
        },
        setNavShown() {
          this.showNav = true;
        },
        makeBurger() {
          this.showGoodWatching = true;
        },
        showInfo() {
          if (this.clickBtn % 2 === 0) {
                  this.showAbout = true;
              } else {
                  this.showAbout = false
              }
              this.clickBtn++;
        }
    },
    computed: {
      isBurgerStyle() {
        return this.componentOrder[this.page] === 'Preperation' && this.showGoodWatching;
      }
    }
  }
</script>


<style scoped>
#app {
  font-family: "Heebo";
  direction: rtl;
  background-color: #e2e1e1;
  background-size: 100% 100%;
}

html {
  font-size: calc(14px + 0.4vw);
}


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
