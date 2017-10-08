import TwitterService from './services/twitter'

const isDuplicate = (tweet, ids) => {
  return ids.includes(tweet.id)
}

export const addTweets = (tweets, target = 'tweet') => state => {
  const tweetsUnique = tweets.filter(tweet => {
    return !isDuplicate(tweet, state[`${target}Ids`])
  })
  const ids = tweetsUnique.map(tweet => tweet.id)

  return Object.assign({},
    state,
    {
      [`${target}s`]: [ ...tweetsUnique, ...state[`${target}s`] ],
      [`${target}Ids`]: [ ...ids, ...state[`${target}Ids`] ]
    }
  )
}

export const addTweet = (tweet, target = 'tweet') => state => {
  return Object.assign({},
    state,
    {
      [`${target}s`]: [ tweet, ...state[`${target}s`] ],
      [`${target}Ids`]: [ tweet.id, ...state[`${target}Ids`] ]
    }
  )
}

export const openTweet = _ => state => {
  return Object.assign({},
    state,
    { isOpenTweet: true }
  )
}

export const closeTweet = _ => state => {
  return Object.assign({},
    state,
    { isOpenTweet: false }
  )
}

export const editTweetValue = value => state => {
  return Object.assign({},
    state,
    { tweetValue: value }
  )
}

const clearTweet = _ => state => {
  return Object.assign({},
    state,
    {
      tweetValue: '',
      closeTweet: false
    }
  )
}

export const postTweet = _ => state => async (dispatch, getState) => {
  if (state.tweetValue === '') return state
  const tweet = state.tweetValue.trim()

  try {
    await TwitterService.postTweet(tweet)
    await dispatch(clearTweet())
  } catch (err) {
    console.log(err)
  }
}
