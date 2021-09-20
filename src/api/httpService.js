import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const request = ({ url, method = "get", props = {} }) => {
  return instance[method](url, props);
};
export const requestCancel = ({
  url,
  method = "get",
  cancelToken,
  props = {},
}) => {
  return instance[method](url, {
    cancelToken: cancelToken.token,
    ...props,
  });
};
const createCancelToken = () => {
  let cancelToken = new axios.CancelToken.source();
  return () => {
    if (cancelToken) cancelToken.cancel("");
    cancelToken = new axios.CancelToken.source();
    return cancelToken;
  };
};
//example how use CancelToken
// const  instanceWithToken = createCancelToken();
// const request = () =>
//   requestCancel({
//     url
//     cancelToken: instanceWithToken(),
//   });
