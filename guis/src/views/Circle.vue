<template>
  <h1>Circles</h1>

  <!-- Undo / Redo buttons -->
  <div class="controls">
    <!-- Disable Undo button if array index empty -->
    <button @click="undo" :disabled="index <= 0">Undo</button>
    <!-- Disable Redo button if we're at the latest index in array -->
    <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
  </div>

  <!-- The svg canvas, on click create a circle -->
  <svg @click="createCircle">
    <!-- Instructions area on canvas, still not sure how foreignObject works -->
    <foreignObject x="0" y="20%" width="100%" height="100">
      <p class="tip">Click on the canvas to draw a circle. Click on a circle to select it.</p>
      <p class="tip">Right-click on the canvas to adjust the radius of the selected circle.
      </p>
    </foreignObject>
    <defs>
      <pattern id="image" patternUnits="userSpaceOnUse" height="800" width="800">
        <image x="0" y="0" height="800" width="800" xlink:href="https://picsum.photos/800/800"></image>
      </pattern>
    </defs>
    <!-- Each circle in array gets drawn at their location -->
    <!-- Selected circle gets blue fill, otherwise the image fill defined in pattern -->
    <!-- Also if we right click a circle, disable rightclick menu -->
    <circle v-for="circle in circles"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle === selected ? '#0000ff80' : 'url(#image)'"
      @click="selected = circle"
      @contextmenu.prevent="adjustCircle(circle)">
    </circle>
  </svg>

  <!-- Adjusting dialog, close if we click elsewhere on the canvas -->
  <div class="dialog" v-if="adjusting" @click.stop>
    <!-- Remove decimals from x and y at print -->
    <p>Adjust radius of circle at ({{ selected.cx.toFixed(0) }}, {{ selected.cy.toFixed(0) }})</p>
    <input type="range" v-model="selected.r" min="1" max="400">
  </div>

  <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">Build a frame containing an undo and redo button as well as a canvas area underneath.</li>
      <li class="kinda">Left-clicking inside an empty area inside the canvas will create an unfilled circle with a fixed diameter whose center is the left-clicked point.</li>
      <li class="kinda">The circle nearest to the mouse pointer such that the distance from its center to the pointer is less than its radius, if it exists, is filled with the color gray.</li>
      <li class="yes">The gray circle is the selected circle.
</li>
      <li class="no">Right-clicking a selected circle will make a popup menu appear with one entry “Adjust diameter..”.
</li>
      <li class="yes">Clicking on this entry will open another frame with a slider inside that adjusts the diameter of selected circle (changes are applied immediately).
</li>
      <li class="yes">Closing this frame will mark the last diameter as significant for the undo/redo history.
</li>
      <li class="yes">Clicking undo will undo the last significant change (i.e. circle creation or diameter adjustment).
</li>
      <li class="yes">Clicking redo will reapply the last undoed change unless new changes were made by the user in the meantime.
</li>
    </ul>
  </div>
</template>

<script>
// Duplicate array when we use undo/redo, creating a parallel universe
function clone(circles) {
  return circles.map((c) => ({ ...c }))
}

// Set up default data variables for this view
export default {
  data() {
    return {
      history: [[]],
      index: 0,
      circles: [],
      selected: null,
      adjusting: false
    }
  },

  methods: {
    // Called by clicking on the svg. Attemptes to create a circle
    createCircle({ clientX: x, clientY: y }) {
      // Adjust x/y based on canvas offset instead of window position
      x = x - document.querySelector("svg").getBoundingClientRect().left
      y = y - document.querySelector("svg").getBoundingClientRect().top

      // Check if we're adjusting an existing circle
      if (this.adjusting) {
        this.adjusting = false
        this.selected = null
        this.push()
        return
      }

      // Find the selected circle in circles array for adjusting
      this.selected = [...this.circles].reverse().find(({ cx, cy, r }) => {
        const dx = cx - x
        const dy = cy - y
        return Math.sqrt(dx * dx + dy * dy) <= r
      })

      // Finally, if we can create a new circle, add it to canvas and push to array
      if (!this.selected) {
        this.circles.push({
          cx: x,
          cy: y,
          r: 50
        })
        this.push()
      }
    },

    // Set current circle and adjusting mode
    adjustCircle(circle) {
      this.selected = circle
      this.adjusting = true
    },

    // Update circles array
    push() {
      this.history.length = ++this.index
      this.history.push(clone(this.circles))
    },

    // Duplicate array, but remove latest addition
    undo() {
      this.circles = clone(this.history[--this.index])
    },

    // Duplicate array, but re-add the previous removed circle
    redo() {
      this.circles = clone(this.history[++this.index])
    }
  }
}
</script>

<style scoped>
/* Canvas */
svg {
  width: 800px;
  height: 800px;
  background-color: #eee;
}

/* Undo / Redo buttons */
.controls button + button {
  margin-left: 6px;
  margin-bottom: 6px;
}

/* Adjusting dialog box */
.dialog {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  background: #fff;
  width: 350px;
  height: 100px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.dialog input {
  display: block;
  width: 200px;
  margin: 0px auto;
}

/* Help text on canvas */
.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>