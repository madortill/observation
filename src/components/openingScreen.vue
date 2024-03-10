<template>

    <div class="openingScreen">
        <div class="openingTitle">תצפית</div>
        <button class="startingButton" @click="$emit('changeCurrentScreen'); $emit('changeShrinkBackground', 'backgroundAni')">מתחילים</button>
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

@font-face {
    font-family: "Heebo";
    src: url('src/assets/fonts/Heebo/Heebo-VariableFont_wght.ttf');
}
.openingScreen {
    font-family: "Heebo";
    background-image: url();
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.openingTitle {
    font-weight: 700;
    font-size: 9rem;
    padding-top: 29vh;
    animation: floatAnimation 3s ease-in-out infinite;
}

.startingButton {
    font-size: 1.65rem;
    padding: 2vh 3.5vw;
    /* background-image: url("src/assets/buttonDesign.svg"); */
    /* background-repeat: no-repeat; */
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
