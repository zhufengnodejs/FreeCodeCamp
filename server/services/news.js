import debugFactory from 'debug';
import assign from 'object.assign';

const debug = debugFactory('freecc:services:hikes');

export default function newsService(app) {
  const Story = app.models.Story;

  return {
    name: 'news',
    read: (req, resource, params, config, cb) => {
      const query = {
        limit: 10,
        order: 'suborder ASC'
      };

      debug('params', params);
      /*if (params) {
        assign(query.where, {
          dashedName: { like: params.dashedName, options: 'i' }
        });
      }*/
      debug('query', query);
      Story.find(query, (err, stories) => {
        if (err) {
          return cb(err);
        }
        cb(null, stories);
      });
    }
  };
}
