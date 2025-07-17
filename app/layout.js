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
       <html lang="en" className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800">
          <body
            className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800 ${inter.className}`}>
              <head>
                <link rel="icon" href="/WealthWise.png" sizes="any" />
              </head>
              {/*Header*/}
              <Header />
              <main className="mt-21 min-h-screen relative bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800">
                {children}
              </main>
              <Toaster richColors />
              {/*Footer*/}
              <footer className="mt-25 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800 py-12">
                <div className="container mx-auto px-4 text-gray-400 text-center">
                  <p><span className="neon-glow">By Soumitra9458⚡🔥</span></p>
                </div>
              </footer>

      </body>
    </html>
    </ClerkProvider>
   
  );
}
