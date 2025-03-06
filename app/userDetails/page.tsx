'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "lucide-react";

export default function UserDetails() {
  const supabase = createClient();
  const router = useRouter();
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [age ,setAge] = useState("");
  const [country, setcountry] = useState("");
  const [state , setState] = useState("");
  const [city, setcity] = useState("");
  const [locality, setlocality] = useState("");
  const [pincode, setpincode] = useState("");   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) {
      console.error("Error getting user:", error?.message);
      return;
    }
    let uid = userData.user?.id;
    console.log("User ID: ",uid);

    const userDetails={
        "UserID":uid,
       "FirstName":userFirstName,
        "LastName":userLastName,
        "Age":parseInt(age,10),
        "Country":country,
        "State":state,
        "City":city,
        "Locality":locality,
        "Pincode":parseInt(pincode,10)
    }

    //checking all the coloumns names
    // const {data:col, error: colerror } = await supabase.from("UserDetail").select("*");
    // console.log("Columns are as follows: ",col);
    // console.log("Error in fetching columns: ",colerror);
    

    //inseting data into the table  
    const { data: userDetailsData, error: insertError } = await supabase.from("UserDetail").insert([userDetails]);
    console.log("user details are as follwed ",userDetails);
    console.log("data being passed into a table " , userDetailsData);
    if (insertError) {
      console.log("Error inserting user details:",insertError);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="user_Firstname" className="block text-sm font-medium text-gray-700">First Name:</label>
      <input
        onChange={(e) => setuserFirstName(e.target.value)}
        type="text"
        id="user_Firstname"
        name="user_Firstname"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <label htmlFor="user_Lastname" className="block text-sm font-medium text-gray-700">Last Name:</label>
      <input
        onChange={(e) => setuserLastName(e.target.value)}
        type="text"
        id="user_Lastname"
        name="user_Lastname"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
      <input
        onChange={(e) => setAge(e.target.value)}
        type="text"
        id="age"
        name="age"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
      <input
        onChange={(e) => setcountry(e.target.value)}
        type="text"
        id="country"
        name="country"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
      <input 
      onChange={(e) => setState(e.target.value)}
      type="text"
      id="state"
      name="state"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
      />
      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
      <input
        onChange={(e) => setcity(e.target.value)}
        type="text"
        id="city"
        name="city"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <label htmlFor="locality" className="block text-sm font-medium text-gray-700">Locality:</label>
      <input
        onChange={(e) => setlocality(e.target.value)}
        type="text"
        id="locality"
        name="locality"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode:</label>
      <input
        onChange={(e) => setpincode(e.target.value)}
        type="text"
        id="pincode"
        name="pincode"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      <button
        type="submit"
        className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      </form>
    </div>
  );
}
