"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState("")
  const [username, setUsername] = useState("")

  const handleJoinRoom = () => {
router.push('/publicchat')
  }
  return (
    <main className="flex  flex-col items-center justify-center p-4 relative dark:bg-[#06D6A0] overflow-hidden">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="absolute top-4 left-4">
      <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="rounded-full border border-black dark:border-light-yellow"
          > <ArrowLeft className="h-5 w-5" />
          </Button>
</div>
      {/* <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-sm">
        Connection status: {connectionStatus}
      </div> */}

      <div className="w-full max-w-md flex flex-col items-center gap-2">
        <h1 className="text-7xl font-bold text-[#06D6A0] dark:text-light-yellow tracking-tight pt-28 pb-5">Sneak</h1>


        <h3 className="text-4xl font-bold border-[#06D6A0] dark:text-black tracking-tight pt-6">Public Rooms </h3>
        <div className="w-full space-y-4">
          <div className="glass p-6 rounded-full w-full space-y-4 dark:bg-transparent border-none">
            <Button
              onClick={handleJoinRoom}
              className="rounded-full w-full border bg-trasparent border-black text-black hover:bg-emerald/90 dark:bg-white dark:text-black dark:hover:bg-black/40 dark:border-black"
            
            >
              AI ChatRoom
            </Button>
            <Button
              onClick={handleJoinRoom}
              className="rounded-full w-full border bg-trasparent border-black text-black hover:bg-emerald/90 dark:bg-white dark:text-black dark:hover:bg-black/40 dark:border-black"
            
            >
              Human Room
            </Button>
            <Button
              onClick={handleJoinRoom}
              className="rounded-full w-full border bg-trasparent border-black text-black hover:bg-emerald/90 dark:bg-white dark:text-black dark:hover:bg-black/40 dark:border-black"
            >
              Hybrid Room
            </Button>
          </div>

          <div className="w-full space-y-4">
            <div className=" text-[0.69rem] text-gray-800 font-bold flex   align-middle items-center justify-center pt-3 text-transparent/50 gap-2">
<div>
  <a href="https://x.com/Waliilaww" className="hover:text-black">Twitter</a>
</div>
<div className="hover:text-black cursor-pointer">
• 
</div>
<div>
<a href="https://github.com/waliilaw" className="hover:text-black">Github</a>
</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

