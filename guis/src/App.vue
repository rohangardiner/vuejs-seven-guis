<template>
  <!-- Container flex box -->
  <header>
    <!-- Logo/Nav flex box -->
    <img alt="Icon of the number seven" class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Eo_circle_blue_number-7.svg/2048px-Eo_circle_blue_number-7.svg.png" width="125" height="125" />
    <nav>
      <h1>7 GUIs</h1>
      <router-link to="/">Home</router-link><br>
      <router-link to="/count">Counter</router-link><br>
      <router-link to="/temp">Temperature Converter</router-link><br>
      <router-link to="/flights">Flight Booker</router-link><br>
      <router-link to="/timer">Timer</router-link><br>
      <router-link to="/crud">CRUD</router-link><br>
      <router-link to="/circle">Circle Drawer</router-link><br>
      <router-link to="/cells">Cells</router-link><br>
    </nav>
  </header>
  <article>
    <!-- router-view renders whatever page we've routed to using router-links -->
    <router-view />
  </article>
</template>

<script>
export default {
  mounted() {
    // I needed somewhere easy to set the browser title, call it a hack
    document.title = '7 GUIs - Rohan Gardiner'
  }
}
</script>

<style>
/* Set full page app */
body {
  height: 100vh;
  overflow: hidden;
}

/* Define flex box and set this to use the full height of container */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-width: 1800px;
}

/* Would prefer to use max-width on container, but this works for now */
#app > * {
  max-height: 1000px;
  width: 900px;
}

/* Aligning Logo/Navigation flex box */
header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.criteria {
  background-color: beige;
  border-left: 3px solid burlywood;
  padding: 10px;
  margin: 20px 0;
  width: 800px;
}
.criteria .yes { list-style-image: linear-gradient(to bottom, green, lime); }
.criteria .kinda { list-style-image: linear-gradient(to bottom, orange, yellow); }
.criteria .no { list-style-image: linear-gradient(to bottom, red, brown); }
</style>
