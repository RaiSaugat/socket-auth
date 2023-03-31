import axios from 'axios';
const CancelToken = axios.CancelToken;

let source = CancelToken.source();
const sources: any = {};

export const initiateSource = () => {
  source = CancelToken.source();
};

export const getToken = (name?: string) => {
  if (!name) return source.token;

  // add a separate named source
  let cancelToken = CancelToken.source();
  if (sources[name]) sources[name].cancel();
  sources[name] = cancelToken;

  return sources[name].token;
};

export const cancelToken = (message: string) => {
  source.cancel(message);

  // cancel all separate sources
  for (const token in sources) {
    sources[token].cancel(message);
  }
};
