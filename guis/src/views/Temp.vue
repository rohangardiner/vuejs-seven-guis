<template>
  <h1>Temperature Page</h1>
  <!-- On user input action, call method depending on input element -->
  <!-- Input element value will always be the variable, which is updated on any input change -->
  Celsius <input type="number" :value="tempC" @input="setC" min="-999" max="999"> 
  Fahrenheit <input type="number" :value="tempF" @input="setF" min="-999" max="999">
  <p>
    Fahrenheit = (degrees in Celsius * 9/5) + 32
  </p>
  <p>
    Quick explainer on formula, because I thought it was interesting:
  </p>
  <p>
    On the Fahrenheit scale, there are 180 degrees between the freezing point of water (32 deg F) and the boiling point of water (212 deg F).<br>
    On the Celcius scale, there are 100 degrees between the freezing point of water (0 deg C) and the boiling point of water (100 deg C).<br>
    Thus, 100 Celsius degrees represent the same temperature range as 180 Fahrenheit degrees. (180/100) = (9/5)<br>
    To change a temperature on the Celsius scale to a temperature on the Fahrenheit scale, Tf = (9Tc/5) + 32
  </p>
  <p>
    Thanks <a href="https://www.quora.com/Why-do-we-use-9-5-in-degree-Fahrenheit" target="_blank">Toby on Quora!</a>
  </p>
</template>

<script>
  export default {
    // Data function to return temperature variables
    data() {
      return {
        tempC: 0,
        tempF: 32
      }
    },
    // Methods section holds functions
    methods: {
      // Method within event handler uses 'e' instead of 'event' as of ES6
      // Using the <input> event.target.value, make calculations, returning result by default
      setC(e, tempC = +e.target.value) {
        this.tempC = tempC
        this.tempF = tempC * (9/5) + 32
      },
      setF(e, tempF = +e.target.value) {
        this.tempF = tempF
        this.tempC = (tempF - 32) * (5/9)
      }
    }
  }
</script>