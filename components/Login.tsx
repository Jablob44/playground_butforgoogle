"use client";

import React from "react";
import { signIn } from "next-auth/react";

type Props = {};

function Login({}: Props) {
  return (
    <div className="bg-[#000000] h-screen flex flex-col items-center justify-center text-center">
      <img
        src="https://drive.google.com/uc?export=download&id=1lZj_K4hnTlQPD_rqq7OCyk29wraHlCx-"
        alt="logo"
        className="w-96"
      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-2xl animate-pulse"
      >
        Sign in with your school Google account
      </button>
    </div>
  );
}

export default Login;
