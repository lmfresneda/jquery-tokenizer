$(document).ready(function () {
  $.fn.tokenizer.defaults.onDeleteToken = function ($tokens) {
    $tokens = $tokens || [];
    $tokens.each(function(){
      $("#notes").append($("<p></p>").css('color', 'red').html(`Token '${$(this).attr("data-value")}' borrado`))});
  };

  $("#input1").tokenizer({
    separators: [' ', ',', ';']
  });

  $("#input2").tokenizer({
    keyCodeCreate: $.tokenizer.KEY_CODE.BACKSPACE
  });

  $("#input3").tokenizer({
    onClickToken: function () {
      $(this).toggleClass("tokenizer-token-active");
      $("#notes").append($("<p></p>").html(`Token '${$(this).attr("data-value")}' clickeado`));
    }
  });
  $("#input3").tokenizer("set", ["Value1", "Value2", "Value3"]);
});