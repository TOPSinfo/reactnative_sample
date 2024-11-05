const buildQuery = (query: Record<string, number | string | undefined>) => {
  const builder = Object.keys(query)
    .map(param => {
      if (query[param]) {
        return [param, query[param]].join('=');
      }
    })
    .join('&');

  return builder ? `?${builder}` : '';
};

export default buildQuery;
