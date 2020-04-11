const MoneyPipe = (value) => {
  const num = +value;
  if (num === NaN) return num;

  value = `${value}`;
  let transformed = ``;
  // Add decimals if needed
  const decimals = value.split('.')[1];
  transformed = `${decimals ? decimals : '.00'}`


  
  // Loop value & add comas
  for(let i = value.length - 1, count = 0; i >= 0; i--, count++) {
    if (count !== 0 & count % 3 === 0)  transformed = `,${transformed}`;
    transformed = value[i] + transformed;
  }

  return `$${transformed}`;
}

export default MoneyPipe;