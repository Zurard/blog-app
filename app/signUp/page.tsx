"use client";

import { signup } from "../actions";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignUp() {
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [phone, setphone] = useState("");

  const checkpassword = () => {
    if (password1 === password2) {
      return redirect("/dashboard");
    }
    return alert("Passwords do not match!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={checkpassword}
        className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-80"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <label htmlFor="email" className="text-sm font-medium">Email:</label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password1" className="text-sm font-medium">Password:</label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="password1"
          name="password1"
          type="password"
          required
          onChange={(e) => setpassword1(e.target.value)}
        />
        <label htmlFor="password2" className="text-sm font-medium">Confirm Password:</label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="password2"
          name="password2"
          type="password"
          required
          onChange={(e) => setpassword2(e.target.value)}
        />
        {/* <label htmlFor="phone" className="text-sm font-medium">Phone Number:</label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="phone"
          name="phone"
          type="text"
          required
          onChange={(e) => setphone(e.target.value)}
        /> */}
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={checkpassword}
          formAction={async (formData) => {
            const error = await signup(formData);
            if (error) {
              alert(error);
            }
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BookOpen } from "lucide-react"
// import { redirect } from "next/navigation"
// import { signup } from "../actions";

// export default function SignUpPage() {
//   const [email, setEmail] = useState("")
//   const [password1, setPassword1] = useState("")
//   const [password2, setPassword2] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const err= []
//     if(password1 === password2){
//             return (redirect('/dashboard'))
//           }
//     else {
//       alert("passwords do not match!!")
//       err.push( {msg: "passwords do not match!! " });
//     }
//     // Handle form submission here
//     console.log("Form submitted:", { name, email, password1 })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <BookOpen className="inline-block text-yellow-600 mb-2" size={48} />
//           <h1 className="text-3xl font-bold text-yellow-800">The Diaries</h1>
//           <p className="text-yellow-700 mt-2">Share your stories with the world</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-8 border border-yellow-100">
//           <h2 className="text-2xl font-semibold text-yellow-900 mb-6 text-center">Sign Up</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* <div className="space-y-2">
//               <Label htmlFor="name" className="text-yellow-800">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
//                 required
//               />
//             </div> */}
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-yellow-800">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-yellow-800">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password1}
//                 onChange={(e) => setPassword1(e.target.value)}
//                 className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="Confirm password" className="text-yellow-800">
//                 Confirm Password
//               </Label>
//               <Input
//                 id="confirm password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password2}
//                 onChange={(e) => setPassword2(e.target.value)}
//                 className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
//                 required
//               />
//             </div>
//             <Button type="submit" formAction={signup} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
//               Create Account
//             </Button>
//           </form>
//         </div>
//         <p className="text-center mt-4 text-yellow-700">
//           Already have an account?{" "}
//           <a href="#" className="text-yellow-600 hover:underline">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   )
// }
