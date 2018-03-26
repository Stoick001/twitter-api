import React, { Component } from 'react';
import { connect } from 'react-redux';

import { retweetTweet } from '../../actions';

class Retweet extends Component {

  state = {
    retweeted: this.props.retweeted,
    retweetText: 'Retweet'
  }

  componentWillMount() {
    if (this.state.retweeted) {
      this.setState({retweetText: 'Unretweet'});
    } else {
      this.setState({retweetText: 'Retweet'});
    }
  }

  handleClick() {
    if (this.state.retweeted) {
      this.props.retweetTweet({id: this.props.id, retweeted: this.state.retweeted});
      this.setState({retweetText: 'Retweet'});
    } else {
      this.props.retweetTweet({id: this.props.id, retweeted: this.state.retweeted});
      this.setState({retweetText: 'Unretweet'});
    }
    this.setState({retweeted: !this.state.retweeted});
  }

  render() {
    return <span style={this.state.retweeted ? { color: '#08a0e9' }: {}} onClick={() => this.handleClick()}>{this.state.retweetText}</span>
  }
}

export default connect(null, { retweetTweet })(Retweet);
