import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { replyToTweet, fetchTweets } from '../../actions';

import FormField from './FormField';

class ReplyForm extends Component {
  submitForm(values) {
    this.props.replyToTweet({status: values.status, id: this.props.id, screenName: this.props.screenName});
    this.props.fetchTweets();
    this.props.toggleReplies()
  }

  render() {
    console.log(this.props.id);
    return (
      <div>
        <div className="overlay" onClick={() => this.props.toggleReplies()}></div>
        <div className="reply-form">
          <div className="title">Reply to {this.props.screenName}:</div>
          <form onSubmit={ this.props.handleSubmit(values => this.submitForm(values)) }>
            <Field component={FormField} type="input" name="status" />
            <button type="submit" className="btn">Reply</button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = (values) => {
  let errors = {};

  if (!values.status) {
    errors.status = "Insert something to reply";
  }

  return errors;
}

export default connect(null, { replyToTweet, fetchTweets })(reduxForm({
  form: 'ReplyFormForm',
  validate
})(ReplyForm));
