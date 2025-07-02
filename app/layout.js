import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter=Inter({subsets:["latin"]});


export const metadata = {
  title: "WealthWise",
  description: "A Wealth Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
       <html lang="en">
          <body
            className={`${inter.className}`}>
              <head>
                <link rel="icon" href="/WealthWise.png" sizes="any" />
              </head>
              {/*Header*/}
              <Header />
              <main className="min-h-screen mt-25">
                {children}
              </main>
              <Toaster richColors />
              {/*Footer*/}
              <footer className="bg-blue-50 py-12">
                <div className="container mx-auto px-4 text-black-600 text-center">
                  <p>By Soumitra9458⚡🔥</p>
                </div>
              </footer>

      </body>
    </html>
    </ClerkProvider>
   
  );
}
