function Column(id, name){
  var self = this;

  this.id = id;
  this.name = name || 'No given name';
  this.element = createColumn();

  function createColumn(){
    //CREATING NODES
    var column = $('<div>').addClass('column');
    var columnTitle = $('<h2>').addClass('column-title').text(self.name);
    var columnCardList = $('<ul>').addClass('column-card-list');
    var columnDelete = $('<button>').addClass('btn btn-danger').append('<i class="fa fa-trash" aria-hidden="true"></i>');
    var columnAddCard = $('<button>').addClass('add-card btn btn-info').append('<i class="fa fa-plus" aria-hidden="true"></i>');

    //ADDING EVENTLISTENERS FOR NODES
    columnDelete.click(function(){
      self.removeColumn();
    });

    columnAddCard.click(function(event){
      var cardName = prompt('Enter the name of the card');
      $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
          var card = new Card(response.id, cardName);
          self.createCard(card);
        }
      });
    });

    //CREATING COLUMN ELEMENTS
    column.append(columnTitle)
           .append(columnDelete)
           .append(columnAddCard)
           .append(columnCardList);

    return column;
  }
}

Column.prototype = {
  createCard: function(card) {
    this.element.children('ul').append(card.element);
  },
  removeColumn: function(){
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response){
        self.element.remove();
      }
    });
  }
};
