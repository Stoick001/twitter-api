import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { postTweet, fetchTweets } from '../actions';

import FormField from './utils/FormField';

class MakeTweet extends Component {
  handleNewTweet(values) {
     this.props.postTweet(values);
     this.props.fetchTweets();
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(values => this.handleNewTweet(values)) }>
          <Field component={FormField} type="input" name="status" />
          <button type="submit" className="btn btn-tweet">Tweet</button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  let errors = {};

  if (!values.status) {
    errors.status = "Insert something to tweet";
  }

  return errors;
}

export default connect(null, { postTweet, fetchTweets })(reduxForm({
  form: 'MakeTweetForm',
  validate
})(MakeTweet));
