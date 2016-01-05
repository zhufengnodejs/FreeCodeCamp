import { Store } from 'thundercats';

const initialValue = {
  news: [],
  err: "",
  currentNews: {}
};

export default Store({
  refs: {
    value: initialValue
  },
  init({ instance: newsStore, args: [cat] }) {
    // import and register actions
    let { setNews } = cat.getActions('newsActions');
    let { setErr } = cat.getActions('newsActions');
    let { createNews } = cat.getActions('newsActions');
    newsStore.register(setNews);
    newsStore.register(setErr);
    newsStore.register(createNews);

    return newsStore;
  }
}).static({ displayName: 'NewsStore' });
