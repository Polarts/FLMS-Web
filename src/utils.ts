/** 
 * Use with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match String.prototype.match} on the content of an ini file 
 * to split into sections and read using the {@link https://www.npmjs.com/package/ini ini package}.
 * @copyright {@link https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch08s13.html O'Rilley Regular Exporession Cookbook 8.13}
 */
export const iniSplitRegex = /\[[^\]\r\n]+](?:\r?\n(?:[^[\r\n].*)?)*/g;