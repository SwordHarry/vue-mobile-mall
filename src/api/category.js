import axios from 'axios';
import CONFIG from './config';

const CancelToken = axios.CancelToken;
let cancel;

// 获取内容数据--ajax
export default (id) => {
  if (cancel) {
    cancel('取消了前一次的请求!');
  }
  cancel = null;
  const url = `http://www.imooc.com/api/category/content/${id}`;

  return axios.get(url, {
    timeout: CONFIG.TIMEOUT,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  })
    .then((res) => {
      if (res.data.code === CONFIG.SUCC_CODE) {
        return res.data.content;
      }

      throw new Error('没有成功获取到数据!');
    })
    .catch((err) => {

      if (axios.isCancel(err)) {
        // 取消了前一次的请求
        console.log(err);
      } else {
        // handle the error
        console.log(err);
      }
  });
};
