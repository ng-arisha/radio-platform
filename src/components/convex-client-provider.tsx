"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { SunIcon } from "lucide-react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
            {children}
        </Authenticated>
        <Unauthenticated>
            <div className="flex flex-col bg-gray-900 min-h-screen items-center justify-center p-4">
            <SignIn/>
            </div>
        </Unauthenticated>
        <AuthLoading>
            <div className="flex flex-col bg-gray-900 min-h-screen items-center justify-center p-4">
                <SunIcon className="animate-spin text-white" size={24}/>
            </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}