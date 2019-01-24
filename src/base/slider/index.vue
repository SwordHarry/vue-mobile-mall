<template>
  <swiper :options="swiperOption" name="swiper" :key="keyId">
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper } from 'vue-awesome-swiper';

  export default {
    name: 'MeSlider',
    components: {
      swiper,
    },
    // 传给 基础组件 的参数，记得加校验
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return [
            'horizontal',
            'vertical',
          ].indexOf(value) > -1;
        },
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        },
      },
      loop: {
        type: Boolean,
        default: true,
      },
      pagination: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Array,
        // 由于数组不是基本类型，为引用类型，故需要封闭
        default() {
          return [];
        }
      }
    },
    watch: {
      data(newData) {
        if (newData.length === 0) {
          return;
        }
        this.swiperOption.loop = newData.length === 1 ? false : this.loop;
        this.keyId = Math.random();
      }
    },
    data() {
      return {
        keyId: Math.random()
      };
    },
    created() {
      this.init();
    },
    methods: {
      // 将 初始化参数 从 data() 中移除出来
      init() {
        this.swiperOption = {
          watchOverflow: true, // 当只有一个 swiper-slider 时,swiper会失效
          direction: this.direction,
          autoplay: this.interval ? {
            delay: this.interval,
            disableOnInteraction: false, // 若有交互，停止自动轮播
          } : false,
          slidesPerview: 1, // slider 容器同时显示几张图片
          loop: this.data.length <= 1 ? false : this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null,
          },
        };
      }
    }
  };
</script>

<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
