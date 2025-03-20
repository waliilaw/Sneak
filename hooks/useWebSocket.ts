import { useEffect, useState } from "react"
import { WebSocketServer } from "ws"

function useWebSocket(url : string){
    const [socket , setSocket ] = useState<string | any >()
    const[messages , setMessages] = useState<string | any>()
    const [error , setError] = useState<any>()

    useEffect(() => {
        const ws : any = new WebSocket(url)

        ws.onopen = function(){
            console.log('WebSocket successfully connected :)')
            setSocket(ws)
        }

        ws.onmessage = function(event : any ) {
            const message = JSON.parse(event.data)
            setMessages((prevMessage : any ) : any  => [...prevMessage , message])
        }

        ws.onerror = function(event : any ){
            setError('Websocket error')
            console.log('Error is ', error )
        }

        ws.onclose = function(){
            console.log('Websocket Disconnected :(')
        }
        return ()  => {
            ws.close()
        }
    } , [url])
    return {socket , messages , error }
}
export default useWebSocket