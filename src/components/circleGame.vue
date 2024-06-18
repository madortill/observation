<template>
    <div v-for="(section, id) in sections" :key="id" class="circle-container" v-show="circleSectionCounter === id">
        <div v-for="(option, index) in section" :key="index">
            <div v-show="option.clicked" class="clickedContainer"><img class="icon" :src="option.isCorrect ? '../assets/check.png' : '../assets/cancel.png'" />{{ score }}</div>
            <div class="circle colorAni" :id="option.id" :style="`--hue: ${(changeColor) * 15 + 130}deg`" @click="disappear" >
                {{ option.option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["setInScore", "callingTimer"],
    data() {
        return {
            changeColor: 0,
            correctCircle: 0,
            circleClickedTimes: 0,
            circleSectionCounter: 0,
            disappearTimer: null,
            score: null,
            sections : [
                [
                    {
                        option: "מיקוד בדבר המפקד",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 0
                    },
                    {
                        option: "עיסוק בשפת גוף של המפקד",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 1
                    },
                    {
                        option: "עיסוק ברעשי רקע",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 2
                    },
                    {
                        option: "עיסוק בבקיאות החניכים",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 3
                    },
                ],
                [
                    {
                        option: "עיסוק בדיגום החניכים",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 0
                    },
                    {
                        option: "מיקוד בכלי כתיבה של החניכים",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 1
                    },
                    {
                        option: "מיקוד בכתב המדריך",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 2
                    },
                    {
                        option: "מיקוד בבקיאות המדריך",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 3
                    },
                ], 
                [
                    {
                        option: "מיקוד בביצוע מורכב",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 0
                    },
                    {
                        option: "עיסוק בתגובות החניכים",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 1
                    },
                    {
                        option: "מיקוד בביצועים חד פעמיים",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 2
                    },
                    {
                        option: "עיסוק בדיבורי החניכים",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 3
                    },
                ],
                [
                    {
                        option: "עיסוק בכלל הדברים שקורים",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 0
                    },
                    {
                        option: "מיקוד בביצועים חוזרים",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 1
                    },

                    {
                        option: "מיקוד בדיגום של המפקד",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 2
                    },
                    {
                        option: "מיקוד בביצוע פשוט",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 3
                    },
                ],
                [
                    {
                        option: "מיקוד בעזרי הדרכה",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 0
                    },
                    {
                        option: "עיסוק בסביבת ההדרכה",
                        isCorrect: true,
                        clicked: false,
                        seen: true,
                        id: 1
                    },
                    {
                        option: "עיסוק בהפרעות",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 2
                    },
                    {
                        option: "מיקוד בביצוע ספציפי",
                        isCorrect: false,
                        clicked: false,
                        seen: true,
                        id: 3
                    },
                ],    
            ],
        }
    },
    methods: {
        appeared() {    
            this.$emit('callingTimer', 12, this.circleSectionCounter);

            for (let i = 0; i < this.sections[this.circleSectionCounter].length; i++) {
                if (!this.sections[this.circleSectionCounter][i]["clicked"]) {
                    document.getElementById(`${this.sections[this.circleSectionCounter][i]["id"]}`).classList.remove("disappearAni");
                    document.getElementById(`${this.sections[this.circleSectionCounter][i]["id"]}`).classList.add("appearAni");
                }
            }

            setTimeout(() => {
                this.changeColor+= 3;
                this.circleSectionCounter++;

                this.appeared();
            }, 12000);
        },
        disappear(event) {
            if (event !== undefined) {
                for (let i = 0; i < this.sections[this.circleSectionCounter].length; i++) {
                    this.correctCircle++;
                    
                    if (this.sections[this.circleSectionCounter][i]["id"] === Number(event.currentTarget.id)) {
                        this.circleSectionCounter++;
                        this.sections[this.circleSectionCounter][i]["clicked"] = true;
                        this.sections[this.circleSectionCounter][i]["seen"] = false;
                        event.currentTarget.classList.remove("appearAni");
                        event.currentTarget.classList.add("disappearAni");

                        setTimeout(() => {
                            this.sections[this.circleSectionCounter][i]["clicked"] = false;
                        }, 500)

                        if (this.sections[this.circleSectionCounter][i]["isCorrect"]) {
                            this.score = '+250';
                            this.$emit('setInScore', true);
                        } else {
                            this.score = '-100';
                            this.$emit('setInScore', false);
                        }

                    }
                    if (this.correctCircle === this.circleSectionCounter) {
                        this.circleSectionCounter++;
                    }
                }
            }

            clearTimeout(this.disappearTimer);
        }
    },
    mounted() {
        this.appeared();
    }
} 
</script>

<style>
.clickedContainer {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    width: 10vw;
    direction: ltr;
    justify-content: space-evenly;
    flex-direction: row-reverse;
}

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
    cursor: pointer;
    box-shadow: 0 5px 7px #0003;
}

.circle-container {
    display: flex;
    width: 100vw;
    justify-content: space-evenly;
    align-items: center;
}

.colorAni {
    animation: animationColors 2s ease-in-out;
    animation-iteration-count: infinite;
}

.disappearAni {
    animation: disappearCircle 1.25s linear forwards;
    background-color: hsl(var(--hue),50%,75%);
}

.appearAni {
    animation: appearCircle 1.25s linear forwards;
    background-color: hsl(var(--hue),50%,75%);
}

.icon {
    width: 3vw;
}

/* .upAni {
    animation: up 2s linear infinite, animationColors 2s ease-in-out;
} */

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

@keyframes disappearCircle {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(0);
    }
}

@keyframes appearCircle {
    0% {
        transform: scale(0);
    }
    25% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes up {
    0% {
        margin-bottom: 0vh;
    }
    50% {
        margin-bottom: 10vh;
    }
    100% {
        margin-bottom: 0vh;
    }
}
</style>