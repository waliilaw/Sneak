import http from 'http'

async function init(){
    const httpServer = http.createServer()
    const PORT = process.env.PORT || 3000

    httpServer.listen(PORT, () => {
        console.log(`connected to PORT : ${PORT}`)
    })
}

init()