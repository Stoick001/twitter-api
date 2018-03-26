import axios from 'axios';
import { FETCH_USER, FETCH_TWEETS, POST_TWEET, TWEET_REPLY, TWEET_RETWEET, LIKE_TWEET } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchTweets = () => async (dispatch) => {
  const res = await axios.get('/api/tweets_list');
  dispatch({type: FETCH_TWEETS, payload: res.data});
}

export const postTweet = (status) => async (dispatch) => {
  const res = await axios.post('/api/tweet', status);
  dispatch({type: POST_TWEET, payload: res.data});
}

export const replyToTweet = (vals) => async (dispatch) => {
  const res = await axios.post('/api/reply', { status: vals.status, id: vals.id, screenName: vals.screenName});
  dispatch({type: TWEET_REPLY, payload: res.data});
}

export const retweetTweet = (vals) => async (dispatch) => {
  const res = await axios.post('/api/retweet', { id: vals.id, retweeted: vals.retweeted });
  dispatch({type: TWEET_RETWEET, payload: res.data});
}

export const likeTweet = (vals) => async (dispatch) => {
  const res = await axios.post('/api/like', { id: vals.id, likes: vals.likes });
  dispatch({type: LIKE_TWEET, payload: res.data});
}
