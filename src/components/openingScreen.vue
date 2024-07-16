<template>

    <div class="openingScreen">
        <div class="openingTitle"><p>לומדת</p><p>תצפית</p></div>
        <button class="startingButton" @click="$emit('changeCurrentScreen'); $emit('changeShrinkBackground', 'backgroundAniShrink')">מתחילים</button>
    </div>

</template>

<script>
export default {
    data() {
        return {};        
    },
    methods: {
    }
}
</script>

<style scoped>
.openingScreen {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.openingTitle {
    font-weight: 700;
    display: flex;
    direction: rtl;
    font-size: 8rem;
    padding-top: 33vh;
    width: 52vw;
    color: rgb(110, 110, 110);
    animation: floatAnimation 3s ease-in-out infinite;
    justify-content: space-around;
}

.startingButton {
    border: none;
    cursor: pointer;   
    height: 7%;
    bottom: 30%;
    font-size: 2.1rem;
    color: #ffffff;
    border-radius: 100px;
    background-color: #0e5745d8;
    min-width: 12%;
}

.startingButton {
	animation: borderPulse 4000ms infinite ease-out;
}

.startingButton:hover,
.startingButton:focus {
	animation: borderPulse 4000ms infinite ease-out,  hoverShine 200ms;
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
</style>
