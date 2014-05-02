$(function(){

  $('#new-message').on('submit', function(event){
    var message = $('#new-message-text').val();
    $.post('http://107.170.152.141:9080/pub?id=furtively', message, function(data){
    });
    
    event.preventDefault();
  });
  
  function messageReceived(text, id, channel) {
    $('section#messages').prepend('<div class="message"><p>' + text + '</p></div>');
  };

  var pushstream = new PushStream({
    host: '107.170.152.141',
    port: 9080,
    modes: 'longpolling'
  });

  pushstream.onmessage = messageReceived;
  pushstream.addChannel('furtively');
  pushstream.connect();

});