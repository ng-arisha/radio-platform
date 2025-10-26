"use client";

import { forgotPassword } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { Radio, SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function ForgotPasswordForm() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.auth.loading);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleForgotPassword = async () => {
    if(email===""){
        toast.error("Please enter your email");
        return;
    }

    const data = {
        email,
    }
    const res = await dispatch(forgotPassword(data));
    if (forgotPassword.fulfilled.match(res)) {
      router.push("/login");
    } 
  };
  return (
    <div className="w-full max-w-xl">
      <form className="bg-gray-800/80 shadow-md border-t-4 border-t-gray-700 rounded-2xl px-8 pt-6 pb-8 mb-4">
        {/* logo */}
        <div className="flex justify-center mb-6">
          <span>
            <Radio className=" text-gray-400" size={40} />
          </span>
        </div>
        <h1 className="text-xl lg:text-2xl text-center font-semibold mb-4 text-gray-200">
          Welcome Back
        </h1>
        <p className="text-gray-200 font-medium text-center mb-6">
          Provide Your Email to receive reset instructions
        </p>
        <div className="mb-6 w-full">
          <Input
            value={email}
            onChange={setEmail}
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex justify-end items-center mb-6">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-gray-200 transition"
          >
            Remembered password?
          </Link>
        </div>
        <div className="mb-6 flex justify-center items-center">
         {
            loading === "pending" ? (
               <SunIcon className="animate-spin text-white" size={24} />
            ):(
                <Button
                onClick={handleForgotPassword}
                className="w-full"
                variant="primary"
                disabled={email === ""}
              >
                Submit
              </Button>
            )
         }
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
