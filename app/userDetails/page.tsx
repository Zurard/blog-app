"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserPlus } from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle";

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
    const uid = userData.user?.id;

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

    const { error: insertError } = await supabase
      .from("UserDetail")
      .insert([userDetails]);

    if (insertError) {
      console.log("Error inserting user details:", insertError);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4 py-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 transition-all duration-300 hover:text-indigo-800">
            Complete Your Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            We’d love to get to know you better
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              placeholder="John"
              value={userFirstName}
              onChange={(e) => setuserFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              placeholder="Doe"
              value={userLastName}
              onChange={(e) => setuserLastName(e.target.value)}
            />
          </div>
          <InputField
            label="Age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <InputField
            label="Country"
            placeholder="India"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          />
          <InputField
            label="State"
            placeholder="Maharashtra"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <InputField
            label="City"
            placeholder="Mumbai"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <InputField
            label="Locality"
            placeholder="Andheri"
            value={locality}
            onChange={(e) => setlocality(e.target.value)}
          />
          <InputField
            label="Pincode"
            placeholder="400053"
            value={pincode}
            onChange={(e) => setpincode(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-300"
      />
    </div>
  );
}
