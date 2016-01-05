import { Actions } from 'thundercats';
import debugFactory from 'debug';

const debug = debugFactory('freecc:news:actions');

export default Actions({
  // this method will be an observable on new instances
  setErr: null,
  fetchNews: null,
  setNews: null,
  submitNews: null,
  createNews: null
}).refs({ displayName: 'newsActions' }).init(({ instance: newsActions, args: [services] }) => {

  // define all actions here, these will perform an IO operation on a service

  newsActions.fetchNews.subscribe(() => {
    services.read('news', null, null, (err, news) => {
      if (err) {
        debug('an error occurred fetching news', err);
      }
      newsActions.setNews({
        set: {
          news: news
        }
      });
    });
  });
  newsActions.submitNews.subscribe(( newsObj ) => {
    //const appActions = cat.getActions('appActions');
    services.create('news', newsObj , null, (err, newsObj) => {
      if(err){
        debug('an error occurred fetching news', err);
        newsActions.setErr({
          set : {
            err: err
          }
        });
      }
      else {
        newsActions.createNews({ newsObj });
        //appActions.updateRoute('/news');
      }
    });
  });
});