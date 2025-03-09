"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Smile, Paperclip, MoreVertical, Phone, Video } from "lucide-react"

type Message = {
  id: string
  sender: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
}

export default function ChatPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const roomCode = searchParams.get("room")
  const username = searchParams.get("username")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if no room code or username
  useEffect(() => {
    if (!roomCode || !username) {
      router.push("/")
    }
  }, [roomCode, username, router])

  // Sample messages for demo
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        id: "1",
        sender: "John",
        content: "Hey, welcome to the room!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isCurrentUser: false,
      },
      {
        id: "2",
        sender: "Sarah",
        content: "Hi there! How's everyone doing?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        isCurrentUser: false,
      },
      {
        id: "3",
        sender: username || "You",
        content: "Hello everyone, I just joined!",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        isCurrentUser: true,
      },
      {
        id: "4",
        sender: "John",
        content: "Great to have you here! We were just discussing the new project.",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        isCurrentUser: false,
      },
    ]

    setMessages(demoMessages)
  }, [username])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: username || "You",
        content: message,
        timestamp: new Date(),
        isCurrentUser: true,
      }

      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen dark:bg-black">
      {/* Header */}
      <header className="glass p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="rounded-full border border-black dark:border-light-yellow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-semibold">{roomCode}</h2>
            <p className="text-xs text-muted-foreground">3 participants</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full border border-black dark:border-light-yellow">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border border-black dark:border-light-yellow">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border border-black dark:border-light-yellow">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.isCurrentUser
                  ? "bg-emerald text-white dark:bg-light-yellow dark:text-emerald rounded-tr-none"
                  : "glass rounded-tl-none"
              }`}
            >
              {!msg.isCurrentUser && (
                <p className="text-xs font-medium text-emerald dark:text-light-yellow mb-1">{msg.sender}</p>
              )}
              <p className="break-words">{msg.content}</p>
              <p className="text-xs text-right mt-1 opacity-70">{formatTime(msg.timestamp)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="glass p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full border border-black dark:border-light-yellow">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-background/50 border-black dark:border-light-yellow"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button variant="ghost" size="icon" className="rounded-full border border-black dark:border-light-yellow">
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-emerald text-white hover:bg-emerald/90 dark:bg-light-yellow dark:text-emerald dark:hover:bg-light-yellow/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

