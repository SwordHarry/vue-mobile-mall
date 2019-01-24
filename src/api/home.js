import pic from 'assets/img/404.png';
import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import CONFIG from './config';

// 打乱数组的顺序
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;

  while (i--) {
    rndNum = Math.floor(Math.random() * arrLength);
    if (i !== rndNum) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
    }
  }
  return arr;
};

// 获取幻灯片数据 -- ajax
const getHomeSlider = () => (
  axios.get('http://www.imooc.com/api/home/slider', {
    timeout: CONFIG.TIMEOUT,
  }).then((res) => {
    if (res.data.code === CONFIG.SUCC_CODE) {
      // 模拟随机更新
      let sliders = res.data.slider;
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
      sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
      if (sliders.length === 0) {
        sliders = slider;
      }
      return sliders;
    }

    throw new Error('没有成功获取到数据!');
  }).catch((err) => {
    if (err) {
      console.log(err);
    }

    return [
      {
        linkUrl: 'http://www.imooc.com',
        picUrl: pic,
      }
    ];
  }).then(data => (new Promise((resolve) => {
    resolve(data);
  })
  ))
);
export default getHomeSlider;

// 获取热门推荐数据 -- jsonp
export const getHomeRecommend = (page = 1, psize = CONFIG.HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };

  return jsonp(url, params, CONFIG.JSONP_OPTIONS).then((res) => {
    if (res.code === '200') {
      return res;
    }

    throw new Error('没有成功获取到数据!');
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
    return undefined;
  }).then(data => (new Promise((resolve) => {
    resolve(data);
  })
  ));
};
