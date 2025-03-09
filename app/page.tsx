'use client'
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const redirectRoom = () => {
    router.push('/room');
  }

  return(

    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative dark:bg-[#06D6A0] ">
    <div className="absolute top-4 right-4">
      <ThemeToggle />
    </div>
   {/* <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-sm">
      Connection status: {connectionStatus}
    </div> */}

    <div className="w-full flex flex-col items-center gap-8">
      <h1 className="text-8xl md:text-9xl font-bold text-[#06D6A0] dark:text-light-yellow tracking-tight ">Sneak</h1>

      <Button
              onClick={redirectRoom}
              className="w-1/2 bg-black text-light-yellow hover:bg-black/90 dark:bg-white dark:text-emerald dark:hover:bg-white/90 rounded-full"
            >
              Room Chat
            </Button>
          </div>
        
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

  </main>
  )
}