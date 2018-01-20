var socket = io();
socket.on('connect',function (){
  console.log('connected to server.');
  // socket.emit('createEmail',{
  //   to: 'abhi@gmail.com',
  //   text: 'Hey. This is Abhishek'
  // })

  socket.emit('createMessage',{
    from: 'Abhishek',
    text: 'Yup, that works for me'
  });
});

socket.on('disconnect',function (){
  console.log('Dissconnected from server.');
});

socket.on('newEmail',function(email){
  console.log('New email',email);
});

socket.on('newMessage',function(message){
  console.log('Nem Message',message);
});
