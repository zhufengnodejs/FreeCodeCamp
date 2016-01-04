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
    console.log('news', news);

    const newsElements = news.map(( newsPiece ) => {

      const description = typeof newsPiece.description !== 'undefined' ? <p>{ newsPiece.description }</p> : "";

      return (
        <ListGroupItem key={ newsPiece.id }>
          <Link to={ newsPiece.link }>
            <h3>{ newsPiece.headline }</h3>
            { description }
          </Link>
        </ListGroupItem>
      );
    });

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
