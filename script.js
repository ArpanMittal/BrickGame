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

function draw(){
	//console.write(x);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	if( y + dy < 0 + ballRadius || y + dy  > canvas.height - ballRadius ){
		dy = -dy;
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

}

setInterval( draw , 10);


// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.stroke();
// ctx.closePath();

