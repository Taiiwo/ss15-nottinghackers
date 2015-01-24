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

$('#addButton').click(function() {
	
});
