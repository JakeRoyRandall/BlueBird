import {createServerSupabaseClient } from "app/createServerSupabaseClient"
import AuthButtonClient from "./auth-button"

export default async function AuthButtonServer() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  return <AuthButtonClient session={session}/>
}