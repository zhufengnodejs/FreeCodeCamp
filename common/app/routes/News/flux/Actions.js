import { Actions } from 'thundercats';
import debugFactory from 'debug';

const debug = debugFactory('freecc:hikes:actions');

export default Actions({
  // this method will be an observable on new instances
  create(newsObj) {
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
      promise: TodoService.create(todo)
    };
  }
}).refs({ displayName: 'TodoActions' });