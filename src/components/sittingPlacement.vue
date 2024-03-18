<script>

  
  export default {
    props: ["chapter"],
    data() {
      return {
        subjectCounter: 0,
        subjectsInfo: [
            {
                subSubjectTitle: "הוראות בטיחות",
                subjectText: ` לשים <img src="../assets/heart.png" class="heartIcon" /> כי הינך צריך להיות נוכח במקום שמאפשר לך לטפל באירועי בטיחות. <br> <br> 
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
            {{ chapter }} - {{ subjectsInfo[subjectCounter]["subSubjectTitle"] }}
        </div>
        <div v-if="subjectCounter === 0" class="firstPart">
            <div class="explanation">
                {{ subjectsInfo[subjectCounter]["subjectText"] }}
            </div>
            <div class="buttonCont">
                <button class="buttons" @click="nextSubject">
                    ממשיכים
                </button>
                <button v-show="showBackButton" class="buttons" :click="prevSubject">
                    חוזרים
                </button>
            </div>
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
  margin-top: 3vh;
  font-size: 3rem;
  font-weight: 600;
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

.heartIcon {
    width: 2vw;
    position: relative;
    top: 0.5vh;
}

</style>
