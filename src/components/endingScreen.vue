<script>
  export default {
    data() {
      return {
        
    }
    },
    methods: {
      
    }
  }
</script>

<template>
    <div class="ending">
        <div class="text">
            <p>כל</p><p>הכבוד!</p>
        </div>
    </div>

</template>


<style scoped>
.ending {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    direction: rtl;
    overflow: hidden;
}

.text {
    font-weight: 700;
    display: flex;
    direction: rtl;
    font-size: 10rem;
    padding-top: 32vh;
    width: 55vw;
    color: rgb(68, 68, 68);
    animation: floatAnimation 3s ease-in-out infinite;
    justify-content: space-around;
}
</style>
