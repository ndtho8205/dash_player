const request = (method) => (url, data) => {
  const req = new XMLHttpRequest();
  req.open(method, url, false);
  req.setRequestHeader('Content-Type', 'application/json');

  req.send(data);

  if (req.status !== 200) {
    return [null, req.responseText];
  }
  return [JSON.parse(req.responseText), null];
};

const fetch = {
  get: request('GET'),
  post: request('POST'),
};

export default fetch;
