import storage from 'assets/js/storage';
import SEARCH_HISTORY_KEYWORD_KEY from 'pages/search/config';


const searchMixin = {
  methods: {
    $_selectItem(keyword) {
      // 利用 localStrorage 将关键字保存起来 形成 搜索历史
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);

      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
      }

      keywords.unshift(keyword);

      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);
    }
  }
};
export default searchMixin;
