<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
    <h1>
      7 GUIs
    </h1>
  </header>
  <nav id="nav">
      <router-link to="/">Home</router-link><br>
      <router-link to="/count">Counter</router-link><br>
      <router-link to="/temp">Temperature Converter</router-link><br>
      <router-link to="/flights">Flight Booker</router-link><br>
      <router-link to="/timer">Timer</router-link><br>
      <router-link to="/crud">CRUD</router-link><br>
      <router-link to="/circle">Circle Drawer</router-link><br>
      <router-link to="/cells">Cells</router-link><br>
  </nav>
  <router-view />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
body {
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

nav {
  text-align: left;
}
</style>
