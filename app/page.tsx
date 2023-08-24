import { Inter } from '@next/font/google'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const supabase = createServerComponentClient({cookies})
  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <main>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}
