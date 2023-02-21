export function isAlphabetorNumber(str) {
  let flag = true;
  for (let i = 0; i < str.length; i++) {
    if (!isAlphabetic(str[i]) && !isNumeric(str[i])) {
      flag = false;
    }
  }
  return flag;
}

function isAlphabetic(char) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

function isNumeric(char) {
  return char >= "0" && char <= "9";
}
