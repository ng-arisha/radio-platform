"use client";

import { resetPassword } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { Radio, SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const handlePasswordReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      email,
      token,
      newPassword: password,
    };
    const res = await dispatch(resetPassword(data));
    if (resetPassword.fulfilled.match(res)) {
      toast.success("Password reset successful");
      router.push("/login");
    }
  };
  return (
    <div className="w-full max-w-xl">
      <form className="bg-gray-800/80 shadow-md w-full border-t-4 border-t-gray-700 rounded-2xl px-8 pt-6 pb-8 mb-4">
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
          Reset Your Passowrd
        </p>

        <div className="mb-6">
          <Input
            value={password}
            onChange={setPassword}
            label="New Password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-6">
          <Input
            value={confirmPassword}
            onChange={setConfirmPassword}
            label="Confirm Password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-end items-center mb-6">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-gray-200 transition"
          >
            Go Back?
          </Link>
        </div>
        <div className="mb-6 flex justify-center items-center">
          {loading === "pending" ? (
            <SunIcon className="animate-spin text-white" size={24} />
          ) : (
            <Button
              onClick={handlePasswordReset}
              className="w-full"
              variant="primary"
              disabled={confirmPassword === "" || password === ""}
            >
              Reset password
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
