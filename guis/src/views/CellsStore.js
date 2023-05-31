import { reactive } from 'vue'

// Columns - Try to keep max to 26, because we're using Unicode and anything more will go beyond the English alphabet
const COLS = 7
// Ehh, use whatever you want, starts at 0
const ROWS = 21

export const cells = reactive(
  Array.from(Array(COLS).keys()).map((i) =>
    Array.from(Array(ROWS).keys()).map((i) => '')
  )
)

export function evalCell(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }

  exp = exp.slice(1).replace(/\b([A-Z])(\d{1,2})\b/g,
  (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`)

  try {
    return new Function('get', `return ${exp}`)(getCellValue)
  } catch (e) {
    return `#ERROR ${e}`
  }
}

function getCellValue(c, r) {
  const val = evalCell(cells[c][r])
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}
