function Deck(id){
	this.id = id;
	this.table = $(this.id);
	this.cards = [];
	this.addCard = function(title, desc, img, duration, colourIndex){
		var colours = [	"#f44336","#e91e63","#9c27b0","#3f51b5",// red,		pink,	purple,	indigo
						"#2196f3","#03a9f4","#00bcd4","#4caf50",// blue,	lBlue,	cyan,	green
						"#cddc39","#ffeb3b","#ff9800","#795548",// gold,	yellow, orange, brown
						"#ff5722","#ffc107","#8bc34a","#cddc39"];//dOrange, amber,	lGreen, lime
		var colour = colours[colourIndex - 1];
		//create card
		var card = '\
		<fitlab-card colour="'+ colour +'">\
			<h1>'+ title +'</h1>\
			'+ desc +'\
			<img class="profilePic" src="'+ img +'">\
			<span>'+ duration +'</span>\
		</fitlab-card>';
		// add card to list of cards
		this.cards.push(card);
		// add a card to the deck
		var newElement = $(card);
		this.table.append(newElement);
		return newElement;
	}
}

var routines = new Deck(".cards");
var canvasObj = function(id, pose){// this is a class that makes a stick man
	this.canvas = this.__canvas = new fabric.Canvas(id, { selection: false });
	var thisSubThis = this;
	fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
	this.makeCircle = function(left, top, line1, line2, line3, line4) {
		var c = new fabric.Circle({
			left: left,
			top: top,
			strokeWidth: 1,
			radius: 12,
			fill: '#fff',
			stroke: '#666'
		});
		c.hasControls = c.hasBorders = false;

		c.line1 = line1;
		c.line2 = line2;
		c.line3 = line3;
		c.line4 = line4;

		return c;
	}
	this.makeLine = function(coords) {
		return new fabric.Line(coords, {
			fill: 'white',
			stroke: 'black',
			strokeWidth: 10,
			selectable: false
		});
	}

	

	var input = this;
	//function that moves the stickman into a predefined pose
	this.moveIntoPose = function(newPose){
		input.canvas.clear();
		head = this.makeLine(newPose['head']);
		body = this.makeLine(newPose['body']);
		armL = this.makeLine(newPose['armL']);
		armL2 = this.makeLine(newPose['armL2']);
		armR = this.makeLine(newPose['armR']);
		armR2 = this.makeLine(newPose['armR2']);
		legL = this.makeLine(newPose['legL']);
		legL2 = this.makeLine(newPose['legL2']);
		legR = this.makeLine(newPose['legR']);
		legR2 = this.makeLine(newPose['legR2']);
		input.canvas.add(head, body, armL, armL2, armR, armR2, legL, legL2, legR, legR2);

		var headCircle = input.makeCircle(head.get('x1'), head.get('y1'), null, head);
		headCircle.radius = 30;
		headCircle.fill = 'white';

		input.canvas.add(
			headCircle,
			input.makeCircle(head.get('x2'), head.get('y2'), head, body, armL, armR),
			input.makeCircle(body.get('x2'), body.get('y2'), body, legR, legL),
			input.makeCircle(legR.get('x2'), legR.get('y2'), legR, legR2),
			input.makeCircle(legR2.get('x2'), legR2.get('y2'), legR2),
			input.makeCircle(legL.get('x2'), legL.get('y2'), legL, legL2),
			input.makeCircle(legL2.get('x2'), legL2.get('y2'), legL2),
			input.makeCircle(armL.get('x2'), armL.get('y2'), armL, armL2),
			input.makeCircle(armL2.get('x2'), armL2.get('y2'), armL2),
			input.makeCircle(armR.get('x2'), armR.get('y2'), armR, armR2),
			input.makeCircle(armR2.get('x2'), armR2.get('y2'), armR2)
		);
	}
	// init the pose
	this.moveIntoPose(pose);

	this.canvas.on('object:moving', function(e) {
		var p = e.target;
		p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
		p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
		p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
		p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
		thisSubThis.canvas.renderAll();
	});
	this.dumpCoords = function(){
		return {
			"head":[
				head.get('x1'),
				head.get('y1'),
				head.get('x2'),
				head.get('y2')
			],
			"body":[
				body.get('x1'),
				body.get('y1'),
				body.get('x2'),
				body.get('y2')
			],
			"armL":[
				armL.get('x1'),
				armL.get('y1'),
				armL.get('x2'),
				armL.get('y2')
			],
			"armL2":[
				armL2.get('x1'),
				armL2.get('y1'),
				armL2.get('x2'),
				armL2.get('y2')
			],
			"armR":[
				armR.get('x1'),
				armR.get('y1'),
				armR.get('x2'),
				armR.get('y2')
			],
			"armR2":[
				armR2.get('x1'),
				armR2.get('y1'),
				armR2.get('x2'),
				armR2.get('y2')
			],
			"legL":[
				legL.get('x1'),
				legL.get('y1'),
				legL.get('x2'),
				legL.get('y2')
			],
			"legL2":[
				legL2.get('x1'),
				legL2.get('y1'),
				legL2.get('x2'),
				legL2.get('y2')
			],
			"legR":[
				legR.get('x1'),
				legR.get('y1'),
				legR.get('x2'),
				legR.get('y2')
			],
			"legR2":[
				legR2.get('x1'),
				legR2.get('y1'),
				legR2.get('x2'),
				legR2.get('y2')
			]
		};
	}

}
var addRoutine = function(){
	this.dialog = document.querySelector('html /deep/ #addRoutine');
	this.button = $('#addButton');
	this.isOpen = false;
	this.container = $('#addRoutine .exerciseElements');
	var subThis = this;
	this.openDialog = function(){
		// show the dialog
		this.dialog.open();
		// update property so we know the state of the box
		this.isOpen = true;
		$(this.dialog).find(".closeLightbox").click(this.closeDialog);
		// put a canvas inside the box
		this.container.find(".canvas-container").remove();
		this.container.append('<canvas id="poseInput" width="350" height="350" style="border: solid 1px #333; border-radius: 10px;"></canvas>');
		// make a canvas with a stick man inside
		// init the input
		this.poseInput = new canvasObj("poseInput",{
			"head":	[ 175, 60 , 175, 100 ],
			"body":	[ 175, 100, 175, 180 ],
			"armL":	[ 175, 100, 125, 125 ],
			"armL2":[ 125, 125, 100 , 180 ],
			"armR":	[ 175, 100, 225, 125 ],
			"armR2":[ 225, 125, 250, 180 ],
			"legL":	[ 175, 180, 125, 220 ],
			"legL2":[ 125, 220, 125, 300 ],
			"legR":	[ 175, 180, 220, 220 ],
			"legR2":[ 220, 220, 220, 300 ]
		});

		this.container.find(".nextButton")
				.click(this,function(e){
					//On clicking next exercise add to routine
					var form=$(e.data.dialog).find(".exerciseElements");
					var title=form.find(".exerciseName"),
							desc=form.find(".exerciseDesc textarea"),
							reps=form.find(".exerciseReps"),
							duration=form.find(".exerciseDuration");
					e.data.addRoutineElement(title.val(),desc.val(),reps.val(),duration.val());

					//hide, empty, show
					e.data.tempFieldStorage={
						title:title,
						desc:desc,
						reps:reps,
						duration:duration
					}
					form.animate(
						{opacity:0},400,function(){
							var props=addRoutineInstance.tempFieldStorage;
							props.title.val("");
							props.desc.val("");
							props.reps.val("");
							props.duration.val("");
							$(this).animate({opacity:1},200);
						}
					);
				});
		this.container.find(".finishButton")
				.click(this,function(e){
					var form=$(e.data.dialog).find(".routineElements");
					var title=form.find(".routineName"),
							color=form.find(".routineColor");
					e.data.tempColorStorage=color.find(":checked");
					color.find("paper-radio-button").each(function(index){
						if(addRoutineInstance.tempColorStorage[0]=this){
							addRoutineInstance.tempIndexStorage=index;
						}
						return false;
					})


					var exerciseForm=$(e.data.dialog).find(".exerciseElements");
					var title=exerciseForm.find(".exerciseName"),
							desc=exerciseForm.find(".exerciseDesc textarea"),
							reps=exerciseForm.find(".exerciseReps"),
							duration=exerciseForm.find(".exerciseDuration");
					if(title.val()!==""){
						e.data.addRoutineElement(title.val(),desc.val(),reps.val(),duration.val());
					}

					e.data.uploadRoutine(title.val(),addRoutineInstance.tempIndexStorage);
					e.data.closeDialog();
				});
	}
	this.closeDialog = function(){
		this.dialog = document.querySelector('html /deep/ #addRoutine');
		$(this.canvas).remove();
		// hide the dialog
		this.dialog.close();
		// update the property
		this.isOpen = false;
	}
	this.toggleDialog = function(){// opens and closes the dialog box
		if (currentUser.uid()!=false){
			if (subThis.isOpen){
				subThis.closeDialog();
			}
			else {
				subThis.openDialog();
			}
		}
		else {
			document.querySelector('#toast1').show();
		}
	}
	this.routine = [];
	this.addRoutineElement = function(title, desc, reps, duration){
		this.routine.push({
			"title":title,
			"desc":desc,
			"reps":reps,
			"duration":duration,
			"pose": this.poseInput.dumpCoords()
		});
		this.updateRoutine();
	}
	this.updateRoutine = function(){
		// fill up the routine list with the routine elements
		// something like
		/*
		this.routine.each(function(index){
			$('routine-element-list')
				.append(
					$("<h3>").text(this.title)
				)
				.append(
					$("h5").text(this.reps)
				);
		});
		*/
	}
	this.uploadRoutine = function(title, colour){
			// maybe we should calc the total routine time here?
			//check to see if logged in;
			if (currentUser.uid()==false){
				//cancel uploading of routine
				return;
			}
			DB.push({
				"user_id": currentUser.uid(),
				"title": title,
				"accentColour":colour,
				"likes": 0,
				"routine": this.routine
			});
	}
}
//LOGIN AND AUTHENTICATION
// connect to DB
var DB = new Firebase("https://ss15.firebaseio.com/routines");
// populate the homepage
DB.on("value", function(snapshot) {// this handler is run every time data is changed in firebase
	// empty the cards element
	$('.cards').empty();
	// this is the data object
	var data = snapshot.val();
	// it's an object so we need to make it iterable
	// this gets a list of keys for the properties
	var keys = Object.keys(data);
	// Then we iterate through each routine we're sent
	for (var i = 0; i < keys.length; i++){
		// rename this for simplicity
		var datum = data[keys[i]];
		var list = "";
		var totalTime = 0;
		// process the routine, building a short list of routine actions
		for ( var a = 0; a < datum.routine.length; a++){
			var routineElement = datum.routine[a];
			if ((list.match(/\n/g) || []).length <= 3){// limmit bullet points
				list += "<li>" + routineElement.title + "</li>\n";
			}
			// calculate total routine time
			totalTime += routineElement.duration * routineElement.reps;
		}
		// add card to main page
		var createdNode=routines.addCard(datum.title,list,"https://blog.uber.com/wp-content/uploads/2014/07/person-icon.png",totalTime/60, datum.accentColour);// replace image with profile picture
		var url="https://www.googleapis.com/plus/v1/people/"+datum.user_id.replace("google:","")+"?fields=image&key=" + GOOGLE_API_KEY
		$.ajax({
			dataType: "json",
			url:url,
			context:createdNode,
			success: function(data){
				if (typeof(data.error)=="undefined"){
					this.find(".profilePic").attr("src",data.image.url);
				}
			}
		});
		createdNode.click(datum ,function(e) {
			if (currentUser.uid()!=false){
				runRoutine(e.data);
			}
			else {
				document.querySelector('#toast1').show();
			}
		});
	}
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});

