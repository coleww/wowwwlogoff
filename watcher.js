var Twit = require('twit')
var config = require('./config')
var T = new Twit(config.twitter)
var stream = T.stream('user')
var redis = require('redis')
var client = redis.createClient()

stream.on('message', function (t) {
  console.log(t)


  // some big switch case statement here for all the event things we need to handle,
  // and make a util module with handlers for each of them.
  // if the handler returns an obj, push it to the queue, else, do nothing?
  // if (t.event == 'follow')
  switch (t.event) {
    case "Oranges":
      console.log("Oranges are $0.59 a pound.");
      break;
    case "Apples":
      console.log("Apples are $0.32 a pound.");
      break;
    case "Bananas":
      console.log("Bananas are $0.48 a pound.");
      break;
    case "Cherries":
      console.log("Cherries are $3.00 a pound.");
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      break;
    default:
      console.log("Sorry, we are out of " + expr + ".");
  }


  // client.rpush('wowwwlogoff', JSON.stringify({event: t.event, target: t.source.screen_name, id_str: t.source.id_str}), redis.print)
})
