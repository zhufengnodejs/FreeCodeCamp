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

      let timePosted = String(new Date(newsPiece.timePosted)).split(' ');
      let day = timePosted[0];
      let date = timePosted[2];
      let month = timePosted[1];
      let year = timePosted[3];
      let time = timePosted[4].split(':');
      time.pop();
      time = time.join(':');
      timePosted = time + " " + day + " " + date + "/" + month + "/" + year;
      const link = newsPiece.link;
      const image = newsPiece.author.picture;
      const userName = newsPiece.author.username;

      return (
        <ListGroupItem key={ newsPiece.title + String(newsPiece.timePosted) }>
          <div>
            <div style = {{display: 'flex'}}>
              <div style = {{display: 'flex', flexDirection: 'column', paddingRight: '8px'}}>
                <a target = "_blank" href = { "/" + String(userName) } ><img alt = { userName } src = { image } style = {{height: '50px', width: '50px', margin: '16px 6px'}} /></a>
                <button className = "btn btn-no-shadow btn-primary btn-xs btn-primary-ghost btn-upvote" >upVote</button>
              </div>
              <div>
                <h3><a target = "_blank" href = { link } >{ newsPiece.headline }</a></h3>
                <a href = "#" data-user = {userName} >{ timePosted + " by: @" + userName }</a>
              </div>
            </div>
          </div>
        </ListGroupItem>
      );
    });

    let submit = "";

    if(1===1){
      submit = <a className = "btn btn-lg btn-block btn-primary" href = "/news/submit">Submit a Story</a>;
    }

    return (
      <div>
        <Panel>
          <h2>Welcome To News!</h2>
          <br/>
          <br/>
          {submit}
        </Panel>
        <ListGroup>
          { newsElements }
        </ListGroup>
      </div>
    );
  }
});
