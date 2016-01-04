import { Actions } from 'thundercats';
import debugFactory from 'debug';

const debug = debugFactory('freecc:news:actions');

function getCurrentNewsPiece(news = [{}], dashedName, currentNewsPiece) {
  if (!dashedName) {
    debug('no dashedName');
    return news[0];
  }

  const filterRegex = new RegExp(dashedName, 'i');
  if (currentNewsPiece && filterRegex.test(currentNewsPiece.dashedName)) {
    return currentNewsPiece;
  }

  debug('setting new hike');
  return news
    .filter(({ dashedName }) => {
      return filterRegex.test(dashedName);
    })
    .reduce((throwAway, newsPiece) => {
      return newsPiece;
    }, currentNewsPiece || {});
}

export default Actions({
  // this method will be an observable on new instances
  fetchNews: null,
  setNews: null,
  getCurrentNews: null
}).refs({ displayName: 'newsActions' }).init(({ instance: newsActions, args: [services] }) => {
  newsActions.fetchNews.subscribe(() => {
    services.read('news', null, null, (err, news) => {
      if (err) {
        debug('an error occurred fetching news', err);
      }
      console.log(news);
      newsActions.setNews({
        set: {
          news: news,
          currentHike: getCurrentNewsPiece(news, dashedName)
        }
      });
    });
  })
});

/*create(newsObj) {
  const story = Object.assign({}, {
    headline: 1,
    timePosted: 1,
    link: 1,
    description: 1,
    rank: 1,
    upVotes: 1,
    author: 1,
    image: 1,
    storyLink: 1,
    metaDescription: 1,
    textScore: {
      $meta: 'textScore'
    }
  }, newsObj);
  return {
    story,
    promise: newsActions.create(story)
  };
}*/