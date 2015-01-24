function Deck(id){
	this.id = id;
	this.table = new freewall(id);
	this.table.reset({
		selector: '.card',
		animate: true,
		cellW: 200,
		cellH: 'auto',
		onResize: function() {
			this.table.fitWidth();
		}
	});
	this.cards = [];
	this.update = function() {
		this.table.refresh();
	}
	this.update();
	this.addCard = function(title, desc, img){
		//create card
		var card = '\
		<routine-card class="card">\
			<h1>'+ title +'</h1>\
			<li>'+ desc +'</li>\
			<img src="'+ img +'">\
		</routine-card>';
		// add card to list of cards
		this.cards.push(card);
		// add a card to the deck
		this.table.appendBlock(card);
	}
}
var routines = new Deck(".routines");
routines.update();
routines.addCard("test","test","http://i.imgur.com/IUIVk80.jpg");
