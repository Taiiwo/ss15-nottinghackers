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

			this.makeLine = function(coords) {
				return new fabric.Line(coords, {
					fill: 'red',
					stroke: 'red',
					strokeWidth: 5,
					selectable: false
				});
			}

			var line = this.makeLine([ 250, 125, 250, 175 ]),
				line2 = this.makeLine([ 250, 175, 250, 250 ]),
				line3 = this.makeLine([ 250, 250, 300, 350]),
				line4 = this.makeLine([ 250, 250, 200, 350]),
				line5 = this.makeLine([ 250, 175, 175, 225 ]),
				line6 = this.makeLine([ 250, 175, 325, 225 ]);

			this.canvas.add(line, line2, line3, line4, line5, line6);

			this.canvas.add(
				this.makeCircle(line.get('x1'), line.get('y1'), null, line),
				this.makeCircle(line.get('x2'), line.get('y2'), line, line2, line5, line6),
				this.makeCircle(line2.get('x2'), line2.get('y2'), line2, line3, line4),
				this.makeCircle(line3.get('x2'), line3.get('y2'), line3),
				this.makeCircle(line4.get('x2'), line4.get('y2'), line4),
				this.makeCircle(line5.get('x2'), line5.get('y2'), line5),
				this.makeCircle(line6.get('x2'), line6.get('y2'), line6)
			);

			this.canvas.on('object:moving', function(e) {
				var p = e.target;
				p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
				p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
				p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
				p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
				this.canvas.renderAll();
			});
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