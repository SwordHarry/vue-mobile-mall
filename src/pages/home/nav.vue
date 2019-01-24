<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) in navs" :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" alt="" class="nav-pic">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { navItems } from './config';

  export default {
    name: 'HomeNav',
    created() {
      // 导航栏，写在 created 里面赋值而不写在 data() 中的原因是，
      // 这里是写死的，不需要渲染，
      // 如果写在data() 里面，将为数据提供getter setter方法，形成了浪费，
      // 只有需要监听的数据才放在data中
      this.navs = navItems;
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .nav {
    width: 100%;
    padding-top: 15px;
    background-color: #fff;

    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item{
      width: 20%;
      margin-bottom: 15px;
    }

    &-link {
      @include flex-center(column);
    }

    &-pic{
      width: 60%;
      margin-bottom: 8px;
    }
  }
</style>
