var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user')
var redis = require('redis')
var client = redis.createClient()
var tipots = require('this-is-probably-ok-to-say')

stream.on('tweet', function (t) {
  if (t.user.screen_name !== config.botName && tipots(t.text) && Math.random() < config.prob) {
    client.rpush('wowwwlogoff', JSON.stringify({event: 'tweet', target: t.user.screen_name, id_str: t.id_str}), redis.print)
    console.log("Apples are $0.32 a pound.");
  }
})

stream.on('message', function (t) {
  console.log(t)
  if (t.source.screen_name !== config.botName && t.event == 'follow') {
    console.log("Oranges are $0.59 a pound.");
    client.rpush('wowwwlogoff', JSON.stringify({event: t.event, target: t.source.screen_name, id_str: t.source.id_str}), redis.print)
  }
})
