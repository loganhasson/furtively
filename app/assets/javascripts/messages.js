// var $j = jQuery.noConflict();
// TODO: Uncomment prototype.js and add .stripScripts(); to message
var placeholderText = "Say something...";

function submitMessage(message) {
  if (message.length != 0 && message.trim().toLowerCase() != placeholderText.toLowerCase()) {
    $.post('http://107.170.152.141:9080/pub?id=furtively', message.slice(0,-1), function(data) {
      // newMessageInput.html(placeholderHTML);
    });
  };
};
  
$(function(){
  $.timeago.settings.refreshMillis = 1000;
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
      modes: 'eventsource'
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
    // var timeReceived = new Date(1970,1,1,0,0,0) - new Date;
    // var liveTime = '<span data-livestamp="'+ timeReceived + '"></span>';
    var timeReceived = new Date;
    var liveTime = '<time class="timeago" id="message-time-' +
          id + '" datetime="' + timeReceived.toISOString() + '"></time>';
    $('section#messages').prepend(
      '<div class="message" id="message-'+
      id + '"><span class="message-text">' + text +
      '</span><span class="message-time">' + liveTime +'</span></div>');

    var newMessage = $('div#message-'+id);
    
    newMessage.hide();
    
    $('time#message-time-'+id).timeago();
    newMessage.fadeIn();
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