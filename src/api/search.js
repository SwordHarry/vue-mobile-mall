import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
  JSONP_OPTIONS,
  TIMEOUT
} from './config';

const getSearchHotKeyword = () => (
  axios.get('/static/search.json', {
    timeout: TIMEOUT
  }).then((res) => {
    res = res.data.hotKeyWord;
    if (res && res.owner) {
      return res.owner;
    }

    throw new Error('没有成功获取到数据！');
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  }).then((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
}));

// 获取搜索结果
const getSearchResult = (keyword) => {
  console.log(keyword);
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  return jsonp(url, params, JSONP_OPTIONS).then((res) => {
    if (res.result) {
      return res.result;
    }

    throw new Error('没有成功获取到数据！');
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  }).then(res => new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 1000);
  }));
};

export default {
  getSearchHotKeyword,
  getSearchResult
};
