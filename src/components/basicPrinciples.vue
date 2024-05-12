<template>
    <div class="basic">
        <div class="basicTitle">
            {{ chapter }}
        </div>
        <div>
            <img src="../assets/goggles.png" alt="goggles" class="goggles" />
            <div class="container" v-if="textCounter === 0">
                <div class="explanationTitle">מהי תצפית?</div>
                <div class="explanationText">מופע אשר מבצע החניך באופן עצמאי בו החונך נותן את הבמה ומתצפת על המתרחש.</div>
            </div>
        </div>
        <div class="buttonCont">
            <button class="buttons" @click="changeText">
                ממשיכים
            </button>
            <button v-if="textCounter !== 0" class="buttons" @click="changeText">
                חוזרים
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["chapter"],
    data() {
        return {
            textCounter: 0
        }
    },
  methods: {
    changeText(event) {
        if (event.currentTarget.innerText === "ממשיכים") {
            this.$emit('changeCurrentScreen');
        }
    },
    src(name) {
        return new URL(`../assets/${name}`, import.meta.url).href
    }
  }
}
</script>

<style scoped>
.basic {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}

.basicTitle {
    margin-top: 13vh;
    font-size: 3rem;
    font-weight: 600;
}

.goggles {
    width: 8vw;
    margin-right: 0.5vw;
    position: relative;
    z-index: 1;
    top: 7vh;
    animation: floatAnimation 3s ease-in-out infinite;
    left: 2vw;
}

.container {
    background-color: rgba(255, 255, 255, 0.677);
    padding: 5vw 5vw;
    margin-bottom: 18vh;
    border-radius: 5rem;
    animation: floatAnimation 3s ease-in-out infinite;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
}

.explanationText {
    direction: rtl;
    text-align: center;
    font-size: 2rem;
}

.explanationTitle {
    direction: rtl;
    margin-bottom: 2.5vh;
    text-align: center;
    font-size: 2.75rem;
    font-weight: 600;
}

.buttons {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #083b2e;
    text-align: center;
    margin-bottom: 5vh;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
}

.buttonCont {
    width: 85vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
}

.buttons:hover {
    background-color: #0d5744;
}


@-moz-keyframes floatAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}

   @keyframes floatAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>
