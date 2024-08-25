<template>
  <div id="navbar">
    <div class="container" :class="{ 'hamburger': isHamburgerStyle }">
      <div v-if="isHamburgerStyle" class="menu-icon" @click="toggleMenu">
        <div :class="{ 'bar': true, 'bar-top': isMenuOpen }"></div>
        <div :class="{ 'bar': true, 'bar-middle': isMenuOpen }"></div>
        <div :class="{ 'bar': true, 'bar-bottom': isMenuOpen }"></div>
      </div>
      <nav :class="{ open: isMenuOpen, closed: !isMenuOpen && showGoodWatching, default: !isHamburgerStyle }">
        <ul :class="{ 'vertical': isHamburgerStyle }">
          <li
            v-for="(hebrewTitle, name) in titles"
            :key="name"
            :class="{ active: componentName === name, disabled: !whereBeen.includes(name) }"
            @click="chosenTitle(name, showGoodWatching)"
          >
            {{ hebrewTitle }}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    componentName: String,
    showGoodWatching: Boolean,
    whereBeen: Array,
    isHamburgerStyle: {
      type: Boolean,
      default: true // Set hamburger style as default
    }
  },
  data() {
    return {
      isMenuOpen: false, // Start with menu closed
      titles: {
        "BasicPrince": "הגדרת יסוד",
        "Target": "מאפייני יסוד",
        "Prep": "הכנה עצמית לביצוע תצפית",
        "SummeryLast": "סיכום",
      }
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    chosenTitle(name, showGoodWatching) {
      if (this.whereBeen.includes(name)) {
        this.$emit('go-to-page', name, showGoodWatching);
        if (this.isHamburgerStyle) {
          this.isMenuOpen = false; // Close the menu if in hamburger style
        }
      }
    },
  },
};
</script>

<style scoped>
/* Base styles for the container */
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
  z-index: 3;
  top: 1.5rem;
}

/* Styles specific to hamburger style */
.container.hamburger {
  justify-content: space-between;
}

/* Base styles for nav */
nav {
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 15px 20px -20px rgba(0, 0, 0, 0.4);
  transition: max-height 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
}

/* Default navigation styles */
nav.default {
  max-height: none;
  width: auto;
  position: static;
}

nav.open {
  opacity: 1;
}

nav.closed {
  opacity: 0;
}

/* Vertical menu style */
nav ul.vertical {
  position: absolute;
  text-align: center;
  top: 1rem;
  right: 1rem;
  display: flex;
  width: 10rem;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 2rem;
  z-index: 1;
}

nav ul.vertical li:hover{
  border-radius: 2rem;
  background-color: #77777748;;
}

/* Horizontal menu style */
nav ul {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

/* Menu items */
nav ul li {
  padding: 0;
  list-style: none;
  padding: 8px 50px;
  margin: 10px;
  font-size: 1.2rem;
  color: #777;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: color 0.5s;
}

/* Active menu item */
nav ul li.active {
  background: #65B891;
  cursor: pointer;
  border-radius: 30px;
  color: white;
}

/* Menu icon */
.menu-icon {
  position: absolute;
  right: 1rem;
  top: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  z-index: 3;
}

/* Hamburger bars */
.bar {
  height: 4px;
  width: 100%;
  background-color: #777;
  transition: all 0.3s ease;
}

/* Animation for top bar */
.bar-top {
  transform: rotate(45deg) translate(5px, 5px);
}

/* Animation for middle bar */
.bar-middle {
  opacity: 0;
}

/* Animation for bottom bar */
.bar-bottom {
  transform: rotate(-45deg) translate(8.5px, -8.5px);
}

/* Reset animation for closed state */
.bar:not(.bar-top):not(.bar-middle):not(.bar-bottom) {
  transform: none;
  opacity: 1;
}

/* Navbar font family */
#navbar {
  font-family: 'heebo';
}

/* Disabled items */
.disabled {
  cursor: default;
}

</style>
