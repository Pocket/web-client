export function getBool(value) {
  return value === true || value === 'true' || value === 1 || parseInt(value, 10) === 1
}
