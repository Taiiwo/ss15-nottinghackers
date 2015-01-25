
$('#addButton').click(function() {
	var dialog = document.querySelector('html /deep/ paper-dialog');
	dialog.toggle();
});

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
		this.container.append('<canvas id="poseInput" width="500" height="500" style="border:1px solid #ccc"></canvas>');
		// make a canvas with a stick man inside
		this.canvasObj = function(id){// this is a class that makes a stick man input
			this.canvas = this.__canvas = new fabric.Canvas(id, { selection: false });
			var thisSubThis = this;
			fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
			this.makeCircle = function(left, top, line1, line2, line3, line4) {
				var c = new fabric.Circle({
					left: left,
					top: top,
					strokeWidth: 5,
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

			this.makeLine = function(coords, colour) {
				return new fabric.Line(coords, {
					fill: colour,
					stroke: colour,
					strokeWidth: 10,
					selectable: false
				});
			}
			

			this.head = this.makeLine([ 250, 125, 250, 175 ],'red'),
			this.body = this.makeLine([ 250, 175, 250, 250 ],'red'),
			this.armL = this.makeLine([ 250, 175, 175, 200 ],'red'),
			this.armL2 = this.makeLine([ 175, 200, 175, 250 ],'red'),
			this.armR = this.makeLine([ 250, 175, 325, 200 ],'red');
			this.armR2 = this.makeLine([ 325, 200, 325, 250 ],'red');
			this.legL = this.makeLine([ 250, 250, 200, 300],'red'),
			this.legL2 = this.makeLine([ 200, 300, 200, 375],'red'),
			this.legR = this.makeLine([ 250, 250, 300, 300],'red'),
			this.legR2 = this.makeLine([ 300, 300, 300, 375],'red')
				

			this.canvas.add(this.head, this.body, this.armL, this.armL2, this.armR, this.armR2, this.legL, this.legL2, this.legR, this.legR2);
			
			this.canvas.add(
				this.makeCircle(this.head.get('x1'), this.head.get('y1'), null, this.head),
				this.makeCircle(this.head.get('x2'), this.head.get('y2'), this.head, this.body, this.armL, this.armR),
				this.makeCircle(this.body.get('x2'), this.body.get('y2'), this.body, this.legR, this.legL),
				this.makeCircle(this.legR.get('x2'), this.legR.get('y2'), this.legR, this.legR2),
				this.makeCircle(this.legR2.get('x2'), this.legR2.get('y2'), this.legR2),
				this.makeCircle(this.legL.get('x2'), this.legL.get('y2'), this.legL, this.legL2),
				this.makeCircle(this.legL2.get('x2'), this.legL2.get('y2'), this.legL2),
				this.makeCircle(this.armL.get('x2'), this.armL.get('y2'), this.armL, this.armL2),
				this.makeCircle(this.armL2.get('x2'), this.armL2.get('y2'), this.armL2),
				this.makeCircle(this.armR.get('x2'), this.armR.get('y2'), this.armR, this.armR2),
				this.makeCircle(this.armR2.get('x2'), this.armR2.get('y2'), this.armR2)
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
				console.log({
					"head":[
						this.head.get('x1'),
						this.head.get('y1'),
						this.head.get('x2'),
						this.head.get('y2')
					],
					"body":[
						this.body.get('x1'),
						this.body.get('y1'),
						this.body.get('x2'),
						this.body.get('y2')
					],
					"armL":[
						this.armL.get('x1'),
						this.armL.get('y1'),
						this.armL.get('x2'),
						this.armL.get('y2')
					],
					"armL2":[
						this.armL2.get('x1'),
						this.armL2.get('y1'),
						this.armL2.get('x2'),
						this.armL2.get('y2')
					],
					"armR":[
						this.armR.get('x1'),
						this.armR.get('y1'),
						this.armR.get('x2'),
						this.armR.get('y2')
					],
					"armR2":[
						this.armR2.get('x1'),
						this.armR2.get('y1'),
						this.armR2.get('x2'),
						this.armR2.get('y2')
					],
					"legL":[
						this.legL.get('x1'),
						this.legL.get('y1'),
						this.legL.get('x2'),
						this.legL.get('y2')
					],
					"legL2":[
						this.legL2.get('x1'),
						this.legL2.get('y1'),
						this.legL2.get('x2'),
						this.legL2.get('y2')
					],
					"legR":[
						this.legR.get('x1'),
						this.legR.get('y1'),
						this.legR.get('x2'),
						this.legR.get('y2')
					],
					"legR2":[
						this.legR2.get('x1'),
						this.legR2.get('y1'),
						this.legR2.get('x2'),
						this.legR2.get('y2')
					]
				});
			}
			
		}
		// init the input
		this.poseInput = new this.canvasObj("poseInput");
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
}
// init the add routine button
var addRoutineInstance = new addRoutine();
// setup the handler for the button click
addRoutineInstance.button.click(addRoutineInstance.toggleDialog);
