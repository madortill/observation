<script>
  export default {
    props: ["chapter"],
    data() {
      return {
        subjectCounter: 0,
        showBackButton: false,
        subjectsInfo: [
            {
                subSubjectTitle: "הוראות בטיחות",
                subjectText: ` לשים <img src="src/assets/heart.png" class='heartIcon' /> כי הינך צריך להיות נוכח במקום שמאפשר לך לטפל באירועי בטיחות. <br> <br> 
                כגון: תצפית על חניך שטווח בנשק.`
            },
            {
                subSubjectTitle: "מאפיינים אישיים של המדריך",
                subjectText: `ישנם מדריכים בתצפית ההדרכה שמעדיפים שהמתצפת ישב קרוב ללוח מכיוון שזה מעניק להם תחושת בטחון וחופשיות.`
            },
            {
                subSubjectTitle: "רואה ולא נראה",
                subjectText: `המתצפת צריך למקם את עצמו במקום בו רואה את כל הכיתה אך לא מתבלט בה.`
            }
        ]
      }
    },
    methods: {
        nextSubject() {
            this.subjectCounter++; 
            if (this.subjectCounter === 1) {
                this.showBackButton = true;
            }
            // if (this.subjectCounter === 3) {
            //     this.$emit('backToHomePage', 'בחירת מיקום');
            // }
        },
        prevSubject() {
            this.subjectCounter--;
            if (this.subjectCounter === 0) {
                this.showBackButton = false;
            }
        }
    }
  }
</script>

<template>
    <div class="placement">
        <div class="basicTitle">
            {{ chapter }} <p v-if="subjectCounter < 3"> - {{ subjectsInfo[subjectCounter]["subSubjectTitle"] }}</p>
        </div>
        <div v-if="subjectCounter < 3" class="firstPart">
            <div class="explanation" v-html="subjectsInfo[subjectCounter]['subjectText']"></div>
            <div class="buttonCont">
                <button class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" @click="prevSubject">
                    חוזרים
                </button>
            </div>
        </div>
        <div class="secondPart" v-else>
            <div class="instructions">בזמן שיעור תצפית - <br> באיזה מיקום כדאי למתצפת לשבת לצורך קבלת תצפית מיטבית?</div>
        </div>
    </div>

</template>


<style scoped>
.placement {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
}

.basicTitle {
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.buttons {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #6f9cb8;
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
    background-color: #426991;
}

.explanation, .instructions {
    width: 32vw;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.671);
    font-size: 2rem;
    padding: 8vh 5vw;
    border-radius: 2rem;
    line-height: 1.5;
    animation: floatAnimation 3s ease-in-out infinite;
}

.explanation ::v-deep .heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
    /* display: none; */
}

.firstPart, .secondPart {
    margin-top: 17.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75vh;
    direction: rtl;
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

</style>
