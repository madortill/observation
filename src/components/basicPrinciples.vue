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
    margin-top: 16vh;
    font-size: 3rem;
    color: #083b2e;
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
    border: none;
    cursor: pointer;   
    height: 6vh;
    /* left: 10%; */
    /* bottom: 30%; */
    font-size: 1.9rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    /* min-width: 12%; */
    width: 11vw;
}

.buttons:hover,
.buttons:focus {
	animation: borderPulse 4000ms infinite ease-out,  hoverShine 200ms;
}

@keyframes borderPulse {
  0% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  }
  35% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255,255,255,0);
  }
  50% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  } 
  75% {
    box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255,.2), 0px 0px 0px 10px rgba(255,255,255,0);
  }
  100% {
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255,.4), 0px 0px 0px 0px rgba(255,255,255,1);
  }
}

@keyframes hoverShine {
	0%{
		background-image: linear-gradient(135deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);
	}
	50%{
		background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.4) 50%, rgba(255,255,255,0) 100%);
	}
	100%{
		background-image: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,.4) 100%);
	}
}

.buttonCont {
    width: 85vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
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
