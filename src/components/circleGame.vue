<template>
    <div v-for="(section, id) in sections" :key="id" v-show="cicleSectionCounter === id">
        <div v-for="(option, index) in section" :key="index" id="circle" @click="disappear" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, `top: ${Math.floor(Math.random() * (60 - 2) + 2) * 1.5}vh`, `left: ${Math.floor(Math.random() * (60 - 2) + 2) * 1.5}vw`]">
            {{ option.option }}
        </div>
        <!-- <div id="circle" v-show="circleVisible" v-for="(option, index) in section" @click="disappear" :key="index" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, { top: `${Math.floor(Math.random() * (70 - 2) + 2)}vh`, left: `${Math.floor(Math.random() * (70 - 2) + 2)}vw`}]">{{ option.option }}</div> -->
    </div>
</template>

<script>
export default {
    props: ["sections", "cicleSectionCounter"],
    data() {
        return {
            circleVisible: false,
            changeColor: 0,
        }
    },
    methods: {
        setCircleColor() {
            this.changeColor+= 3;
            setTimeout(() => {
                this.setCircleColor();
            }, 3500);
        },
        appeared() {
            this.circleVisible = true;
            this.disappearTimer = setTimeout(this.disappear, 6000);
        },
        disappear(event) {
            if (event !== undefined) {
                this.circleClicked++;

                if (this.circleClicked === 3) {
                    setTimeout(this.nextSubject, 1000);
                }
            }

            clearTimeout(this.disappearTimer);
            this.circleVisible = false;

            setTimeout(this.appeared, 2000);
        },
    },
    mounted() {
        this.setCircleColor();
    }
} 
</script>

<style>
#circle {
    width: 10.25rem;
    height: 10.5rem;
    border-radius: 50%;
    text-align: center;
    color: #413f3f;
    font-size: 2.275rem;
    font-weight: 550;
    padding: 5.75rem;
    color: white;
    z-index: 2;
    display: block;
    position: absolute;
    cursor: pointer;
    box-shadow: 0 5px 7px #0003;
    animation: animationColors 2s ease-in-out;
    animation-iteration-count: infinite;
} 

@keyframes animationColors {
    0% {
        background-color: hsl(var(--hue),50%,75%);
    } 
    50% {
        background-color: hsl(var(--hue),40%,40%);
    }
    100% {
        background-color: hsl(var(--hue),50%,75%);
    }
}
</style>