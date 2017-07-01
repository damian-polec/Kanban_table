//AJAX
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '1891',
	'X-Auth-Token': '0f9c3f6ca6adf23c1f92d071f32bfc60'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

//CREATING COLUMNS
function setupColumns(columns){
	columns.forEach(function(column){
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

//CREATING CARDS
function setupCards(col, cards) {
	cards.forEach(function (card) {
      var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);
  	});
}
