
export default function processData(data) {
  let results = [];
  if (data.length){
    results = data.split(',').map((number) => number * 2 )
  }
  return results;
}
