"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Likes from "./likes"
import { experimental_useOptimistic as useOptimistic, useEffect } from "react"
import { Router } from "next/router"
import { useRouter } from "next/navigation"

export default function Tweets({tweets}: {tweets: TweetWithAuthor[]}) {
  // When we call the useOptimistic hook we get back an Array
  // with the first value being our optimistic collection
  // and the second value being a function to add an optimistic tweet
  const [optimisticTweets, addOptimisticTweet] = 
    // the useOptimistic hook has two arguments
    useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
      tweets, // the initial value

      // a callback function that gets the current list of optimistic tweets
      // as well as the tweet we'd like to add (changes)
      (currentOptimisticTweets, newTweet) => {
        // in the body of the function we need to specify how to merge the two values
        const newOptimisticTweets = [...currentOptimisticTweets]
        const index = newOptimisticTweets.findIndex(tweet => tweet.id === newTweet.id)
        newOptimisticTweets[index] = newTweet
        return newOptimisticTweets
      }
    )

    const supabase = createClientComponentClient()
    const router = useRouter()
    useEffect(() => {
      const channel = supabase.channel('realtime tweets')
      .on('postgres_changes', 
        { event:'*', schema: 'public', table: 'tweets' },
        (payload)=> { router.refresh() })
      .subscribe()

      return () => { supabase.removeChannel(channel) }
    }, [router, supabase])

  return optimisticTweets.map(tweet => (
      <div key={tweet.id}>
        <p>
          {tweet.author.name} {tweet.author.username} 
        </p>
        <p>{tweet.title}</p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet}/>
      </div>
    ))
  
}