<template>
    <div class="prepare">
        <div class="prepareTitle">
            {{ chapter }}
        </div>
        <div>
            <div class="prevText">
                <br>
                טרם תחילת התצפית, עליכם להערך מראש על מנת שתוכלו לאסוף את הנתונים בצורה מדויקת וברורה.
                <br><br>
                <div v-for="(item, index) in preperationTitleList" :key="index" v-show="index <= lineText" :class="index === lineText ? 'typed' : 'stopTyped' " class="checkList typewriter"><img src="../assets/check-mark.png" class="check"/><b>{{item}} -</b> {{ preperationItemList[index] }}</div><br>
                <br>
                <div><img src="../assets/pin.png" alt="pin" class="pin" />זכרו - הכנה עצמית תקבע את אופן המוכנות שלכם לביצוע תצפית.</div>
            </div>
        </div>
        <div class="buttonCont">
            <button v-show="showNextButton || correctCounter === 4" class="buttons" @click="nextText">
                ממשיכים
            </button>
            <button v-show="showBackButton" class="buttons" @click="prevSubject">
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
            showNextButton: true,
            showBackButton: true,
            lineText : 0,
            preperationItemList: ["בו קוראת התצפית", "דף תצפית, עט, כל פריט נוסף שנדרש.", "כדי להגיע מוכנים ברמה הגבוהה ביותר.", "לחזור על קריטריונים של דף התצפית."],
            preperationTitleList: ["תיאום הזמן והמקום", "הכנת אמצעים", "איסוף רקע ומידע חסר", "חזרה על קריטריונים"],
            correctCounter: 0
    };        
    },
    mounted() {
        this.textAni();
    },
    methods: {
        textAni() {
            setInterval(() => {
                if (this.lineText < 4) {
                    this.lineText++;
                    
                }
            }, 3700);
        },
        prevSubject() {
            this.$emit('prevCurrentScreen');
        },
        nextText() {
            this.$emit('changeCurrentScreen');
        },

    },
}
</script>

<style scoped>
.prepare {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
    font-family: 'heebo';
}

.typewriter {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /*  Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  direction: rtl;
  margin: 0 auto;
  letter-spacing: .05em; 
} 

.typed {
    border-left: .1em solid black;
    animation: 
    typing 4.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

.stopTyped {
    border-left: .1em solid transparent;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black; }
}

.pin {
    width: 1.7vw;
    margin-left: 0.5vw;
}

.check {
    width: 2vw;
}

p {
    margin: 0;
}

.subTitle {
    font-weight: 800;
}

.textt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    direction: rtl;
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

.prepareTitle {
    margin-top: 16vh;
    font-size: 3rem;
    color: #083b2e;
    font-weight: 600;
}

.prevText {
    width: 43vw;
    text-align: center;
    display: flex;
    background-color: rgba(255, 255, 255, 0.671);
    /* height: 40vh; */
    font-size: 1.75rem;
    padding: 1vw;
    box-shadow: 2px 5px 10px 1px rgba(0, 0, 0, 0.35);
    border-radius: 2rem;
    line-height: 1.5;
    animation: floatAnimation 3s ease-in-out infinite;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.flexCont {
    display: flex;
    width: 100vw;
    height: 90vh;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10vh;
}

.introAni {
    animation: introText 2.25s 0.75s ease-in forwards;
}

@keyframes introText {
    0% {
        transform: scale(1.45);
    }
    25% {
        transform: scale(1.75);
    }
    40% {
        transform: scale(1.75);
    }
    100% {
        transform: scale(0);
    }
}

</style>

