"use client";

import { logout } from "@/lib/auth/auth";
import { AppDispatch } from "@/lib/store";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "./shared/button";

function UnAuthorizedException() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleGoBack = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center  space-y-4">
      <p className="text-3xl animate-bounce text-center">😠</p>
      <p className="text-2xl font-normal">
        You are not authorized to view any content
      </p>
      <Button
        onClick={handleGoBack}
        className="mt-4 flex items-center space-x-2 cursor-pointer"
      >
        <span>Go back</span>
        <LogOut size={16} />
      </Button>
    </div>
  );
}

export default UnAuthorizedException;
