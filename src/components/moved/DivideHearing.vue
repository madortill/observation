<template>
    <div class="hearingContainer">
        <div class="container">
                  <div :class="changeAni ? 'explanation float' : 'explanation scale'">
                <div class="titleCircle" v-show="showPart !== 2" :class="changeAni ? 'float': ''" :style="`--hue: ${(colorCode) * 20 + 130}deg`">{{ chapter }}</div>
                <div class="basicTitle">חלוקת קשב</div>
                  <br>בזמן התצפית עלינו לחלק את הקשב שלנו על מנת לקלוט כמה שיותר נתונים  <br>ומידע וכדי שהתצפית תהיה אפקטיבית.<br><br>
            ניתן דגש על דבר המדריך, נפריד בין עיקר לתפל<br> ובין סיטואציות המתרחשות בו זמנית ובין ביצועים מורכבים ופשוטים.
            </div>
        </div>
        <div class="buttonCont" v-show="showNextButton">
            <button class="buttons" @click="gilisMethod">
                ממשיכים
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["chapter", "colorCode"],
    data() {
        return {
            changeAni: false,
        }
    },
    methods: {
        gilisMethod() {
            this.$emit('backToHomePage', 'חלוקת קשב');
        }
    },
    mounted() {
        setTimeout(() => {
            this.changeAni = true;
            this.showNextButton = true;
        }, 1250);
    }
}
</script>

<style scoped>
.hearingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    font-family: 'Heebo';
}

.buttonCont {
    width: 85vw;
    display: flex;
    justify-content: flex-end; /* Align buttons to the end */
}

.buttons {
    margin: 1rem;
    border: none;
    cursor: pointer;
    font-family: 'Heebo';
    height: 3rem;
    font-size: 1.9rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    width: 11rem;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.buttons:hover,
.buttons:focus {
    animation: borderPulse 4000ms infinite ease-out, hoverShine 200ms;
}

@keyframes borderPulse {
    0% {
        box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, .4), 0px 0px 0px 0px rgba(255, 255, 255, 1);
    }
    35% {
        box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255, .2), 0px 0px 0px 10px rgba(255, 255, 255, 0);
    }
    50% {
        box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, .4), 0px 0px 0px 0px rgba(255, 255, 255, 1);
    }
    75% {
        box-shadow: inset 0px 0px 0px 3px rgba(117, 117, 255, .2), 0px 0px 0px 10px rgba(255, 255, 255, 0);
    }
    100% {
        box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, .4), 0px 0px 0px 0px rgba(255, 255, 255, 1);
    }
}

@keyframes hoverShine {
    0% {
        background-image: linear-gradient(135deg, rgba(255, 255, 255, .4) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%);
    }
    50% {
        background-image: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .4) 50%, rgba(255, 255, 255, 0) 100%);
    }
    100% {
        background-image: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, .4) 100%);
    }
}

.textPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
}


.explanation {
    margin: 7rem;
    margin-top: 16rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 1.5rem;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    padding: 3rem 2rem;
    border-radius: 2rem;
}

.container  {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    direction: rtl;
}

.scale {
    animation: scaleScreen 1.25s linear forwards;
}


@-moz-keyframes floatAnimation {
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

@-webkit-keyframes scaleScreen {
   0% {
       transform: scale(0);
   }
   100% {
       transform: scale(1);
   }
}

@keyframes scaleScreen {
   0% {
       transform: scale(0);
   }
   100% {
       transform: scale(1);
   }
}

.heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
}

.float {
    animation: floatAnimation 3s ease-in-out infinite;
}

.basicTitle {
    margin-bottom: 2vh;
   font-size: 3.3rem;
   font-weight: 600;
 }

 .titleCircle {
    width: 5rem;
    height: 5.5rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.75rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 7px #0003;
    transition: all .3s ease;
    background-color: hsl(var(--hue),50%,75%);
    padding: 4rem;
    position: absolute;
    top: -3rem;
    right: -3rem;
    z-index: 2;
    cursor: pointer;
 } 


</style>
