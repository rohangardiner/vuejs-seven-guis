<template>
    <h1>Timer</h1>
    <!-- Progress bar using elapsed time computed variable as value -->
    <div>Elapsed time: <progress :value="elapsedTime"></progress></div>

    <!-- Time in text, to one decimal place -->
    <div>{{ (elapsedTime / 1000).toFixed(1) }}s</div>

    <!-- Handle/track to choose time, max 60s in miliseconds, to one decimal place -->
    <div>Duration: <input type="range" v-model="duration" min="1" max="60000"> {{ (duration / 1000).toFixed(1) }}s</div>

    <!-- Button to reset timer -->
    <button @click="reset">Reset Timer</button>

    <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">A frame containing a gauge for an elapsed time.</li>
      <li class="yes">A label which shows the elapsed time as a numerical value.</li>
      <li class="yes">A slider by which the duration of the timer can be adjusted while the timer is running.</li>
      <li class="yes">A reset button.</li>
      <li class="yes">Adjusting the slider must immediately reflect on the duration & gauge (not only when the slider is released).</li>
      <li class="kinda">When the elapsed time &ge; duration, the timer stops (and the gauge will be full). If, thereafter, the duration is increased such that the duration &gt; elapsed time, the timer starts to tick until elapsed time &ge; duration again.</li>
      <li class="yes">Clicking the reset button will reset elapsed time to zero.</li>
    </ul>
  </div>
  </template>

  <script>
  export default {
    data() {
      return {
        // Set default duration
        duration: 15 * 1000,
        // Set default time elapsed
        elapsedTime: 0
      }
    },

    mounted() {
      // Once page fully loaded, reset the timer
      this.reset()
    },

    unmounted() {
      // Called after computed events finished, stop the progress bar
      cancelAnimationFrame(this.handle)
    },

    computed: {
      // Calculated when dependencies update, eg elapsed
      elapsedTime() {
        // Returns how much time has elapsed, until it matches the user-set duration
        return Math.min(this.elapsedTime / this.duration, 1)
      }
    },

    methods: {
      update() {
        // Elapsed time is just the time between now and when we last reset
        this.elapsedTime = performance.now() - this.resetTime
        if (this.elapsedTime >= this.duration) {
          // When the elapsed time reaches user-set duration, stop the progress bar
          cancelAnimationFrame(this.handle)
        } else {
          // Otherwise, call yourself again to update it! Hope we don't get stuck here!!
          this.handle = requestAnimationFrame(this.update)
        }
      },

      reset() {
        // Reset everything, get the current time in ms
        this.elapsedTime = 0
        this.resetTime = performance.now()
        this.update()
      }
    }
  }
</script>

<style>
</style>