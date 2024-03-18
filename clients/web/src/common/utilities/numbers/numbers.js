/**
 * NUMBER WITH COMMAS
 * @param {integer} num Number to add commas to for display
 */
export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
