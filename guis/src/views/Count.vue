<template>
  <h1>Counter Page</h1>
  {{ count }}
  <!-- Increment count on button click -->
  <button @click="count++">Click</button>
  
  <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">Build a frame containing a label or read-only textfield and a button.</li>
      <li class="yes">Initially, the value in the textfield is 0.</li>
      <li class="yes">Each click of the button increases the value in textfield by 1.</li>
    </ul>
  </div>
</template>

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