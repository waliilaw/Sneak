import {Server, Socket} from 'socket.io'

class SocketService{
private _io: Server
constructor(){
    console.log("Socket server initialised")
this._io = new Server()
}

public initListeners(){
    const io = this.io
    console.log("Socket Listeners Initialized")
    io.on("connect" , (socket) => {
        console.log(`New Socket Connected` , socket.id)
        socket.on('event:messge' , async ({message} : {message : string }) => {
            console.log("New Messege" , message)
        })
    })
}

get io(){
    return this._io
}

}
export default SocketService