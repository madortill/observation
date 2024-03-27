<template>
    <div class="info">
        <div class="container">
            מפתחת ראשית: <br>
            סמל שירה כהן <br> <br>
    
            UX / UI: <br>
            סמל שירה כהן <br> <br>
    
            גרפיקה: <br>
            טור' אדוה אבא<br> <br>
    
            רת"ח מו"פ: <br> 
            רס"ל אביב אואנונו<br><br>
    
            רמ"ד טי"ל:<br>
            רס"מ שלומי אוגרן
        </div>
    </div>
</template>

<script>
export default {
    props: ["chapter"],
    data() {
        return {
            
        }
    },
  methods: {
    
  }
}
</script>

<style scoped>
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
    direction: rtl;
}

.container {

}
</style>
