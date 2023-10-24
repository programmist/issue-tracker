interface String {
  titleCase(): string;
}

/**
 * Convert snake_case, kebab-case, or spaced words into the Title Case equivalent.
 *
 * Examples:
 *
 *   "UPPER_SNAKE_CASE".titleCase()
 *   // => "Upper Snake Case"
 *
 *   "lower-kebab-case".titleCase()
 *   // => Lower Kebab Case
 *
 *   "UPPER lower SpAcE CaSe".titleCase()
 *   // =>  "Upper Lower Space Case"
 *
 *   "--skewered-kabab--".titleCase()
 *   // => "Skewered Kebab"
 *
 *   "__snake__dunder__".titleCase()
 *   // => Snake Dunder
 *
 */
String.prototype.titleCase = function () {
  return this.split(/[_-\s]/)
    .reduce((acc, frag) => {
      if (!frag) return acc;
      return acc + " " + frag[0].toUpperCase() + frag.toLowerCase().slice(1);
    }, "")
    .trim();
};
