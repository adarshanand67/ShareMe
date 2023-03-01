export function createFuzzySearchTerm(searchTerm) {
  /**
   * This function creates a fuzzy search term. A fuzzy search term is a search term
   * with asterisks between each letter.
   * For example, the fuzzy search term for "hello" is "*h*e*l*l*o*"
   * @param {string} searchTerm The search term to create a fuzzy search term for
   * @returns {string} The fuzzy search term
   */
  let fuzzySearchTerm = "*";
  for (let i = 0; i < searchTerm.length; i++) {
    fuzzySearchTerm += searchTerm[i] + "*";
  }
  return fuzzySearchTerm;
}
