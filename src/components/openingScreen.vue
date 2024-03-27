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
    font-size: 10rem;
    padding-top: 32vh;
    width: 55vw;
    color: rgb(68, 68, 68);
    animation: floatAnimation-7537332f 3s ease-in-out infinite;
    justify-content: space-around;
}

.startingButton {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    background-color: #6f9cb8;
    text-align: center;
    cursor: pointer;
    color: white;
    border: none;
    box-shadow: 2px 6px 10px 1px rgba(0,0,0,0.5);
}

.startingButton:hover {
    background-color: #426991;
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
