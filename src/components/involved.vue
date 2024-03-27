<script>
  export default {
    props: ["chapter"],
    data() {
      return {
        subArr: [
            {
                title: "התערבות עקיפה",
                explain: 'התערבות זו מגיעה ישירות לאחר ביצוע התצפית, עוד לפני שלב המשוב. שימושה בעיקר בעת הסבר של פערים מקצועיים קריטיים שהיו בהדרכה.'
            },
            {
                title: "התערבות ישירה",
                explain: 'בהתערבות זו המתצפת חודל את השיעור ומתקן את הנחנך במידת הצורך. בהתערבות זו נשתמש רק למקרים של בטיחות או עברה על הפקודות.'
            }
        ]
      }
    },
    methods: {
        
    }
  }
</script>

<template>
    <div class="involved">
        <div class="basicTitle">
          {{ chapter }}
        </div>
        <div class="circleCont">
            <div :class="sub.beenThere ? 'beenThere' : 'subjectCicle'" :style="`--hue: ${(index + 3) * 15 + 130}deg`" @click="changeSubject">{{ sub.title }}</div>
        </div>
    </div>
</template>


<style scoped>
.involved {
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
</style>
