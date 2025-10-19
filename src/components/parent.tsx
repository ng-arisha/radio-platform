"use client";

import { setUserFromToken } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Parent({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    dispatch(setUserFromToken());
  }, [dispatch,token]);
  return <div>{children}</div>;
}

export default Parent;
