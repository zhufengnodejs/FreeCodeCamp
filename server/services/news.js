export default function getNewsServices(app) {
  const { Story } = app.models;

  return {
    name: 'news',
    create(req, resource, story = {}, body, config, cb) {
      if (!story) {
        return cb(new Error('story creation should get a story object'));
      }

      if(!req.user){
        return cb(new Error('User must be signed in to post a story'), null);
      }

      if(!req.user.isGithubCool){
        return cb(new Error('User must connect their Github Account to post a story'), null);
      }

      Story.create(story, (err, story) => {
        cb(err, story);
      });
    },
    read(req, resource, params, config, cb) {
      const query = {
        order: 'suborder ASC'
      };
      if (params && params.dashedName) {
        assign(query.where, {
          dashedName: { like: params.dashedName, options: 'i' }
        });
      }
      Story.find(query, (err, stories) => {
        if (err) {
          return cb(err);
        }
        cb(null, stories);
      });
    }
  };
}
