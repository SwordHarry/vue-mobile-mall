<template>
  <div class="home">
    <header class="g-header-container">
      <home-header ref="header" :class="{'header-transition': isHeaderTransition}"></home-header>
    </header>
    <me-scroll
      ref="scroll"
      :data="recommends"
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll="scroll"
      @scroll-end="scrollEnd"
      @pull-down-transition-end="pullDownTransitionEnd"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import { HEADER_TRANSITION_HEIGHT } from './config';


  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      HomeNav,
      HomeRecommend,
      MeScroll,
      MeBacktop
    },
    data() {
      return {
        recommends: [],
        isBacktopVisible: false,
        isHeaderTransition: false
      };
    },
    created() {
      // setTimeout(() => {
      //   this.isBacktopVisible = true;
      // }, 1000);
    },
    methods: {
      updateScroll() {
      },
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        this.$refs.slider.updateData().then(end);
      },
      pullToLoadMore(end) {
        // setTimeout(() => {
        //   console.log('上拉刷新');
        //   end();
        // }, 1000);
        this.$refs.recommend.update().then(end).catch((err) => {
          if (err) {
            console.log(err);
          }
          end();
          // 禁止继续加载更多数据
          // 将提示性文字改为没有更多数据了
        });
      },
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate, scroll, pulling) {
        if (!pulling) {
          if (translate < 0 && -translate > scroll.height) {
            this.isBacktopVisible = true;
          } else {
            this.isBacktopVisible = false;
          }
          this.changeHeaderStatus(translate);
        }
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
      },
      backToTop() {
        if (this.$refs.scroll) {
          this.$refs.scroll.scrollToTop();
        }
      },
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }

        this.$refs.header.show();
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home{
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
