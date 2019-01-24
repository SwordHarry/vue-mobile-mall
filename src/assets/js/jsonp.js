import jsonp from 'jsonp';

// {
//   page: 1,
//     psize: 20
// }
//  => page=1&psize=20
const parseParam = (param) => {
  const params = [];

  for (const key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      params.push([key, param[key]]);
    }
  }

  // 最终拼接成 page=1&psize=20 的形式
  return params.map(value => value.join('=')).join('&');
};

export default (url, urlData, options) => {
  const finalUrl = url + ((url.indexOf('?') < 0) ? '?' : '&') + parseParam(urlData);

  return new Promise((resolve, reject) => {
    jsonp(finalUrl, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
