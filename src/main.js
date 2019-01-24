// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill';
// import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
// scss
import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';

// img
import errorPic from 'assets/img/error.png';
import loadPic from 'assets/img/loading.gif';

import Vue from 'vue';
import App from './App';
import router from './router';

// fastclick.attach(document.body);

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1,
  error: errorPic,
  loading: loadPic,
  attempt: 1
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
