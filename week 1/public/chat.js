//make connections
var socket = io()

// Query DOM
var message = document.getElementById("message")
var handle = document.getElementById("handle")
var btn = document.getElementById("send")
var output = document.getElementById("output")
var feedback = document.getElementById("feedback")

// Emit events
btn.addEventListener("click", function(){
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  })
})

message.addEventListener("keypress", function(){
  socket.emit("typing", handle.value);
})

//Listen for addEventListener
socket.on("chat", function(data){
  feedback.innerHTML=""
  output.innerHTML += `
  <p>
    <strong> ${data.handle}
    </strong> ${data.message}
  </p>  `
})

socket.on("typing", function(data){
  feedback.innerHTML = `
    <p><em> ${data} is typing a message...</em></p>
  `
})

// document.body.onchange = function(){
//   if (document.querySelectorAll("strong").length != 0) {
//     console.log(document.querySelectorAll("strong").length);
//     laatsteStrong = document.querySelectorAll("strong").length
//     console.log(laatsteStrong);
//     console.log(document.querySelectorAll("strong")[laatsteStrong]);
//     if (document.querySelectorAll("strong")[laatsteStrong].innerHTML == "Hangman") {
//       document.querySelectorAll("strong")[laatsteStrong].setAttribute("style", "color: red;")
//     }
//   }
// }


// for (var i = 0; i < document.querySelectorAll("strong").length; i++) {
//   console.log("hallllllooooo");
//   if (document.querySelectorAll("strong")[i].innerHTML == "Hangman") {
//     document.querySelectorAll("strong")[i].setAttribute("style", "color: red")
//   }
// }
