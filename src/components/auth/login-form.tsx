"use client";

import { login } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { UserRole } from "@/utils/utils";
import { jwtDecode } from "jwt-decode";
import { Radio, SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Input from "../shared/input";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    const data = {
      email,
      password,
    };
    const res = await dispatch(login(data));
    console.log(res);
    if (login.fulfilled.match(res)) {
      if (!res.payload.access_token) {
        return;
      }
      console.log(res);
      setEmail("");
      setPassword("");
      const decodedToken = jwtDecode<JwtPayloadType>(res.payload.access_token);
      console.log(decodedToken);
      const role = decodedToken.role;
      if (role === UserRole.ADMIN) {
        router.push("/");
      } else if (role === UserRole.PRESENTER) {
        if (decodedToken.show) {
          // navigate to that show
          router.push(`/shows/${decodedToken.show}/dashboard`);
        } else {
          router.push("/un-authorized");
        }
      }
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
          Sign in to continue to radio Platform
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
        <div className="mb-6">
          <Input
            value={password}
            onChange={setPassword}
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-end items-center mb-6">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-gray-200 transition"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mb-6 flex justify-center items-center">
          {loading === "pending" ? (
            <SunIcon className="animate-spin text-white" size={24} />
          ) : (
            <Button
              onClick={handleLogin}
              className="w-full"
              variant="primary"
              disabled={email === "" || password === ""}
            >
              Sign In
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
