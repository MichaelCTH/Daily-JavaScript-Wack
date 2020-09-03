function add(value1) {
  const curried = (value2 = 0) => {
    value1 += value2;
    return curried;
  };

  curried.toString = () => value1;
  return curried;
}

console.log(parseInt(add(1))); //隐式转换
console.log(add(1)(2) + 0);
console.log(Number(add(1)(2)(3)));
