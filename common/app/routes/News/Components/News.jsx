import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import { contain } from 'thundercats-react';
// import debugFactory from 'debug';

import HikesMap from './NewsMap.jsx';

// const debug = debugFactory('freecc:news');

export default contain(
  {
    store: 'newsStore',
    actions: ['appActions'],
    fetchAction: 'newsActions.fetchNews',
    getPayload: ({ news, params }) => ({
      isPrimed: (news && !!news.length),
      dashedName: params.dashedName
    }),
    shouldContainerFetch(props, nextProps) {
      return props.params.dashedName !== nextProps.params.dashedName;
    }
  },
  React.createClass({
    displayName: 'News',

    propTypes: {
      appActions: PropTypes.object,
      children: PropTypes.element,
      currentHike: PropTypes.object,
      hikes: PropTypes.array
    },

    componentWillMount() {
      const { appActions } = this.props;
      appActions.setTitle('News');
    },

    renderMap(news) {
      console.log(news);
      return (
        <HikesMap hikes={ news }/>
      );
    },

    renderChild(children, news, currentNewsPiece) {
      if (!children) {
        return null;
      }
      return React.cloneElement(children, { news, currentNewsPiece });
    },

    render() {
      const { news, children, currentNewsPiece } = this.props;
      const preventOverflow = { overflow: 'hidden' };
      return (
        <div>
          <Row style={ preventOverflow }>
            { this.renderChild(children, news, currentNewsPiece) ||
            this.renderMap(news) }
          </Row>
        </div>
      );
    }
  })
);
