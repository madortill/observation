<script>
import wholeScreen from './wholeScreen.vue';
  
  export default {
    data() {
      return {
      }
    },
    components: {
      wholeScreen
    },
    methods: {
    }
  }
</script>

<template>
    <div class="wrapper">
      <wholeScreen/>
    </div>

</template>


<style scoped>
@font-face {
  font-family: "heebo";
  src: url('./assets/fonts/Heebo/heebo.regular.ttf');
}

.wrapper {
  background-color: #e2e1e1;
  font-family: 'heebo';
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
}

</style>
