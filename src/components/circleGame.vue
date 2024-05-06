<template>
    <div v-for="(section, id) in sections" :key="id" v-show="cicleSectionCounter === id">
        <div v-for="(option, index) in section" :key="index" class="circle" :id="option.id" @click="calculatePoints" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, `top: ${Math.floor(Math.random() * (60 - 2) + 2) * 1.2}vh`, `left: ${Math.floor(Math.random() * (60 - 2) + 2) * 1.2}vw`]">
            {{ option.option }}
        </div>
        <!-- <div id="circle" v-show="circleVisible" v-for="(option, index) in section" @click="disappear" :key="index" :style="[`--hue: ${(changeColor) * 15 + 130}deg`, { top: `${Math.floor(Math.random() * (70 - 2) + 2)}vh`, left: `${Math.floor(Math.random() * (70 - 2) + 2)}vw`}]">{{ option.option }}</div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleVisible: false,
            changeColor: 0,
            cicleSectionCounter: 0,
            sections : [
                [
                    {
                        option: "מיקוד בדבר המפקד",
                        isCorrect: true,
                        clicked: false,
                        id: 0
                    },
                    {
                        option: "עיסוק בשפת גוף של המפקד",
                        isCorrect: true,
                        clicked: false,
                        id: 1
                    },
                    {
                        option: "עיסוק ברעשי רקע",
                        isCorrect: false,
                        clicked: false,
                        id: 2
                    },
                    {
                        option: "עיסוק בבקיאות החניכים",
                        isCorrect: false,
                        clicked: false,
                        id: 3
                    },
                ],
                [
                    {
                        option: "עיסוק בדיגום החניכים",
                        isCorrect: false,
                        clicked: false,
                        id: 0
                    },
                    {
                        option: "מיקוד בכלי כתיבה של החניכים",
                        isCorrect: true,
                        clicked: false,
                        id: 1
                    },
                    {
                        option: "מיקוד בכתב המדריך",
                        isCorrect: false,
                        clicked: false,
                        id: 2
                    },
                    {
                        option: "מיקוד בבקיאות המדריך",
                        isCorrect: true,
                        clicked: false,
                        id: 3
                    },
                ], 
                [
                    {
                        option: "מיקוד בביצוע מורכב",
                        isCorrect: true,
                        clicked: false,
                        id: 0
                    },
                    {
                        option: "עיסוק בתגובות החניכים",
                        isCorrect: true,
                        clicked: false,
                        id: 1
                    },
                    {
                        option: "מיקוד בביצועים חד פעמיים",
                        isCorrect: false,
                        clicked: false,
                        id: 2
                    },
                    {
                        option: "עיסוק בדיבורי החניכים",
                        isCorrect: false,
                        clicked: false,
                        id: 3
                    },
                ],
                [
                    {
                        option: "עיסוק בכלל הדברים שקורים",
                        isCorrect: true,
                        clicked: false,
                        id: 0
                    },
                    {
                        option: "מיקוד בביצועים חוזרים",
                        isCorrect: true,
                        clicked: false,
                        id: 1
                    },

                    {
                        option: "מיקוד בדיגום של המפקד",
                        isCorrect: true,
                        clicked: false,
                        id: 2
                    },
                    {
                        option: "מיקוד בביצוע פשוט",
                        isCorrect: false,
                        clicked: false,
                        id: 3
                    },
                ],
                [
                    {
                        option: "מיקוד בעזרי הדרכה",
                        isCorrect: true,
                        clicked: false,
                        id: 0
                    },
                    {
                        option: "עיסוק בסביבת ההדרכה",
                        isCorrect: true,
                        clicked: false,
                        id: 1
                    },
                    {
                        option: "עיסוק בהפרעות",
                        isCorrect: false,
                        clicked: false,
                        id: 2
                    },
                    {
                        option: "מיקוד בביצוע ספציפי",
                        isCorrect: false,
                        clicked: false,
                        id: 3
                    },
                ],    
            ],
        }
    },
    methods: {
        setCircleColor() {
            this.changeColor+= 3;
            this.cicleSectionCounter++;

            if (this.cicleSectionCounter === 6) {
                this.cicleSectionCounter = 0;
            }

            setTimeout(() => {
                this.setCircleColor();
            }, 3000);
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
        calculatePoints(event) {
            console.log(event.currentTarget);
        }
    },
    mounted() {
        this.setCircleColor();
    }
} 
</script>

<style>
.circle {
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
        background-color: hsl(var(--hue),42%,60%);
    }
    100% {
        background-color: hsl(var(--hue),50%,75%);
    }
}
</style>