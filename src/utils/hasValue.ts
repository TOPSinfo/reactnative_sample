const hasValue = (...params: (string | undefined)[]) =>
  params.some(value => value?.trim().length);

export default hasValue;
