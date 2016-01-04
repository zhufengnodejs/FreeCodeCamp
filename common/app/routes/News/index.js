import News from './components/News.jsx';
import NewsPiece from './components/NewsPiece.jsx';

export default {
  path: 'news',
  component: News,
  childRoutes: [
    {
      path: ':dashedName',
      component: NewsPiece
    }
    ]
};
