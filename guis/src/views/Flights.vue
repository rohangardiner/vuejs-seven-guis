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

    <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">Build a frame containing: A combobox with the two options; "one-way flight" and "return flight"; Two textfields representing the start and return date; A button for submitting the selected flight.</li>
      <li class="yes">The return textfield is enabled if the combobox&apos;s value is "return flight".</li>
      <li class="yes">When the combobox has the value "return flight" & the return textfield&apos;s date is strictly before start textfield&apos;s then the submit button is disabled.

</li>
      <li class="kinda">When a non-disabled textfield has an ill-formatted date then it is colored red & the submit button is disabled.

</li>
      <li class="yes">When clicking the submit button a message is displayed informing the user of their selection (e.g. "You have booked a one-way flight on 04.04.2014.").

</li>
      <li class="yes">Initially: The combobox has the value "one-way flight"; Both textfields have the same (arbitrary) date (it is implied that the return textfield is disabled).
</li>
    </ul>
  </div>
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

