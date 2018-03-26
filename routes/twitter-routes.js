const Twitter = require('twitter');
const fetch = require('node-fetch');

const createCli = (clientObj) => {
  return new Twitter({
    consumer_key: clientObj.consumer_key,
    consumer_secret: clientObj.consumer_secret,
    access_token_key: clientObj.access_token_key,
    access_token_secret: clientObj.access_token_secret
  });
}

module.exports = (app, clientObj) => {

  app.get('/api/tweets_list', (req, res) => {
    const client = createCli(clientObj);

    client.get('statuses/home_timeline', {screen_name: 'twitter', count: 10}, (err, tweets, response) => {
      if (!err) {
        res.status(200).send(tweets);
      } else {
        res.send({error: 'Could not get the timeline'});
      }
    });
  });

  app.post('/api/tweet', (req, res) => {
    const client = createCli(clientObj);

    client.post('/statuses/update', { status: req.body.status }, (err, tweet, response) => {
      if (!err) {
        res.send('Success');
      } else {
        res.send({error: 'Cannot post a tweet'});
      }
    });
  });

  app.post('/api/reply', (req, res) => {
    const client = createCli(clientObj);

    client.post('/statuses/update', {
        status: '@' + req.body.screenName + ' ' + req.body.status,
        in_reply_to_status_id: req.body.id
    }, (err, tweet, response) => {
      if (!err) {
        res.send('Success');
      } else {
        res.send('Could not reply');
      }
    });
  });

  app.post('/api/retweet', (req, res) => {
    const client = createCli(clientObj);

    if (req.body.retweeted) {
      client.post('/statuses/unretweet/', {
        id: req.body.id
      }, (err, tweet, response) => {
        if (!err) {
          res.send('Success');
        } else {
          res.send('Could not reply');
        }
      });
    } else {
      client.post('/statuses/retweet/', {
        id: req.body.id
      }, (err, tweet, response) => {
        if (!err) {
          res.send('Success');
        } else {
          res.send('Could not reply');
        }
      });
    }
  });

  app.post('/api/like', (req, res) => {
    const client = createCli(clientObj);

    if (req.body.likes) {
      client.post('/favorites/destroy/', {
        id: req.body.id
      }, (err, tweet, response) => {
        if (!err) {
          res.send('Success');
        } else {
          res.send('Could not reply');
        }
      });
    } else {
      client.post('/favorites/create/', {
        id: req.body.id
      }, (err, tweet, response) => {
        if (!err) {
          res.send('Success');
        } else {
          res.send('Could not reply');
        }
      });
    }
  });
}
