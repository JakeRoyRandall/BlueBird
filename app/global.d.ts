import { Database as db } from './lib/database.types'


type Tweet = db['public']['Tables']['tweets']['Row']
type Profile = db['public']['Tables']['profiles']['Row']



declare global {
  type Database = db
  type TweetWithAuthor = Tweet & {
    author: Profile;
    user_has_liked_tweet: boolean;
    likes: number;
  }
}

