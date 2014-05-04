$(function(){
  var newMessageInput = $('div#new-message');

  function setUpNewMessage() {
    newMessageInput.attr('contentEditable', true);

    newMessageInput.on('focus', function(event) {
      window.setTimeout(function() {
        $(event.target).text("");
      });
    });

    newMessageInput.on('blur', function(event) {
      $(event.target).text("Say something...");
    });

    newMessageInput.keypress(function(event) {
      if (event.which == 13) {
        submitMessage(newMessageInput.text());
        event.preventDefault();
      };
    });
  };

  function setUpPushStream() {
    var pushstream = new PushStream({
      host: '107.170.152.141',
      port: 9080,
      modes: 'eventsource'
    });

    pushstream.onmessage = messageReceived;
    pushstream.addChannel('furtively');
    pushstream.connect();
  };

  function submitMessage(message) {
    if (message.length != 0) {
      $.post('http://107.170.152.141:9080/pub?id=furtively', message, function(data) {
        newMessageInput.text("");
      });
    };
  };

  function messageReceived(text, id, channel) {
    $('section#messages').prepend('<div class="message"><p>' + text + '</p></div>');
  };
  
  setUpNewMessage();
  setUpPushStream();
});