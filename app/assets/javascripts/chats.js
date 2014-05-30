$(function(){
  function setUpGlobalChatButton() {
    $(document).on('click touchend', 'div.global-chat', function(e){
      window.location.replace("http://furtive.ly/")
    });
  };

  setUpGlobalChatButton();
});