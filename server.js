/*const express=require('express');
const app=express();
app.use(function (req,res,next){
res.header("Access-Control-Alow-Origin","*");
res.header("Access-Control-Allow-Headers","Origin,X-Requated-With,Content-Type,Accept");
next();
});
*/

const io = require('socket.io')();
const{createGameState,gameLoop} = require ('./game');
const {FRAME_RATE} = require ('./constants');

io.on('connection',client=> {
  const state = createGameState();

  startGameInterval(client,state);
});

function startGameInterval(client,state) {
  const intervalId = setInterval(() =>{
    const winner = gameLoop(state);
     
    if (!winner){
      io.emit('gameState',JSON.stringify(state));
    }else  {client.emit('gameOver');
    clearInterval(intervalId);
      
      }
    
  },1000/FRAME_RATE);
}
io.listen(3000);


