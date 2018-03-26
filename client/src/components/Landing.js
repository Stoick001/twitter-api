import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tweet } from 'react-twitter-widgets'
import _ from 'lodash';

import ReplyForm from './utils/ReplyForm';
import Retweet from './utils/Retweet';
import Like from './utils/Like';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.handleReplyFormShow = this.handleReplyFormShow.bind(this);
  }

  state = {
    showReplyForm: false,
    currId: '',
    screenName: ''
  }

  renderTweets() {
    return _.map(this.props.tweets, (tweet) => {
      return (
        <div key={tweet.id} className="tweet">
          <Tweet tweetId={tweet.id_str}/>
          <div className="actions">
            <div onClick={() => this.handleReplyFormShow(tweet.id_str, tweet.user.screen_name)}>Reply</div>
            <div><Retweet id={tweet.id_str} retweeted={tweet.retweeted} /></div>
            <div><Like id={tweet.id_str} likes={tweet.favorited} /></div>
          </div>
        </div>);
    });
  }

  renderReplyForm() {
    if (this.state.showReplyForm) {
      return <ReplyForm toggleReplies={this.handleReplyFormShow} id={this.state.currId} screenName={this.state.screenName} />;
    }
    return;
  }

  handleReplyFormShow(currId, screenName) {
    // console.log(currId);
    this.setState({
      showReplyForm: !this.state.showReplyForm,
      currId,
      screenName
    });
  }

  render() {
    if (!this.props.auth) {
      return null;
    }
    return (
      <div>
        {this.renderReplyForm()}
        {this.renderTweets()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tweets: state.tweets, auth: state.auth }
}

export default connect(mapStateToProps)(Landing);
