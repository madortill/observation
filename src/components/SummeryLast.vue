<template>
    <div id="summery">
        <img  class="glasses" src="../assets/goggles.png"/>
        <div class="text">
            <p class="first">כל</p><p class="second">הכבוד!</p>
        </div>
        <div class="third">בלומדה זו למדנו על השלב השני במעגל החניכה: תצפית. <br> עברנו על מאפייני היסוד של תצפית, וכיצד להתכונן ולבצע אותה. <br> עכשיו, אתם מוכנים להתקדם לשלב הבא, "עיבוד". <br> בהצלחה!</div>
    </div>

</template>

<script>
  export default {
    data() {
      return {
        
    }
    },
    methods: {
      
    },
  }
</script>



<style scoped>
#summery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    height: 100vh;
}

.glasses {
    position: absolute;
    top: 6rem;
    height: 60%;
    width: 45%;
}

.text {
    font-weight: 700;
    display: flex;
    direction: rtl;
    font-size: 7rem;
    padding-top: 16rem;
    color: rgb(5, 42, 18);
    animation: floatAnimation 3s ease-in-out infinite;
    justify-content: space-between;
}

.second {
    position: absolute;
    right: 3.7rem;
}

.first {
    position: absolute;
    left: 10rem;
}

.third {
    text-align: center;
    font-size: 2rem;
    padding-bottom: 4vh;
}

@keyframes floatAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>
