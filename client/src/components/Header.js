import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTweets } from '../actions';

import MakeTweet from './MakeTweet';

class Header extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.fetchTweets();
    }
  }

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.fetchTweets();
    }
  }

  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/twitter">Login With Twitter.</a></li>
        );
      default:
        return [
          <li key="1" className="tweet-new"><MakeTweet /></li>,
          <li key="2" className="logout"><a href="/api/logout">Logout</a></li>
        ];
    }
  }


  render() {
    return (
      <nav>
         <div className="nav-wrapper">
           <ul className="right">
              {this.renderContent()}
           </ul>
         </div>
       </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { fetchTweets })(Header);
