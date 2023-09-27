/**
 * @description returns a copy of the input with the first
 *              letter of each word capitalized.
 * @param {String} input 
 * @returns 
 */
export function camelCase(input) {
    const firstLetter = input.charAt(0);
    return input.toLowerCase().replace(firstLetter, firstLetter.toUpperCase());
}