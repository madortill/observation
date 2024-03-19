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

<template>
    <div class="noting">
        <div class="basicTitle">
            {{ chapter }}
        </div>
        <div class="firstPart">
            
        </div>
        
    </div>
</template>


<style scoped>
.noting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  direction: rtl;
}

.basicTitle {
  font-size: 3rem;
  margin-top: 3vh;
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
