"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col bg-gray-600 items-center justify-center min-h-screen py-2">
      <h1 className=" text-3xl mb-3 font-sans">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <div className="flex flex-col justify-evenly w-[400px] border border-white p-6 rounded-2xl">
        <label htmlFor="email" className=" text-xl font-sans">
          Email
        </label>
        <input
          className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password text-xl">Password</label>
        <input
          className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <div className="flex justify-center">
          <button
            onClick={onLogin}
            className="p-2 m-1 border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Login
          </button>
          <button className="p-2 m-1 border hover:bg-white hover:text-black border-gray-300 transition-colors duration-200 ease-in-out rounded-lg mb-4 focus:outline-none focus:border-gray-600">
            <Link href="/forgotpassword">Forgot Password</Link>
          </button>
        </div>
      </div>
      <Link className="hover:underline mt-2 text-lg" href="/signup">
        Visit Signup page
      </Link>
    </div>
  );
}
