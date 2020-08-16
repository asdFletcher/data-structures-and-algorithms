// const defangIPaddr = (address) => {
//   const a = 2;
//   let res = [];
//   let pointerForRes = 0;
//   for (let i = 0; i < address.length; i++) {
//     if (address[i] === '.') {
//       res.push('[');
//       res.push(address[i]);
//       res.push(']');
//       pointerForRes = pointerForRes + 2;
//     } else {
//       res[pointerForRes] = address[i];
//     }
//     pointerForRes++;
//   }
//   res = res.join('');
//   return res;
// };

// a cleaner solution from discussion section, nice!
const defangIPaddr = (address) => {
  const result = address.split('.').join('[.]');
  return result;
};
defangIPaddr('1.2.3.4');
