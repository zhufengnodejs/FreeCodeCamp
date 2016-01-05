import News from './components/News.jsx';
import SubmitNews from './components/SubmitNews.jsx';

export default {
  path: 'news',
  component: News,
  childRoutes: [
    {
      path: ':submit',
      component: SubmitNews
    }
  ]
};
