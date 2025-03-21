"use client";

import { signup } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { myAction } from "../actions";

export default function signUp() {
  const router = useRouter();
  // const [email, setEmail] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  // const [phone,setphone] = useState("");

  const checkpassword = () => {
    console.log("password1", password1);
    console.log("password2", password2);

    if (password1 === password2) {
      // return redirect("/dashboard");
    }
    else{
      alert("passwords do not match from the frontend!!")
    }
  };

  return (<div className="min-h-screen flex flex-col items-center justify-center bg-amber-700 text-white p-4">
    <div className="text-8xl font-bold" style={{ fontFamily: "var(--font-fleur-de-leah)" }}>The Diaries</div>
    <div className="text-6xl text-amber-200 font-bold mb-6" style={{ fontFamily: "var(--font-libre-caslon-display)" }}>Sign Up</div>
    
    <form
      onSubmit={checkpassword}
      className="flex flex-col w-full max-w-md p-8 bg-amber-800 rounded-2xl shadow-xl border-4 border-amber-600"
    >
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold mb-1" htmlFor="email">
          Email:
        </label>
        <input
          // onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold mb-1" htmlFor="password1">
          Password:
        </label>
        <input
          onChange={(e) => setpassword1(e.target.value)}
          className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold mb-1" htmlFor="password2">
          Confirm Password:
        </label>
        <input
          onChange={(e) => setpassword2(e.target.value)}
          className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          id="password2"
          name="password2"
          type="password"
          required
          placeholder="Confirm your password"
        />
      </div>
        
      <button
        className="w-full mt-4 py-2 bg-yellow-400 text-amber-900 font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
        onClick={checkpassword}
        formAction={async (formData) => {
          const error = await signup(formData)
          if (error) {
            alert(error)
          }
          else {
            alert("User Created Successfully")
          }
        }}
      >
        Sign Up
      </button>
    </form>
    
    <div className="mt-6 p-5 bg-amber-900 border-4 border-amber-600 rounded-lg shadow-md text-center">
      <div className="text-lg font-semibold mb-3">Already have an account?</div>
      <button 
        className="bg-orange-500 text-white py-2 px-5 rounded-md hover:bg-orange-600 transition duration-300"
        onClick={() => router.push("/")}
      >
        Log In
      </button>
    </div>
  </div>
    
  );
}

