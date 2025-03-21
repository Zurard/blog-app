"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function UserDetails() {
  const supabase = createClient();
  const router = useRouter();
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setcountry] = useState("");
  const [state, setState] = useState("");
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
    console.log("User ID: ", uid);

    const userDetails = {
      UserID: uid,
      FirstName: userFirstName,
      LastName: userLastName,
      Age: parseInt(age, 10),
      Country: country,
      State: state,
      City: city,
      Locality: locality,
      Pincode: parseInt(pincode, 10),
    };

    //checking all the coloumns names
    // const {data:col, error: colerror } = await supabase.from("UserDetail").select("*");
    // console.log("Columns are as follows: ",col);
    // console.log("Error in fetching columns: ",colerror);

    //inseting data into the table
    const { data: userDetailsData, error: insertError } = await supabase
      .from("UserDetail")
      .insert([userDetails]);
    console.log("user details are as follwed ", userDetails);
    console.log("data being passed into a table ", userDetailsData);
    if (insertError) {
      console.log("Error inserting user details:", insertError);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-700 text-white p-4">
  <div className="text-7xl font-bold" style={{ fontFamily: "var(--font-fleur-de-leah)" }}>The Diaries</div>
  <div className="text-6xl text-amber-200 font-bold mb-6" style={{ fontFamily: "var(--font-libre-caslon-display)" }}>User Details</div>
  
  <div className="w-full max-w-2xl p-8 bg-amber-800 rounded-2xl shadow-xl border border-amber-600">
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      {/* First row */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col flex-1">
          <label htmlFor="user_Firstname" className="text-sm font-semibold mb-1">
            First Name:
          </label>
          <input
            onChange={(e) => setuserFirstName(e.target.value)}
            type="text"
            id="user_Firstname"
            name="user_Firstname"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <label htmlFor="user_Lastname" className="text-sm font-semibold mb-1">
            Last Name:
          </label>
          <input
            onChange={(e) => setuserLastName(e.target.value)}
            type="text"
            id="user_Lastname"
            name="user_Lastname"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
      </div>
      
      {/* Second row */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col flex-1">
          <label htmlFor="age" className="text-sm font-semibold mb-1">
            Age:
          </label>
          <input
            onChange={(e) => setAge(e.target.value)}
            type="text"
            id="age"
            name="age"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <label htmlFor="country" className="text-sm font-semibold mb-1">
            Country:
          </label>
          <input
            onChange={(e) => setcountry(e.target.value)}
            type="text"
            id="country"
            name="country"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
      </div>
      
      {/* Third row */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col flex-1">
          <label htmlFor="state" className="text-sm font-semibold mb-1">
            State:
          </label>
          <input
            onChange={(e) => setState(e.target.value)}
            type="text"
            id="state"
            name="state"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <label htmlFor="city" className="text-sm font-semibold mb-1">
            City:
          </label>
          <input
            onChange={(e) => setcity(e.target.value)}
            type="text"
            id="city"
            name="city"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
      </div>
      
      {/* Fourth row */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col flex-1">
          <label htmlFor="locality" className="text-sm font-semibold mb-1">
            Locality:
          </label>
          <input
            onChange={(e) => setlocality(e.target.value)}
            type="text"
            id="locality"
            name="locality"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <label htmlFor="pincode" className="text-sm font-semibold mb-1">
            Pincode:
          </label>
          <input
            onChange={(e) => setpincode(e.target.value)}
            type="text"
            id="pincode"
            name="pincode"
            className="w-full p-2 rounded-md border border-amber-500 bg-amber-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full mt-6 py-2 bg-yellow-400 text-amber-900 font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
</div>
  );
}
