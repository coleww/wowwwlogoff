wowwwlogoff
-----------------------



on (un)follow => (un)follow back

on mention => parse the tweet for "{NUMBER} tweets", record that user's max tweets
  - maybe if the user mentions the bot and uses the word "hiatus" it will reply wowwwwlogoff to ALL their tweets? (until they reply stop or unfollow etc.)
  - 
on reply => if user replies to bot a reply and says "no|stop|halt|cease|etc.", don't reply to them until the next day

on tweet => inc the user's counter for the day and/or reply to them
  - if the user has a max tweet # recorded, reply to them if they have tweeted > that many tweets during that last 24 hours
    - it replies to every tweet over the max? but the user can reply with STOP to make it go away for the rest of the day
  - if the user has not set a max tweet #, roll a Math.random() and reply if it is < {someProbability} and they haven't been replied to recently
