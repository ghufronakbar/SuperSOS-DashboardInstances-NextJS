const formatDecimal = (number) => {
  const numberFloat = parseFloat(number)

  return parseFloat(numberFloat.toFixed(2));

};

module.exports = { formatDecimal };
