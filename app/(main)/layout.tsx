import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import SidebarWrapper from "../components/sidebar/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist Shuffler App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-full">
            <Navbar/>
            <div className="flex">
                <SidebarWrapper/>
                <div className="p-5 flex flex-1 bg-gray-700">
                    {children}
                </div>
            </div>

        </main>
        
        
        </body>
    </html>
  );
}
