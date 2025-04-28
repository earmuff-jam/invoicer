/**
 * Utils file
 *
 * Used to create common minor functions that can be re-used across the application
 */

/**
 * pluralize
 *
 * function used to add a plural form where applicable.
 *
 * @param {int} arrLength - the length of the array that needs to be tabulated.
 * @param {string} wordStr - the string representation of the selected word.
 *
 * @returns a plural form of the selected word
 *
 */
export const pluralize = (arrLength, wordStr) => {
  if (arrLength <= 1) return wordStr;
  return `${wordStr}s`;
};
