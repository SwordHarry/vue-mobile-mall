<template>
  <me-navbar class="header">
    <div slot="center">
      <me-search-box
        placeholder="开学季有礼，好货5折起"
        :fake="true"
        @query="getQuery"
        @click.native="goToSearch"
      ></me-search-box>
    </div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'category-header',
    methods: {
      getQuery(query) {
        console.log(query);
      },
      goToSearch() {
        this.$router.push('/search');
      }
    },
    components: {
      MeNavbar,
      MeSearchBox
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header{
    &.mine-navbar{
      background-color: $header-bgc-translucent;
    }

    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }

</style>
