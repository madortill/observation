<template>
    <div class="hearingContainer">
         <div class="basicTitle">
             {{ chapter }} - {{ subSubjectTitle[subjectCounter] }}
         </div>
         <div class="firstPart">
             <div class="instructions">
 
             </div>
             <div class="notes-area">
                 <div class="paper">
                     <div class="lines">
                         <div class="text" spellcheck="false">
                             משימתכם עכשיו לתאר את החופשה הכי חלומית שלכם על הדף.<br /><br />
                             <div class="text-2" contenteditable spellcheck="false">
                                 תערכו את הטקסט כאן...
                             </div>
                         </div>
                     </div>
                     <div class="holes hole-top"></div>
                     <div class="holes hole-middle"></div>
                     <div class="holes hole-bottom"></div>
                 </div>
             </div>
             <div id="circle" v-show="circleVisible" @click="isCircleVisible" :style="`--hue: ${(changeColor) * 15 + 130}deg`">לחצו עליי</div>
         </div>
         <div class="secondPart">
 
         </div>
         <div class="thirdPart">
 
         </div>
    </div>
 </template>
 
 <script>
 export default {
     props: ["chapter"],
     data() {
        return {
            subSubjectTitle: ["דברים קורים בנפרד", "הפרד בין עיקר ותפל", "ביצועים מורכבים / פשוטים"],
            subjectCounter: 0,
            circleVisible: false,
            changeColor: 0, 
            totalTime: 0
        };        
     },
     methods: {
        updateCounter() {
            this.subjectCounter++; 
        },
        isCircleVisible(event) {
            let randomTime = Math.random() * (9 - 1) + 1;
            this.totalTime = randomTime * 1000;
        
            if (this.circleVisible && event !== undefined) {
                this.changeColor+= 3;
                this.circleVisible = false;
                
                setTimeout(() => {
                    this.circleVisible = true;
                }, this.totalTime);
            } else {
                setTimeout(() => {
                    this.circleVisible = true;
                }, this.totalTime);
            }
        }
     },
     mounted() {
        this.isCircleVisible();
     }
 }
 </script>
 
 <style scoped>
 .hearingContainer {
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
 
 @import url(https://fonts.googleapis.com/css?family=Indie+Flower);
 body {
   margin: 0;
   padding: 0;
 }
 .paper {
   position: absolute;
   height: 55vh;
   width: 27vw;
   background: rgba(255,255,255,0.9);
   margin: -275px -225px;
   left: 50%;
   top: 50%;
   box-shadow: 0px 0px 5px 0px #888;
 }
 .paper::before {
   content: '';
   position: absolute;
   left: 45px;
   height: 100%;
   width: 2px;
   background: rgba(255,0,0,0.4);
 }
 .lines {
   margin-top: 40px;
   height: calc(100% - 40px);
   width: 100%;
   background-image: repeating-linear-gradient(white 0px, white 24px, steelblue 25px);
 }
 .text {
   position: absolute;
   top: 65px;
   left: 55px;
   bottom: 10px;
   right: 10px;
   line-height: 25px;
   font-family: 'Indie Flower';
   overflow: hidden;
   outline: none;
 }
 
 .text-2 {
     position: absolute;
     top: 4.75vh;
     left: 10vw;
     bottom: 10px;
     right: 10px;
     color: rgb(134, 134, 134);
     line-height: 25px;
     font-family: 'Indie Flower';
     overflow: hidden;
     outline: none;
 }
 .holes {
   position: absolute;
   left: 10px;
   height: 25px;
   width: 25px;
   background: transparent;
   border-radius: 50%;
   box-shadow: inset 0px 0px 2px 0px #888;
 }
 .hole-top {
   top: 10%;
 }
 .hole-middle {
   top: 50%;
 }
 .hole-bottom {
   bottom: 10%;
 }
 
 #circle {
   width: 5.75rem;
   height: 6rem;
   border-radius: 50%;
   text-align: center;
   color: #413f3f;
   font-size: 2.5rem;
   font-weight: 550;
   padding: 3.5%;
   color: white;
   z-index: 2;
   display: block;
   position: absolute;
   cursor: pointer;
   box-shadow: 0 5px 7px #0003;
   /* background-color: hsl(var(--hue),50%,75%); */
   animation: animationColors 2s ease-in-out;
   animation-iteration-count: infinite;
 }
 
   @keyframes animationColors {
     0% {
         background-color: hsl(var(--hue),50%,75%);
     } 
     50% {
         background-color: hsl(var(--hue),40%,40%);
     }
     100% {
         background-color: hsl(var(--hue),50%,75%);
     }
   }
 </style>
 