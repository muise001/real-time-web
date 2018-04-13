# Real time Chat

This week i made a chat using [socket.io](https://socket.io/) and vanilla JavaScript. It isn't your regular chat. In this chat you can use a special command to trigger the game hangman!

### Features
* **Chat**
  * Like all chats or chatrooms, you're able to write messages to eachother. The messages just "appear" in realtime, this means you don't have to refresh the page every time. 
  * Because you're in a chatroom and not a one-on-one chat. You wouldn't know who's message is who's. Therefor i added the feature where you type in your name, and the whole chat know's who's talking.
* **Broadcasting**
  * There's nothing more frustating than writing a message and in the middle of your message someone sends you a message with yet another question. That's why I added the "... is writing" feature. If someone is typing, the others will see that you're writing a message
* **Hangman**
  * With the comment `/hangman-start [word]`, you'll start a game of hangman in your chatroom. The word will appear in dots for the other people in the chatroom.
  * If someone thinks he knows a letter in the word, you type `/hm [letter]`. If the letter is in the word, the dots that cover for that letter, appears as that letter.
  * The one who guesses the last letter gets a nice shoutout form the server!


##### Sources
  - [The Net Ninja](https://www.youtube.com/watch?v=vQjiN8Qgs3c)
      - Short and clear explanation of "socket.io"
