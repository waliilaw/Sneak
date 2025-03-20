'use client'

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import { RoomIdProvider } from '@/context/RoomIdContext';
import { UserIdProvider } from '@/context/UserIdContext';


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    // Simulate loading for a short duration
    const timeout = setTimeout(() => setLoading(false), 500); // Adjust the timeout as needed

    // Listen for route changes
    // router.events.on("routeChangeStart", handleRouteChange);
    // router.events.on("routeChangeComplete", handleComplete);
    // router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timeout);
      // router.events.off("routeChangeStart", handleRouteChange);
      // router.events.off("routeChangeComplete", handleComplete);
      // router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (<html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
    <RoomIdProvider>
      <UserIdProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {loading && <Loading />}
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </UserIdProvider>
    </RoomIdProvider>
    </body>
    </html>
  )
}

import './globals.css'