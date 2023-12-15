"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const toggleUserDetails = async () => {
    if (!user) {
      const res = await axios.get("/api/users/me");
      setUser(res.data.data._id);
      console.log(res.data);
    } else {
      setUser("nothing");
    }
  };

  return (
    <div className="flex flex-col bg-gray-600 items-center justify-center min-h-screen py-2">
      <h1 className=" text-3xl text-center m-2">Profile Page</h1>
      <div className="flex flex-col justify-center border border-white rounded-xl p-8 w-[400px] h-[400px]">
        <div className="flex flex-col justify-center m-2">
          <p className="p-1 text-xl">Here are the details</p>
          <h2 className="p-1">
            Hello{" "}
            {user ? (
              <button className="p-2 m-1 border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                <Link href={`/profile/${user}`}>{user}</Link>
              </button>
            ) : (
              "Guest"
            )}
          </h2>
        </div>
        <div className="flex flex-col">
          <button
            onClick={logout}
            className="p-2 m-1 border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Logout
          </button>
          <button
            onClick={toggleUserDetails}
            className="p-2 m-1 border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
          >
            {user ? "Hide" : "Get"} User details
          </button>
        </div>
      </div>
    </div>
  );
}
