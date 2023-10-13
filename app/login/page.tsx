import { createServerSupabaseClient } from 'app/createServerSupabaseClient'
import { redirect } from "next/navigation";
import GitHubButton from "./github-button";

export default async function Login() {
  const supabase = createServerSupabaseClient()
  const { data: { session }} = await supabase.auth.getSession()
  if (session) { redirect('/') }

  return (
    <div className="flex-1 flex justify-center items-center">
      <GitHubButton />
    </div>
  )

}