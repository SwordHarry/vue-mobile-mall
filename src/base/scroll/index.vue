<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" ref="pullDownLoading" inline></me-loading>
    </div>
    <swiper-slide class="content">
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" ref="pullUpLoading" inline></me-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MeLoading from "base/loading";
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from "./config";

export default {
  name: "MeScroll",
  components: {
    swiperSlide,
    swiper,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pullDownText: PULL_DOWN_TEXT_INIT,
      pullUpText: PULL_UP_TEXT_INIT
    };
  },
  watch: {
    data() {
      this.update();
    }
  },
  created() {
    this.init();
  },
  methods: {
    update() {
      // 保证 DOM 渲染完毕
      this.$nextTick(() => {
        if (this.$refs.swiper) {
          this.$refs.swiper.update();
        }
      });
    },
    scrollToTop(speed, runCallbacks) {
      if (this.$refs.swiper) {
        this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      }
    },
    init() {
      this.pulling = false;
      this.swiperOption = {
        direction: "vertical",
        slidesPerView: "auto", // 一页中看到几张图片
        freeMode: true, // free模式任意滚动距离
        setWrapperSize: true, // 计算出高度
        scrollbar: {
          el: this.scrollbar ? ".swiper-scrollbar" : null,
          hide: true
        },
        on: {
          // 下拉移动
          sliderMove: this.srcoll,
          // 结束触摸
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd
        }
      };
    },
    srcoll() {
      // 标志位 判断是否正在拉动
      // 避免频繁 提交请求
      if (this.pulling) {
        return;
      }

      const mySwiper = this.$refs.swiper.swiper;
      this.$emit("scroll", mySwiper.translate, this.$refs.swiper.swiper);
      if (mySwiper.translate > 0) {
        // 下拉
        if (!this.pullDown) {
          return;
        }

        if (this.$refs.pullDownLoading) {
          if (mySwiper.translate > PULL_DOWN_HEIGHT) {
            // 如此直接修改会有闪动
            // this.pullDownText = '111';
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        }
      } else if (mySwiper.isEnd) {
        // 上拉
        if (this.pullUp) {
          return;
        }
        const isPullUp =
          Math.abs(mySwiper.translate) + mySwiper.height - PULL_UP_HEIGHT >
          parseInt(mySwiper.$wrapperEl.css("height"), 10);

        if (this.$refs.pullUpLoading !== undefined) {
          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        }
      }
    },
    scrollEnd() {
      const mySwiper = this.$refs.swiper.swiper;
      this.$emit("scroll-end", mySwiper.translate, mySwiper, this.pulling);
    },
    touchEnd() {
      if (this.pulling) {
        return;
      }

      const mySwiper = this.$refs.swiper.swiper;
      // 下拉
      if (mySwiper.translate > PULL_DOWN_HEIGHT) {
        this.pulling = true;
        if (!this.pullDown) {
          return;
        }

        mySwiper.allowTouchMove = false; // 禁止触摸
        this.pulling = true;
        mySwiper.setTransition(mySwiper.params.speed);
        mySwiper.setTranslate(PULL_DOWN_HEIGHT);
        mySwiper.params.virtualTranslate = true; // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
        this.$emit("pull-down", this.pullDownEnd);
      } else if (mySwiper.isEnd) {
        // 底部
        const totalHeight = parseInt(mySwiper.$wrapperEl.css("height"), 10);
        const isPullUp =
          Math.abs(mySwiper.translate) + mySwiper.height - PULL_UP_HEIGHT >
          totalHeight;
        if (isPullUp) {
          if (!this.pullUp) {
            return;
          }
          this.pulling = true;
          mySwiper.setTransition(mySwiper.params.speed);
          mySwiper.setTranslate(
            -(totalHeight + PULL_UP_HEIGHT - swiper.height)
          );
          mySwiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          this.$emit("pull-up", this.pullUpEnd);
        }
      }
    },
    pullDownEnd() {
      const mySwiper = this.$refs.swiper.swiper;
      // 下拉结束，可以再次 下拉刷新了
      this.pulling = false;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
      mySwiper.allowTouchMove = true; // 可以触摸
      mySwiper.params.virtualTranslate = false; // 回弹
      mySwiper.setTransition(mySwiper.params.speed);
      mySwiper.setTranslate(0);
      // 回弹后，顶部头显示
      setTimeout(() => {
        this.$emit("pull-down-transition-end");
      }, mySwiper.params.speed);
    },
    pullUpEnd() {
      const mySwiper = this.$refs.swiper.swiper;
      // 上拉结束
      this.pulling = false;
      if (this.$refs.pullDownLoading !== undefined) {
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      }
      mySwiper.allowTouchMove = true; // 可以触摸
      mySwiper.params.virtualTranslate = false; // 回弹
    }
  }
};
</script>

<style lang="scss" scoped>
// 让容器 被内部元素撑开
.swiper-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

// 让可视区内容的高度为 里面内容的高度
.swiper-slide {
  height: auto;
}

.mine-scroll-pull-down,
.mine-scroll-pull-up {
  position: absolute;
  left: 0;
}

.mine-scroll-pull-down {
  // 此处给 bottom 100% 是看不到的，下拉时才会看到
  bottom: 100%;
  width: 100%;
  height: 80px;
}

.mine-scroll-pull-up {
  top: 100%;
  width: 100%;
  height: 30px;
}
</style>
