<template>
  <h1>Cells page</h1>
  
  <table>
    <thead>
      <tr>
        <!-- Empty top left cell, both axes -->
        <th></th>
        <!-- Rest of column cell headings -->
        <th v-for="c in cols">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- Each table row -->
      <tr v-for="i in cells[0].length">
        <!-- Left col, # of row -->
        <th>{{ i - 1 }}</th>
        <!-- Each column -->
        <td v-for="(c, j) in cols">
          <!-- The data in the cell, col*row -->
          <Cell :r="i - 1" :c="j"></Cell>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="criteria">
    Criteria:
    <ul>
      <li class="yes">Create a simple but usable spreadsheet application.</li>
      <li class="no">The spreadsheet should be scrollable.</li>
      <li class="kinda">The rows should be numbered from 0 to 99 and the columns from A to Z.</li>
      <li class="kinda">Double-clicking a cell C lets the user change C&apos;s formula.</li>
      <li class="yes">After having finished editing the formula is parsed and evaluated and its updated value is shown in C. In addition, all cells which depend on C must be re-evaluated. This process repeats until there are no more changes in the values of any cell (change propagation).</li>
      <li class="yes">One should not just recompute the value of every cell but only of those cells that depend on another cell&apos;s changed value.</li>
    </ul>
  </div>
</template>


<script>
import Cell from './CellsInfo.vue'
import { cells } from './CellsStore.js'

export default {
  // Define our Cell component which will hold text
  components: {
    Cell
  },

  data() {
    return {
      // Each column gets assigned from the cells array, just getting the column and converting the index number to a letter A-Z (Well... Unicode char starting at 65)
      cols: cells.map((_, i) => String.fromCharCode(65 + i)),
      cells
    }
  }
}
</script>

<style scoped>
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  th {
    padding: 3px;
    background-color: #eee;
    border: 1px solid #ccc;
  }

  tr:first-of-type th {
    width: 100px;
  }

  tr:first-of-type th:first-of-type {
    width: 25px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  td {
    border: 1px solid #e3e3e3;
    height: 1.5em;
    overflow: hidden;
  }
</style>