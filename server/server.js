const io = require('socket.io')(5000 , {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection' , (socket) => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('sendMessage' , ({recipients , text}) => {
        recipients.forEach(recipient => {
            console.log(recipient)
            const newRecipients = recipients.filter(r => r !== recipient)
            
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message' , {
                recipients: newRecipients ,
                sender: id ,
                text
            })
        })
    })
})