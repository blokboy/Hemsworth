/* Setting things up. */
require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const helpers = require(__dirname + '/helpers.js')
const twitter = require(__dirname + '/twitter.js')

app.use(helmet())
app.use(morgan('combined'))
app.use(express.static('public'));
app.use(express.json())

app.all(`/${process.env.BOT_ENDPOINT}`, function(req, res) {

  /*
  twitter.delete_last_tweet(function(err, data) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('last tweet deleted...')
      res.sendStatus(200)
    }
  })

  twitter.tweet("Test tweeting don't mind me. 👋", function(err, data, res){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('tweeted');
      res.sendStatus(200);
    }
  });
  */

  //Get tweets will be generalized for any user you want to search for
  twitter.get_tweets(`${process.env.BOT_USERNAME}`, function(err, data) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('tweets retrieved')
      res.status(200).json(data)
    }
  })

});

var listener = app.listen(process.env.PORT, function(){
  console.log('your bot is running on port ' + listener.address().port);
});
