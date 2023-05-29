<script>
  export default {
    // Default when this view is called
    // Data function returns a default value, requires Node v10+
    // Because count is the only thing I need here, I'm fine having it be returned by default, rather than get/set State
    data() {
      return {
        count: 0
      }
    }
  }
</script>

<template>
  <h1>Counter Page</h1>
  {{ count }}
  <!-- Increment count on button click -->
  <button @click="count++">Click</button>
</template>