"use client";

import { login } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-2xl font-bold text-blue-500 mb-10">
        LOGIN PAGE
      </div>
      <form className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-80">
        <label className="text-sm font-medium" htmlFor="email">
          Email:
        </label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="email"
          name="email"
          type="email"
          required
        />
        <label className="text-sm font-medium" htmlFor="password">
          Password:
        </label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          formAction={async (formData) => {
            const error = await login(formData);
            if (error) {
              alert(error);
            }
          }}
        >
          Log in
        </button>
      </form>
       <div className="mt-4 text-blue-500 hover:underline">
        if you don't have an account
       </div>
      <button
        className=" p-3 mt-4 text-white rounded-sm bg-blue-600 hover:underline"
        onClick={() => router.push("/signUp")}
      >
        {" "}
        Sign_Up{" "}
      </button>
    </div>
  );
}
