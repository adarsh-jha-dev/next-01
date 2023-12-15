"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setSentEmail(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex bg-gray-600 flex-col justify-evenly align-middle h-screen ">
      {sentEmail ? (
        <div>
          <p className="text-xl text-center">
            Reset Passwword Email sent successfully!!
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center">
          <p className="text-center p-2">{loading ? "Processing..." : ""}</p>
          {error ? (
            <h3 className="text-center m-2 text-red-500">{error}</h3>
          ) : null}
          <div className="flex flex-col justify-center">
            <h1 className="m-2 text-xl">Send Passord Recovery Email</h1>
            <form
              className="flex flex-col justify-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col justify-evenly">
                <label htmlFor={email}></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                  placeholder="Email..."
                />
              </div>
              <button
                type="submit"
                className="p-2 w-full border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                Send password recovery email
              </button>
              <Link className="text-center hover:underline" href="/login">
                Login Instead
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
