
export default function processData(data) {
  let results = [];
  const prices = {
    apple: 0.67,
    banana: 0.34,
    kiwi: 1.23,
    orange: 0.45,
    grape: 0.76,
  };
  if (data.length){
    const lines = data.split('\n');
    results = lines.map(line => {
      if (!line) return '';
      const [fruit, country] = line.split(',');
      return fruit + ' is ' + prices[fruit] + ' in ' + country;
    });
  }
  return results.join('\n');
}
