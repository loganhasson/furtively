$(function(){
  function setUpGlobalChatButton() {
    $(document).on('click', 'div.global-chat', function(e){
      window.location.replace("http://furtive.ly/")
    });
  };

  setUpGlobalChatButton();
});