var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var fs = require('fs')

var redis = require('redis')
var client = redis.createClient()

var request = require('request-json')
var replyInterval = config.replyInterval


client.lpop('wowwwlogoff', function (err, userEvent) {
  console.log('popping', userEvent)
  if (err) {
    console.log(err)
    client.end()
    throw "a party"
  } else if (userEvent !== null) {
    var t = JSON.parse(userEvent)
    switch (t.event) {
      case "follow":
        T.post('friendships/create', {screen_name: t.target}, function (e, d, r){
          console.log("FRIENDED", t.target)
          // close connection and program
          client.end()
          throw "a party"
        })
        break;
      case "tweet":
        if (Math.random() < 0.05) {
          T.post('statuses/update', {status: '@' + t.target + ' wow, logoff', in_reply_to_status_id: t.id_str}, function (err, data, response) {
            console.log("REPLIED", t.target)
            client.end()
            throw "a party"
          })
          break;
        }
      }
  } else {
    // OH, OF COURSE!
    client.end()
    throw "a party"
  }
})


// // popQueue modified from sorting-bot by Darius Kazemi
// // https://github.com/dariusk/sorting-bot/blob/master/index.js
//
// Copyright (c) 2015 Kazemi, Darius

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.