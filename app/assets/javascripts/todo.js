$(document).ready(function() {
  $.get("/tasks").success( function( data ) {
    var htmlString = "";
    $.each(data, function(index,  task) {
      var checkedStatus = task.done ? "checked" : "";
      var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
      " data-id='" + task.id + "'" +
      checkedStatus +
      '><label>' +
      task.title +
      '</label></div></li>';
      htmlString += liElement;
    });
    var ulTodos = $('.todo-list');
    ulTodos.html(htmlString);
    
    $('.toggle').change(function(e) {
      var itemId = $(e.target).data("id");
      console.log(itemId);
      var doneValue = Boolean($(e.target).is(':checked'));
      console.log("done:", doneValue);
      
      $.post("/tasks/" + itemId, {
        _method: "PUT",
        task: {
          done: doneValue
        }
      });
    });
    
  });
  
});
