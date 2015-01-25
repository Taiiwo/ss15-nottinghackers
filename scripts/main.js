function Deck(id){
	this.id = id;
	this.table = $(this.id);
	this.cards = [];
	this.addCard = function(title, desc, img){
		//create card
		var card = '\
		<routine-card>\
			<h1>'+ title +'</h1>\
			<li>'+ desc +'</li>\
			<img src="'+ img +'">\
		</routine-card>';
		// add card to list of cards
		this.cards.push(card);
		// add a card to the deck
		this.table.append(card);
	}
}
var routines = new Deck("routine-list");
routines.addCard("test","test","http://i.imgur.com/IUIVk80.jpg");
routines.addCard("test","test","http://i.imgur.com/IUIVk80.jpg");
routines.addCard("test","test","http://i.imgur.com/IUIVk80.jpg");

var DB = new Firebase("https://ss15.firebaseio.com/");
var addRoutine = function(){
	this.dialog = document.querySelector('html /deep/ paper-dialog');
	this.button = $('#addButton');
	this.isOpen = false;
	this.container = $('paper-dialog');
	var subThis = this;
	this.openDialog = function(){
		// show the dialog
		this.dialog.open();
		// update property so we know the state of the box
		this.isOpen = true;
		// put a canvas inside the box
		this.container.append('<canvas id="poseInput" width="500" height="500"></canvas>');
		// make a canvas with a stick man inside
		this.canvasObj = function(id,head, body, armL, armL2, armR, armR2, legL, legL2, legR, legR2){// this is a class that makes a stick man
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

			head = this.makeLine(head);
			body = this.makeLine(body);
			armL = this.makeLine(armL);
			armL2 = this.makeLine(armL2);
			armR = this.makeLine(armR);
			armR2 = this.makeLine(armR2);
			legL = this.makeLine(legL);
			legL2 = this.makeLine(legL2);
			legR = this.makeLine(legR);
			legR2 = this.makeLine(legR2);


			this.canvas.add(head, body, armL, armL2, armR, armR2, legL, legL2, legR, legR2);

			var headCircle = this.makeCircle(head.get('x1'), head.get('y1'), null, head);
			headCircle.radius = 30;
			headCircle.fill = 'white';

			this.canvas.add(
				headCircle,
				this.makeCircle(head.get('x2'), head.get('y2'), head, body, armL, armR),
				this.makeCircle(body.get('x2'), body.get('y2'), body, legR, legL),
				this.makeCircle(legR.get('x2'), legR.get('y2'), legR, legR2),
				this.makeCircle(legR2.get('x2'), legR2.get('y2'), legR2),
				this.makeCircle(legL.get('x2'), legL.get('y2'), legL, legL2),
				this.makeCircle(legL2.get('x2'), legL2.get('y2'), legL2),
				this.makeCircle(armL.get('x2'), armL.get('y2'), armL, armL2),
				this.makeCircle(armL2.get('x2'), armL2.get('y2'), armL2),
				this.makeCircle(armR.get('x2'), armR.get('y2'), armR, armR2),
				this.makeCircle(armR2.get('x2'), armR2.get('y2'), armR2)
			);

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
		// init the input
		this.poseInput = new this.canvasObj("poseInput",
			[ 250, 125, 250, 175 ],
			[ 250, 175, 250, 250 ],
			[ 250, 175, 175, 200 ],
			[ 175, 200, 175, 250 ],
			[ 250, 175, 325, 200 ],
			[ 325, 200, 325, 250 ],
			[ 250, 250, 200, 300 ],
			[ 200, 300, 200, 375 ],
			[ 250, 250, 300, 300 ],
			[ 300, 300, 300, 375 ]
		);
	}
	this.closeDialog = function(){
		// hide the dialog
		this.dialog.close();
		// update the property
		this.isOpen = false;
		// clear the dialog
		this.container.empty();
	}
	this.toggleDialog = function(){// opens and closes the dialog box
		if (subThis.isOpen){
			subThis.closeDialog();
		}
		else {
			subThis.openDialog();
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
	this.uploadRoutine = function(title){
			DB.push({
				"title": title,
				"routine": this.routine
			});
	}
}



var userData;
function checkForLogin(){
	DB.authWithOAuthPopup("google", function(error, authData){
		if(error){
			return false;
		}
		else{
			userData=authData;
			return true
		}
	})
}

// init the add routine button
var addRoutineInstance = new addRoutine();
// setup the handler for the button click
addRoutineInstance.button.click(addRoutineInstance.toggleDialog);
