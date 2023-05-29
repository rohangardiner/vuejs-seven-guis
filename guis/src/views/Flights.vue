<template>
  <h1>Flight Booker Page</h1>
  <p>
  <!-- Dropdown uses flightType variable -->
    <select v-model="flightType">
      <option value="one-way flight">One-way flight</option>
      <option value="return flight">Return flight</option>
    </select>
  </p>

  <p>
  <!-- Date picker, disable return date if one-way flight selected -->
    Depart: <input type="date" v-model="departDate"> <br>
    Return: <input type="date" v-model="returnDate" :disabled="!isReturnFlight">
  </p>

  <!-- Book button, disable if invalid input -->
  <button :disabled="!canBook" @click="book">Book</button>

  <!-- Check if valid input, show error text if not -->
    {{ canBook ? '' : 'Return date must be after depart date.' }}
</template>

<script>
  // Convert a string to a Date object.
  // Takes input string, dash-delimited and applies Date using split string.
  let stringToDate = (inputString) => {
    // Expects three parts, split by '-'
    const [y, m, d] = inputString.split('-')
    // Create a new Date object using the split string variables
    return new Date(y, m, d)
  }

  // Create string from Date object, using dash-delimiter.
  let dateToString = (date) => {
    // Add 1 to month because by default months start at 0. Oh my god.
    return ( date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) )
  }

  let pad = (n, s = String(n)) => {
    return s.length < 2 ? `0${s}` : s
  }

  export default {
    // Our beloved default data export function
    data() {
      return {
        // Default flight type is one-way for user
        flightType: 'one-way flight',
        // Use today's date for both fields, need to increment return by default
        departDate: dateToString(new Date()),
        returnDate: dateToString(new Date())
      }
    },

    computed: {
      // Is this a return flight? 
      isReturnFlight() {
        // return explicit string value for return flight, update UI
        return this.flightType === 'return flight'
      },
      // Check the user has entered valid booking parameters
      // Ignore if it's one way (only takes one date) but check if return date is after depart date if they're booking a return flight
      canBook() {
        return (
          !this.isReturnFlight || stringToDate(this.returnDate) > stringToDate(this.departDate)
        )
      }
    },
    methods: {
      book() {
        // Create alert depending on if they chose return flight on one-way
        alert(this.isReturnFlight ? `You have booked a return flight, leaving on ${this.departDate} and returning on ${this.returnDate}` : `You have booked a one-way flight leaving on ${this.departDate}.`)
      }
    }
  }
</script>

