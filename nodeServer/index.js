// node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    //If any new user joins,let other connected to the server know!
    socket.on('new-user-joined', names => {
        console.log("New user", names);
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names)
    });
    //If someone sends a message,broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, names: users[socket.id] })
    });
    //If someone leaves the chat,let other knows
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
     });

    });
