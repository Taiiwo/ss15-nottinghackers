function Deck(id){
	this.id = id;
	this.cards = new freewall(id);
	this.cards.reset({
		selector: '.card',
		animate: true,
		cellW: 200,
		cellH: 'auto',
		onResize: function() {
			wall.fitWidth();
		}
	});
	this.cards.container.find('.card img').load(function() {
		this.cards.fitWidth();
	});
	this.cardList = [];
	this.update = function() {
		this.cards.refresh();
	}
	this.update();
	this.add = function(title, desc, img){
		//create card
		var card = '\
		<routine-card>\
			<h1>'+ title +'</h1>\
			<li>'+ desc +'</li>\
			<img src="'+ img +'">\
		</routine-card>';
		// add card to list of cards
		this.cardList.push(card);
		// add a card to the deck
		this.cards.appendBlock(card);
	}
}
var routines = new Deck(".routines");
routines.update();
routines.add("test","test","http://i.imgur.com/IUIVk80.jpg");
