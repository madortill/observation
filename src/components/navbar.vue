<template>
    <div id="navbar">
        <div class="container">
            <nav>
                <ul @click="chosenTitle">
                    <li :class="{ active: pageCounter === 1 }">הגדרת יסוד</li>
                    <li :class="{ active: pageCounter === 2 }">מאפייני יסוד</li>
                    <li :class="{ active: pageCounter === 3 }">הכנה עצמית לביצוע תצפית</li>
                    <li :class="{ active: pageCounter === 4 }">לצורך תצפית מיטבית</li>
                </ul>
            </nav>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'navbar',
    props: ["pageCounter"],
    data() {
        return {

        };
    },
    methods: {
        chosenTitle(event) {
            if (event.target.tagName === "li") {
                this.pageCounter = parseInt(event.target.id.slice(-1)) - 1;
                this.$emit('chosen-page', this.pageCounter);
            }
        },
    },
};
</script>
  
<style scoped>
.container {
    height: 10vh;
    width: 100vw;
    direction: rtl;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    position: fixed;
    top: 3vh;
}

* {
    margin: 0;
    box-sizing: border-box;
}

nav {
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);

}

nav ul li {
    padding: 0;
    list-style: none;
    display: inline-block;
    padding: 5px 50px;
    margin: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    color: #777;
    position: relative;
    z-index: 2;
    cursor: default;
    transition: color 0.5s;
}

nav ul li.active {
    background: #65B891;
    cursor: pointer;
    border-radius: 30px;
    color: white;
}
</style>
  