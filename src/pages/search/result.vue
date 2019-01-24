<template>
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading></me-loading>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <li
        class="g-list-item"
        v-for="(item,index) in results"
        :key="index"
        @click="$_selectItem(item[0])"
      >
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
import MeLoading from "base/loading";
import API from "api/search";
import searchMixin from "assets/js/mixins";

export default {
  name: "SearchResult",
  components: {
    MeLoading
  },
  data() {
    return {
      results: [],
      loading: false
    };
  },
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  mixins: [searchMixin],
  watch: {
    query(query) {
      this.getResults(query);
    }
  },
  methods: {
    getResults(keyword) {
      if (!keyword) {
        return;
      }

      this.loading = true;
      API.getSearchResult(keyword).then(data => {
        if (data) {
          this.results = data;
          this.loading = false;
          console.log(data);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';
.result {
  margin-top : $navbar-height;
}
.g-list {
  
  background-color: #fff;
}
.loading-container,.no-result {
  padding: 20px;
  text-align: center;
  background-color: #fff;
}
</style>
