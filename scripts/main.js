$('#addButton').click(function() {
	var dialog = document.querySelector('html /deep/ #addRoutine');
	dialog.toggle();
});

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var errorCallback = function(e) {
	console.log('Rejected!', e);
};

var video = document.querySelector('#mirror');
if (navigator.getUserMedia) {
  	navigator.getUserMedia({
  		audio: false, video: true
  	}, function(stream) {
   		video.src = window.URL.createObjectURL(stream);
   		video.play();
  	}, errorCallback);
};