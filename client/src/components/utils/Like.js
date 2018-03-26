import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeTweet } from '../../actions';

class Like extends Component {

  state = {
    likes: this.props.likes,
    likeText: 'Like'
  }

  componentWillMount() {
    if (this.state.likes) {
      this.setState({likeText: 'Unlike'});
    } else {
      this.setState({likeText: 'Like'});
    }
  }

  handleClick() {
    if (this.state.likes) {
      this.props.likeTweet({id: this.props.id, likes: this.state.likes});
      this.setState({likeText: 'Like'});
    } else {
      this.props.likeTweet({id: this.props.id, likes: this.state.likes});
      this.setState({likeText: 'Unlike'});
    }
    this.setState({likes: !this.state.likes});
  }

  render() {
    return <span style={this.state.likes ? { color: '#08a0e9' }: {}} onClick={() => this.handleClick()}>{this.state.likeText}</span>
  }
}

export default connect(null, { likeTweet })(Like);