var runRoutine = function(data){
  	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	var hasVideo = true;
  	var errorCallback = function(e) {
		video.remove();
     	console.log('Rejected!', e);
		hasVideo = false;
  	};

  	var runBox = document.querySelector('#runRoutine');
	var container = $('#runRoutine');
  	var video = $('html /deep/ #mirror');
  	if (navigator.getUserMedia) {
    	navigator.getUserMedia({
      		audio: false, video: true
    	}, function(stream) {
      		video.src = window.URL.createObjectURL(stream);
    	}, errorCallback);
	};
	container.append('<canvas id="posePlayer" width="350" height="350" style="border: solid 1px #333; border-radius: 10px;"></canvas>');
		// make a canvas with a stick man inside
		// init the input
	var i = 0;
	var posePlayer = new canvasObj("posePlayer", data.routine[i].pose);
	container.append(
		$('<h1>').text(data.title)
	).append(
		$('<paper-button>')
			.click(function(){
				i++;
				if (i < data.routine.length){
					posePlayer.moveIntoPose(data.routine[i].pose);
				}
				else {
					container.empty();
					runBox.close();
				}
			})
			.text("next")
	);
	
	runBox.open();
  	// play video when lightbox is loaded
  	runBox.addEventListener("core-overlay-open-completed", function() {
		if (hasVideo){
			video.play();
		}
  	}, false)
};


