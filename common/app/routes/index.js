/*import News from './News';*/
import Jobs from './Jobs';
import Hikes from './Hikes';
import NotFound from '../components/NotFound/index.jsx';

export default {
  path: '/',
  childRoutes: [
    /*News,*/
    Jobs,
    Hikes,
    {
      path: '*',
      component: NotFound
    }
  ]
};
