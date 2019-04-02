function clearBox() {

  var box = $(".box");
  box.remove();
}

function stampBox() {

  clearBox();

  $.ajax({

    url: "http://157.230.17.132:3009/todos/",
    method: "GET",
    success: function(inData) {

      var template = $("#card-template").html();
      var compiled = Handlebars.compile(template);


      for (var i = 0; i < inData.length; i++) {

        data = inData[i];
        var id = data.id;
        var text = data.text;

        var data = {

          id: id,
          text: text
        }
        var box = compiled(data);

        $(".wrapper").append(box);
      }
    }
  });
}

function deleteCard() {

  var me = $(this);
  var cardId = me.siblings("li#cardId").text();

  $.ajax({

    url: "http://157.230.17.132:3009/todos/" + cardId,
    method: "DELETE",
    success: function(inData) {

      stampBox();
    }
  });
}

function generateNewCard() {

  var inputText = $("#txt-input").val();
  var inData = {

    text: inputText
  }

  $.ajax({

    url: "http://157.230.17.132:3009/todos/",
    method: "POST",
    data: inData,
    success: function(outData) {

      stampBox();
    }
  });
}

function init() {

  var genBtn = $("#btn-input");
  var inputText = $("#txt-input");

  stampBox();
  genBtn.click(generateNewCard);
  $(document).on("click", "#del-btn", deleteCard);
  inputText.keyup(function(e) {

    if (e.which == 13) {

      generateNewCard();
    }
  });
}

$(document).ready(init);
