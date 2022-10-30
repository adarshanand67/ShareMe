export function isAlphabetorNumber(str) {
  // return /^[a-zA-Z0-9]+$/.test(str);
  let flag = true;
  for (let i = 0; i < str.length; i++) {
    if (
      !(
        (str[i] >= "a" && str[i] <= "z") ||
        (str[i] >= "A" && str[i] <= "Z") ||
        (str[i] >= "0" && str[i] <= "9")
      )
    ) {
      flag = false;
    }
  }
  return flag;
}
