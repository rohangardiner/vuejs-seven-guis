<template>
    <!-- Each cell is an input if editing, else a span with value -->
    <div class="cell" :title="cells[c][r]" @click="editing = true">
      <input v-if="editing"
        :value="cells[c][r]"
        @change="updateCell"
        @blur="updateCell"
        @vue:mounted="({ el }) => el.focus()">
      <span v-else>{{ calcCellValue(cells[c][r]) }}</span>
    </div>
  </template>

<script>
    import { cells, calcCellValue } from './CellsStore.js'

    export default {
        props: {
            c: Number,
            r: Number
        },

        data() {
            return {
                editing: false,
                cells
            }
        },

        methods: {
            calcCellValue,
            updateCell(e) {
                this.editing = false
                cells[this.c][this.r] = e.target.value.trim()
            }
        }
    }
</script>

<style scoped>
    .cell, .cell input {
    height: 1.5em;
    line-height: 1.5;
    font-size: 15px;
    }

    .cell span {
    padding: 0 6px;
    }

    .cell input {
    width: 100%;
    box-sizing: border-box;
    }
</style>