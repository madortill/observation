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
    font-size: 9.5rem;
    padding-top: 32vh;
    width: 55.5vw;
    color: rgb(110, 110, 110);
    animation: floatAnimation 3s ease-in-out infinite;
    justify-content: space-around;
}

.startingButton {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #0c5341;
    text-align: center;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
}

.startingButton:hover {
    background-color: #116d56;
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
