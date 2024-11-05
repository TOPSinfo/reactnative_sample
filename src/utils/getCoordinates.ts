const getCoordinates = (point: string): [number, number] => {
  const length = point.length;

  let index = 0;

  for (let i = 1; i < length; i++) {
    if (point[i] === '+' || point[i] === '-') {
      index = i;
    }
  }

  const latitude = point.substring(0, index);
  const longitude = point.substring(index, length);

  return [+latitude, +longitude];
};

export default getCoordinates;
