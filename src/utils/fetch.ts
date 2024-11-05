const f = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options)
    .then(response =>
      response.status >= 400
        ? Promise.reject(response)
        : Promise.resolve(response)
    )
    .then(res => res.text())
    .then(text => (text.length ? JSON.parse(text) : {}));
};

export default f;
