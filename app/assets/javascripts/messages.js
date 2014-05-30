// TODO: Options for font weight
// TODO: Option to auto scroll to top when new message arrives
// TODO: Private room
// TODO: Rethink max length of message?

var placeholderText = "Say something...";

function submitMessage(message) {
  if (message.length != 0 && message.trim().toLowerCase() != placeholderText.toLowerCase()) {
    $.post('http://107.170.152.141:9080/pub?id=furtively', message.slice(0,-1), function(data) {
      // newMessageInput.html(placeholderHTML);
    });
  };
};
  
$(function(){
  $.timeago.settings.refreshMillis = 10000;

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

  // function checkIfScrolledDown(){
  //   var messagesDiv = $('section#messages');
  //   if (messagesDiv.scrollTop() > 30) {
      // TODO: Turn on overflow: hidden in messages section
      // TODO: Display "scroll to Top"
  //   }
  // };

  function messageReceived(text, id, channel) {
    // checkIfScrolledDown();
    var firstMessageColor = $('span.message-text').first().css("background-color");
    var newMessageColor = "";
    if (firstMessageColor === undefined || firstMessageColor === "rgba(0, 0, 0, 0)") {
      newMessageColor = "#ccc";
    } else {
      newMessageColor = "rgba(0, 0, 0, 0)";
    };

    var timeReceived = new Date;
    var liveTime = '<time class="timeago" id="message-time-' +
          id + '" datetime="' + timeReceived.toISOString() + '"></time>';
    $('section#messages').prepend(
      '<div class="message" id="message-'+
      id + '"><span class="message-text">' + text +
      '</span><span class="message-time">' + liveTime +'</span></div>');

    var newMessage = $('div#message-'+id);
    
    newMessage.hide();
    var messageCount = $('div.message').size();
    if (messageCount > 15) {
      $('div.message:last').remove();
    };
    $('span.message-text').first().css("background-color", newMessageColor);
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

  function updateSubscriberCountText(subCount) {
    $('div#subscriber-count').text("People Connected: " + subCount);
  };

  function updateSubscriberCount() {
    setTimeout(function(){
      $.ajax({
        url: "http://107.170.152.141:9080/pub?id=furtively",
        success: function(stats){
          updateSubscriberCountText(stats.subscribers);
          updateSubscriberCount();
        },
        dataType: "json"
      });
    }, 5000);
  };
  
  setUpPushStream();
  setUpMedium();
  updateSubscriberCount();
  $('div#new-message').focus();
});