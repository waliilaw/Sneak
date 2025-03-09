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
  const [showAvailableRooms, setShowAvailableRooms] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("connected")

  const handleJoinRoom = () => {
    if (roomCode && username) {
      router.push(`/chat?room=${roomCode}&username=${username}`)
    }
  }

  const handleCreateRoom = () => {
    // Generate a random room code
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(newRoomCode)

    if (username) {
      router.push(`/chat?room=${newRoomCode}&username=${username}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative dark:bg-[#06D6A0]">
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

      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <h1 className="text-7xl font-bold text-[#06D6A0] dark:text-light-yellow tracking-tight">Sneak</h1>

        <div className="w-full space-y-4">
          <div className="glass p-6 rounded-xl w-full space-y-4 dark:bg-transparent">
            <Input
              type="text"
              placeholder="Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className=" bg-background/50   dark:bg-black/80 dark:backdrop-blur-sm  border-black dark:border-light-yellow rounded-full pl-5"
            />

            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-full bg-background/50  dark:bg-black/80 dark:backdrop-blur-sm border-black dark:border-light-yellow pl-5"
            />

            <Button
              onClick={handleJoinRoom}
              className="w-full bg-black text-light-yellow hover:bg-black/90 dark:bg-white dark:text-emerald dark:hover:bg-white/90"
            >
              Join Room
            </Button>
          </div>

          <div className="w-full space-y-4">
            <Button
              onClick={handleCreateRoom}
              className="w-full bg-emerald text-white hover:bg-emerald/90 dark:bg-light-yellow dark:text-emerald dark:hover:bg-light-yellow/90"
            >
              Create Room
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowAvailableRooms(!showAvailableRooms)}
              className="w-full border border-black dark:border-light-yellow hover:bg-background/40"
            >
              {showAvailableRooms ? (
                <span className="flex items-center gap-2">
                  <EyeOff size={16} /> Hide Available Rooms
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Eye size={16} /> See Available Rooms
                </span>
              )}
            </Button>

            {showAvailableRooms && (
              <div className="glass p-4 rounded-xl space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users size={14} /> Available Rooms
                </p>
                <div className="space-y-1">
                  {["GAMING", "LOUNGE", "STUDY"].map((room) => (
                    <Button
                      key={room}
                      variant="ghost"
                      onClick={() => setRoomCode(room)}
                      className="w-full justify-between hover:bg-background/40 border border-black dark:border-light-yellow"
                    >
                      {room}
                      <span className="text-xs text-muted-foreground">3 users</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
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

