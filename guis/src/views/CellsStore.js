import { reactive } from 'vue'

// Columns - Try to keep max to 26, because we're using Unicode and anything more will go beyond the English alphabet
const COLS = 7
// Ehh, use whatever you want up to 98, starts at 0. I don't want to regex for 3 digits.
const ROWS = 20

// Export cells for use in parent template, using reactive() to create an object holding Columns and Rows.
// Within the reactive() object, each Column gets created as an array of the Rows within it, each of those Rows gets assigned an empty string ('')
export const cells = reactive(
  Array.from(Array(COLS).keys()).map((i) =>
    Array.from(Array(ROWS).keys()).map((i) => '')
  )
)

// Expressions, why not! Detect if a particular cell starts with equals (=) then do maths according to the user input.
// We also use this in CellsInfo methods, so need to export it
export function calcCellValue(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }

// Getting the column is tricky, need to get the letter user types, covert to a number, then get the corresponding column index.
  exp = exp.slice(1).replace(/\b([A-Z])(\d{1,2})\b/g,
//   Return a function that gets the value at cell (column,row)
  (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`)

// Try running the expression, if it's invalid print an error.
  try {
    // Try running the expression
    return new Function('get', `return ${exp}`)(getCellValue)
  } catch (e) {
    return `#ERROR ${e}`
  }
}

function getCellValue(c, r) {
    // Assume adding both numbrs and letters. If the result is a finite number we'll print that, else concatenate the inputs.
  const val = calcCellValue(cells[c][r])
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}

// TODO: Would be fun to check if the target cell to calcCellValue is itself a reference to another cell, get that tertiary cell value, and so on.
