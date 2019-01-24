<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide v-for="(item,index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import { swiperSlide } from 'vue-awesome-swiper';
  import MeSlider from 'base/slider';
  import MeLoading from 'base/loading';
  import getHomeSlider from 'api/home';
  import { sliderOptions } from './config';

  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      swiperSlide,
      MeLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    created() {
      this.getSliders();
    },
    methods: {
      // API
      updateData() {
        return this.getSliders();
      },
      getSliders() {
        // 注意这里是异步获取数据的，所以swiper组件会先生成，
        // 要解决这个Bug则需要在swiper中添加 v-if
        return getHomeSlider().then((data) => {
          this.sliders = data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slider-wrapper{
    height: 183px;
  }

  .slider-link{
    display: block;
  }

  .slider-link,
  .slider-img{
    width: 100%;
    height: 100%;
  }
</style>
