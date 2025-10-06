import { ConvexClientProvider } from "@/components/convex-client-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";


const poppins =  Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
})


export const metadata: Metadata = {
  title: "The Radio Network Platform",
  description: "The Radio Network Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <ConvexClientProvider>
        <Toaster
              toastOptions={{
                style: {
                  fontSize: '10px'
                },
                duration: 3000
              }}
              position="top-right"
            />
        {children}
        </ConvexClientProvider>
        
      </body>
    </html>
  );
}
