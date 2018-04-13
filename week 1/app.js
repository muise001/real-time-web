//Secial Thanks to : https://www.youtube.com/watch?v=vQjiN8Qgs3c

const PORT = process.env.port || 2222
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express()
// var http = require('http').Server(app);
var socket = require('socket.io');
// view engine setup

//App Setup
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get("/", function(req, res) {
  // console.log(req.session.ingelogd);
  res.render("index")
})
var server = app.listen(PORT, function() {
  console.log('port 2222')
})


//Hangman
var hangmanWoord = []
var speelwoord = []
var victory = ""
var aantalZetten = 0
var aantalGoed = 0
var aantalFout = 0

//Socket Setup
var io = socket(server);
io.on('connection', function(socket) {
  console.log('made socket connection', socket.id)
  socket.on("chat", function(data){
    if (data.message.includes("/hangman-start")) {
      hangmanWoord = ""
      hangmanWoord = []
      aantalFout = 0
      speelwoord = []
      speelwoord = []
      victory = ""
      hangmanWoord = data.message.split("/hangman-start ")
      hangmanWoord = hangmanWoord[1]
      hangmanWoord = hangmanWoord.split("")
      console.log(typeof(hangmanWoord));
      console.log(`Het woord is ${hangmanWoord}`);
      data.message = `Started a game of hangman!`
      io.sockets.emit("chat", data)
      var woord = {
        message: "",
        handle: "Hangman"
      }
      for (var i = 0; i < hangmanWoord.length; i++) {
        console.log("dot");
        var dot = "."
        speelwoord.push(dot)
      }
      woord.message = ""
      for (var i = 0; i < speelwoord.length; i++) {
        woord.message += speelwoord[i] + " "
      }
      io.sockets.emit("chat", woord)
    } else if (data.message.includes("/hm")) {
      if (hangmanWoord != 0) {
        hangmanPoging = data.message.split("/hm ")
        hangmanPoging = hangmanPoging[1]
        hangmanCheck()
        console.log("de poging = "+hangmanPoging);
      } else {
        data.message = "wants to play hangman, but doesn't understand the commands. To start a game of hangman, type /hangman-start [word]"
        io.sockets.emit("chat", data)
      }

      function hangmanCheck(){
        aantalZetten++
        var dete = {
          message:"",
          handle:""
        }
        dete.message = `<b>${data.handle}</b> guessed <b>${hangmanPoging}</b>`
        dete.handle = "Hangman"
        io.sockets.emit("chat", dete)
        if (hangmanWoord.includes(hangmanPoging)) {
          console.log("goede poging");
          data.message=""
          for (var i = 0; i < hangmanWoord.length; i++) {
            if (speelwoord [i] == hangmanPoging) {
              aantalFout++
              data.message = `${data.handle} tried a letter that was already in the word. dumbass.. (fails = ${aantalFout} / 8)`
            } else if (hangmanWoord[i] == hangmanPoging) {
              console.log(speelwoord[i]);
              speelwoord[i] = hangmanPoging
              console.log("true");
              data.message += speelwoord[i] + " "
            } else {
              console.log("false");
              data.message += speelwoord[i] + " "
            }
            if (speelwoord.includes(".")) {
              console.log("Het woord is nog niet geraden");
            } else {
              console.log(hangmanWoord.length);
              for (var i = 0; i < hangmanWoord.length; i++) {
                victory += hangmanWoord[i]
                console.log(victory);
              }
              data.message = `${data.handle} guessed the word! "<b>${victory}</b>"`
            }
          }
            data.handle = "Hangman"
            io.sockets.emit("chat", data)
          }
         else if (aantalFout < 7) {
           aantalFout++
           data.handle = "Hangman"
           data.message = `nothing happened (fails = ${aantalFout} / 8)`
           io.sockets.emit("chat", data)
        } else {
          aantalFout++
          for (var i = 0; i < hangmanWoord.length; i++) {
            victory += hangmanWoord[i]
            console.log(victory);
          }
          data.handle = "Hangman"
          data.message = `I don't want to sound like an asshole.. but you all suck! Try again next time.... Ooh, by the way, the word was "${victory}"`
          io.sockets.emit("chat", data)
          hangmanWoord = ""
        }
      }
    }else {
    io.sockets.emit("chat",data)
    }
  })

  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data)
  })
})


// app.listen(3000, () => console.log('Example app listening on port 3000!'))
