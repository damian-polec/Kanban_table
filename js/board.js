var board = {
    name: 'Kanban Table',
    addColumn: function(column) {
      this.element.append(column.element);
      initSortable();
    },
    element: $('.column-container')
};
$('.create-column').click(function(){
  	var name = prompt('Enter column name:');
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: name
      },
      success: function(response) {
        var column = new Column(response.id, name);
        board.addColumn(column);
      }
    });
});

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
}
