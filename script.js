var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); //to draw on canavas
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth )/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var fps = 15;
var score = 0;
var bricks = [];
var lives = 3;

for(c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = {x: 0, y:0, status:1};
	}
}

 document.addEventListener("keydown" , keyDownHandler);
 document.addEventListener("keyup" , keyUpHandler);
 

function keyDownHandler(e)
{
	if(e.keyCode == 37){
		leftPressed = true;
	}
	else if(e.keyCode == 39){
		rightPressed = true;
	}
}

function keyUpHandler(e)
{
	if(e.keyCode == 37){
		leftPressed = false;
	}
	else if(e.keyCode == 39){
		rightPressed = false;
	}
}

function drawBall()
{
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD"
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect( paddleX, canvas.height - paddleHeight , paddleWidth , paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks()
{
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status == 1){
	 			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight + brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function collisionDetection(){
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status == 1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount){
						alert("Congratulations! You Win");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width - 65, 20);
}

function draw(){
	//console.write(x);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
	drawLives();
	collisionDetection();
	if( y + dy < 0 + ballRadius ){
		dy = -dy;
	}
	// else if ( y + dy  > canvas.height - ballRadius ){
	// 	alert("game over");
	// 		document.location.reload();
	// }
	else if ( y + dy  > canvas.height - ballRadius )
	{
		if( x > paddleX && x < paddleX + paddleWidth )
		{
			dy = -dy;
		}
		else
		{
			lives--;
			if(lives == 0){
				//alert("game over");
				document.location.reload();
			}
			else{
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth )/2;
			}
		}
	}

	if( x + dx < 0 + ballRadius || x + dx > canvas.width - ballRadius ){
		dx = -dx;
	}
	x += dx;
	y += dy;

	if( rightPressed && paddleX < canvas.width - paddleWidth ){
		paddleX += 7;
	}
	else if ( leftPressed && paddleX  > 0){
		paddleX -= 7;
	}
	setTimeout(function() {
        requestAnimationFrame(draw);
    }, 1000 / fps)
	

}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 ){
		if( relativeX < canvas.width){
			paddleX = relativeX - paddleWidth/2;
		}else{
			paddleX = relativeX;
		}
	}
}
draw();


