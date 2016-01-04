import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import { contain } from 'thundercats-react';
// import debugFactory from 'debug';

// const debug = debugFactory('freecc:hikes');

export default contain(
  {
    store: 'newsStore',
    actions: ['appActions'],
    fetchAction: 'newsActions.fetchNews',
    getPayload: ({ hikes, params }) => ({
      isPrimed: (hikes && !!hikes.length),
      dashedName: params.dashedName
    }),
    shouldContainerFetch(props, nextProps) {
      return props.params.dashedName !== nextProps.params.dashedName;
    }
  },
  React.createClass({
    displayName: 'fetchNews',

    propTypes: {

    },

    componentWillMount() {
      const { appActions } = this.props;
      appActions.setTitle('fetchNews');
    },

    render() {
      const preventOverflow = { overflow: 'hidden' };
      return (
        <div>
          <Row style={ preventOverflow }>
            <p>test</p>
          </Row>
        </div>
      );
    }
  })
);
