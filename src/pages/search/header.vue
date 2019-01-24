<template>
  <me-navbar class="header">
    <i
      class="iconfont icon-back"
      slot="left"
      @click="goBack"
    ></i>
    <me-search-box
      placeholder="开学季有礼，好货5折起"
      slot="center"
      @query="query"
    ></me-search-box>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'SearchHeader',
    components: {
      MeSearchBox,
      MeNavbar
    },
    methods: {
      query(query) {
        this.$emit('query',query);
      },
      goBack() {
        this.$router.back();
      }
    }
  };
</script>

<style scoped>

</style>