// connect to DB
var userDB = new Firebase("https://ss15.firebaseio.com");
var user=function(){
	this.data={};
};
user.prototype.login=function(){
	userDB.tempUserStorage=this
	userDB.authWithOAuthPopup("google", function(error,authData){
		userDB.tempUserStorage.completeLogin(error,authData);
		userDB.tempUserStorage=null;
	});
}
user.prototype.completeLogin=function(error, authData){
	if(error){
			console.log("Login Failed",error);
			return false;
	}
	else{
		console.log("Login Successful",error);
		this.data=authData;
		activatePage();
	}
}
user.prototype.logout=function(){

}
user.prototype.uid=function(){
	if (typeof(this.data.uid) != 'undefined') {
		return this.data.uid;
  }
	return false;
}
user.prototype.name=function(){
	return this.data.uid;
}
currentUser=new user();
$("#loginButton").click(function(){
	currentUser.login();
});
function activatePage(){
       //hide the page disabled overlay
       $(".disabledTillLogin").removeClass("disabledTillLogin");
       $("#loginButton").text("logout")
                       .attr("id","logoutButton")
                       .unbind("click")
                       .bind(logoutUser)
}
function logoutUser(){
       $("#loginButton").text("login")
                       .attr("id","loginButton")
                       .unbind("click")
                       .bind(checkForLogin);
}

// init the add routine button
var addRoutineInstance = new addRoutine();
// setup the handler for the button click
addRoutineInstance.button.click(addRoutineInstance.toggleDialog);

var GOOGLE_API_KEY="AIzaSyDHgeb4pr03IKsvYDqQbRk55Mlbl2TTrjc";
