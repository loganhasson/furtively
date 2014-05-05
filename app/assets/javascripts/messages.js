var placeholderText = "Say something...";

function submitMessage(message) {
  if (message.length != 0 && message.trim().toLowerCase() != placeholderText.toLowerCase()) {
    $.post('http://107.170.152.141:9080/pub?id=furtively', message.trim(), function(data) {
      // newMessageInput.html(placeholderHTML);
    });
  };
};
  
$(function(){
  // var newMessageInput = $('div#new-message');
  // var placeholderText = "Say something...";
  // var placeholderHTML = '<p contenteditable="false" class="new-message-placeholder">'+placeholderText+'</p>';

  // function setUpNewMessage() {

  //   function setPlaceholderOnDelete(event) {
  //     if ((event.which == 8 || event.which == 46) && ($(this).text() == "")) {
  //       $(event.target).html(placeholderHTML);
  //     };
  //   };

  //   newMessageInput.attr('contentEditable', true);

    // newMessageInput.on('focus', function(event) {
    //   window.setTimeout(function() {
    //     $(event.target).text("");
    //   });
    // });

  //   newMessageInput.on({
  //     blur: function(event) {
  //       if ($(this).text() == "") {
  //         $(event.target).html(placeholderHTML);
  //       };
  //     },

  //     keypress: function(event) {
  //       var placeholder = $('div#new-message p.new-message-placeholder');

  //       if (event.which == 13) {
  //         submitMessage($(this).text());
  //         event.preventDefault();
  //       } else if (placeholder) {
  //         placeholder.remove();
  //       };
  //     },

  //     keyup: function(event) {
  //       if ((event.which == 8 || event.which == 46) && ($(this).text() == "")) {
  //         $(event.target).html(placeholderHTML);
  //       };
  //     }
  //   });
  // };

  function setUpPushStream() {
    var pushstream = new PushStream({
      host: '107.170.152.141',
      port: 9080,
      modes: 'websocket'
    });

    pushstream.onmessage = messageReceived;
    pushstream.addChannel('furtively');
    pushstream.connect();
  };

  // function submitMessage(message) {
  //   if (message.length != 0 && message != placeholderText) {
  //     $.post('http://107.170.152.141:9080/pub?id=furtively', message, function(data) {
  //       newMessageInput.html(placeholderHTML);
  //     });
  //   };
  // };

  function messageReceived(text, id, channel) {
    $('section#messages').prepend('<div class="message"><p>' + text + '</p></div>');
  };

  function setUpMedium() {
    return new Medium({
      element: document.getElementById('new-message'),
      debug: false,
      placeholder: placeholderText,
      autofocus: true,
      mode: 'inline',
      maxLength: 140
    });
  };
  
  // setUpNewMessage();
  setUpPushStream();
  setUpMedium();
});