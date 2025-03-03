'use client'

import { useRouter } from "next/router";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "lucide-react";

export default function UserDetails() {
  const supabase = createClient();
  const router = useRouter();
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [locality, setlocality] = useState("");
  const [pincode, setpincode] = useState("");   

  const handleSubmit = async (e: React.FormEvent) => {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) {
      console.error("Error getting user:", error?.message);
      return;
    }
    let uid = userData.user?.id;
    const userDetails={
        UserID:uid,
        UserFirstName:userFirstName,
        UserLastName:userLastName,
        Country:country,
        City:city,
        Locality:locality,
        Pincode:pincode
    }
    
    const { data: userDetailsData, error: insertError } = await supabase.from("UserDetails").insert([userDetails]);
    console.log(userDetailsData, insertError);
    if (error) {
      console.log(error);
      console.log("Error inserting user details:");
    }

    router.push("/dashboard");
  };

  return (
    <div>
      <h1>User Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_Firstname">User Name:</label>
        <input
          onChange={(e) => setuserFirstName(e.target.value)}
          type="text"
          id="name"
          name="name"
          required
        />
        <label htmlFor="user_Lastname">User Name:</label>
        <input
          onChange={(e) => setuserLastName(e.target.value)}
          type="text"
          id="name"
          name="name"
          required
        />
        <label htmlFor="country">Country</label>
        <input
          onChange={(e) => setcountry(e.target.value)}
          type="text"
          id="country"
          name="country"
          required
        />
        <label htmlFor="city">City</label>
        <input
          onChange={(e) => setcity(e.target.value)}
          type="text"
          id="city"
          name="city"
          required
        />
        <label htmlFor="Locality">Locality</label>
        <input
          onChange={(e) => setlocality(e.target.value)}
          type="text"
          id="locality"
          name="locality"
          required
        />
        <label htmlFor="Pincode">Pincode</label>
        <input onChange={(e) => setpincode(e.target.value)} type="text" id="pincode" name="pincode" required />
      </form>
    </div>
  );
}
