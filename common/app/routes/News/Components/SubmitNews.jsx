import React, { PropTypes } from 'react';
import { Panel, Row } from 'react-bootstrap';
import { contain } from 'thundercats-react';
import debugFactory from 'debug';

const debug = debugFactory('freecc:news');

const storySkeleton = {
  headline: "",
  timePosted: 0,
  link: "",
  description: "",
  metaDescription: "",
  rank: 0,
  upVotes: [],
  author: {},
  image: "",
  storyLink: ""
};

export default contain(
  {
    store: 'newsStore',
    actions: ['appActions', 'newsActions']
  },
  React.createClass({
    displayName: 'SubmitNews',

    propTypes: {
      appActions: PropTypes.object,
      newsActions: PropTypes.object
    },

    componentWillMount() {
      const { appActions } = this.props;
      appActions.setTitle('SubmitNews');
    },

    handleSubmit(e){
      // import newsActions

      // Auth with req.user.isGithubCool
      // Add title
      // Verify Link - Maybe in separate method
      // Generate TimeStamp
      // filter by:
      //    Headline
      //    Rank All Time
      //    Rank This Month
      //    Rank Today
      //    Recent
      //    Author

      e.preventDefault();
      const { newsActions } = this.props;
      let story = Object.assign({}, storySkeleton, {

      });
      newsActions.submitNews(story);
    },

    render() {
      const { news, err, children, currentNewsPiece } = this.props;
      let warning = "";
      debug(err);
      if(err && err.message) {
        warning = <Panel>
                    {err.message}
                  </Panel>;
      }
      const preventOverflow = { overflow: 'hidden' };
      return (
        <div>
          {warning}
          <Panel style={ preventOverflow }>
            <form>
              <input type = "text" placeholder = "Headline" name = "headline" />
              <input type = "url" placeholder="Link" name = "link" />
              <input type = "submit" value = "Submit" onClick = {this.handleSubmit} />
            </form>
          </Panel>
        </div>
      );
    }
  })
);

