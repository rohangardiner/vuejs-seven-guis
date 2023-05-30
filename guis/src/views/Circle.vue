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
    <circle v-for="circle in circles"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle === selected ? '#0000ff80' : 'url(#image)'"
      @click="selected = circle"
      @contextmenu.prevent="adjustCircle(circle)">
    </circle>
  </svg>

  <div class="dialog" v-if="adjusting" @click.stop>
    <p>Adjust radius of circle at ({{ selected.cx.toFixed(0) }}, {{ selected.cy.toFixed(0) }})</p>
    <input type="range" v-model="selected.r" min="1" max="400">
  </div>
</template>

<script>
function clone(circles) {
  return circles.map((c) => ({ ...c }))
}

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
    // Called by clicking on the svg. Creates a circle.
    createCircle({ clientX: x, clientY: y }) {
      // Adjust x/y based on canvas offset instead of window position
      x = x - document.querySelector("svg").getBoundingClientRect().left
      y = y - document.querySelector("svg").getBoundingClientRect().top
      if (this.adjusting) {
        this.adjusting = false
        this.selected = null
        this.push()
        return
      }

      this.selected = [...this.circles].reverse().find(({ cx, cy, r }) => {
        const dx = cx - x
        const dy = cy - y
        return Math.sqrt(dx * dx + dy * dy) <= r
      })

      if (!this.selected) {
        this.circles.push({
          cx: x,
          cy: y,
          r: 50
        })
        this.push()
      }
    },

    adjustCircle(circle) {
      this.selected = circle
      this.adjusting = true
    },

    push() {
      this.history.length = ++this.index
      this.history.push(clone(this.circles))
    },

    undo() {
      this.circles = clone(this.history[--this.index])
    },

    redo() {
      this.circles = clone(this.history[++this.index])
    }
  }
}
</script>

<style scoped>
svg {
  width: 800px;
  height: 800px;
  background-color: #eee;
}

.controls button + button {
  margin-left: 6px;
  margin-bottom: 6px;
}

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

.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>