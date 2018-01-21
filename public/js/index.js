var socket = io();

socket.on('connect',function(){
 console.log('Connected to server.');

 // socket.emit('createEmail',{
 //   to:'shrimankumbar@gmail.com',
 //   text:'Hey,this is Shriman.'
 // });


});

socket.emit('newMessage',{
 from:'Shriman',
 text:'Shriman.Broadcast '
},function(data){
 console.log('Got it this  is from server.');
});


socket.on('disconnect',function(){
 console.log('Disconnected from server.');
})

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });

socket.on('newMessage',function(message){
 console.log('New Message',message);
 var li =jQuery('<li></li>');
 li.text(`${message.from} : ${message.text}`);
 jQuery("#messages").append(li);
});

socket.on('newLocationMessage',function (message) {
  var li= jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit',function(e){
 e.preventDefault();
var messageTextBox= jQuery("[name=message]");
 socket.emit('createMessage',{
   from:'User',
   text:messageTextBox.val()
 },function(){
   messageTextBox.val('');
 });

});

var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
    console.log(position);
  },function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});



















// var socket = io();
// socket.on('connect',function (){
//   console.log('connected to server.');
//
// socket.on('disconnect',function (){
//   console.log('Dissconnected from server.');
// });
//
// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
//
// socket.on('newMessage',function(message){
//   console.log('newMessage',message);
//   var li = jQuery('<li></li>');
//   li.text(`${message.from}: ${message.text}`);
//   jQuery('#messges').append(li);
// });
//
// socket.emit('createMessage',{
//   from: 'Frank',
//   text: 'Hi'
// },function(data) {
//   console.log('Got it',data);
// });
//
// jQuery('#message-form').on('submit',function (e) {
//   e.preventDefault();
//   socket.emit('createMessage',{
//     from: 'User',
//     text: jQuery('[name=message]').val();
//   },function() {
//
//   });
// });
//
// // socket.emit('createMessage',{
// //    to:"Prashanth",
// //    from:"Faizan",
// //    text:"Hey, Whats up.",
// //    createAt:new Date()
// //  },function(data) {
// //    console.log("got it ", data);
// //  });
