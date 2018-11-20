$(function () {

  var messages_history = $(".main-content__message-history");

  function buildHTML(message) {
    var image = message.image.present? `<img class="lower-message__image" src="${message.imag}">}` : "";
    var html =`
      <div class = "main-content__message-history__message-box", message-id= ${message.id} >
        <ul class="upper-message">
          <li class="name">
            ${message.name}
          </li>
          <li class="created_at">
            ${message.date}
          </li>
        <div class="lower-message__content">
          <p>${message.content}</p>
          <div>${image}</div>
        </div>
      </div>
      `

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var href = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      messages_history.append(html)
      $('#message_content').val('')
      messages_history.animate({scrollTop: messages_history[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.main-content__message-submit-box__send').prop('disabled', false);
    })
  })

// メッセージ自動更新機能
  var interval = setInterval(update, 5000);

  function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      if($('.main-content__message-history__message-box')[0]){
        var lastMessageId = $('.main-content__message-history__message-box:last-child').attr('message-id')
      }else{
        var lastMessageId = 0
      }
      var url = window.location.href

      $.ajax ({
        url: url,
        type: 'GET',
        data: {id : lastMessageId},
        dataType: 'json',
      })

      .done(function(update_messages) {
        var insertHTML = '';
        update_messages.forEach(function(update_message){
            insertHTML += buildHTML(update_message)
        });
            messages_history.append(insertHTML)
      })

      .fail(function(json){
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(interval);
    }
  }
});
