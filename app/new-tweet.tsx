import { User } from "@supabase/auth-helpers-nextjs"
import { createServerSupabaseClient } from "app/createServerSupabaseClient"

import Image from "next/image"

export default function NewTweet({user}: {user: User}) {
  const addTweet = async (formData: FormData) => {
    "use server"
    const title = String(formData.get("title"))
    const supabase = createServerSupabaseClient()
    await supabase.from("tweets").insert({ title, user_id: user.id })
  }

  return (
    <form className="border border-gray-800 border-top-0" action={addTweet}>
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          <Image src={user.user_metadata.avatar_url} alt="user avatar" width={48} height={48} className="rounded-full"/>

        </div>
        <input className="bg-inherit flex-1 ml-2 text-xl leading-loose placeholder-gray-500 px-2" type="text" name="title" placeholder="what is happening?!"/>
      </div>
    </form>
  )
}