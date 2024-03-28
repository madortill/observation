<script>
  export default {
    data() {
      return {
        
    }
    },
    methods: {
      
    }
  }
</script>

<template>
    <div class="ending">
        <div class="text">
            <p class="first">כל</p><p class="second">הכבוד!</p>
        </div>
        <div class="third">סיימת את הלומדה בהצלחה</div>
    </div>

</template>


<style scoped>
.ending {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    background-image: url("src/assets/goggles.png");
    background-size: 55% 70%;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
}

.text {
    font-weight: 700;
    display: flex;
    direction: rtl;
    font-size: 10rem;
    padding-top: 36vh;
    color: rgb(68, 68, 68);
    animation: floatAnimation 3s ease-in-out infinite;
    justify-content: space-between;
}

.second {
    position: absolute;
    right: 5.5vw;
}

.first {
    position: absolute;
    left: 11vw;
}

.third {
    font-size: 3rem;
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
