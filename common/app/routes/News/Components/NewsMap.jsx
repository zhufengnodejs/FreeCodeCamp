import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import debugFactory from 'debug';

const debug = debugFactory('freecc:news');

export default React.createClass({
  displayName: 'NewsMap',

  propTypes: {
    news: PropTypes.array
  },

  render() {
    const {
      news
      } = this.props;
    console.log(news);

    /*const newsElements = news.map(({ title, dashedName}) => {
      return (
        <ListGroupItem key={ dashedName }>
          <Link to={ `/news/${dashedName}` }>
            <h3>{ title }</h3>
          </Link>
        </ListGroupItem>
      );
    });*/
    const newsElements = [];
    return (
      <div>
        <Panel>
          <h2>Welcome To News!</h2>
        </Panel>
        <ListGroup>
          { newsElements }
        </ListGroup>
      </div>
    );
  }
});
