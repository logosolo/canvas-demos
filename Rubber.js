/* Rubber.js */

var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	resetButton = document.getElementById('rubberbandDiv'),
	image = new Image(),
	mousedown = {},
	rubberbandRectangle = {},
	dragging = false;

function rubberbandStart(x, y) {
	mousedown.x = x;
	mousedown.y = y;

	rubberbandRectangle.left = mousedown.x;
	rubberbandRectangle.top = mousedown.y;

	moveRubberbandDiv();
	showRubberbandDiv();

	dragging = true;
}


function rubberbandStretch(x, y) {
	rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
	rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

	rubberbandRectangle.width = Math.abs(x - mousedown.x);
	rubberbandRectangle.height = Math.abs(y - mousedown.y);

	moveRubberbandDiv();
	resizeRubberbandDiv();
}

function rubberbandEnd() {
	var bbox = canvas.getBoundingClientRect();

	try {
		context.drawImage(canvas,
			rubberbandRectangle.left - bbox.left,
			rubberbandRectangle.top - bbox.top,
			rubberbandRectangle.width,
			rubberbandRectangle.height,
			0, 0, canvas.width, canvas.height);
	} catch (e) {

	}

	resetRubberbandRectangle();

	rubberbandDiv.style.width = 0;
	rubberbandDiv.style.height = 0;

	hideRubberbandDiv();

	dragging = false;
}

function moveRubberbandDiv() {
	rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
	rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}


function resizeRubberbandDiv() {
	rubberbandDiv.style.width = rubberbandRectangle.top + 'px';
	rubberbandDiv.style.height = rubberbandRectangle.left + 'px';
}


function showRubberbandDiv() {
	rubberbandDiv.style.display = 'inline';
}

function hideRubberbandDiv() {
	rubberbandDiv.style.display = 'none';
}

function resetRubberbandRectangle() {
	rubberbandRectangle = {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	};
}


canvas.onmousedown = function(e) {
	var x = e.clientX,
		y = e.clienY;

	e.preventDefault();
	rubberbandStart(x, y);
};


window.onmousemove = function(e) {
	var x = e.clientX,
		y = e.clientY;

	e.preventDefault();
	if (dragging) {
		rubberbandStretch(x, y);
	}
};

window.onmouseup = function(e) {
	e.preventDefault();
	rubberbandEnd();
};


image.onload = function() {
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

resetButton.onlick = function(e) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

image.src = 'curved-road.png';