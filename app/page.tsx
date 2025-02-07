"use client";

import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      <form className="flex flex-col items-center justify-center mt-auto  ">
        <label htmlFor="email">Email:</label>
        <input
          className="items-center justify-center"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="text-black"
          id="password"
          name="password"
          type="password"
          required
        />
        <button formAction={login}>Log in</button>
      </form>
      <button onClick={() => router.push("/signUp")}> Sign_Up </button>
    </div>
  );
}

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BookOpen } from "lucide-react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { login } from "./actions";

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle login submission here
//     console.log("Login submitted:", { email, password })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <BookOpen className="inline-block text-yellow-600 mb-2" size={48} />
//           <h1 className="text-3xl font-bold text-yellow-800">The Diaries</h1>
//           <p className="text-yellow-700 mt-2">Welcome back to your stories</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-8 border border-yellow-100">
//           <h2 className="text-2xl font-semibold text-yellow-900 mb-6 text-center">Log In</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
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
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-yellow-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-yellow-700">
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>
//             <Button formAction={login} type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
//               Log In
//             </Button>
//           </form>
//         </div>
//         <p className="text-center mt-4 text-yellow-700">
//           Don't have an account?{" "}
//           <Link  href="/signUp" className="text-yellow-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }