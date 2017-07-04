 // constantes
  const canvasWidth = 1280;
  const right = 39;
  const left = 37;
  const up = 38;
  const spriteWidth = 125;
  const spriteHeight = 130;
  const floor = 670-spriteHeight;
  const speed = 25;
  const jumpSpriteLine = 877;
  const jumpShift = 490;
  const fallSpriteLine = 1492;
  const initialShift = 15;
  const initialSpriteLine = 514;

  //Inicializacion del cavas
  var canvas = document.querySelector('#myCanvas');
  var context = canvas.getContext('2d');
  var myImage = new Image();
  myImage.src = "./img/sprite.png";

  var xPos = 0;
  var yPos = floor;
  var spriteLine = initialSpriteLine;
  var shift = initialShift;
  var moveCounter = 0;
  

  myImage.addEventListener("load", loadImage, false);

  function loadImage(e) {
    animate();
  }   

  function animate() {

    context.drawImage(myImage, shift, spriteLine, spriteWidth, spriteHeight, xPos, yPos, spriteWidth, spriteHeight);
  }

  function move(event) {

    if(event.keyCode == right) {
      if(moveCounter == 8) {
        shift = 19;
        moveCounter = 0;
      }

      if(xPos + speed <= canvasWidth) {
        context.clearRect(xPos, yPos, 200, 200);
        shift += spriteWidth;
        xPos += speed;
        moveCounter++;
        animate();
      }
    }

    if(event.keyCode == left) {
     if(moveCounter == 8) {
      shift = 19;
      moveCounter = 0;
    }

    if(xPos - speed > 0) {
      context.clearRect(xPos, yPos, 200, 200);
      shift += spriteWidth;
      xPos -= speed;
      moveCounter++;
      animate();
    }
  }

  if(event.keyCode == up) {

    var jumpCounter = 0;
    var top = false;
    function jump() {

      if(jumpCounter < 6 && !top) {
      spriteLine = jumpSpriteLine;
      context.clearRect(xPos, yPos, 200, 200);
      yPos -= 20;
      animate();
      jumpCounter++;
    }

    else {
      if(jumpCounter > 0 ) {
       top = true;
       shift = fallSpriteLine;
       context.clearRect(xPos, yPos, 200, 200);
       yPos +=20;
       animate();
       jumpCounter --;

       if(jumpCounter == 0) {
        clearInterval();
        reset();
       }
     }
   }
 }

 setInterval(jump, 50);
}

function reset() {
 yPos = floor;
 context.clearRect(xPos, yPos, 200, 200);
 spriteLine = 220;
 shift = 19;
 animate();
}

}


document.onkeydown = move; 