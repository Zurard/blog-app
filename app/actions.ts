'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function myAction() {
  return { message: "Action completed!" };
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error);
    return error.message
    // alert("Invalid email or password")
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    email_confirm: true
  }

   console.log("Data for Signup: ",data)

  const { error } = await supabase.auth.signUp(data)
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  console.log(error);
  if (error) {
   return error.message
  }
  if (userData.user?.confirmed_at){
  console.log("hello 111 : ",userData.user?.confirmed_at)
  revalidatePath('/', 'layout')
  // redirect('/userDetails')
  return {message : "User Created Successfully"};
  
  }
 
}