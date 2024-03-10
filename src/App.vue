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
.wrapper {
  background-image: url("src/assets/blueBackground.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
}

</style>
