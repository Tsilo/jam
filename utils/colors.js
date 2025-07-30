/**
 * Generates a random hex color
 * @param {string[]} [exclude=[]] - Array of hex colors to exclude from the result
 * @param {number} [attempt=1] - Internal parameter for recursion tracking
 * @returns {string} A random hex color in the format #RRGGBB
 */
function getRandomHexColor(exclude = [], attempt = 1) {
  // Add default colors to exclude
  const allExcluded = [...exclude, "#ffffff", "#000000"];
  const excludeSet = new Set(allExcluded.map((color) => color.toLowerCase()));

  // Generate a random color
  const color =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  // If the color is not in the exclude list, return it
  if (!excludeSet.has(color.toLowerCase())) {
    return color;
  }

  // If we've tried too many times, return the color anyway to avoid stack overflow
  if (attempt >= 50) {
    console.warn(
      "Could not find a color not in the exclude list after 50 attempts",
    );
    return color;
  }

  // Try again recursively
  return getRandomHexColor(exclude, attempt + 1);
}

export { getRandomHexColor };
