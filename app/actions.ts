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
    email_confirm: false,
    // options: {
    //   emailRedirectTo: "http://localhost:3000/userDetails"
    // }
  }

   console.log("Data for Signup: ",data)

  const { error } = await supabase.auth.signUp(data)
  const { data: userData } = await supabase.auth.getUser();
  // console.log("this is the error",error);
  if (error) {
   return error.message
  }
  if (userData.user?.confirmed_at){
  console.log("hello 111 : ",userData.user)
  revalidatePath('/', 'layout') 
  redirect('/userDetails');
  
  } 
  console.log("hello 222 : ",userData.user)
 
}