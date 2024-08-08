/**
 * ColorPlanes
 * ---
 * This just generates an SVG with a random number of semi-opaque polygons to overlap
 * and create a geometric pattern.
 */
export function ColorPlanes({
  width,
  height,
  lineWidth = 3
}: {
  width: number
  height: number
  lineWidth?: number
}) {
  const coords = Array.from({ length: 5 }, () => getLineCoords(width, height, lineWidth))
  const midPoint = getRandomInt(2, 500)
  return (
    <svg viewBox={`0 0 ${width * 2} ${height * 2}`}>
      <rect height="200%" style={{ opacity: 0.3 }} width="200%" x="-50%" y="-50%" />
      {coords.map((coord, index) => (
        <polyline
          key={index}
          points={`${coord} ${width},${height * index} ${midPoint},${height}`}
          style={{ opacity: 0.2 }}
        />
      ))}
    </svg>
  )
}

/**
 * getLineCoords
 * ---
 * Gives us random line coordinates
 */
function getLineCoords(width: number, height: number, lineWidth: number) {
  const seed = getRandomInt(2, 30)
  const length = getRandomInt(2, 5)
  const values = Array.from({ length }, () => Math.floor(Math.random() * 1000))
  const MAX_X_COORD = values.length - 1
  const MAX_Y_COORD = Math.max(...values)

  return values
    .map((value, index) => {
      const x = generateX(index, width * 3, MAX_X_COORD)
      const y = generateY(value, height * 3, MAX_Y_COORD + lineWidth)

      return index ? `${x},${y}` : `-${width}, ${(index + seed) * seed}`
    })
    .join(' ')
}
/**
 * generateX
 * ---
 * Generates a coordinate based on a value, relative to width and total
 */
function generateX(value: number, width: number, max: number): number {
  return Math.round(value * (width / max))
}

/**
 * generateY
 * ---
 * Generates a coordinate based on a value, relative to height and total
 */
function generateY(value: number, height: number, max: number): number {
  return Math.round(height - (value * height) / max)
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
